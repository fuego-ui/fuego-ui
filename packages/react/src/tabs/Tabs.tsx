import React, {
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import debounce from 'lodash.debounce';
import { classnames } from '../utils/component-utils';
import { DraggableScroll } from '../draggable';
import {
  Direction,
  HighlightProps,
  IArrowButton,
  ITabs,
  TabIdProps,
} from './Tabs.types';

/**
 * TODO:
 *
 * Integrate Theming
 * WAI-ARIA Create Manual and Automatic Selection
 * Make a pill variation
 * Minor issue, on tab click, full tab not necessarily moved into view
 * on window resize, lmaxsize is out of date
 */

const TabPanel = styled.div`
  padding: 2.4rem;
  &.hidden {
    display: none;
  }
`;

const TabHighlight = styled.span.attrs<HighlightProps>(
  (props: HighlightProps) => ({
    style: {
      left: props.leftOffset ? `${props.leftOffset}px` : 0,
      width: props.width ? `${props.width}px` : '96px',
    },
  })
)<HighlightProps>`
  height: 2px;
  position: absolute;
  transition: width 0.3s, left 0.3s;
  bottom: 0;
  background-color: ${({ theme }) => theme && theme.primary};
`;

/**
 * TODO: Move to a separate file to separate from tabs
 */
const RightScrollArrowStyles = css`
  transform: rotate(45deg);
  right: 12px;
`;

const LeftScrollArrowStyles = css`
  transform: rotate(225deg);
  right: 8px;
`;

const ArrowDisabled = css`
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme && theme.background} !important;
  }

  &::before {
    display: none;
  }
`;

const ScrollArrow = styled.button<IArrowButton>`
  border: none;
  min-width: 1.8rem;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border: 1px solid ${({ theme }) => theme && theme.primary};
    border-bottom: none;
    border-left: none;
    position: absolute;
    right: 12px;
    top: 20px;

    ${({ direction }) =>
      direction === 'right' ? RightScrollArrowStyles : LeftScrollArrowStyles}
  }

  ${({ disabled }) => disabled && ArrowDisabled}

  // theme
  background-color: ${({ theme }) => theme && theme.background};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme && theme.primary};
    color: ${({ theme }) => theme && theme.contrastText};

    &::before {
      border: 1px solid ${({ theme }) => theme && theme.tabs && theme.tabs.hfg};
      border-bottom: none;
      border-left: none;
    }
  }
`;

const Tabs = ({
  children,
  fullWidth = false,
  className,
  scrollable = false,
  alignment = 'center',
}: ITabs) => {
  const [activeTab, setActiveTab] = useState('');
  const [ids, setIds] = useState<Array<TabIdProps>>([]);
  const [highlightOffset, setHighlightOffset] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showArrows, setShowArrows] = useState(true);
  const [arrowState, setArrowState] = useState({
    left: true,
    right: false,
  });

  const draggableRef = useRef<HTMLDivElement>();
  const tabRefs = useRef<HTMLElement[]>([]);

  const seed = useId;

  const generateIDS = () => {
    const tabIds = children.map((childTab: any, index: number) => {
      const tabId = `tab-${index}-${seed}`;
      const tabPanelId = `tabPanel-${index}-${seed}`;
      return {
        tabId,
        tabPanelId,
      };
    });
    setIds(tabIds);
    return tabIds;
  };

  const pushTabRef = (el: any, index: number) => {
    if (el && tabRefs && tabRefs.current) {
      tabRefs.current[index] = el;
    }
  };

  const onTabSelection = (tabId: string) => {
    if (!isDragging) {
      setActiveTab(tabId);
    }
  };
  const tabIds = ids && ids.length > 0 ? ids : generateIDS();

  const tabClasses = classnames(
    {
      overfl: scrollable,
    },
    className
  );

  // scrollable
  const scrollTab = (direction: Direction) => (e: any) => {
    if (draggableRef && draggableRef.current) {
      const scrollWidth = draggableRef.current.scrollWidth;
      const scrollWindowWidth = draggableRef.current.offsetWidth;
      const scrollPosition = draggableRef.current.scrollLeft;

      let newScrollPosition = 0;
      if (direction === 'right') {
        if (scrollWindowWidth + scrollPosition > scrollWidth) {
          newScrollPosition = maxScrollLeft - scrollWindowWidth;
        } else {
          newScrollPosition = scrollPosition + scrollWindowWidth;
        }
      } else if (direction === 'left') {
        if (scrollPosition - scrollWindowWidth <= 0) {
          newScrollPosition = 0;
        } else {
          newScrollPosition = scrollPosition - scrollWindowWidth;
        }
      }

      setScrollPosition(newScrollPosition);
      draggableRef.current.scrollTo({
        top: 0,
        left: newScrollPosition,
        behavior: 'smooth',
      });

      // Need to check with scroll post this scroll - hi love alex
      updateScrollArrowState(maxScrollLeft, newScrollPosition);
    }
  };

  const OnDragEndHandler = () => setIsDragging(false);

  /**
   * Call on ScrollTab, called on window resize
   * @param lmaxScrollLeft
   * @param scrollPosition
   */
  const updateScrollArrowState = (
    lmaxScrollLeft: number,
    scrollPosition?: number
  ) => {
    if (draggableRef && draggableRef.current && lmaxScrollLeft > 0) {
      const currentScroll = scrollPosition || draggableRef.current.scrollLeft;
      const newState = { left: false, right: false };

      if (currentScroll <= 0) {
        newState.left = true;
      }

      if (currentScroll >= lmaxScrollLeft - 1) {
        newState.right = true;
      }
      setArrowState(newState);
    }
  };

  const onTabListScroll = useCallback(
    (e: any) => {
      setScrollPosition(draggableRef.current?.scrollLeft || 0);
      updateScrollArrowState(
        maxScrollLeft,
        draggableRef.current?.scrollLeft || 0
      );
    },
    [maxScrollLeft]
  );

  const scrollButton = (direction: Direction) => {
    return (
      <ScrollArrow
        direction={direction}
        disabled={arrowState[direction]}
        onClick={scrollTab(direction)}
      ></ScrollArrow>
    );
  };

  // End declarations

  useEffect(() => {
    // Set Default Tab
    activeTab === '' && setActiveTab(tabIds[0].tabId);
  }, []);

  // Listener for on window resize
  useEffect(() => {
    const onWindowResize = debounce((e: any) => {
      if (
        draggableRef.current &&
        draggableRef.current.offsetWidth &&
        draggableRef.current.offsetWidth > e.target.innerWidth
      ) {
        setShowArrows(true);
      } else {
        setShowArrows(false);
      }
      // TODO: this one has the issue of caching
      updateScrollArrowState(maxScrollLeft);
    }, 50);

    window.addEventListener('resize', onWindowResize, { passive: true });
    return window.removeEventListener('resize', onWindowResize);
  }, [maxScrollLeft]);

  // On Active Tab Change
  useEffect(() => {
    const updateTabHighlightPosition = (activeTabRef: HTMLElement) => {
      if (activeTabRef) {
        const offset = activeTabRef.offsetLeft;
        setHighlightOffset(offset);
      }
    };

    const tabIndex = tabIds.findIndex((tab: any) => tab.tabId === activeTab);
    const activeTabRef = tabIndex >= -1 ? tabRefs.current[tabIndex] : null;

    if (activeTab && draggableRef && draggableRef.current && activeTabRef) {
      const rightBoundScrollArea =
        draggableRef.current?.offsetWidth + scrollPosition;
      const rightBoundCoordinateOfButton =
        activeTabRef.offsetLeft + activeTabRef.offsetWidth;

      if (rightBoundScrollArea < rightBoundCoordinateOfButton) {
        const portionOfTabViewable =
          (activeTabRef.offsetLeft - rightBoundScrollArea) * -1;
        const delta = activeTabRef.offsetWidth - portionOfTabViewable;
        const newPosition = (draggableRef.current.scrollLeft =
          draggableRef.current.scrollLeft + delta);
        setScrollPosition(newPosition);
      }

      if (scrollPosition > activeTabRef.offsetLeft) {
        const delta = scrollPosition - activeTabRef.offsetLeft;
        const newPosition = (draggableRef.current.scrollLeft =
          draggableRef.current.scrollLeft - delta);
        setScrollPosition(newPosition);
      }

      updateTabHighlightPosition(activeTabRef);
    }
  }, [activeTab]);

  useEffect(() => {
    const calculateMaxLeftScroll = () => {
      if (draggableRef && draggableRef.current) {
        const scrollWidth =
          draggableRef.current?.scrollWidth -
            draggableRef.current?.offsetWidth || 0;
        setMaxScrollLeft(scrollWidth);
      }
    };

    calculateMaxLeftScroll();
  }, [draggableRef]);

  return (
    <div
      id={`${seed} `}
      className={`tabs relative ${scrollable ? 'overflow-hidden' : ''}`}
    >
      <div
        className={`max-h-[48px] ${scrollable ? 'flex' : ''} ${
          alignment === 'center' ? 'justify-content-center' : ''
        }`}
      >
        {scrollable && showArrows && scrollButton('left')}
        <div
          role="tablist"
          className={`flex relative whitespace-nowrap overflow-x-auto overflow-y-hidden scroll-smooth ${
            fullWidth ? 'flex-grow-1' : ''
          }`}
        >
          <DraggableScroll
            draggableRef={draggableRef}
            onScroll={onTabListScroll}
            onDragEnd={OnDragEndHandler}
          >
            {children.map((child: any, index: number) => {
              const { label, className = '' } = child.props;
              const newProps = {
                className: `${fullWidth ? 'flex-grow-1' : ''} ${className}`,
                id: tabIds[index].tabId,
                ref: (ref: any) => pushTabRef(ref, index),
                activeTab: { activeTab },
                key: tabIds[index].tabId,
                label: label,
                onTabClick: onTabSelection,
                ...tabIds[index],
              };
              return cloneElement(child, { ...newProps });
            })}
            <TabHighlight leftOffset={highlightOffset} />
          </DraggableScroll>
        </div>
        {scrollable && showArrows && scrollButton('right')}
      </div>
      {children.map((child: any, index: number) => {
        return (
          <TabPanel
            tabIndex={0}
            role="tabpanel"
            key={tabIds[index].tabPanelId}
            id={tabIds[index].tabPanelId}
            aria-labelledby={tabIds[index].tabId}
            className={`${activeTab !== tabIds[index].tabId ? 'hidden' : ''}`}
          >
            {child.props.children}
          </TabPanel>
        );
      })}
    </div>
  );
};

export default Tabs;
