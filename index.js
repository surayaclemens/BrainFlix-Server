const express = require("express");
const app = express();
const fs = require('fs');
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use(express.static('public'))


const videoRoutes = require('./routes/videos')
app.use('/videos', videoRoutes);



app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
