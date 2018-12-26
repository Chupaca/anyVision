'use strict'

const connection = require("./connectionmongo");
const { baseRead, baseWrite } = connection;
const writer = baseWrite.collection("users");
const reader = baseRead.collection("users");
const mongoHelper = require("mongoskin").helper;


const IsExistsUser = (email, pass) => {
    let condition = {
        Email: { $regex: "\\b(" + email + ")\\b", $options: "i" }
    }
    if (pass) {
        condition.Password = pass
    }

    return reader.findOneAsync(condition, { Password: 0 });
}

const CreateNewUser = newUser => writer.insertAsync(newUser);

const GetListUsers = () => reader.find().sort({CreatedDate:-1}).toArrayAsync()

const RemoveUserById = userId => writer.removeAsync({_id:mongoHelper.toObjectID(userId)});

module.exports = {
    IsExistsUser,
    CreateNewUser,
    GetListUsers,
    RemoveUserById
}