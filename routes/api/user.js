const { Router } = require('express')
const { userFromToken } = require('../../middlewares/auth')

const {
    createUser,
    authUser,
    FindUserByToken
} = require('../../controllers/users')

const route = Router()

route.get('/', userFromToken, async(req, res) => {
    return res.send(req.user)
})

route.put('/', userFromToken, async(req, res) => {

    let u = req.body.user
    let auth = req.headers['authorization']
    if (auth && auth.startsWith('Token ')) {
        let token = auth.split(' ')[1]
        var found_user = await FindUserByToken(token)
    }

    if (!found_user) {
        res.status(401).send({
            errors: {
                body: ['Invalid Authorization Code']
            }
        })
    }

    found_user.email = u.email
    found_user.bio = u.bio
    found_user.username = u.username
    found_user.password = u.password
    found_user.image = u.image

    await found_user.save()
    res.send(found_user)
})

module.exports = {
    route
}