import RSSparser from "rss-parser"
import cors from "cors"
import express from "express"
import * as cheerio from 'cheerio'
import path from "path"

const app = express()
const port = 3001
const parser = new RSSparser()

// temporary storage for alerts
let policeAlerts = []
let fireAlerts = []
let trafficAlerts = []
let utilitiesAlerts = []
let nwsAlerts = []
let airNowAlerts = []

// CivicEngage RSS Feed fetching functions

async function fetchPoliceRSS() {
  try {
    const feed = await parser.parseURL("https://www.charlottesville.gov/RSSFeed.aspx?ModID=1&CID=Charlottesville-Police-News-5")
    feed.items.forEach(item => {
      let alert = {
        pubDate: item.pubDate.substring(0, item.pubDate.length - 5),
        title: item.title,
        contentSnippet: item.contentSnippet,
        link: item.link
      }
      policeAlerts.push(alert)
    })
  } catch (error) {
    console.error("Error fetching RSS feed:", error)
  }
}

async function fetchFireRSS() {
  try {
    const feed = await parser.parseURL("https://www.charlottesville.gov/RSSFeed.aspx?ModID=1&CID=Charlottesville-Fire-News-13")
    feed.items.forEach(item => {
      let alert = {
        pubDate: item.pubDate.substring(0, item.pubDate.length - 5),
        title: item.title,
        contentSnippet: item.contentSnippet,
        link: item.link
      }
      fireAlerts.push(alert)
    })
  } catch (error) {
    console.error("Error fetching Fire RSS feed:", error)
  }
}

async function fetchTrafficRSS() {
  try {
    const feed = await parser.parseURL("https://www.charlottesville.gov/RSSFeed.aspx?ModID=1&CID=Traffic-Advisory-11")
    feed.items.forEach(item => {
      let alert = {
        pubDate: item.pubDate.substring(0, item.pubDate.length - 5),
        title: item.title,
        contentSnippet: item.contentSnippet,
        link: item.link
      }
      trafficAlerts.push(alert)
    })
  } catch (error) {
    console.error("Error fetching Traffic RSS feed:", error)
  }
}

async function fetchUtilitiesRSS() {
  try {
    const feed = await parser.parseURL("https://www.charlottesville.gov/RSSFeed.aspx?ModID=1&CID=Utilities-News-20")
    feed.items.forEach(item => {
      let alert = {
        pubDate: item.pubDate.substring(0, item.pubDate.length - 5),
        title: item.title,
        contentSnippet: item.contentSnippet,
        link: item.link
      }
      utilitiesAlerts.push(alert)
    })
  } catch (error) {
    console.error("Error fetching Utilities RSS feed:", error)
  }
}

// NWS Charlottesville Weather Advisory API VAZ037
// to see what a real alert looks like go here use this zone id: PKZ771

async function fetchNWSAlerts() {
  fetch("https://api.weather.gov/alerts/active/zone/VAZ037")
    .then(response => response.json())
    .then(data => {
      // If the features list is not empty
      if (data.features && data.features.length > 0) {
        for (let feature of data.features) {
          let alert = {
            pubDate: feature.properties.sent,
            title: feature.properties.headline,
            contentSnippet: feature.properties.description,
            link: null
          }
          nwsAlerts.push(alert)
        }
      }
    })
    .catch(error => {
      console.error("Error fetching NWS alerts:", error);
    });
}

// AirNow Current air quality

async function fetchAirNowAQI() {
  try {
    fetch("https://feeds.airnowapi.org/rss/realtime/1278.xml")
      .then(data => data.text())
      .then(feed => parser.parseString(feed))
      .then(rss => {
        if (rss.items && rss.items.length > 0) {
          for (let item of rss.items) {

            let airnowParsed = parseAirNowContent(item.content)

            let alert = {
              pubDate: airnowParsed.lastUpdate,
              title: item.title,
              contentSnippet: airnowParsed.currentAQI + " - " + airnowParsed.agency,
              link: null
            }
            airNowAlerts.push(alert)
          }
        }
      })
      .catch(err => console.log(err))
  } catch (error) {
    console.error("Error fetching AirNow AQI data:", error);
  }
}

// helper function to parse AirNow content
function parseAirNowContent(content) {
  const $ = cheerio.load(content)

  const currentAQI = $("div b:contains('Current Air Quality:')").parent().text().trim();
  const agency = $("div b:contains('Agency:')").parent().text().trim();
  const lastUpdate = $("div i").text().trim();

  let parsed = {
    currentAQI,
    agency,
    lastUpdate
  }

  return parsed
}



// Fetch all CivicEngage RSS feeds
fetchPoliceRSS()
fetchFireRSS()
fetchTrafficRSS()
fetchUtilitiesRSS()

// Fetch NWS alerts
fetchNWSAlerts()

// Fetch AirNow AQI data
fetchAirNowAQI()

app.use(cors())

app.use(express.static("dist"))

app.get("/fire", (req, res) => {
  res.json(fireAlerts)
})

app.get("/traffic", (req, res) => {
  res.json(trafficAlerts)
})

app.get("/utilities", (req, res) => {
  res.json(utilitiesAlerts)
})

app.get("/police", (req, res) => {
  res.json(policeAlerts)
})

app.get("/nws", (req, res) => {
  res.json(nwsAlerts)
})

app.get("/airnow", (req, res) => {
  res.json(airNowAlerts)
})

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})