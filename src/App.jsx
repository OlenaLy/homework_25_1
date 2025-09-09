import React, { Component } from "react"; 
import "./App.css";
import Plan from "./Plan.jsx";

const planList = ['😾', '😺', '😹', '😻', '🙀']

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: {},
            winner: null,
        };
    }

    componentDidMount(){
        const saveResults = localStorage.getItem('results');
        if (saveResults) {
            this.setState({ results: JSON.parse(saveResults) });
        }
    }
    //клік по смайлу
    onClickSmile = (emoji) => {
        this.setState((prevState) =>{
            const updateResults = {
                ...prevState.results,
                [emoji]: (prevState.results[emoji] || 0) +1,
            };
            //збереження у LS
            localStorage.setItem("results", JSON.stringify(updateResults));

            return { results: updateResults };
        });
    };

//показати переможця    
    onClickRez = () => {
        const { results } = this.state;
        if (Object.keys(results).length === 0) {
            alert ("Немає результатів голосування");
            return;
        }
        let maxVotes = 0;
        let topSmile = null;
        for (let emoji in results) {
            if (results [emoji] > maxVotes) {
                maxVotes = results[emoji];
                topSmile = emoji;
            } else if (results [emoji] == maxVotes) {
                maxVotes = 'Неможу визначитися, спробуй ще';
                topSmile = null;
            }
        }

        this.setState({
            winner: { emoji: topSmile, votes: maxVotes},
        });
    };
//очистити результати
    onClickClean = () => {
        this.setState({
            results: {},
            winner: null,
        });
    };

  render () {
    const { results, winner } = this.state;
    return (
        <div className="container">
        <h1 className="title">Голосування за найкращий смайлик</h1>
        <Plan 
            list={planList} 
            results={results} 
            onClickSmile={this.onClickSmile} 
            />

        <main>
            <button className="btn" onClick={this.onClickRez}>Show Results</button>
            <h2>Результати голосування</h2>
            {winner ? (
                <div className="resultsBlock">
                    <h3>Переможець: </h3>
                    <div className="resultSmile">{winner.emoji}</div>
                    <p>Кількість голосів: {winner.votes}</p>
                </div>
            ) : (
                <p>Ще немає переможця</p>
            )}
            <button className="btn" onClick={this.onClickClean}>Clean Results</button>
        </main>
    </div> 
    );
    }
}