import React, {
  forwardRef,
  KeyboardEvent,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  SyntheticEvent,
  useId,
  cloneElement,
} from 'react';
import { Keys } from '../utils/keycodes';
import { classnames } from '../utils/component-utils';
import { IListbox } from './Listbox.types';
import styles from './listbox.module.css';

const Listbox = forwardRef(
  (
    {
      label = '',
      children = null,
      autocomplete = false,
      options = [],
      loading = false,
      loadingTemplate = null,
      onSelection,
      onChange,
      className = '',
      ...props
    }: IListbox,
    ref: any
  ) => {
    const id = useId();

    const labelId = `${id}-label`;
    const listId = `${id}-list`;

    const suggestionRefs: Array<any> = [];

    const [activeIndex, setActiveIndex] = useState(-1);
    const [expanded, setExpanded] = useState(false);
    const [suggestions, setSuggestions] = useState(options);
    const [activedescendant, setActivedescendant] = useState('');
    const [clickedOutside, setClickedOutside] = useState(false);

    const fieldRef = useRef<any>();
    useImperativeHandle(ref, () => fieldRef.current);

    const listboxRef = useRef<any>();

    const handleClickOutside = (e: any) => {
      if (!listboxRef.current.contains(e.target)) {
        setClickedOutside(true);
      } else {
        setClickedOutside(false);
      }
    };

    const showDropdown = () => setExpanded(true);
    const hideDropdown = () => setExpanded(false);

    // Gives time for click events for selections to propogate
    const delayedHideDropdown = () => setTimeout(() => hideDropdown(), 10);

    const onChangeHandler = (e: Event) => {
      !expanded && setExpanded(true);
      onChange && onChange(e);
    };

    const onBlurHandler = (e: Event) => checkSelection();

    const onSelectionHandler = (e: SyntheticEvent, selection: any) => {
      fieldRef.current.value = selection.label;
      onSelection && onSelection(selection);
      setClickedOutside(false);
      delayedHideDropdown();
    };

    const selectItem = (selection: any) => {
      if (selection) {
        fieldRef.current.value = selection.label;
        setClickedOutside(false);
        delayedHideDropdown();
      }
    };

    const checkSelection = () => {
      if (activeIndex < 0) {
        return;
      }
      const activeItem = getItemAt(activeIndex);
      selectItem(activeItem);
    };

    const getItemAt = (index: number) => suggestions[index];

    const setActiveItem = (evt: KeyboardEvent) => {
      const key = evt.key;

      if (key === Keys.ESC) {
        hideDropdown();
        setTimeout(() => {
          // On Firefox, input does not get cleared here unless wrapped in
          // a setTimeout
          fieldRef.current.value = '';
        }, 1);
        return;
      }

      let activeItem;
      switch (key as Keys) {
        case Keys.UP:
          if (activeIndex <= 0) {
            setActiveIndex(suggestions.length - 1);
          } else {
            setActiveIndex(activeIndex - 1);
          }
          break;
        case Keys.DOWN:
          if (activeIndex === -1 || activeIndex >= suggestions.length - 1) {
            setActiveIndex(0);
          } else {
            setActiveIndex(activeIndex + 1);
          }
          break;
        case Keys.ENTER:
          evt.preventDefault();
          activeItem = getItemAt(activeIndex);
          selectItem(activeItem);
          return;
        case Keys.TAB:
          checkSelection();
          hideDropdown();
          return;
        default:
          return;
      }

      evt.preventDefault();

      activeItem = getItemAt(activeIndex);
      if (fieldRef && fieldRef.current) {
        if (activeItem) {
          setActivedescendant('suggestion-' + activeIndex);
        } else {
          setActivedescendant('');
        }
      }
    };

    const checkKey = (evt: KeyboardEvent) => {
      const key = evt.key;
      switch (key as Keys) {
        case Keys.UP:
        case Keys.DOWN:
        case Keys.ESC:
        case Keys.ENTER:
          evt.preventDefault();
          return;
        default:
          return;
      }
    };

    useEffect(() => setSuggestions(options), [options]);

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    });

    useEffect(() => {
      if (clickedOutside) {
        hideDropdown();
      }
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [clickedOutside]);

    const defaultLoader = (
      <ul className="menu loader">
        <li>
          <span className="active !pt-2 pb-1">...Loading</span>
        </li>
      </ul>
    );

    const loader = loadingTemplate ? loadingTemplate : defaultLoader;

    const listRender = loading ? (
      loader
    ) : (
      <ul
        className="menu bg-base-100 shadow-xl"
        aria-labelledby={labelId}
        role="listbox"
        id={listId}
      >
        {suggestions.map(({ id, label, value }, index) => {
          return (
            <li
              id={`suggestion-${id}`}
              key={id}
              ref={(el) => suggestionRefs.push(el)}
              className={`${classnames({
                focused: activeIndex === index,
              })}`}
              // aria-selected={activeIndex === index}
              onClick={(e) => onSelectionHandler(e, { label, value })}
            >
              <span className={`${index === 0 ? 'pt-4' : ''}`}>{label}</span>
            </li>
          );
        })}
      </ul>
    );

    const childProps = {
      ...children.props,
      ref: fieldRef,
      id: id,
      labelId: labelId,
      floatLabel: false,
      children: '',
      placeholder: children.props.children,
      'aria-activedescendant': activedescendant,
      className: `${children.props.className} z-20 relative`,
      onFocus: showDropdown,
      onBlur: onBlurHandler,
      onKeyUp: checkKey,
      onKeyDown: setActiveItem,
      onChange: onChangeHandler,
    };

    // Have an option for static options and also a function to pass and format suggestions
    return (
      <div
        ref={listboxRef}
        role="combobox"
        aria-expanded={expanded}
        aria-owns={listId}
        aria-controls={listId}
        aria-haspopup="listbox"
        id={id}
        className={`${styles['listbox']} ${className}`}
      >
        {children && cloneElement(children, { ...childProps })}
        <div
          className={`${styles['combobox-wrapper']} ${
            expanded ? '' : 'hidden'
          }`}
        >
          {listRender}
        </div>
      </div>
    );
  }
);

export default Listbox;
