import React, { Component } from 'react';
import './Mouse.scss';

class Mouse extends Component {
  componentDidMount() {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("click", this.onMouseClick);
    const link = document.querySelectorAll(".linkHover");
    link.forEach(link => {
      link.addEventListener("mouseover", this.onMouseHover);
      link.addEventListener("mouseout", this.onMouseOut);
    })
  }
  componentWillUnmount() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("click", this.onMouseClick);
    const link = document.body.querySelectorAll(".linkHover");
    link.forEach(link => {
      link.removeEventListener("mouseover", this.onMouseHover);
      link.removeEventListener("mouseout", this.onMouseOut);
    })
  }
  onMouseMove = (e) => {
    const smallCursor = document.getElementsByClassName("smallCursor")[0];
    const bigCursor = document.getElementsByClassName("bigCursor")[0];
    smallCursor.setAttribute("style",`top: ${ e.clientY - 5 }px; left: ${ e.clientX - 5 }px;`)
    bigCursor.setAttribute("style",`top: ${ e.clientY - 12 }px; left: ${ e.clientX - 12 }px;`)
    if (e.clientX <= 10 || e.clientX >= window.innerWidth - 10 
      || e.clientY <= 10 || e.clientY >= window.innerHeight - 10) {
      smallCursor.style.transform = "scale(0)";
      bigCursor.style.transform = "scale(0)";
    }
  }
  onMouseClick = () => {
    const bigCursor = document.getElementsByClassName("bigCursor")[0];
    bigCursor.classList.add("cursorClick");
    setTimeout(() => {
      bigCursor.classList.remove("cursorHover");
      bigCursor.classList.remove("cursorClick");
    }, 700)
  }
  onMouseHover = () => {
    const bigCursor = document.getElementsByClassName("bigCursor")[0];
    bigCursor.classList.add("cursorHover");
  }
  onMouseOut = () => {
    const bigCursor = document.getElementsByClassName("bigCursor")[0];
    bigCursor.classList.remove("cursorHover");
  }
  render() {
    return (
      <div className="Mouse">
        <div id="bigCursor" className="bigCursor"></div>
        <div className="smallCursor"></div>
      </div>
    );
  }
}

export default Mouse;