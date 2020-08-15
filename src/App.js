import React from "react";
import "./App.css";
import GameBox from "./components/GameBox";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Next 5 games to be released :</p>
                <GameBox />
            </header>
        </div>
    );
}

export default App;
