import React, { Component } from 'react'
// import jwt_decode from 'jwt-decode'
import { search, getTrack, getTop10 } from './UserFunctions'

class Search extends Component {
    constructor() {
        super()
        this.state = {
            searchResults: [],
            search_value: '',
            message : ''
        }
       
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        const searchValue = this.state.search_value
        search(searchValue).then(({ resultCount, results }) => {
            if (resultCount === 'not login') {
                this.setState({message : 'Not Login', searchResults: []})
            } else if (resultCount > 0) {
                this.setState({ searchResults: results, message:'' })
            } else {
                this.setState({
                    message: 'not exists',
                    searchResults: []
                });
            }

            return;
        })
    }
    getItem(item) {
        getTrack(item).then(({ resultCount, results }) => {
            if (resultCount && resultCount > 0) {
                this.props.history.push(`/previewinfo`, results[0])
            } else {
                return;
            }
        })
    }
    getTop() {
        getTop10().then(({ resultCount, results }) => {
            if (resultCount === 'not login') {
                this.setState({message : 'Not Login', searchResults: []})
            } else if (resultCount > 0) {
                this.setState({ searchResults: results, message:'' })
            } else {
                this.setState({
                    message: 'not exists',
                    searchResults: []
                });
            }
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">itunes search</h1>
                            <div className="form-group">
                                <input type="text"
                                    className="form-control"
                                    name="search_value"
                                    placeholder="Enter search value"
                                    value={this.state.search_value}
                                    onChange={this.onChange} />
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                search
                            </button>
                        </form>
                        <div className="text-center mt-3">
                        <button type="button" className="btn btn-success" onClick={this.getTop.bind(this)}>
                                top 10
                        </button>
                        </div>
                    </div>
                </div>
                <div className="row" >
                    <div className="d-flex align-content-stretch flex-wrap mt-5 p-4 text-center">
                        {
                            this.state.searchResults.map(item =>
                                <div className='p-2 bd-highlight text-center w-23 p-4' key={item.trackId} onClick={this.getItem.bind(this, item.trackId)}>
                                    <img className="rounded" src={item.artworkUrl100} alt='' />
                                    <div className='text-center desc_title'><span>{item.trackName}</span><br /><span>{item.artistName}</span></div></div>)
                        }
                        {   this.state.message !== '' ?
                            <div className="alert alert-warning">
                                 <strong>Warning!</strong> {this.state.message}
                            </div>
                            :''
                        }
                    </div>
                </div>
            </div>

        )
    }
}

export default Search