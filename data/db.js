const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'mysql',
    storage: __dirname + '/blog.db',
    database: 'realworldio',
    username: 'conduit',
    password: 'Wewillrockit@2000'
})

const Users = db.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    token: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    bio: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.STRING
    }
})

const Articles = db.define('article', {
    "slug": {
        type: Sequelize.STRING(100),
        primaryKey: true
    },
    "title": {
        type: Sequelize.STRING,
        allowNull: false
    },
    "description": {
        type: Sequelize.STRING
    },
    "body": {
        type: Sequelize.TEXT
    },
    "favourited": {
        type: Sequelize.BOOLEAN
    },
    "favouritesCount": {
        type: Sequelize.INTEGER
    }
})

Articles.belongsTo(Users, { as: 'author' })
Users.hasMany(Articles, { as: 'author' })

Articles.belongsToMany(Users, { through: 'favourites' })
Users.belongsToMany(Articles, { through: 'favourites' })

module.exports = {
    db,
    Users,
    Articles
}