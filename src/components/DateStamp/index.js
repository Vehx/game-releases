import React from "react";
import PropTypes from "prop-types";
import "./DateStamp.css";

const DateStamp = (props) => {
    return <h4 className="date-stamp">{props.date}</h4>;
};

DateStamp.propTypes = {
    date: PropTypes.string,
};

DateStamp.defaultProps = {
    date: "2077-12-31",
};

export default DateStamp;
