import React, {Component} from 'react';
import Search from './search';
import Artist from './artist';
import Tracks from './tracks';

const API_ADRESS = 'https://spotify-api-wrapper.appspot.com';

class App extends Component {
    state = {  artist: null, tracks: []};

   componentDidMount(){
       this.searchArtist('metallica');
   }
    searchArtist = artistQuery => {
        fetch(`${API_ADRESS}/artist/${artistQuery}`)
        .then(response => response.json())
        .then(json => {

            if(json.artists.total > 0){
                const artist = json.artists.items[0];

                this.setState({artist});

                fetch(`${API_ADRESS}/artist/${artist.id}/top-tracks`)
                .then(response => response.json())
                .then(json => this.setState({tracks: json.tracks}))
                .catch(error=> alert(error.message));

            }
        })
        .catch(error=> alert(error.message));
    }

    render(){
        console.log('this.state', this.state);
        return(
            <div>
                <h2>Melek's Music Box</h2>
                <Search searchArtist={this.searchArtist} ></Search>
                <Artist artist={this.state.artist}></Artist>
                <Tracks tracks={this.state.tracks}></Tracks>
            </div>

        );
    }
}

export default App;