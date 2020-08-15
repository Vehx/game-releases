import React from "react";
import PropTypes from "prop-types";
import "./GameBox.css";
import Title from "../Title";
import DateStamp from "../DateStamp";

const GameBox = (props) => {
    return (
        <div className="game-box">
            <Title title={props.name} />
            <DateStamp date={props.releaseDate} />
        </div>
    );
};

GameBox.propTypes = {
    name: PropTypes.string,
    releaseDate: PropTypes.string,
};

GameBox.defaultProps = {
    name: "Game 404",
    releaseDate: "TBA",
};

export default GameBox;
