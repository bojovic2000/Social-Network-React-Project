import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResultDiv = ({
    text,
    id,
    resultType
}) => {
    
    const navigate = useNavigate();

    const handleOnClick = () => {
        if(resultType === "post"){
            navigate(`/home/posts/${id}`)
        }else{
            navigate(`/home/profile/${id}`)
        }
    };

    return (
        <div onClick={handleOnClick} className="search-result-div">
            <p>{text}</p>
        </div>
    );
};

export default SearchResultDiv;