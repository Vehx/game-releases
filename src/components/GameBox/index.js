import React from "react";
import PropTypes from "prop-types";
import "./game-box.css";
import Title from "../Title";
import DateStamp from "../DateStamp";

const GameBox = (props) => {
    return (
        <div className="game-box">
            <Title> {props.name} </Title>
            <DateStamp> {props.releaseDate} </DateStamp>
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
