import { useState, useCallback, useEffect, MouseEvent } from 'react';
import styles from './Draggable.module.css';

interface IDraggable {
  children: any;
  id?: string;
  onScroll?: any;
  onDrag?: any;
  onDragEnd?: any;
  draggableRef: any;
  className?: any;
}

const POSITION = { x: 0, y: 0 };

const DraggableScroll = ({
  children,
  className,
  id,
  onDrag,
  onScroll,
  onDragEnd,
  draggableRef,
}: IDraggable) => {
  const [state, setState] = useState({
    isDragging: false,
    isTouch: false,
    origin: POSITION,
    translation: POSITION,
  });

  const handleTouchStart = useCallback(({ touches }: any) => {
    setState((state) => ({
      ...state,
      isTouch: true,
      isDragging: true,
      origin: { x: touches[0].clientX, y: touches[0].clientY },
    }));
  }, []);

  const handleMouseDown = useCallback(
    ({ clientX, clientY }: MouseEvent<HTMLElement>) => {
      setState((state) => ({
        ...state,
        isDragging: true,
        origin: { x: clientX, y: clientY },
      }));
    },
    []
  );

  const handleMouseMove = useCallback(
    ({ clientX, clientY }: any) => {
      const translation = {
        x: clientX - state.origin.x,
        y: clientY - state.origin.y,
      };

      draggableRef.current.scrollTop = translation.y;
      draggableRef.current.scrollLeft = -1 * translation.x;

      setState((state) => ({
        ...state,
        translation,
      }));

      // Hook for user alex wuz hur
      onDrag && onDrag({ translation, clientX, clientY, id });
    },
    [state.origin, onDrag, id, draggableRef]
  );

  const handleTouchMove = useCallback(
    ({ touches }: any) => {
      const translation = {
        x: touches[0].clientX - state.origin.x,
        y: touches[0].clientY - state.origin.y,
      };

      draggableRef.current.scrollTop = translation.y;
      draggableRef.current.scrollLeft = -1 * translation.x;

      setState((state) => ({
        ...state,
        translation,
      }));

      // Hook for user alex wuz hur
      onDrag && onDrag({ translation, touches, id });
    },
    [state.origin, onDrag, id, draggableRef]
  );

  const handleMouseUp = useCallback(() => {
    setState((state) => ({
      ...state,
      isDragging: false,
    }));

    onDragEnd && onDragEnd();
  }, [onDragEnd]);

  const handleTouchEnd = useCallback(() => {
    setState((state) => ({
      ...state,
      isDragging: false,
    }));

    onDragEnd && onDragEnd();
  }, [onDragEnd]);

  useEffect(() => {
    const draggableEl = draggableRef.current;
    if (onScroll) {
      draggableEl.addEventListener('scroll', onScroll);
    }

    return () => {
      if (onScroll) {
        draggableEl.removeEventListener('scroll', onScroll);
      }
    };
  }, [draggableRef, onScroll]);

  useEffect(() => {
    const draggableEl = draggableRef.current;
    if (state.isDragging && !state.isTouch) {
      draggableRef.current.addEventListener('mousemove', handleMouseMove);
      draggableRef.current.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (draggableEl && state.isDragging && !state.isTouch) {
        draggableEl.removeEventListener('mousemove', handleMouseMove);
        draggableEl.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [
    draggableRef,
    state.isDragging,
    state.isTouch,
    handleMouseMove,
    handleMouseUp,
  ]);

  useEffect(() => {
    const draggableEl = draggableRef.current;
    if (state.isDragging && state.isTouch) {
      draggableEl.addEventListener('touchmove', handleTouchMove);
      draggableEl.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (state.isDragging && state.isTouch) {
        draggableEl.removeEventListener('touchmove', handleTouchMove);
        draggableEl.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [
    draggableRef,
    state.isDragging,
    state.isTouch,
    handleTouchMove,
    handleTouchEnd,
  ]);

  return (
    <div
      className={`${
        styles['scrollbar-hide']
      } cursor-grab relative overflow-x-hidden overflow-hidden ${
        className ? className : ''
      }`}
      ref={draggableRef}
      onTouchStart={handleTouchStart}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default DraggableScroll;
