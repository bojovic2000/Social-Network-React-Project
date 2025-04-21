

const smallPost = ({
    text,
    date,
    time
}) => {

    return (
        <div className="small-post">
                <p>{text}</p>
                <div className="small-post-footer">
                    <span className="small-post-date">{date}</span>
                    <span className="small-post-time">{time}</span>
                </div>
        </div>
    );
};

export default smallPost;