import React, { Component } from 'react';
import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import { withCustomAudio  } from 'react-soundplayer/addons';
import { PlayButton, Progress, VolumeControl, Timer } from 'react-soundplayer/components';
import 'react-soundplayer/styles/buttons.css';
import 'react-soundplayer/styles/cover.css';
import 'react-soundplayer/styles/icons.css';
import 'react-soundplayer/styles/volume.css';
import 'react-soundplayer/styles/progress.css';

class BackgroundSoundPlayer extends Component {
  render() {
    const { trackTitle, trackName, bgImage, duration, currentTime } = this.props;

    return (
      <AudioContainer bgImage={bgImage}>
        <Dummy/>
          <Titles>
            <TrackTitle>{trackName ? trackName : ''}</TrackTitle>
            <TrackName>{trackTitle ? trackTitle : ''}</TrackName>
          </Titles>
          <AudioControllers>
            <PlayButton {...this.props} />
            <VolumeControl rangeClassName="custom-track-bg" {...this.props} />             
            <Progress
              value={(currentTime / duration) * 100 || 0}
              {...this.props} />
              <Timer duration={duration || 0} currentTime={currentTime}/>
          </AudioControllers>
        
      </AudioContainer>
    );
  }
};

BackgroundSoundPlayer.propTypes = {
  streamUrl: PropTypes.string.isRequired,
  bgImage: PropTypes.string
};

export default withCustomAudio(BackgroundSoundPlayer);

const AudioControllers = styled.div`
  
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 1rem; 
  padding-right: 1rem;
  z-index: 1;  

  .sb-soundplayer-timer {
    font-size: 10px;
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-left: 20px;
  }

  .sb-soundplayer-btn {
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
    font-weight: bold;
    line-height: 1.25;
    margin-top: 1em;
    margin-bottom: .8em;
    border-radius: 3px;
  }

  .sb-soundplayer-play-btn {
    margin-right: 1rem;
  }

  .sb-soundplayer-progress-container {
    flex: 1 1 auto;
    background-color: #000;
    opacity: 0.6;
    border-radius: 3px;
    margin-top: 7px;
  }

  .sb-soundplayer-progress-inner {
    background-color: white;
    border-radius: 3px 0 0 3px;
  }

  .sb-soundplayer-volume {
    display: flex;
    align-items: center;
    margin-right: 1rem;    
  }

   button,
  .button {
    color: white;
    font-size: 180%;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    line-height: 1.125;
    padding: .5em 1rem;
    margin: 0;
    height: auto;
    border: 1px solid transparent;
    -webkit-appearance: none;
  }
  
  ::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  
  .button:hover {
    text-decoration: none;
  }
  
  
  .custom-track-bg::-webkit-slider-runnable-track {
    background-color: rgba(0, 0, 0, .25);
  }
  
  .custom-track-bg::-moz-range-track {
    background-color: rgba(0, 0, 0, .25);
  }

  button:focus {
    outline: none;
    border-color: rgba(#000,.125);
    box-shadow: 0 0 0 3px rgba(#000,.25);
  }
`

const AudioContainer = styled.div`
  position: relative;
  padding-top: 1rem; 
  padding-bottom: 1rem;
  color: white;
  background-size: cover;
  background-position: top;
  border-radius: 3px;
  background-image: url(${p => p.bgImage});
`

const Dummy = styled.div`
  position: absolute;
  background-color: black;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: .5;
`;

const Titles = styled.div`
  position: relative;
  text-align: center;
  padding-top: 4rem; 
  padding-bottom: 4rem;
  z-index: 1;
`;

const TrackTitle = styled.h4`
  white-space: nowrap;
  text-transform: capitalize;
  margin-bottom: 0px;
`;

const TrackName = styled.h2`
  white-space: nowrap;
  text-transform: capitalize;
  margin: 0px;
  font-size: 30px;
`;