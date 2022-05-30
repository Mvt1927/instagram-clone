import { Button, List } from '@material-ui/core'
import React, { useState } from 'react'
import { db, storage } from '../config/firebase'
import firebase from 'firebase/app'
import { makeStyles } from '@material-ui/core/styles'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CFormInput } from '@coreui/react'

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
        if (e.target.files) {
            setImage(e.target.files)
        }
    }
    const handleUpload = () => {
        var storageRef = firebase.storage().ref();
        var ArrayImageUrl = [];
        console.log(image.name);
        var data = {
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            amount: image.length,
            arrayImageUrl: ArrayImageUrl,
            username: username
        }
        console.log(data);
        db.collection('posts').add(data)
        .then(it=>{
            for (let index = 0; index < image.length; index++) {
                const uploadTask = storageRef.child(`images/${image[0].name}/${image.length}/${image[index].name}`).put(image[index])
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
                            .ref(`images/${image[0].name}/${image.length}`)
                            .child(image[index].name)
                            .getDownloadURL()
                            .then(url => {
                                db.collection('posts').doc(it.id).update(
                                    {
                                        arrayImageUrl: firebase.firestore.FieldValue.arrayUnion(url)
                                    }
                                ).catch(e =>{
                                    console.log(e);
                                })
                                console.log(it.id+"-"+index+"="+url); 
                            })
                    }
                )
            }
        })
        console.log(ArrayImageUrl);
        setProgress(0)
        setCaption('')
        setImage(null)

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
            <CFormInput type="file" id="formFileMultiple" onChange={handleChange} label="Multiple files input example" multiple />
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