import React, { Component } from 'react';
import mediaqueries from "@styles/media";
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
    const { trackTitle, trackName,trackImage, bgColor, duration, currentTime } = this.props;

    return (
      <AudioContainer bgColor={bgColor}>
        <ImageContainer> <TrackImage src={trackImage} /> </ImageContainer>  
        <AudioSection>
          <Titles>
              <TrackTitle>{trackName ? trackName : ''}</TrackTitle>
              <TrackName>{trackTitle ? trackTitle : ''}</TrackName>
          </Titles>
          <AudioControllers bgColor={bgColor}>
              <PlayButton {...this.props} />            
              <Progress
                value={(currentTime / duration) * 100 || 0}
                {...this.props} />
                <Timer duration={duration || 0} currentTime={currentTime}/>
          </AudioControllers>
        </AudioSection>
      </AudioContainer>
    );
  }
};

BackgroundSoundPlayer.propTypes = {
  streamUrl: PropTypes.string.isRequired,
};

export default withCustomAudio(BackgroundSoundPlayer);

const AudioSection = styled.div`
  width: 90%;
  margin: auto;
`

const ImageContainer = styled.div`
  position: relative;
  width: 22rem;  
  margin: auto;

  img {
    margin: 0px;
  }
  
  ${mediaqueries.phablet`
    height: auto;
    width: 98%;
    margin-bottom: 2rem;
  `}
`
const TrackImage = styled.img`  
  max-width: 22rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const AudioControllers = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 1rem; 
  padding-right: 1rem;

  .sb-soundplayer-btn {        
    font-size: 1rem;
    color:  ${p => p.bgColor};
  }

  .sb-soundplayer-play-btn {
    margin-right: 1rem;
    background-color: white;
    border-radius: 50%;
  }

  .sb-soundplayer-progress-container {
    background-color: rgba(255, 255, 255, 0.2);;
    border-radius: 3px;
    height: 5px;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .sb-soundplayer-progress-inner {
    background-color: white;
    border-radius: 3px 0 0 3px;  }

  .sb-soundplayer-timer {
    width: 110px;
    font-size: 12px;

  }


  button,
  .button {
    transition: all .3s ease-in-out;
  }

  button:hover {
    transform: scale(1.2);
  }

  `

const AudioContainer = styled.div`
  display: flex;
  color: white;
  position: relative;
  border-radius: 10px;
  background-color: ${p => p.bgColor};
  padding: 1.5rem;
  
  ${mediaqueries.phablet`
  display: block;
  `}
`

const Titles = styled.div`  
  text-align: center;
`;

const TrackTitle = styled.div`
  font-size: 2rem;
  
  ${mediaqueries.phablet`
    font-size: 1.5rem;
  `}
`;

const TrackName = styled.div`
  font-size: 3.8rem;
  font-weight: 600;
  
  ${mediaqueries.phablet`
    font-size: 2rem;
  `}

`;