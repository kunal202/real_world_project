const { Router } = require('express')
const { userFromToken } = require('../../middlewares/auth')
const { getAllArticles, createArticle } = require('../../controllers/articles')
const { Articles, Users } = require('../../data/db')
const { FindUserByToken } = require('../../controllers/articles')
const { slugify } = require('../../utils/string')
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
        req.user.username
    )
    res.send(article)
})

//UPDATE an article /api/articles/:slug
route.put('/:slug', userFromToken, async(req, res) => {

    const article = await Articles.findOne({
        where: {
            slug: req.params.slug
        }
    })

    if (!article) {
        res.status(404).send({
            errors: {
                body: ['Invalid Path']
            }
        })
    }

    let a = req.body.article

    article.slug = a.title.toLowerCase().split(' ').join('-')
    article.title = a.title
    article.description = a.description
    article.body = a.body
    await article.save()
    res.send(article)
})

// //DELETE an article /api/articles/:slug
route.delete('/:slug', userFromToken, async(req, res) => {

    const article = await Articles.findOne({
        where: {
            slug: req.params.slug
        }
    })

    await article.destroy()
})

// POST /api/articles/:slug/favourite
route.post('/:slug/favourite', userFromToken, async(req, res) => {

    const article = await Articles.findOne({
        where: {
            slug: req.params.slug
        }
    })

    article.favourited = true
    article.favouritesCount = article.favouritesCount + 1

    await article.save()
    res.send(article)
})

//DELETE /api/articles/:slug/favourite
// unfavourite
route.delete('/:slug/favourite', userFromToken, async(req, res) => {

    const article = await Articles.findOne({
        where: {
            slug: req.params.slug
        }
    })

    article.favourited = false
    if (article.favouritesCount != 0) {
        article.favouritesCount = article.favouritesCount - 1
    }

    await article.save()
    res.send(article)
})

module.exports = { route }