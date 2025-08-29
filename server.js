import RSSparser from "rss-parser"
import cors from "cors"
import express from "express"

const app = express()
const port = 3001
const parser = new RSSparser()

let policeAlerts = []
let fireAlerts = []
let trafficAlerts = []
let utilitiesAlerts = []

async function fetchPoliceRSS() {
  try {
    const feed = await parser.parseURL("https://www.charlottesville.gov/RSSFeed.aspx?ModID=1&CID=Charlottesville-Police-News-5")
    feed.items.forEach(item => {
      policeAlerts.push(item)
    })
  } catch (error) {
    console.error("Error fetching RSS feed:", error)
  }
}

async function fetchFireRSS() {
  try {
    const feed = await parser.parseURL("https://www.charlottesville.gov/RSSFeed.aspx?ModID=1&CID=Charlottesville-Fire-News-13")
    feed.items.forEach(item => {
      fireAlerts.push(item)
    })
  } catch (error) {
    console.error("Error fetching Fire RSS feed:", error)
  }
}

async function fetchTrafficRSS() {
  try {
    const feed = await parser.parseURL("https://www.charlottesville.gov/RSSFeed.aspx?ModID=1&CID=Traffic-Advisory-11")
    feed.items.forEach(item => {
      trafficAlerts.push(item)
    })
  } catch (error) {
    console.error("Error fetching Traffic RSS feed:", error)
  }
}

async function fetchUtilitiesRSS() {
  try {
    const feed = await parser.parseURL("https://www.charlottesville.gov/RSSFeed.aspx?ModID=1&CID=Utilities-News-20")
    feed.items.forEach(item => {
      utilitiesAlerts.push(item)
    })
  } catch (error) {
    console.error("Error fetching Utilities RSS feed:", error)
  }
}

fetchPoliceRSS()
fetchFireRSS()
fetchTrafficRSS()
fetchUtilitiesRSS()

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