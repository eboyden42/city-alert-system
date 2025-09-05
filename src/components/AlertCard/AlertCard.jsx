import "./AlertCard.scss"

export default function AlertCard({ alert }) {
    return (
        <div className="alert card">
            <h5>{alert.pub_date}</h5>
            <h3>{alert.title}</h3>
            <p>{alert.content}</p>
            {alert.link ? (
                <a href={alert.link} target="_blank" rel="noopener noreferrer">
                    <button>
                        Read more
                    </button>
                </a>
            ) : null}
        </div>
    )
}