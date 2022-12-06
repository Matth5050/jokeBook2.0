import React from "react";
import { Link} from "react-router-dom";

function LogHeader() {

  const brand = {
    textDecoration: "none"
  }


  return (
    <React.Fragment>
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
          <p className="navbar-brand title"><Link to="/" className="title" style={brand}>JokeBook</Link></p>
            <div class="navbar-nav mb-3">
              <a href="https://chrome.google.com/webstore/detail/jokebook/nlhdhpfhfopniaajbgfichnlpbnndhfk"><button className=" border border-0 nav-item btn btn-outline-primary bodyText">Get the Chrome extension here!</button></a>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
}

export default LogHeader;
