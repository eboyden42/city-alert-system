import RSSparser from "rss-parser"
import cors from "cors"
import express from "express"

const app = express()
const port = 3001

const feedURL = "https://www.charlottesville.gov/RSSFeed.aspx?ModID=1&CID=Charlottesville-Police-News-5"
const parser = new RSSparser()

let alerts = []

async function fetchRSS() {
  try {
    const feed = await parser.parseURL(feedURL)
    feed.items.forEach(item => {
      alerts.push(item)
    })
  } catch (error) {
    console.error("Error fetching RSS feed:", error)
  }
}

fetchRSS()

app.use(cors())

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

app.get("/police", (req, res) => {
  res.json(alerts)
})