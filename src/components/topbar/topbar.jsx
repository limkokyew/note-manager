import React from "react";
import { Link } from "react-router-dom";

import ArrowBackIcon from "../../resources/icons/arrow_back.svg";
import ArrowForwardIcon from "../../resources/icons/arrow_forward.svg";
import HomeIcon from "../../resources/icons/home.svg";
import SettingsIcon from "../../resources/icons/settings.svg";
import "./topbar.css";

export class Topbar extends React.Component {
  render() {
    return (
      <div className="topbar-main">
        <div className="topbar-wrapper">
          <button className="topbar-button">
            <ArrowBackIcon className="topbar-svg" fill="#171717" width={16} height={16} />
          </button>
          <button className="topbar-button">
            <ArrowForwardIcon className="topbar-svg" fill="#171717" width={16} height={16} />
          </button>
          <Link id="topbar-home-button" className="topbar-button" to="/">
            <HomeIcon className="topbar-svg" fill="#171717" width={24} height={24} />
          </Link>
          <input className="topbar-search" type="text" placeholder="Search ..."></input>
          <button id="topbar-settings-button" className="topbar-button">
            <SettingsIcon className="topbar-svg" fill="#171717" width={24} height={24} />
          </button>
        </div>
      </div>
    );
  }
}
