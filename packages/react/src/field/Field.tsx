import {
  useState,
  forwardRef,
  BaseSyntheticEvent,
  useId,
  useEffect,
} from 'react';
import { classnames } from '../utils/component-utils';
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
      size = 'small',
      inputClassName = '',
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
          className={`textarea ${inputClassName}`}
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
          className={`input ${inputClassName}`}
          id={`text-field-${fieldId}`}
          autoComplete={props.autoComplete ? 'on' : 'off'}
          value={value}
          {...props}
        />
      );

    const textFieldClasses = classnames(
      {
        focused: isFocused || floatLabelAlways,
        'float-label': floatLabel,
        filled:
          isFilled || (ref && ref.current && ref.current.value.length > 0),
        'has-placeholder': placeholder,
        'has-prefix': prefix,
        'has-error': fieldErrors,
        'fue-field--sm': size === 'small' ? true : false,
        field: true,
      },
      className
    );

    useEffect(() => {
      if (value && value.length > 0) {
        setFilled(true);
      }
    }, []);

    return (
      <div className={`${styles['field']} ${textFieldClasses}`}>
        {/* <FieldFix type="prefix">{prefix}</FieldFix> */}
        <div className="field-contents">
          {field}
          <label id={labelId} htmlFor={`text-field-${fieldId}`}>
            {children}
            {required && <span className="required">*</span>}
          </label>
        </div>
        {/* <FieldFix type="suffix">{suffix}</FieldFix> */}
        <div className="error">
          <span className="error--msg">{errorLabel}</span>
        </div>
      </div>
    );
  }
);

// const Field = styled(FieldCmp)`
//   position: relative;
//   padding: 1rem 0;
//   margin: 1rem 0;
//   width: 100%;

//   // Solves issues with list/dropdowns
//   z-index: 2;

//   .field-contents {
//     padding: 0 1rem;
//     border-radius: 1.4rem;
//     position: relative;
//     padding: 0.5rem 1rem;
//   }

//   label {
//     position: absolute;
//     margin: 0;
//     top: 0.7rem;
//     left: 1rem;
//     font-size: 1.2rem;
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//     max-width: calc(100% - 24px);
//     pointer-events: none;
//     transform-origin: left top;
//     transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
//       transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
//       max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
//   }

//   &.float-label.filled label,
//   &.focused.float-label label,
//   &.has-placeholder label {
//     opacity: 1 !important;
//     background: transparent;
//   }

//   &.filled label {
//     opacity: 0;
//   }

//   &.focused label,
//   &.focused.filled label,
//   &.float-label.filled label {
//     opacity: 0;
//   }

//   input,
//   textarea {
//     border: none;
//     width: 100%;
//     font-size: 1.2rem;
//     font-family: inherit;

//     &:focus {
//       outline: 0;
//     }
//   }

//   input {
//     height: 1.4375em;
//   }

//   textarea {
//     resize: vertical;
//     min-height: 4.4rem;
//     max-height: 10rem;
//   }

//   /* prefix  */

//   .field__prefix {
//     position: relative;
//   }

//   .field__prefix img {
//     position: absolute;
//     left: 1rem;
//     top: 0.3rem;
//   }

//   &.has-prefix input {
//     padding-left: 3rem;
//   }

//   /* Error  */
//   .error {
//     padding-top: 0.5rem;
//     padding-left: 1.6rem;

//     &--msg {
//       transform-origin: 0 0;
//       transform: rotateX(270deg);
//       transition: transform 200ms ease;
//       position: absolute;
//     }
//   }

//   &.has-error .error--msg {
//     transform: rotateX(360deg);
//   }

//   /* Theme */
//   input,
//   textarea,
//   .field-contents {
//     background-color: ${({ theme }) =>
//       themeOrDefault(theme.formField.bg, theme.primary)};
//     color: ${({ theme }) => themeOrDefault(theme.formField.fg, theme.accent)};
//   }

//   label {
//     color: ${({ theme }) =>
//       theme && themeOrDefault(theme.formField.labelfg, theme.accent)};

//     .required {
//       color: ${({ theme }) =>
//         theme && themeOrDefault(theme.formField.errorfg, theme.error.main)};
//     }
//   }

//   ${() => {
//     return BaseFieldStyles;
//   }}

//   ${({ theme, fieldStyle }) => selectFieldStyle(theme, fieldStyle)}

//   // Error Theme
//   &.has-error label,  &.has-error input {
//     color: ${({ theme }) =>
//       theme && themeOrDefault(theme.formField.errorfg, theme.error.main)};
//   }

//   &.has-error .field-contents {
//     outline: 2px solid
//       ${({ theme }) =>
//         theme && themeOrDefault(theme.formField.errorfg, theme.error.main)};
//   }

//   &.has-error input,
//   &.has-error textarea {
//     caret-color: ${({ theme }) =>
//       theme && themeOrDefault(theme.formField.errorfg, theme.error.main)};
//   }

//   .error--msg {
//     color: ${({ theme }) =>
//       theme && themeOrDefault(theme.formField.errorfg, theme.error.main)};
//   }
// `;

export default Field;
