# Charlottesville City Alert System (CCAS)
This platform consolidates critical updates from verified sources to support situational awareness and public safety. Information is aggregated directly from:

- [CivicEngage](https://www.charlottesville.gov/Rss.aspx) — municipal alerts
- [National Weather Service (NWS)](https://www.weather.gov/) — weather warnings
- [AirNow](https://docs.airnowapi.org/) — air quality reports
- [NewsCatcher](https://newscatcherapi.com/) — news monitoring

By unifying these channels, the system provides timely, reliable alerts to help the community stay informed and prepared.

**Note:** This current version is a prototype demonstrates how data can be aggregated from public APIs and RSS feeds.  

## Plan

Once the data sources are all integrated and working, the next steps will be:

- Add AI summary feature for complicated alerts, or multiple related alerts.
- Implement simple email notification service.
- Add user authentication and profile management for setting emails and notification settings.
- Integrate with Microsoft Teams for team-wide alert distribution.
