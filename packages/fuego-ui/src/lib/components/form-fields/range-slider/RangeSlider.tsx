import React, { useState, useRef, useEffect, useId } from 'react';
import styled from 'styled-components';

const RangeSliderCmp = ({
  className = '',
  label,
  defaultValue = 0,
  labelClassNames = '',
  ...rest
}: any) => {
  const [value, setValue] = useState(defaultValue);
  const sliderParentRef = useRef<any>(null);
  const idprefix = useId();

  const onSlide = (e: any) => rest.onChange && rest.onChange(e);

  const inputHandler = (e: any) => {
    e.target.parentNode.style.setProperty('--value', e.target.value);
    e.target.parentNode.style.setProperty(
      '--text-value',
      JSON.stringify(e.target.value)
    );
    setValue(e.target.value);
  };

  useEffect(() => {
    if (
      sliderParentRef &&
      sliderParentRef.current &&
      sliderParentRef.current.style
    ) {
      sliderParentRef.current.style.setProperty('--value', defaultValue);
      sliderParentRef.current.style.setProperty(
        '--text-value',
        JSON.stringify(defaultValue)
      );
    }
  }, []);

  return (
    <div>
      <label className={labelClassNames} htmlFor={`range-slider-${idprefix}`}>
        {label}
      </label>
      <div ref={sliderParentRef} className={`range-slider my-3 ${className}`}>
        <input
          className="w-full"
          type="range"
          name=""
          id={`range-slider-${idprefix}`}
          min="0"
          max="20"
          onChange={onSlide}
          onInput={inputHandler}
          value={value}
        />
        <div className="range-slider__progress"></div>
      </div>
    </div>
  );
};

const RangeSlider = styled(RangeSliderCmp)`
  --min: 0;
  --max: 20;
  // colors
  --primary-color: #47014c;

  // thumb
  --thumb-size: 22px;
  --thumb-color: var(--primary-color);
  --thumb-shadow: 0 0 3px rgba(0, 0, 0, 0.4), 0 0 1px rgba(0, 0, 0, 0.5) inset,
    0 0 0 99px var(--thumb-color) inset;
  --thumb-shadow-active: 0 0 0 calc(var(--thumb-size) / 4) inset
      var(--thumb-color),
    0 0 0 99px var(--primary-color) inset, 0 0 3px rgba(0, 0, 0, 0.4);
  --thumb-shadow-hover: var(--thumb-shadow);

  // progress
  --progress-radius: 20px;
  --progress-color: gray;
  --progress-background: #979797;
  --progress-radius: 20px;

  // track
  --track-height: calc(var(--thumb-size) / 3);

  --value-offset-y: 5px;
  --value-offset-y: var(--ticks-gap);
  --value-active-color: white;
  --value-background: transparent;
  --value-background-hover: var(--primary-color);
  --value-font: 700 12px/1 Arial;
  --fill-color: var(--primary-color);

  --min-max-font: 12px Arial;
  --min-max-opacity: 0.5;
  --min-max-x-offset: 10%;

  // ⚠️ BELOW VARIABLES SHOULD NOT BE CHANGED
  --step: 1;
  --ticks-count: Calc(var(--max) - var(--min)) / var(--step);
  --maxTicksAllowed: 30;
  --too-many-ticks: Min(1, Max(var(--ticks-count) - var(--maxTicksAllowed), 0));
  --x-step: Max(
    var(--step),
    var(--too-many-ticks) * (var(--max) - var(--min))
  ); // manipulate the number of steps if too many ticks exist, so there would only be 2
  --tickInterval: 100/ ((var(--max) - var(--min)) / var(--step)) * var(--tickEvery, 1);
  --tickIntervalPerc: calc(
    (100% - var(--thumb-size)) / ((var(--max) - var(--min)) / var(--x-step)) *
      var(--tickEvery, 1)
  );

  --value-a: Clamp(
    var(--min),
    var(--value, 0),
    var(--max)
  ); // default value ("--value" is used in single-range markup)
  --value-b: var(--value, 0); // default value
  --text-value-a: var(--text-value, '');

  --completed-a: calc(
    (var(--value-a) - var(--min)) / (var(--max) - var(--min)) * 100
  );
  --completed-b: calc(
    (var(--value-b) - var(--min)) / (var(--max) - var(--min)) * 100
  );
  --ca: Min(var(--completed-a), var(--completed-b));
  --cb: Max(var(--completed-a), var(--completed-b));

  /* width: clamp(300px, 50vw, 800px); */
  min-width: 200px;
  display: block;
  height: max(var(--track-height), var(--thumb-size));
  background-position-y: var(--flip-y, bottom);
  padding-bottom: var(--flip-y, var(--ticks-gap));
  padding-top: calc(var(--flip-y) * var(--ticks-gap));
  position: relative;
  z-index: 0;

  input {
    -webkit-appearance: none;
    width: 100%;
    height: var(--thumb-size);
    margin: 0;
    position: absolute;
    left: 0;
    top: calc(
      50% - Max(var(--track-height), var(--thumb-size)) / 2 +
        calc(var(--ticks-gap) / 2 * var(--flip-y, -1))
    );
    cursor: grab;
    outline: none;
    background: none;
    overflow: visible;

    &::-webkit-slider-thumb {
      appearance: none;
      height: var(--thumb-size);
      width: var(--thumb-size);
      transform: var(--thumb-transform);
      border-radius: var(--thumb-radius, 50%);
      background: var(--thumb-color);
      box-shadow: var(--thumb-shadow);
      border: none;
      pointer-events: auto;
      transition: 0.1s;
    }
    &::-moz-range-thumb {
      appearance: none;
      height: var(--thumb-size);
      width: var(--thumb-size);
      transform: var(--thumb-transform);
      border-radius: var(--thumb-radius, 50%);
      background: var(--thumb-color);
      box-shadow: var(--thumb-shadow);
      border: none;
      pointer-events: auto;
      transition: 0.1s;
    }
    &::-ms-thumb {
      appearance: none;
      height: var(--thumb-size);
      width: var(--thumb-size);
      transform: var(--thumb-transform);
      border-radius: var(--thumb-radius, 50%);
      background: var(--thumb-color);
      box-shadow: var(--thumb-shadow);
      border: none;
      pointer-events: auto;
      transition: 0.1s;
    }

    // non-multiple range should not clip start of progress bar
    &:only-of-type {
      ~ .range-slider__progress {
        --clip-start: 0;
      }
    }

    &:nth-of-type(1) {
      --is-left-most: Clamp(0, (var(--value-a) - var(--value-b)) * 99999, 1);
      & + output {
        &:not(:only-of-type) {
          --flip: calc(var(--thumbs-too-close) * -1);
        }

        --value: var(--value-a);
        --x-offset: calc(var(--completed-a) * -1%);
        &::after {
          content: var(--prefix, '') var(--text-value-a) var(--suffix, '');
        }
      }
    }
  }

  .range-slider__progress {
    --start-end: calc(var(--thumb-size) / 2);
    --clip-end: calc(100% - (var(--cb)) * 1%);
    --clip-start: calc(var(--ca) * 1%);
    --clip: inset(-20px var(--clip-end) -20px var(--clip-start));
    position: absolute;
    left: var(--start-end);
    right: var(--start-end);
    top: calc(
      var(--ticks-gap) * var(--flip-y, 0) + var(--thumb-size) / 2 -
        var(--track-height) / 2
    );
    //  transform: var(--flip-y, translateY(-50%) translateZ(0));
    height: calc(var(--track-height));
    background: var(--progress-background, #eee);
    pointer-events: none;
    z-index: -1;
    border-radius: var(--progress-radius);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      -webkit-clip-path: var(--clip);
      clip-path: var(--clip);
      top: 0;
      bottom: 0;
      background: var(--fill-color, black);
      box-shadow: var(--progress-flll-shadow);
      z-index: 1;
      border-radius: inherit;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      box-shadow: var(--progress-shadow);
      pointer-events: none;
      border-radius: inherit;
    }
  }
`;

export default RangeSlider;
