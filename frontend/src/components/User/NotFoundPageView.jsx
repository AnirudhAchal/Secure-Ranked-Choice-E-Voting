import React, { Component } from "react";
import "../styles/NotFoundPage.css";
import lighthouse from "../../images/lighthouse.jpg";

class NotFoundPageView extends Component {
  render() {
    return (
      <div>
        <div class="center">
          <h1>404</h1>
          <h2>The page you are trying to search for doesn't exist</h2>
          <img src={lighthouse} alt="404 light house"></img>
          <a href="http://www.freepik.com">Designed by Artmonkey / Freepik</a>
        </div>
      </div>
    );
  }
}

export default NotFoundPageView;
