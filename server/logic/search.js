'use strict'


const searchAPI = require("../data/search");


const GetBySearch = (searchValue, userId) => {
    return searchAPI.GetBySearch(searchValue)
        .then(resultsSearch => {
            if (resultsSearch) {
                const trackList = JSON.parse(resultsSearch).results
                return Promise.all([searchAPI.saveSearchedResults(trackList.map(track => track.trackId), userId), resultsSearch])
            } else {
                return null
            }
        })
}

const GetTrackById = id => searchAPI.GetTrackById(id);

const GetToP10 = userId => {
    return searchAPI.GetToP10(userId)
        .then(result => {
            return Promise.all(get10IdsByCount(result[0].Ids).map(id => searchAPI.GetTrackById(id)))
        })
}

// count and sort tracks for top
function get10IdsByCount(Ids) {
    let ids = Ids.reduce((prev, curr) => {
        if (curr != "null" && !prev[curr]) {
            prev[curr] = 1
        } else if (curr) {
            prev[curr] += 1
        }
        return prev;
    }, {})

    let sortable = []
    for (var id in ids) {
        sortable.push([id, ids[id]]);
    }

    sortable.sort((a, b) => {
        return b[1] - a[1];
    });
    return sortable.slice(0, 10).map(arrId => arrId[0])
}
module.exports = {
    GetBySearch,
    GetTrackById,
    GetToP10
}