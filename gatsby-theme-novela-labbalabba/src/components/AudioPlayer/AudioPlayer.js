import React, { Component } from 'react';
import mediaqueries from "@styles/media";
import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import { withCustomAudio  } from 'react-soundplayer/addons';
import { PlayButton, Progress, Timer } from 'react-soundplayer/components';
import 'react-soundplayer/styles/buttons.css';
import 'react-soundplayer/styles/cover.css';
import 'react-soundplayer/styles/icons.css';
import 'react-soundplayer/styles/volume.css';
import 'react-soundplayer/styles/progress.css';

class BackgroundSoundPlayer extends Component {
  render() {
    var { podcastGuest, podcastName, podcastImage, bgColor, duration, currentTime } = this.props;

    bgColor = bgColor ? bgColor : "#141414"

    return (
      <AudioContainer bgColor={bgColor}>
        <ImageContainer> <TrackImage src={podcastImage} /> </ImageContainer>  
        <AudioSection>
          <Titles>
              <TrackTitle>{podcastName ? podcastName : ''}</TrackTitle>
              <TrackName>{podcastGuest ? podcastGuest : ''}</TrackName>
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
  bgColor: PropTypes.string,
  podcastImage: PropTypes.string,
  podcastName: PropTypes.string,
  podcastGuest: PropTypes.string,
};

export default withCustomAudio(BackgroundSoundPlayer);

const AudioSection = styled.div`
  width: 90%;
  margin: auto;
  padding-left: 1rem;
  
  ${mediaqueries.phablet`
    width: 100%;
    padding-left: 0px;
    padding-right: 0px;
`}
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
    width: 11rem;
    font-size: 12px;
    text-align: right;

  }


  button,
  .button {
    transition: all .3s ease-in-out;
  }

  button:hover {
    transform: scale(1.2);
  }

  ${mediaqueries.phablet`
  padding-left: 0.5rem; 
  padding-right: 0.5rem;
  .sb-soundplayer-timer {
    width: 7rem;
  }
  `}

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