import React, { Component } from "react";
import lighthouse from "../../images/lighthouse.jpg";
import "../styles/PageNotFound.css";
import NavbarContainerView from "./NavbarContainerView";

class PageNotFoundView extends Component {
  render() {
    return (
      <div>
        <NavbarContainerView />
        <div>
          <div
            className="center card-body text-center"
            style={{ width: "35rem" }}
          >
            <h1 className="mt-4 card-title mb-4 notFound">404</h1>
            <h3 className="card-text mb-3">
              Sorry, we coundn't find the page...
            </h3>
            <img
              className="card-img-bottom"
              src={lighthouse}
              alt="404 light house"
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default PageNotFoundView;
