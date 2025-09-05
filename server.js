import RSSparser from "rss-parser"
import cors from "cors"
import express from "express"
import * as cheerio from 'cheerio'
import { addAlert, getAllAlerts } from "./driver.js"

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
        pub_date: item.pubDate.substring(0, item.pubDate.length - 5),
        title: item.title,
        content: item.contentSnippet,
        link: item.link,
        type: "default"
      }
      policeAlerts.push(alert)
      addAlert(alert)
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
        pub_date: item.pubDate.substring(0, item.pubDate.length - 5),
        title: item.title,
        content: item.contentSnippet,
        link: item.link,
        type: "default"
      }
      fireAlerts.push(alert)
      addAlert(alert)
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
        pub_date: item.pubDate.substring(0, item.pubDate.length - 5),
        title: item.title,
        content: item.contentSnippet,
        link: item.link,
        type: "default"
      }
      trafficAlerts.push(alert)
      addAlert(alert)
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
        pub_date: item.pubDate.substring(0, item.pubDate.length - 5),
        title: item.title,
        content: item.contentSnippet,
        link: item.link,
        type: "default"
      }
      utilitiesAlerts.push(alert)
      addAlert(alert)
    })
  } catch (error) {
    console.error("Error fetching Utilities RSS feed:", error)
  }
}

// NWS Charlottesville Weather Advisory API VAZ037
// to see what a real alert looks like go here use this zone id: PKZ771

async function fetchNWSAlerts() {
  fetch("https://api.weather.gov/alerts/active/zone/PKZ771")
    .then(response => response.json())
    .then(data => {
      // If the features list is not empty
      if (data.features && data.features.length > 0) {
        for (let feature of data.features) {
          let alert = {
            pub_date: feature.properties.sent,
            title: feature.properties.headline,
            content: feature.properties.description,
            link: null,
            type: "default"
          }
          nwsAlerts.push(alert)
          addAlert(alert)
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
              pub_date: airnowParsed.lastUpdate,
              title: item.title,
              content: airnowParsed.currentAQI + " - " + airnowParsed.agency,
              link: null,
              type: "default"
            }
            airNowAlerts.push(alert)
            addAlert(alert)
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

app.get("/api/fire", (req, res) => {
  res.json(fireAlerts)
})

app.get("/api/traffic", (req, res) => {
  res.json(trafficAlerts)
})

app.get("/api/utilities", (req, res) => {
  res.json(utilitiesAlerts)
})

app.get("/api/police", (req, res) => {
  res.json(policeAlerts)
})

app.get("/api/nws", (req, res) => {
  res.json(nwsAlerts)
})

app.get("/api/airnow", (req, res) => {
  res.json(airNowAlerts)
})

app.get("/api/allalerts", (req, res) => {
  getAllAlerts().then(alerts => {
    res.json(alerts)
  }).catch(error => {
    console.error("Error fetching all alerts:", error)
    res.status(500).json({ error: "Internal Server Error" })
  })
})

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

// SUPABASE EXPERIMENTATION

// addAlert({
//   pub_date: "2025-09-05 14:30:45",
//   title: "EMERGENCY ALERT",
//   content: "This is a test of the UVA alert system. This alert is simply designed to annoy you.",
//   link: "https://www.virginia.edu/",
//   type: "default"
// })