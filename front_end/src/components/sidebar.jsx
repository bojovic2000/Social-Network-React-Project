import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutBtn from './logoutButton';
import FriendsBtn from './friendsButton';
import HomeBtn from './homeButton';
import MyProfileBtn from './myProfileButton'
import SettingsBtn from './settingsButton'

const Sidebar = ({ disableHover , isAuthenticated }) => {
    const [isWide, setIsWide] = useState(false);  // For sidebar-wide hover state
    const [isNarrowVisible, setIsNarrowVisible] = useState(false);  // For sidebar-narrow hover state

    const sidebarContainerRef = useRef(null);
    const sidebarNarrowRef = useRef(null);

    const handleSidebarContainerHover = (isHovered) => {
        if (isAuthenticated) {
            setIsWide(isHovered); // sidebar-wide expands when sidebar-container is hovered
        }
    };

    // Handle profile option hover
    const handleProfileHover = () => {
        if (isAuthenticated) {
            setIsNarrowVisible(true); // Expand sidebar-narrow when Profile is hovered
        }
    };

    // Handle profile option leave
    const handleProfileLeave = () => {
        if (isAuthenticated && !sidebarNarrowRef.current?.matches(':hover')) {
            setIsNarrowVisible(false); // Collapse sidebar-narrow when not hovered
        }
    };

    // Handle sidebar-narrow hover
    const handleSidebarNarrowHover = (isHovered) => {
        if (isAuthenticated) {
            setIsNarrowVisible(isHovered); // sidebar-narrow stays expanded while hovered
        }
    };

    return (
        <div
            ref={sidebarContainerRef}
            className="sidebar-container"
            onMouseEnter={() => handleSidebarContainerHover(true)}  // Sidebar-wide expands when hovering over sidebar-container
            onMouseLeave={() => handleSidebarContainerHover(false)} // Sidebar-wide collapses when mouse leaves sidebar-container
        >
            {/* sidebar-wide should expand when sidebar-container is hovered */}
            <div
                className={`sidebar sidebar-wide ${isWide ? 'expanded' : ''}`}
            >
                <HomeBtn onMouseEnter={() => setIsNarrowVisible(false)} />
                <p
                    className="profile-option"
                    onMouseEnter={handleProfileHover}  // Expand sidebar-narrow on Profile hover
                    onMouseLeave={handleProfileLeave}  // Collapse sidebar-narrow on Profile hover leave
                >
                    Profile
                </p>
                <FriendsBtn onMouseEnter={() => setIsNarrowVisible(false)} />
                <LogoutBtn onMouseEnter={() => setIsNarrowVisible(false)} />
            </div>

            {/* sidebar-narrow expands when Profile is hovered and stays expanded when sidebar-narrow is hovered */}
            <div
                ref={sidebarNarrowRef}
                className={`sidebar sidebar-narrow ${isNarrowVisible ? 'expanded' : ''}`}
                onMouseEnter={() => handleSidebarNarrowHover(true)} // Keep sidebar-narrow expanded while hovered
                onMouseLeave={() => handleSidebarNarrowHover(false)} // Collapse sidebar-narrow when mouse leaves
            >
                <MyProfileBtn />
                <SettingsBtn />
            </div>
        </div>
    );
};

export default Sidebar;