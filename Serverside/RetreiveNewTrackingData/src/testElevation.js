require('dotenv').config();
const axios = require('axios');

async function start() {
    try {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/elevation/json?locations=${coordinates}&key=${process.env.ELEVATION_API_KEY}`);
        console.log(res.data.results);

    } catch (e) {
        console.log(e);
    }
}

start()