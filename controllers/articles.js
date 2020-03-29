const { Articles, Users } = require('../data/db')
const { slugify } = require('../utils/string')

async function getAllArticles() {
    const Articles = await Articles.findAll({
        attributes: [
            'slug', 'title', 'description',
            'body', 'createdAt', 'updatedAt', 'favourited',
            'favouritesCount'
        ],
        include: [{
            attributes: ['username', 'bio', 'image'],
            model: Users,
            as: 'author'
        }]
    })

    return ({
        articles,
        articlesCount: articles.length
    })
}


async function createArticle(title, description, body, authorUsername, favourited, favouritesCount) {
    if (!title) {
        return new Error('title missing')
    }
    if (!body) {
        return new Error('Body missing')
    }

    const newArticle = await Articles.create({
        slug: slugify(title),
        title,
        description,
        body,
        authorUsername,
        favourited,
        favouritesCount
    })

    const article = await Articles.findOne({
        attributes: [
            'slug', 'title', 'description', 'body', 'createdAt', 'updatedAt', 'favourited', 'favouritesCount'
        ],
        where: { slug: newArticle.slug },
        include: [{
            attributes: ['username', 'bio', 'image'],
            model: Users,
            as: 'author'
        }]
    })

    return article
}

module.exports = {
    getAllArticles,
    createArticle
}