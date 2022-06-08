const express = require('express');
const router = express.Router();
const fs = require('fs');
const {v4: uuid } = require('uuid')
const videosFile = fs.readFileSync('./data/videos.json');



//GETTING ALL VIDEOS
router.get('/', (req, res) => {
    // parsing the videosFile from the json file in data folder, storing in variable to use
    const videos = JSON.parse(videosFile)

    // map through json file videos and make new object with just values I want to use
    const videoObject = videos.map(video => {
        return {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image
        };
    });
    // this is still inside the get -- send json object of newly narrowed down videoObject content as response for client
    res.json(videoObject);
});


//GETTING SINGLE SELECTED VIDEO FOR HERO PLAYER
router.get('/:videoId'), (req, res) => {
    //following from demo...why do you have to do this each time? is it not accessible outside each get function?
    const videos = JSON.parse(videosFile);

    //go through videos from list in json and find the video where the id = the one that matches params with the url request?
    const singleVideo = videos.find((video) => video.id === req.params.videoId);

    //if it doesn't find a video that matches in id, give 404 status
    if (!singleVideo) {
        res.status(404).send("Video not found");
        return;
    }
    // this is still inside the get -- send json object of the single video selected through find() as response for client
    res.json(singleVideo);
}


//POSTING NEW VIDEO (UPLOADED) TO API/JSON   
router.post((req, res) => {
        //make a new video object that adds unique id to each video requested (by spreading body of request and adding uuid)
        const newVideoDetails = {...req.body, id: uuid()};
        // console.log(newVideoDetails);

        //this gets repeated again...
        const videos = JSON.parse(videosFile)

        //making new array of all the videos (including new uploads) by spreading existing videos array and adding the newVideoDetails made above
        let allVideos = [...videos, newVideoDetails];

        //writing the array to the json file, stringified first
        fs.writeFileSync('./data/videos.json', JSON.stringify(allVideos));

        //success status -- what's the second part again?
        res.status(201).json(newVideoDetails)
    });

module.exports = router;