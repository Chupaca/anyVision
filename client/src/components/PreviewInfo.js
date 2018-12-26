import React, { Component } from 'react'
import ReactPlayer from 'react-player'

class Profile extends Component {
    constructor(props) {
        super()
        this.state = {
            previewUrl: props.location.state.previewUrl,
            img: props.location.state.artworkUrl100,
            artistName: props.location.state.artistName,
            collectionName: props.location.state.collectionName,
            country: props.location.state.country,
            type: props.location.state.primaryGenreName,
            trackName: props.location.state.trackName
           
        }
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <img className="w-50 rounded" src={this.state.img} alt={this.state.trackName}/>
                        <h2 className="text-left">{this.state.artistName}</h2>
                        <h3 className="text-left">{this.state.collectionName}</h3>
                        <h4 className="text-left">{this.state.country}</h4>
                        <h5 className="text-left">{this.state.type}</h5>
                        <div className="border border-warning rounded">
                            <ReactPlayer url={this.state.previewUrl} playing controls />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Profile