import React from "react";

import { Link } from 'react-router'

var Navigation = React.createClass({
    render:function(){
        return (
            <div id="nav" className="pure-u">
              <a href="#" className="nav-menu-button">Menu</a>

              <div className="nav-inner">
                  <div className="pure-menu">
                      <ul className="pure-menu-list">
                          <li className="pure-menu-heading">Labels</li>
                          <li className="pure-menu-item"><Link className="pure-menu-link" to="/applications">Applications</Link></li>
                          <li className="pure-menu-item"><Link className="pure-menu-link" to="/accounts">Comptes</Link></li>

                          <li className="pure-menu-heading">Tools</li>
                          <li className="pure-menu-item"><a href="#" className="pure-menu-link">Pem</a></li>
                          <li className="pure-menu-heading"></li>
                          <li className="pure-menu-item"><a href="#" className="pure-menu-link">Refresh</a></li>
                      </ul>
                  </div>
              </div>
          </div>
        )
    }
});

module.exports = Navigation;
