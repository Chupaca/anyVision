import axios from 'axios'

export const register = newUser => {
    return axios
        .post('users/registration', {
            firstName: newUser.first_name,
            lastName: newUser.last_name,
            email: newUser.email,
            pass: newUser.password,
            admin: newUser.admin
        })
        .then(res => {
            console.log('Registered!')
            return true
        })
        .catch(err => {
            console.log(err)
            return false
        })
}

export const login = user => {
    return axios
        .post('users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {

            sessionStorage.setItem('usertoken', res.data.token)
            sessionStorage.setItem('firstName', res.data.firstName)
            return res.data.token
        })
        .catch(err => {
            console.log(err)
            return ''
        })
}


export const search = searchValue => {
    return axios
        .get('search?search_value=' + searchValue, { headers: { "Authorization": `Bearer ${sessionStorage.getItem('usertoken')}` } })
        .then(res => {
            try {
                if (res === null) {
                    return {}
                }
                let resultsSearched = JSON.parse(res.data)
                return resultsSearched
            }
            catch (err) {
                return {}
            }
        })
        .catch(err => {
            return { resultCount: 'not login' }
        })
}

export const getTrack = item => {
    return axios
        .get('search/track/' + item, { headers: { "Authorization": `Bearer ${sessionStorage.getItem('usertoken')}` } })
        .then(res => {
            try {
                let resultsSearched = JSON.parse(res.data)
                return resultsSearched
            }
            catch (err) {
                return {}
            }
        })
        .catch(err => {
            return { resultCount: 'not login' }
        })
}

export const getTop10 = () => {
    return axios
        .get('search/top', { headers: { "Authorization": `Bearer ${sessionStorage.getItem('usertoken')}` } })
        .then(res => {
            try {
                console.log(res)
                if (!res.data || !res.data.length) {
                    return {}
                }
                let resultsSearched = res.data.map(track => JSON.parse(track))
                resultsSearched = resultsSearched.reduce((arr, track) => { arr.push(track.results[0]); return arr; }, [])
                return { resultCount: 10, results: resultsSearched }
            }
            catch (err) {
                return {}
            }
        })
        .catch(err => {
            return { resultCount: 'not login' }
        })
}


export const getListUsers = () => {
    return axios
        .get('users/list', { headers: { "Authorization": `Bearer ${sessionStorage.getItem('usertoken')}` } })
        .then(usersList => {
            return { usersList: usersList.data }
        })
        .catch(err => {
            return { message: true }
        })
}

export const removeUser = (userId) => {
    return axios
        .post('users/remove', { UserId: userId }, { headers: { "Authorization": `Bearer ${sessionStorage.getItem('usertoken')}` } })
        .then(usersList => {
            return true
        })
        .catch(err => {
            return false
        })
}

