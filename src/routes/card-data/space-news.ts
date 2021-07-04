import axios from 'axios';
import express from 'express'

const router = express.Router()

let cache: any = {}

const shuffle = (a: any) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

router.get('/api/card-data/space-news', async (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`;

    res.header('Access-Control-Allow-Origin', url);

    if (cache && Date.now() < cache.exp) {
        const articlesClone = JSON.parse(JSON.stringify(cache.articles));

        shuffle(articlesClone);

        return res.json({
            exp: cache.exp,
            articles: articlesClone.splice(0, 3),
        })
    } else {
        const apiKey = (process.env.NEWS_API_KEY as string).split(',')[
            Math.floor(
                Math.random() * (process.env.NEWS_API_KEY as string).split(',').length
            )
        ]

        axios
            .get(
                `https://newsapi.org/v2/everything?qInTitle=space&domains=space.com,bbc.co.uk,nasa.gov&apiKey=${apiKey}`
            )
            .then((_: any) => {
                const articles: any = []

                _.data.articles.forEach((article: any) => {
                    articles.push({
                        title: article.title.replace(/( \- .*)/, ''),
                        publisher: article.source.name,
                        favicon: `https://favicons.githubusercontent.com/${new URL(article.url).host}`,
                        url: article.url
                    })
                })

                cache = {
                    exp: Date.now() + 7200000,
                    articles,
                }

                const articlesClone = JSON.parse(JSON.stringify(cache.articles));

                shuffle(articlesClone);

                res.json({
                    articles: articlesClone.splice(0, 3),
                })
            })
    }
})

export default router
