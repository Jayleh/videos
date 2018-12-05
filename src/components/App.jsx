import React, { Component } from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends Component {
  state = { videos: [], selectedVideo: null };

  componentDidMount() {
    this.onTermSubmit('hello');
  }

  onTermSubmit = async term => {
    const response = await youtube.get('/search', {
      params: {
        q: term
      }
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    });
  };

  onVideoSelect = video => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div className='ui container'>
        <div className='ui grid'>
          <div className='ui row'>
            <div className='column'>
              <SearchBar onFormSubmit={this.onTermSubmit} />
            </div>
          </div>
          <div className='ui row'>
            <div className='sixteen wide phone eleven wide computer column'>
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className='sixteen wide phone five wide computer column'>
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
