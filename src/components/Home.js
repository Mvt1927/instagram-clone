import React, { useState, useEffect } from 'react'
import '../App.css';
import Post from './Post'
import { db, auth } from "../config/firebase";
import './Style.css'

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
                if (authUser.displayName) {
                } else {
                    return authUser.updateProfile({ displayName: username });
                }
            } else {
                setUser(null);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [user, username]);
    useEffect(() => {
        db.collection("posts").onSnapshot((snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
        });
    }, []);

    return (
        <div className="flex flex-col flex-1 items-center overflow-y-scroll h-screen hidden-scroll">
            {posts.map(({ id, post }) => (
                <Post
                    key={id}
                    postId={id}
                    user={user}
                    username={post.username}
                    imageUrl={post.imageUrl}
                    caption={post.caption}
                    timestamp={JSON.stringify(post.timestamp)}
                />
            ))}
        </div>
    )
}

export default Home