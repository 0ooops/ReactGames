import React, { PureComponent } from 'react';
import Header from './components/header/Header';
import Card from './components/card/Card';
import GameOver from './components/card/GameOver';
import './styles/main.css';

class App extends PureComponent {
  // Properties
  state = { 
    isFlipped: Array(16).fill(false),
    shuffledCard: App.GetCardsWithDuplication().sort(() => Math.random()),
    clickCount: 0,
    prevCardId: -1
  };

  // Generate a list of numbers from 0-7 each appearing twice
  static GetCardsWithDuplication = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7].reduce((preElem, curElem) => {
      return preElem.concat([curElem, curElem])
    },[]);
  };

  // Handlers
  handleClick = event => {
    event.preventDefault();
    const cardId = event.target.id;
    const newIsFlipped = this.state.isFlipped.slice();

    // if clickCount is 0, initial click, update state
    if (this.state.clickCount === 0) {
      newIsFlipped[cardId] = true;
      this.setState({
        isFlipped: newIsFlipped,
        clickCount: 1,
        prevSelectedCardId: cardId
      });
    }
    // if clickCount is 1, compare with previous cards and update states
    else if (this.state.clickCount === 1) {
      var newShuffledCards = this.state.shuffledCard.slice();
      // if matches, hide both cards, update states
      if (this.state.isFlipped[cardId] === this.state.isFlipped[this.state.prevCardId]) {
        // hide cards
        newShuffledCards[cardId] = -1;
        newShuffledCards[this.state.prevCardId] = -1;
        setTimeout(() => {
          this.setState({
            shuffledCard: newShuffledCards,
            prevCardId: -1,
            clickCount: 0
          })
        }, 1000);
      }
      // if not matches, flip back both cards, update states
      else {
        newIsFlipped[this.state.prevCardId] = false;
        newIsFlipped[cardId] = false;
        setTimeout(() => {
          this.setState(() => ({ 
            isFlipped: newIsFlipped,
            preCardId: -1,
            clickCount: 0 
          }));
        }, 1000);
      }
    }
  };

  // Restart game and set all properties back to initial state
  restartGame = () => {
    this.setState({
      isFlipped: Array(16).fill(false),
      shuffledCard: App.GetCardsWithDuplication().sort(() => Math.random()),
      clickCount: 0,
      prevSelectedCard: -1,
      prevCardId: -1    });
  };

  isGameOver = () => {
    return this.state.isFlipped.every(elem => elem !== false);
  };

  render() {
    return (
     <div>
       <Header restartGame={this.restartGame} />
       { this.isGameOver() ? <GameOver restartGame={this.restartGame} /> :
       <div className="grid-container">
          {
            this.state.shuffledCard.map((cardNumber, index) => 
              <Card
                key={index}
                isFlipped={this.state.isFlipped[index]} 
                buttonId={index} 
                cardNumber={cardNumber} 
                handleClick={this.handleClick}     
              />
            )
          }
        </div>
       }
     </div>
    );
  }
}

export default App;