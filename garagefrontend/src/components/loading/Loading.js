import React from "react";

import "./Loading.css";

class Loading extends React.Component {
  render() {
    return (
      <div id="loading-page">
        <div id="loading"> </div>
        <h1>Loading...</h1>
      </div>
    );
  }
}

export default Loading;
