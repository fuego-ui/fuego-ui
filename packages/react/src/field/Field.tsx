import {
  useState,
  forwardRef,
  BaseSyntheticEvent,
  useId,
  useEffect,
} from 'react';
import { FieldProps } from './Field.types';
import styles from './Field.module.css';

const Field = forwardRef(
  (
    {
      id = 'field',
      name,
      value,
      floatLabel,
      floatLabelAlways,
      prefix,
      children,
      placeholder,
      type = 'text',
      suffix,
      className,
      onBlur,
      onChange,
      onFocus,
      onClick,
      onKeyDown,
      onKeyUp,
      errorLabel,
      fieldErrors,
      required,
      fieldStyle,
      labelId = '',
      wrapperClassName = '',
      ...props
    }: FieldProps,
    ref: any
  ) => {
    const fieldId = useId();

    const [isFocused, setFocus] = useState(false);
    const [isFilled, setFilled] = useState(false);

    const onChangeHandler = (e: BaseSyntheticEvent) => {
      if (e.target && e.target.value && e.target.value.length > 0) {
        setFilled(true);
      } else {
        setFilled(false);
      }
      onChange && onChange(e);
    };

    const onKeyUpHandler = (e: any) => onKeyUp && onKeyUp(e);
    const onKeyDownHandler = (e: any) => onKeyDown && onKeyDown(e);

    const onBlurHandler = (e: any) => {
      setFocus(false);
      onBlur && onBlur(e);
    };
    const onFocusHandler = (e: any) => {
      setFocus(true);
      onFocus && onFocus(e);
    };

    const field =
      type === 'textarea' ? (
        <textarea
          name={name}
          ref={ref}
          id={`text-field-${fieldId}`}
          cols={30}
          rows={2}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          className={`textarea ${className}`}
          value={value}
          {...props}
        ></textarea>
      ) : (
        <input
          name={name}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          onKeyDown={onKeyDownHandler}
          onKeyUp={onKeyUpHandler}
          placeholder={placeholder}
          type={type}
          ref={ref}
          className={`input ${className}`}
          id={`text-field-${fieldId}`}
          autoComplete={props.autoComplete ? 'on' : 'off'}
          value={value}
          {...props}
        />
      );

    useEffect(() => {
      if (value && value.length > 0) {
        setFilled(true);
      }
    }, []);

    return (
      <div
        className={`${styles['field']} ${
          floatLabel ? styles['float-label'] : ''
        } 
        ${isFilled ? styles['filled'] : ''} 
        ${isFocused ? styles['focused'] : ''} 
        ${fieldErrors ? styles['has-error'] : ''}
        ${wrapperClassName || ''}`}
      >
        {/* <FieldFix type="prefix">{prefix}</FieldFix> */}
        <div className="field-contents">
          {children && (
            <label
              className="label"
              id={labelId}
              htmlFor={`text-field-${fieldId}`}
            >
              {children}
              {required && <span className="required">*</span>}
            </label>
          )}
          {field}
        </div>
        {/* <FieldFix type="suffix">{suffix}</FieldFix> */}
        <div className={styles['error']}>
          <span className={`${styles['error-msg']} text-error label-text-alt`}>
            {errorLabel}
          </span>
        </div>
      </div>
    );
  }
);

export default Field;
