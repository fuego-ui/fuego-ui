import React, { useId, forwardRef } from 'react';

// TODO: MARKING FOR DELETION
export const TextInput = forwardRef<HTMLInputElement, any>(
  (
    {
      font = 'sans-serif',
      fontSize = 3,
      className = '',
      changeHandler,
      label,
      labelClassNames = '',
      wrapperClassNames = '',
      value,
      ...rest
    }: any,
    ref
  ) => {
    const textIdSuffix = useId();
    const onChangeHandler = (e: any) => changeHandler && changeHandler(e);

    const focusHandler = (e: any) => {
      // console.log(e);
      // if (e.target && e.target.placeholder) {
      //   e.target.placeholder = '';
      // }
    };

    const blurHandler = (e: any) => {
      // console.log(e);
      // if (e.target && e.target.placeholder) {
      //   e.target.placeholder = 'Your Text Here';
      // }
    };

    return (
      <div className={wrapperClassNames}>
        {label ? (
          <label
            className={labelClassNames}
            htmlFor="`text-input-${textIdSuffix}`"
          >
            {label}
          </label>
        ) : null}
        <input
          className={`w-full ${className}`}
          placeholder="Your Text Here"
          id={`text-input-${textIdSuffix}`}
          onChange={onChangeHandler}
          ref={ref}
          // onFocus={focusHandler}
          // onBlur={blurHandler}
          type="text"
          value={value}
          {...rest}
        />
      </div>
    );
  }
);

export default TextInput;
