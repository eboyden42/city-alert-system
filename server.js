import RSSparser from "rss-parser"
import cors from "cors"
import express from "express"

const app = express()
const port = 3001
const parser = new RSSparser()

// temporary storage for alerts
let policeAlerts = []
let fireAlerts = []
let trafficAlerts = []
let utilitiesAlerts = []
let nwsAlerts = []

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

async function fetchNWSAlerts() {
  fetch("https://api.weather.gov/alerts/active/zone/PKZ771")
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

        console.log(nwsAlerts)
      }
    })
    .catch(error => {
      console.error("Error fetching NWS alerts:", error);
    });
}

// Fetch all CivicEngage RSS feeds
fetchPoliceRSS()
fetchFireRSS()
fetchTrafficRSS()
fetchUtilitiesRSS()

// Fetch NWS alerts
fetchNWSAlerts()

app.use(cors())

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

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