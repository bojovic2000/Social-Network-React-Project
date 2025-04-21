import React, { useEffect, useState, useRef } from 'react';
import stockImage from '../components/stock_user.png';
import axios from 'axios'

const Settings = () => {
    const [full_name, setName] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [profilePicture, setProfilePicture] = useState(stockImage);
    const fileInputRef = useRef(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const id = user.id;

    useEffect(() => {
        if (user && user.image) {
            setProfilePicture(user.image);
        }

        setName(user.full_name || '');
        setCity(user.city || '');
        setPhone(user.phone || '');
        if (user.dob) {
            const date = new Date(user.dob);
            const offset = date.getTimezoneOffset() * 60000;
            const localDate = new Date(date.getTime() - offset);
            const year = localDate.getFullYear();
            const month = String(localDate.getMonth() + 1).padStart(2, '0');
            const day = String(localDate.getDate()).padStart(2, '0');
            setDob(`${year}-${month}-${day}`);
        }
    }, []);

    const handleSave = async () => {
        try {
            const response = await axios.post('/api/auth/update', { id, full_name, city, dob, phone });
            if (response.status === 201) {
                alert(response.data.message); // Display the message
                localStorage.setItem('user', JSON.stringify({ ...user, full_name, city, dob, phone }));
            } else {
                alert('An error occurred while saving settings.');
            }
        } catch (error) {
            alert(error);
        }
    };

    const handleProfilePictureChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        console.log("picture name: ", id)

        const formData = new FormData();
        formData.append('userId', id); // Append userId FIRST
        formData.append('profilePicture', file, `${id}.jpg`);

        try {
            const response = await axios.post('/api/auth/uploadProfilePicture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                setProfilePicture(response.data.profilePictureUrl);
                localStorage.setItem('user', JSON.stringify({ ...user, profilePicture: response.data.profilePictureUrl }));
                console.log(response.data.profilePictureUrl);
                alert('Profile picture uploaded successfully.');
            } else {
                alert('Failed to upload profile picture.');
            }
        } catch (error) {
            alert('Error uploading profile picture.');
            console.error(error);
        }
    };

    const handleProfilePictureClick = () => {
        fileInputRef.current.click(); // Trigger file input click
    };
    

    return (
        <>
            <h2 className="background-content-header">Settings</h2>
            <div className="background-content">
            <div className="profile-picture" onClick={handleProfilePictureClick}>
                    <img src={profilePicture} alt="Profile" />
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleProfilePictureChange}
                        accept="image/*"
                    />
                </div>
                <div className="settings-form">
                    <input
                        type="text"
                        placeholder="Name"
                        value={full_name}
                        onChange={(e) => setName(e.target.value)}
                        className="settings-input"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="settings-input"
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="settings-input"
                    />
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="settings-input"
                    />
                    <button onClick={handleSave} className="save-button">Save</button>
                </div>
            </div>
        </>
    );
};

export default Settings;

