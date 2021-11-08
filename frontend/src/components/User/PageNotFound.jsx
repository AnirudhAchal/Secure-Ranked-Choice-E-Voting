import React from "react";
import lighthouse from "../styles/images/lighthouse.jpg";
import "../styles/NotFoundPage.css";
import NavbarContainerView from "../Dashboard/NavbarContainerView";

<<<<<<< HEAD:frontend/src/components/User/PageNotFound.jsx
function PageNotFound() {
    return (
        <div>
             <NavbarContainerView />
             <div>
                <div class="card">
                    <div className="center card-body text-center" style={{width:"35rem"}}>
                        <h1 className="mt-4 card-title mb-4 notFound">404</h1>
                        <h3 className="card-text mb-3">Sorry, we coundn't find the page...</h3>
                        <img className="card-img-bottom" src={lighthouse} alt="404 light house"></img>
                        <p>But we are here to help- maybe you want to go to this page</p>
                    </div>
                </div>
            </div>
=======
function NotFoundPageView() {
  return (
    <div>
      <NavbarContainerView />
      <div>
        <div class="card">
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
            <p>But we are here to help- maybe you want to go to this page</p>
          </div>
>>>>>>> 68cd15d75ec982c7da287cbcb13c3b0fb0d3a096:frontend/src/components/User/NotFoundPageView.jsx
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD:frontend/src/components/User/PageNotFound.jsx
export default PageNotFound
=======
export default NotFoundPageView;
>>>>>>> 68cd15d75ec982c7da287cbcb13c3b0fb0d3a096:frontend/src/components/User/NotFoundPageView.jsx
