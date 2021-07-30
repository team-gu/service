import { ReactElement, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const TimerBackground = styled.div`
  position: fixed;
  bottom: 50px;
  left: 40px;

  width: 70px;
  height: 15px;
  text-align: center;
  padding: 10px 0;

  background-color: darkgray;
  opacity: 0.4;
  border-radius: 15px;
`;

const TimerContainer = styled.div`
  position: fixed;
  bottom: 50px;
  left: 40px;

  width: 70px;
  height: 15px;
  text-align: center;
  padding: 10px 0;

  line-height: 15px;
  font-size: 11px;
`;

export default function FloatingCounter(): ReactElement {
  const [count, setCount] = useState(0);

  const useInterval = (callback: any, delay: number) => {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      if (delay !== null) {
        let id = setInterval(() => {
          savedCallback.current();
        }, delay);

        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  const timeToStr = (time: number) => {
    let hour = String(Math.floor(time / 60));
    let minute = String(time % 60);

    if (hour.length == 1) hour = '0'.concat(hour);

    if (minute.length == 1) minute = '0'.concat(minute);

    return hour.concat(' : ', minute);
  };

  return (
    <>
      <TimerBackground />
      <TimerContainer>
        <span>{timeToStr(count)}</span>
      </TimerContainer>
    </>
  );
}
