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

module.exports = {
    route
}