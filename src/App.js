import React, { useState, useEffect } from 'react'
import './App.css';
import Post from './components/Post'
import ImageUpload from './components/ImageUpload';
import Header from './components/Header';
import { db, auth } from "./config/firebase";

function App() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser);
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
        <div className="bg-gray-100 h-full">
            <Header />
            <div className="p-5 w-full flex flex-col justify-center items-center">
                {posts.map(({ id, post }) => (
                    <Post
                        key={id}
                        postId={id}
                        user={user}
                        username={post.username}
                        imageUrl={post.imageUrl}
                        caption={post.caption}
                    />
                ))}
            </div>

            {user?.displayName ? (
                <ImageUpload username={user.displayName} />
            ) : (
                <h3>Sorry you need to login to upload</h3>
            )}
        </div>
    );
}

export default App;
