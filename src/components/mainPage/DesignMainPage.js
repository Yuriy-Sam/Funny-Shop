import React from 'react';
import { Link } from "react-router-dom";
import './designMainPage.scss';

const DesignMainPage = ({switchTheme}) => {
  return (
    <div className="designMainPage">

        <div className="designMainPage__bg">
            <div className="designMainPage__overflow"></div>
            <img  className="designMainPage__bg__fullscreen" src="https://media.istockphoto.com/vectors/white-brick-wall-textured-background-vector-id1094376824?b=1&k=20&m=1094376824&s=612x612&w=0&h=JXTKiJ-2fGn580Ggbmpm2rOj928_uoFJaC4UgffnJhU=" alt="" />

        </div>
    </div>

  );
}

export default DesignMainPage;
