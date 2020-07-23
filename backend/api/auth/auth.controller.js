const authService = require('./auth.service')
const logger = require('../../services/logger.service')
const session = require('express-session')
const userService = require('../user/user.service')


async function login(req, res) {
    // console.log('userrr', req.body);
    
    const { userName, password } = req.body
    try {
        const user = await authService.login(userName, password)
        req.session.user = user;
        res.json(user)
        console.log('userrr login', user);
    } catch (err) {
        console.log("returning 401 from login", err);
        res.status(401).send({ error: err })
    }
}

async function signup(req, res) {
    console.log('userrr', req.body);
    try {
        const { userName, password, fullName } = req.body
        logger.debug(userName + ", " + fullName + ', ' + password)
        const account = await authService.signup(userName, password, fullName)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(userName, password)
        req.session.user = user
        res.json(user)
        console.log('userrr signup', user);
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(500).send({ error: 'could not signup, please try later' })
    }
}

async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout,
}