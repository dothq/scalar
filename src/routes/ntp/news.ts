import express from "express";

import axios from "axios";

const router = express.Router();

const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

const cache: any = {

};

router.get("/api/ntp/news-image-proxy/:url", (req, res) => {
    
})

router.get("/api/ntp/news/:country", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    if(!req.query.categories) return res.json({ ok: false, code: "MISSING_CATEGORIES_QUERY" })

    const c = (req.query.categories as any).split(",");
    
    const myCategories: any = [];

    c.forEach((category: any) => {
        if(categories.includes(category)) {
            myCategories.push(category)
        }
    });

    const key = req.params.country.toLowerCase();

    if(cache[key] && Date.now() < cache[key].exp) {
        res.json(cache[key])
    } else {
        const apiKey = (process.env.NEWS_API_KEY as string).split(",")[Math.floor(Math.random() * (process.env.NEWS_API_KEY as string).split(",").length)];

        axios.get(`https://newsapi.org/v2/top-headlines?country=${key}&category=${myCategories.join(",")}&apiKey=${apiKey}`)
            .then(_ => {
                const articles: any = []

                _.data.articles.forEach((article: any) => {
                    articles.push({
                        title: article.title.replace(/( \- .*)/, ""),
                        publisher: article.source.name,
                        publishedAt: article.publishedAt,
                        imageURL: article.urlToImage && `https://services.dothq.co/ntp/news-article-image/proxied?url=${encodeURIComponent(article.urlToImage)}`
                    })
                });

                cache[key] = { 
                    exp: Date.now()+1800000, 
                    articles
                };
                res.json(cache[key])
            })
    }

})

export default router;