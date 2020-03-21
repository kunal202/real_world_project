const { Router } = require('express')
const { userFromToken } = require('../../middlewares/auth')
const { getAllArticles, createArticle } = require('../../controllers/articles')
const { FindUserByToken } = require('../../controllers/articles')

const route = Router()

// GET /api/articles
route.get('/', async(req, res) => {

    const articles = await getAllArticles()
    res.send(articles)
})

// POST /api/articles 
route.post('/', userFromToken, async(req, res) => {

    let a = req.body.article
    let article = await createArticle(
        a.title,
        a.description,
        a.body,
        a.favourited,
        a.favouritsCount,
        req.user.username
    )
    res.send(article)
})

// // POST /api/articles/:slug/favourite
route.post('/:slug/favourite', userFromToken, async(req, res) => {

    const article = await getAllArticles.findOne({
        where: {
            slug
        }
    })

    article.favourited = true
    article.favouritsCount++

        res.send(article)
})

module.exports = { route }