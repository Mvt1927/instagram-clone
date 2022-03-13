import React, { useState, useEffect } from 'react'
import './App.css';
import Post from './Post'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

function App() {
    const [posts, setPosts] = useState([])

    const firebaseConfig = {
        apiKey: "AIzaSyDoXMCGuft534vMKG1T0pXG6yd47GEuuOg",
        authDomain: "instagram-clone-96e8f.firebaseapp.com",
        projectId: "instagram-clone-96e8f",
        storageBucket: "instagram-clone-96e8f.appspot.com",
        messagingSenderId: "36360262323",
        appId: "1:36360262323:web:3f90eba3766348c32896c6",
        measurementId: "G-6ERQ0CN13E"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    async function getPosts(db) {
        const postsCol = collection(db, 'posts');
        const postSnapshot = await getDocs(postsCol);
        const postList = postSnapshot.docs.map(doc => doc.data());
        setPosts(postList)
    }

    getPosts(db)

    return (
        <div className="bg-gray-100 h-screen">
            <div className="bg-white py-3 object-contain" style={{ border: "1px solid lightgray" }}>
                <img
                    className=""
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt=""
                />
            </div>
            {posts.map((post, i) => (
                <Post
                    key={i}
                    username={post.username}
                    imageUrl={post.imageUrl}
                    caption={post.caption}
                />
            ))}
        </div>
    );
}

export default App;
