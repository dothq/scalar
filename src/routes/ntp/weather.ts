import express from "express";

import axios from "axios";

const router = express.Router();

const cache: any = {

};

router.get("/api/ntp/weather/:country/:city", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const key = `${req.params.city},${req.params.country}`.toLowerCase();

    if(cache[key] && Date.now() < cache[key].exp) {
        res.json(cache[key])
    } else {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.city},${req.params.country}&appid=${process.env.WEATHER_API_KEY}`)
            .then(_ => {
                cache[key] = { exp: Date.now()+1800000, ..._.data };
                res.json(cache[key])
            })
    }

})

export default router;