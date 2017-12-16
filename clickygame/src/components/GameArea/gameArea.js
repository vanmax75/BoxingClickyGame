import React, { Component } from 'react'
import './gameArea.css'
import cats from "./cats.json"

class GameArea extends Component {
	state = {
		score: 0,
		guessed: [],
    message: ""
	}

	handleClick(e) {
		const clicked = e.target.dataset.id
    if (this.state.guessed.indexOf(clicked) > -1) {
      this.setState({
        score: 0,
        guessed: [],
        message: "I'm sorry but YOU LOSE!"
      })
    } else {
      this.setState({
        score: this.state.score + 1,
        guessed: this.state.guessed.concat(clicked),
        message: ""
      })
    }
	}

	render() {
    let catsArray = [].concat(cats)
    catsArray = shuffle(catsArray, [])
		return (
			<div className="game">
        <h2>Score: {this.state.score} <span className="message">{this.state.message}</span></h2>
				<div className="pics">
          { catsArray.map(cat => (
              <Pic 
                handleClick={this.handleClick.bind(this)}
                key={cat.id}
                link={cat.link}
                id={cat.id} />
            )
          )}
        </div>
			</div>
		)
	}

}

const Pic = props => {
	return (
		<div className="pic">
			<img 
				src={props.link || "https://www.royalcanin.com/~/media/Royal-Canin/Product-Categories/cat-adult-landing-hero.ashx"}
				onClick={props.handleClick}
				alt="game image"
				data-id={props.id}
				/>
		</div>
	);
}

function shuffle(arr1, arr2) {
  if (arr1.length < 1) {
    return arr2
  } else {
    let randomIndex = Math.floor(Math.random() * arr1.length)
    let arr = arr1
    console.log(randomIndex)
    arr2.push(arr1[randomIndex])
    arr.splice(randomIndex, 1)
    return shuffle(arr, arr2)
  }
}

export default GameArea