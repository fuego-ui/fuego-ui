import { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CheckboxCmp = forwardRef<HTMLInputElement, any>(
  ({ className = '', children, valueChangeHandler, ...rest }, ref) => {
    const [isChecked, setIsChecked] = useState(false);

    const valueChange = (e: any) => {
      setIsChecked(!isChecked);
      valueChangeHandler && valueChangeHandler(!isChecked);
    };

    const variants = {
      notChecked: {
        opacity: 0,
        pathLength: 0,
      },
      checked: {
        opacity: 1,
        pathLength: 1,
      },
    };

    useEffect(() => {
      if (rest.value) {
        setIsChecked(rest.value);
        valueChangeHandler(rest.value);
      }
    }, []);

    return (
      <div className={className}>
        <label>
          <input
            ref={ref}
            type="checkbox"
            onChange={(e) => valueChange(e)}
            {...rest}
          />
          <motion.svg
            className={`checkbox ${isChecked ? 'checkbox--active' : ''}`}
            aria-hidden="true"
            viewBox="0 0 15 11"
            fill="none"
          >
            <motion.path
              animate={isChecked ? 'checked' : 'notChecked'}
              d="M1 4.5L5 9L14 1"
              strokeWidth="2"
              stroke="#FFF"
              variants={variants}
            />
          </motion.svg>
          {children}
        </label>
      </div>
    );
  }
);

const Checkbox = styled(CheckboxCmp)`
  label {
    display: flex;
    align-items: center;
  }

  .checkbox {
    display: inline-block;
    height: 20px;
    width: 20px;
    background: #fff;
    border: 2px #ddd solid;
    margin-right: 4px;
    transition: background 0.25s;
  }
  .checkbox--active {
    border-color: purple;
    background: purple;
  }

  input[type='checkbox'] {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

export default Checkbox;
