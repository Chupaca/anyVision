'use strict'

const userLogic = require("../../logic/users");
const jwt = require("jsonwebtoken")
process.env.SECRET_KEY = 'secret';

const GetRegistration = (req, res) => {
    const { firstName, lastName, email, pass, admin } = req.body;
    if (firstName && lastName && email && pass ) {
        userLogic.CreateNewUser(firstName, lastName, email, pass, admin)
            .then(result => {
                if (result) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(500)
                }
            })
            .catch(err => {
                res.sendStatus(502)
            })

    } else {
        res.sendStatus(403)
    }
}

const Login = (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        userLogic.Login(email, password)
            .then(resultLogin => {
                if (resultLogin) {
                    const payload = {
                        _id: resultLogin._id,
                        firstName: resultLogin.FirstName,
                        lastName: resultLogin.LastName,
                        email: resultLogin.Email,
                        admin: resultLogin.Admin || false
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 50000
                    })
                    payload.token = token;
                    res.send(payload)
                } else {
                    res.sendStatus(403)
                }
            })
    } else {
        res.sendStatus(403)
    }
}


// validate auth users 
const ValidateUser = (req, res, next) => {
    const bearer = req.headers['authorization']
    if (bearer && bearer.split(' ')[1] !== 'null') {
        let user = jwt.verify(bearer.split(' ')[1], process.env.SECRET_KEY)
        if (user) {
            req.user = user;
            next()
        } else {
            res.sendStatus(403)
        }

    } else {
        res.sendStatus(403)
    }
}


// management users
const GetListUsers = (req, res) => {
    userLogic.GetListUsers()
        .then(list => res.send(list))
        .catch(err => res.sendStatus(203))
}

const RemoveUserAndAllData = (req, res) => {
    const {UserId} = req.body;
    if(UserId){
        userLogic.RemoveUserAndAllData(UserId)
            .then(resultRemove => res.sendStatus(200))
            .catch(err => res.sendStatus(500))
    }else{
        res.sendStatus(403)
    }
}

module.exports = {
    GetRegistration,
    Login,
    ValidateUser,
    GetListUsers,
    RemoveUserAndAllData
}
