import React from 'react';
import lighthouse from "../styles/images/lighthouse.jpg"
import "../styles/NotFoundPage.css";
import NavbarContainerView from '../Dashboard/NavbarContainerView';

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
        </div>
    )
}

export default PageNotFound