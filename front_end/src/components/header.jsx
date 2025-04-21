import React, { useState, useEffect, useRef } from 'react';
import stockUserImg from './stock_user.png';
import axios from 'axios';
import SearchResultDiv from './searchResultDiv';

const Header = ({isAuthenticated, hasUnacceptedRequests}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [profileImageUrl, setProfileImageUrl] = useState(stockUserImg);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({ users: [], posts: [] });
    const [isSearchActive, setIsSearchActive] = useState(false);
    const searchDivRef = useRef(null);


    useEffect(() => {

        if (user && user.image) {
            setProfileImageUrl(user.image);
        }

    }, [user]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (searchDivRef.current && !searchDivRef.current.contains(event.target)) {
                setIsSearchActive(false);
            }
        };

        if (isSearchActive) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isSearchActive]);

    const handleSearch = async (term) => {
        setSearchTerm(term);
        if (term.trim() === '') {
            setSearchResults({ users: [], posts: [] });
            setIsSearchActive(false);
            return;
        }

        try {
            const usersResponse = await axios.get(`/api/auth/searchusers/${term}`);
            const postsResponse = await axios.get(`/api/posts/searchposts/${term}`);
            setSearchResults({ users: usersResponse.data, posts: postsResponse.data });

            console.log("userResponse: ", usersResponse.data)

            setIsSearchActive(true);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults({ users: [], posts: [] });
            setIsSearchActive(true);
        }
    };
    

    return (
        <header className="header">
            {isAuthenticated ? (
            <><div className="header-left">
                    <span className="user-name">{user ? user.full_name : 'Guest'}</span>
                </div><div className="search-bar">
                        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => handleSearch(e.target.value)}/>
                        <span className="search-icon">🔍</span>
                    </div><div className="header-right">
                        <img className="profile-pic" src={profileImageUrl} alt="Profile" />
                        {hasUnacceptedRequests && (
                            <div className="red-dot"></div>
                        )}
                    </div>{isSearchActive && (
                        <div className="search-overlay">
                            <div className="search-div" ref={searchDivRef}>
                                <div className="search-results-section">
                                    <h3>Users</h3>
                                    {searchResults.users.slice(0, 3).map((user) => (
                                        <SearchResultDiv key={user.id} text={user.full_name} id={user.id} resultType="user"/>
                                    ))}
                                </div>
                                <div className="search-results-section">
                                    <h3>Posts</h3>
                                    {searchResults.posts.slice(0, 3).map((post) => (
                                        <SearchResultDiv key={post.id} text={post.text} id={post.id} resultType="post"/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    </>
                ) : <></>}

        </header>
    );
};

export default Header;