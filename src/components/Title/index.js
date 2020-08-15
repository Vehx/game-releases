import React from "react";
import PropTypes from "prop-types";
import "./Title.css";

const Title = (props) => {
    return <h1 className="title">{props.title}</h1>;
};

Title.propTypes = {
    title: PropTypes.string,
};

Title.defaultProps = {
    title: "Title",
};

export default Title;
