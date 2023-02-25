import React, {
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { classnames } from '../utils/component-utils';
import { DraggableScroll } from '../draggable';
import { Direction, ITabs, TabIdProps } from './Tabs.types';
import styles from './tabs.module.css';
import ScrollArrow from './scrollArrow/ScrollArrow';
import { useOnWindowResize } from '../hooks/useOnWindowResize';

/**
 * TODO:
 *
 * Integrate Theming
 * WAI-ARIA Create Manual and Automatic Selection
 * Make a pill variation
 * Minor issue, on tab click, full tab not necessarily moved into view
 * on window resize, lmaxsize is out of date
 */

const Tabs = ({
  children,
  fullWidth = false,
  className,
  scrollable = false,
  alignment = 'center',
  ...rest
}: ITabs) => {
  const [activeTab, setActiveTab] = useState('');
  const [ids, setIds] = useState<Array<TabIdProps>>([]);
  const [highlightOffset, setHighlightOffset] = useState(0);
  const [highlightWidth, setHighlightWidth] = useState(30);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showArrows, setShowArrows] = useState(true);
  const [arrowState, setArrowState] = useState({
    left: true,
    right: false,
  });
  const { width } = useOnWindowResize();

  const draggableRef = useRef<HTMLDivElement>();
  const tabRefs = useRef<HTMLElement[]>([]);

  const seed = useId();

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
    console.log(tabId);
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
    if (
      draggableRef.current &&
      draggableRef.current.offsetWidth &&
      draggableRef.current.offsetWidth > width
    ) {
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }

    updateScrollArrowState(maxScrollLeft);
  }, [width, maxScrollLeft]);

  // On Active Tab Change
  useEffect(() => {
    const updateTabHighlightPosition = (activeTabRef: HTMLElement) => {
      if (activeTabRef) {
        const offset = activeTabRef.offsetLeft;
        setHighlightOffset(offset);
        setHighlightWidth(activeTabRef.offsetWidth);
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
  }, [activeTab, width]);

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
    <>
      <div
        id={`${seed} `}
        className={`tabs relative ${
          scrollable
            ? 'overflow-hidden whitespace-nowrap overflow-x-auto overflow-y-hidden scroll-smooth flex-nowrap items-center'
            : ''
        } ${styles['tabs']} ${className}`}
      >
        {scrollable && showArrows && scrollButton('left')}
        <DraggableScroll
          className={fullWidth ? 'flex w-full' : ''}
          draggableRef={draggableRef}
          onScroll={onTabListScroll}
          onDragEnd={OnDragEndHandler}
        >
          {children.map((child: any, index: number) => {
            const { label, className: childClassName = '' } = child.props;
            const newProps = {
              className: `${childClassName} ${
                rest.tabClassName ? rest.tabClassName : ''
              } ${fullWidth ? 'grow flex-1' : ''}`,
              id: tabIds[index].tabId,
              ref: (ref: any) => pushTabRef(ref, index),
              activeTab: activeTab,
              key: tabIds[index].tabId,
              label: label,
              onTabClick: onTabSelection,
              ...tabIds[index],
            };
            return cloneElement(child, { ...newProps });
          })}
          {!rest.noHighlight && (
            <span
              className={`${styles['tab-highlight']} bg-primary ${
                rest.highlightClassName ? rest.highlightClassName : ''
              }`}
              style={{
                left: highlightOffset ? `${highlightOffset}px` : 0,
                width: highlightWidth ? `${highlightWidth}px` : 0,
              }}
            ></span>
          )}
        </DraggableScroll>
        {scrollable && showArrows && scrollButton('right')}
      </div>
      {children.map((child: any, index: number) => {
        return (
          <div
            tabIndex={0}
            role="tabpanel"
            key={tabIds[index].tabPanelId}
            id={tabIds[index].tabPanelId}
            aria-labelledby={tabIds[index].tabId}
            className={`p-3 ${
              activeTab !== tabIds[index].tabId ? 'hidden' : ''
            }`}
          >
            {child.props.children}
          </div>
        );
      })}
    </>
  );
};

export default Tabs;
