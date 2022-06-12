const express = require('express');
const router = express.Router();
const fs = require('fs');
const {v4: uuid } = require('uuid')
const videosFile = fs.readFileSync('./data/videos.json');
 // parsing the videosFile from the json file in data folder, storing in variable to use
const videos = JSON.parse(videosFile);


//GETTING ALL VIDEOS
router.get('/', (req, res) => {
    // create new empty array to push new video to; for each video, make an object with the properties I want to send
   const videoArray = []
   videos.forEach(video => {
       videoArray.push({
                id: video.id,
                title: video.title,
                channel: video.channel,
                image: video.image
            })
   })
    // send array of videos that has an object for each video as response for client
    res.json(videoArray);
});


//GETTING SINGLE SELECTED VIDEO FOR HERO PLAYER
router.get('/:videoId', (req, res) => {

    //go through videos from list in json and find the video where the id = the one that matches params with the url request
    const singleVideo = videos.find((video) => video.id === req.params.videoId);

    //if it doesn't find a video that matches in id, give 404 status
    if (!singleVideo) {
        res.status(404).send("Video not found");
    }
   
    // send json object of the single video selected through find() as response for client
    res.json(singleVideo);
})


//POSTING NEW VIDEO (UPLOADED) TO API/JSON   
router.post("/",(req, res) => {
        //make a new video object that adds unique id, other properties to each video requested (by spreading body of request and adding the stuff)
        const newVideoDetails = {...req.body, 
            id: uuid(), 
            channel: "$uraya", 
            likes: "200000", 
            image: "http://localhost:8000/images/new.jpg",
            views: "20000", 
            timestamp: new Date()
        };

        //making new array of all the videos (including new uploads) by spreading existing videos array and adding the newVideoDetails made above
        let allVideos = [...videos, newVideoDetails];

        //writing the array to the json file, stringified first
        fs.writeFileSync('./data/videos.json', JSON.stringify(allVideos));

        //success status and sending the info to client
        res.status(201).json(allVideos)
    });


module.exports = router;