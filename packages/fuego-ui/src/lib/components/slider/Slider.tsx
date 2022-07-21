import React from "react";
import styled from "styled-components";

const SliderCmp = ({ className }: any) => {
  return (
    <div className={className}>
      <div className="rail"></div>
      <div className="track"></div>
      <div className="thumb">
        <input type="range" />
      </div>
    </div>
  );
};

const Slider = styled(SliderCmp)`
  border-radius: 12px;
  box-sizing: content-box;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  color: rgb(144, 202, 249);
  -webkit-tap-highlight-color: transparent;
  height: 4px;
  width: 100%;
  padding: 13px 0px;

  .thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0px;
    background-color: currentcolor;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .track {
    display: block;
    position: absolute;
    border-radius: inherit;
    border: 1px solid currentColor;
    background-color: currentColor;
    transition: left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    height: inherit;
    top: 50%;
    transform: translateY(-50%);
  }

  .rail {
    display: block;
    position: absolute;
    border-radius: inherit;
    background-color: currentColor;
    opacity: 0.38;
    width: 100%;
    height: inherit;
    top: 50%;
    transform: translateY(-50%);
  }
  input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 100%;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 100%;
    direction: ltr;
  }
`;

export default Slider;
