import {Component} from 'react'
import FruitTab from '../fruittab'
import ImageList from '../ImageList'

import './index.css'

class MemoryGame extends Component {
  state = {
    activeTab: 'FRUIT',
    puzzleImage: {},
    score: 0,
    timer: 60,
  }

  componentDidMount() {
    const {imagesList} = this.props
    const newPuzzleImage = {
      imageUrl: imagesList[0].imageUrl,
      id: imagesList[0].id,
    }
    this.setState({puzzleImage: newPuzzleImage})
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick = () => {
    const {timer} = this.state
    if (timer === 0) return clearInterval(this.timerID)
    const newTimer = timer - 1
    this.setState({timer: newTimer})
  }

  changeTab = tabId => {
    this.setState({activeTab: tabId})
  }

  getScore = id => {
    const {puzzleImage, score} = this.state
    if (puzzleImage.id !== id) {
      clearInterval(this.timerID)
      this.setState({timer: 0})
      return
    }
    const newScore = score + 1
    this.setState({score: newScore})
    this.setPuzzleImage()
  }

  setPuzzleImage = () => {
    const {imagesList} = this.props
    const randomNumber = Math.floor(Math.random() * 30)
    const newPuzzleImage = {
      imageUrl: imagesList[randomNumber].imageUrl,
      id: imagesList[randomNumber].id,
    }
    this.setState({puzzleImage: newPuzzleImage})
  }

  getImages = (imagesList, tabId) => {
    const imageList = imagesList.filter(image => image.category === tabId)
    return imageList
  }

  resetTimer = () => {
    this.setState({
      timer: 60,
      score: 0,
    })
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  render() {
    const {imagesList, tabsList} = this.props
    const {activeTab, puzzleImage, score, timer} = this.state
    const {imageUrl} = puzzleImage
    const images = this.getImages(imagesList, activeTab)
    console.log(imagesList, tabsList)
    return (
      <div className="gamepage">
        <nav className="game-score">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
          />
          <ul>
            <li>
              <p>Score: </p>
            </li>
            <li>
              <p>{score}</p>
            </li>
            <li>
              <img
                alt="timer"
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              />
            </li>
            <li>
              <p>{timer} Sec</p>
            </li>
          </ul>
        </nav>
        <main className="game-board">
          {timer === 0 ? (
            <div className="game-over">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                alt="trophy"
              />
              <div className="score-retry">
                <p>{score}</p>
                <p>YOUR SCORE</p>
                <button onClick={this.resetTimer}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                    alt="reset"
                  />
                  PLAY AGAIN
                </button>
              </div>
            </div>
          ) : (
            <>
              <img className="puzzle-image" src={imageUrl} alt="match" />
              <ul className="fruit-list">
                {tabsList.map(tab => (
                  <FruitTab
                    tab={tab}
                    key={tab.tabId}
                    activeTab={activeTab}
                    changeTab={this.changeTab}
                  />
                ))}
              </ul>
              <ul className="images">
                {images.map(image => (
                  <ImageList
                    key={image.id}
                    image={image}
                    score={this.getScore}
                  />
                ))}
              </ul>
            </>
          )}
        </main>
      </div>
    )
  }
}

export default MemoryGame
