'use strict'

const usersRepo = require("../data/users");
const searchRepo = require("../data/search");
const moment = require("moment")

const CreateNewUser = (firstName, lastName, email, pass, admin) => {
    return usersRepo.IsExistsUser(email, pass)
        .then(user => {
            if (!user) {
                const newUser = {
                    FirstName: firstName,
                    LastName: lastName,
                    Email: email,
                    Password: pass,
                    Admin: admin == 'on' ? true : false,
                    CreatedDate: moment().utc().toDate(),
                }
                return usersRepo.CreateNewUser(newUser)
            } else {
                return false
            }
        })
}

const Login = (email, pass) => usersRepo.IsExistsUser(email, pass)

const GetListUsers = () => usersRepo.GetListUsers();

const RemoveUserAndAllData = userId => {
    return usersRepo.RemoveUserById(userId)
        .then(() => {
            return searchRepo.RemoveQueriesByUserId(userId)
        })
}

module.exports = {
    CreateNewUser,
    Login,
    GetListUsers,
    RemoveUserAndAllData
}