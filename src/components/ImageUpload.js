import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { db, storage } from '../config/firebase'
import firebase from 'firebase/app'
import { makeStyles } from '@material-ui/core/styles'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: 20,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
    },
}));

const ImageUpload = ({ username }) => {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState('')

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    const handleUpload = () => {
        var storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress)
            },
            (error) => {
                console.log(error)
                alert(error.message)
            },
            () => {
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username,
                        })
                        setProgress(0)
                        setCaption('')
                        setImage(null)
                    })
            }
        )
    }
    return (
        <div style={modalStyle} className={classes.paper}>
            <textarea
                className="outline-none border p-3"
                rows="4"
                type="text"
                placeholder="Enter a caption..."
                onChange={event => setCaption(event.target.value)}
                value={caption}
            />
            <input type="file" onChange={handleChange} className=" mt-5" />
            <progress
                className="w-full h-1.5 rounded-lg my-5"
                value={progress}
                max="100"
            />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload