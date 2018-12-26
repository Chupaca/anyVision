'use strict'


const promise = require('bluebird');
const request = promise.promisifyAll(require('request'))
const connection = require("./connectionmongo");
const { baseRead, baseWrite } = connection;
const writer = baseWrite.collection("searches");
const reader = baseRead.collection("searches");
const mongoHelper = require("mongoskin").helper;

const GetBySearch = search_value => {
    return request.getAsync({
        method: 'GET',
        uri: `https://itunes.apple.com/search?term=${search_value.trim().replace(' ', '+')}&limit=25`,
        timeout: 10000,
    })
        .then((response) => {
            if (response.statusCode !== 200) {
                return promise.reject(new Error(response.body));
            }
            else {
                return response.body;
            }
        })
}

const GetTrackById = trackId => {
    return request.getAsync({
        method: 'GET',
        uri: `https://itunes.apple.com/lookup?id=${Number(trackId)}`,
        timeout: 10000,
    })
        .then((response) => {
            if (response.statusCode !== 200) {
                return promise.reject(new Error(response.body));
            }
            else {
                return response.body;
            }
        })
}

const saveSearchedResults = (trackIds, userId) => writer.insertAsync({ UserId: userId, TrackIds: trackIds })

const GetToP10 = userId => {
    return reader.aggregateAsync([
        {
            $match: {
                UserId: userId
            }
        },
        {
            $group: {
                "_id": 0,
                "Tracks": { "$push": "$TrackIds" }
            }
        },
        {
            $project: {
                "Ids": {
                    "$reduce": {
                        "input": "$Tracks",
                        "initialValue": [],
                        "in": { "$concatArrays": ["$$value", "$$this"] }
                    }
                }
            }
        }
    ])
}

const RemoveQueriesByUserId = userId => writer.removeManyAsync({UserId:userId})

module.exports = {
    GetBySearch,
    GetTrackById,
    saveSearchedResults,
    GetToP10,
    RemoveQueriesByUserId
}