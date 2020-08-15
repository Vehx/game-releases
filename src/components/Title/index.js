import React from "react";
import PropTypes from "prop-types";
import "./Title.css";

const Title = (props) => {
    return <h1 className="title">{props.name}</h1>;
};

Title.propTypes = {
    name: PropTypes.string,
};

Title.defaultProps = {
    name: "Game 404",
};

export default Title;
