'use strict'

const searchLogic = require("../../logic/search");

const Search = (req, res) => {
    const { search_value } = req.query;
    searchLogic.GetBySearch(search_value, req.user._id)
        .then(([resultInsert, resultSearch]) => {
            res.json(resultSearch)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
}

const GetTrack = (req, res) => {
    const { id } = req.params;
    searchLogic.GetTrackById(id)
        .then(resultSearch => {
            res.json(resultSearch)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
}


const GetToP10 = (req, res) => {
    searchLogic.GetToP10(req.user._id)
        .then(resultSearch => {
            res.json(resultSearch)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
}

module.exports = {
    Search,
    GetTrack,
    GetToP10
}