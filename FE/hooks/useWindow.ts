import {
  useRef,
  useEffect,
  useLayoutEffect,
  MutableRefObject,
  DependencyList,
  useState,
} from 'react';

export interface WindowInfo {
  scroll: number;
  width: number;
  height: number;
  scrollHeight: number;
}

export const windowInfo: WindowInfo = {
  scroll:
    typeof document !== 'undefined' ? document.documentElement.scrollTop : 0,
  width: 0,
  height: 0,
  scrollHeight: 0,
};

const windowCallbacks: {
  [key: string]: Array<(e: WindowInfo) => (() => void) | undefined>;
} = {
  scroll: [],
  resize: [],
};

function scrollCallback() {
  const scrollTop = document.documentElement.scrollTop;
  windowInfo.scroll = scrollTop;
  const afterCallbacks = windowCallbacks.scroll.map((callback) => {
    return callback({ ...windowInfo });
  });

  afterCallbacks.forEach((callback) => {
    callback && callback();
  });

  return scrollTop;
}

function resizeCallback() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const scrollHeight = document.body.scrollHeight;

  windowInfo.width = width;
  windowInfo.height = height;
  windowInfo.scrollHeight = scrollHeight;

  const afterCallbacks = windowCallbacks.resize.map((callback) => {
    return callback({ ...windowInfo });
  });

  afterCallbacks.forEach((callback) => {
    callback && callback();
  });

  return windowInfo;
}

function addWindowEvent(
  eventName: string,
  defaultCallback: () => any,
  callback: (e: WindowInfo) => any,
) {
  const callbacks = windowCallbacks[eventName];
  if (!callbacks.length) {
    window.addEventListener(eventName, defaultCallback);
    defaultCallback();
  }
  callbacks.push(callback);
  const afterCallback = callback({ ...windowInfo });

  afterCallback && afterCallback();
  return { ...windowInfo };
}

function removeWindowEvent(
  eventName: string,
  defaultCallback: () => any,
  callback: (e: WindowInfo) => any,
) {
  const callbacks = windowCallbacks[eventName];
  const callbackIndex = callbacks.indexOf(callback);

  if (callbackIndex > -1) {
    callbacks.splice(callbackIndex, 1);
  }
  if (!callbacks.length) {
    window.removeEventListener(eventName, defaultCallback);
  }
}

export function useWindowScroll(
  callback: (e: WindowInfo) => any,
  deps: any[] = [],
) {
  const ref = useRef({ ...windowInfo });

  useEffect(() => {
    function onScroll(e: WindowInfo) {
      ref.current = e;
      return callback(e);
    }
    ref.current = addWindowScroll(onScroll);

    return () => {
      removeWindowScroll(onScroll);
    };
  }, deps);

  return ref;
}

export function getWindowInfo() {
  return windowInfo;
}

export function useWindowResize(
  callback: (e: { width: number; height: number; scrollHeight: number }) => any,
  deps: any[] = [],
) {
  const ref = useRef({
    width: windowInfo.width,
    height: windowInfo.height,
    scrollHeight: windowInfo.scrollHeight,
  });

  useEffect(() => {
    function onResize(e: {
      width: number;
      height: number;
      scrollHeight: number;
    }) {
      ref.current = e;
      return callback(e);
    }
    ref.current = addWindowResize(onResize);

    return () => {
      removeWindowResize(onResize);
    };
  }, deps);

  return ref;
}

export function addWindowScroll(callback: (e: WindowInfo) => any) {
  return addWindowEvent('scroll', scrollCallback, callback);
}

export function removeWindowScroll(callback: (e: WindowInfo) => any) {
  removeWindowEvent('scroll', scrollCallback, callback);
}

export function addWindowResize(callback: (e: WindowInfo) => any) {
  return addWindowEvent('resize', resizeCallback, callback);
}

export function removeWindowResize(callback: (e: WindowInfo) => any) {
  removeWindowEvent('resize', resizeCallback, callback);
}

export function useOffset(
  ref: MutableRefObject<HTMLElement>,
  visible: boolean,
) {
  const [offsetInfo, setOffsetInfo] = useState({
    top: 0,
    height: 0,
  });

  useWindowResize(() => {
    setOffsetInfo({
      top: ref.current!.offsetTop,
      height: ref.current!.offsetHeight,
    });
  }, []);

  return offsetInfo;
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface IPosition {
  x: number;
  y: number;
}

interface IScrollProps {
  prevPos: IPosition;
  currPos: IPosition;
}

type ElementRef = MutableRefObject<HTMLElement | undefined>;

const isBrowser = typeof window !== `undefined`;
const zeroPosition = { x: 0, y: 0 };

const getClientRect = (element?: HTMLElement) =>
  element?.getBoundingClientRect();

const getScrollPosition = ({
  element,
  useWindow,
  boundingElement,
}: {
  element?: ElementRef;
  boundingElement?: ElementRef;
  useWindow?: boolean;
}) => {
  if (!isBrowser) {
    return zeroPosition;
  }

  if (useWindow) {
    return { x: window.scrollX, y: window.scrollY };
  }

  const targetPosition = getClientRect(element?.current || document.body);
  const containerPosition = getClientRect(boundingElement?.current);

  if (!targetPosition) {
    return zeroPosition;
  }

  return containerPosition
    ? {
        x: (containerPosition.x || 0) - (targetPosition.x || 0),
        y: (containerPosition.y || 0) - (targetPosition.y || 0),
      }
    : { x: targetPosition.left, y: targetPosition.top };
};

export const useScrollPosition = (
  effect: (props: IScrollProps) => void,
  deps?: DependencyList,
  element?: ElementRef,
  useWindow?: boolean,
  wait?: number,
  boundingElement?: ElementRef,
): void => {
  const position = useRef(getScrollPosition({ useWindow, boundingElement }));

  let throttleTimeout: number | null = null;

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow, boundingElement });
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    throttleTimeout = null;
  };

  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) {
      return undefined;
    }

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = window.setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    if (boundingElement) {
      boundingElement.current?.addEventListener('scroll', handleScroll, {
        passive: true,
      });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (boundingElement) {
        boundingElement.current?.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }

      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, deps);
};
