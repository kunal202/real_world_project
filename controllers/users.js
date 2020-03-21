const { Users } = require('../data/db')
const { getRandomString } = require('../utils/random')

async function createUser(username, email, password, bio, image) {

    const user = await Users.create({
        username,
        bio,
        email,
        password,
        image,
        token: getRandomString(32)
    })

    return user
}

async function authUser(username, password) {
    const user = await Users.findOne({
        where: {
            username
        }
    })
    if (!user) {
        return { body: ['No User found with that username '] }
    }
    if (user.password != password) {
        return { body: ['Password does not match'] }
    }
    return user
}

async function FindUserByToken(token) {
    const user = await Users.findOne({
        where: { token }
    })

    if (!user) {
        return { body: ['Invalid token'] }
    }
    return user
}

module.exports = {
    createUser,
    authUser,
    FindUserByToken
}