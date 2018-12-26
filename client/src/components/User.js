import React, { Component } from 'react'
import moment from 'moment'
import jwt_decode from 'jwt-decode'
import { getListUsers, removeUser } from './UserFunctions'

class User extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            admin: '',
            usersList: [],
            message: ''
        }
    }

    componentDidMount() {
        const token = sessionStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.firstName,
            last_name: decoded.lastName,
            email: decoded.email,
            admin: decoded.admin
        })
    }
    getListUsers() {
        getListUsers().then(usersList => {
            console.log(usersList)
            if (usersList.message) {
                this.setState({ message: "Not login", usersList: [] })
            } else {
                this.setState(usersList)
            }
        })
    }
    removeUser(userId) {
        removeUser(userId).then(resultRemove => {
            if (resultRemove) {
                let users = this.state.usersList
                this.setState({
                    usersList: (users.filter(user => user._id !== userId))
                })
                this.setState({ message: "Removed!" })

            } else {
                this.setState({ message: "Something wrong!" })
            }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE {this.state.admin ? <span>( admin )</span> : ''}</h1>
                    </div>
                    <table className="table col-md-2 mx-auto">
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{this.state.first_name}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{this.state.last_name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>

                        </tbody>
                    </table>
                    {
                        this.state.admin ?
                            <button type="button" className="btn btn-primary" onClick={this.getListUsers.bind(this)}>
                                get users list
                                        </button> : ''
                    }
                </div>
                <div className="container">
                    <table className="table col-md-2 mx-auto mt-10">
                        <tbody>
                            {
                                this.state.usersList.map(user =>
                                    <tr key={user._id}>
                                        <td>{moment(user.CreatedDate).format("DD/MM/YY")}</td>
                                        <td>{user.FirstName}</td>
                                        <td>{user.LastName}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.Admin ? 'admin' : 'client'}</td>
                                        <td>
                                            <i className="fas fa-user-times text-danger" onClick={this.removeUser.bind(this, user._id)}></i>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}

export default User