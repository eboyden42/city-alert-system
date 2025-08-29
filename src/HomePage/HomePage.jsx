import "./HomePage.scss"

export default function HomePage() {
    return (
        <div className="home-page">
            <h2>Welcome to the <strong>Charlottesville City Alert System</strong> (CCAS)</h2>
            <p className="indent">
                This platform consolidates critical updates from verified sources to support
                situational awareness and public safety. Information is aggregated directly from <a href="https://www.charlottesville.gov/Rss.aspx" target="_blank">CivicEngage</a> (municipal alerts), the <a href="https://www.weather.gov/" target="_blank">National Weather Service (NWS)</a> (weather warnings), <a href="https://docs.airnowapi.org/" target="_blank">AirNow</a> (air quality reports), and <a href="https://newscatcherapi.com/" target="_blank">NewsCatcher</a> (news monitoring). By unifying
                these channels, the system provides timely, reliable alerts to help the community
                stay informed and prepared.
            </p>
            <h2>Prototype</h2>
            <p className="indent">
                This current version is a prototype to show aggregation of data with public APIs and RSS feeds.
                Use the navigation bar above to explore the different alert categories and test
                the system's functionality.
            </p>
            <h2>Plan</h2>
            <p>
                Once the data sources are all integrated and working, the next steps will be:
                <ul>
                    <li>Add AI summary feature for complicated alerts, or multiple related alerts.</li>
                    <li>Implement simple email notification service.</li>
                    <li>Add user authentication and profile management for setting emails and notification settings.</li>
                    <li>Integrate with Microsoft Teams for team-wide alert distribution.</li>
                </ul>
            </p>
        </div>
    )
}