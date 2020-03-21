const { FindUserByToken } = require('../controllers/users')

async function userFromToken(req, res, next) {
    let auth = req.headers['authorization']

    if (auth && auth.startsWith('Token ')) {
        let token = auth.split(' ')[1]
        let user = await FindUserByToken(token)
        if (user) {
            req.user = user
            return next()
        }
    }
    res.status(401).send({
        errors: {
            body: ['Invalid Authorization Code']
        }
    })
}

module.exports = {
    userFromToken
}