import { forwardRef, useEffect, useState } from 'react';

const CheckboxWrapper = ({ label, children, formControlClassName }: any) => {
  return (
    <div className={`form-control ${formControlClassName}`}>
      <label className="label cursor-pointer">
        <span className="label-text"> {label}</span>
        {children}
      </label>
    </div>
  );
};

const Checkbox = forwardRef(
  (
    {
      className = '',
      children,
      valueChangeHandler,
      value = false,
      ...rest
    }: any,
    ref: any
  ) => {
    const [isChecked, setIsChecked] = useState(value);
    const valueChange = (e: any) => {
      setIsChecked(e.target.checked);
      valueChangeHandler && valueChangeHandler(e.target.checked);
    };

    const inputEl = (
      <input
        className="checkbox"
        ref={ref}
        type="checkbox"
        onChange={valueChange}
        checked={isChecked}
        {...rest}
      />
    );

    const finalCmp = children ? (
      <CheckboxWrapper label={children}>{inputEl}</CheckboxWrapper>
    ) : (
      inputEl
    );

    useEffect(() => {
      setIsChecked(value);
    }, [value]);

    return finalCmp;
  }
);

export default Checkbox;
