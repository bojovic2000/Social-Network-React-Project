

const Post = ({
    id, full_name, text, date, time, onClick
}) => {

    return (
        <div className="post" onClick={() => onClick({ id, full_name, text, date, time })}>
                <h3 className="post-title">{full_name}</h3>
                <p>{text}</p>
                <div className="post-footer">
                    <span className="post-date">{date}</span>
                    <span className="post-time">{time}</span>
                </div>
        </div>
    );
};

export default Post;