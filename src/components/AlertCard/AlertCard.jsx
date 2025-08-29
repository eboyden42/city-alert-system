import "./AlertCard.scss"

export default function AlertCard({ alert }) {
    return (
        <div className="alert card">
            <h5>{alert.pubDate.substring(0, alert.pubDate.length - 5)}</h5>
            <h3>{alert.title}</h3>
            <p>{alert.contentSnippet}</p>
            <a href={alert.link} target="_blank" rel="noopener noreferrer">
                <button>
                    Read more
                </button>
            </a>
        </div>
    )
}