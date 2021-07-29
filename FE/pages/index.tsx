import { useState, ReactElement } from 'react';
// import { LineBackground } from '@organisms';
// import { Wrapper } from './index.style';
import Image from 'next/image';
import { Icon } from '@atoms';
import { useScrollPosition } from '@hooks/useWindow';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  margin-top: 64px;
  height: 8400px;
`;

const StyledSection = styled.section`
  top: -36px;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #000200;
  text-shadow: 1px 1px 0 #ccc, 2px 2px 0 #ccc, 3px 3px 0 #ccc, 4px 4px 0 #ccc,
    5px 5px 0 #ccc, 10px 10px 0 rgba(0, 0, 0, 0.2);

  .star {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    animation: bubble 8s linear infinite, backgroundmove 16s linear infinite;
  }
  .star1 {
    animation-delay: 0s;
  }
  .star2 {
    animation-delay: -1s;
  }
  .star3 {
    animation-delay: -2s;
  }
  .star4 {
    animation-delay: -3s;
  }
  .star5 {
    animation-delay: -4s;
  }
  .star6 {
    animation-delay: -5s;
  }
  .star7 {
    animation-delay: -6s;
  }
  .star8 {
    animation-delay: -7s;
  }
  @keyframes bubble {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    20% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    60% {
      opacity: 0;
    }
    70% {
      opacity: 1;
    }
    80% {
      opacity: 0;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes backgroundmove {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(2);
    }
  }
`;

const Card = styled(motion.div)`
  width: 90vw;
  border: 3px solid #000;
  margin: auto;
  height: 500px;
  display: flex;

  div {
    border: 3px solid #000;
    width: calc(100% * 0.3333);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 100px;
  }
  div:nth-child(1) {
    background-color: #2f2e2e;
    color: white;
    // Todo atom의 icon에서 해결되어야 할 문제이다.
    i {
      font-size: 70px;
    }
    h2 {
      font-weight: 700;
      font-size: 60px;
    }
    p {
      font-size: 50px;
    }
  }
  div:nth-child(2) {
    background-color: #3c3c4e;
    color: #66ccbb;
    i {
      font-size: 70px;
    }
    h2 {
      font-weight: 700;
      font-size: 60px;
    }
    p {
      font-size: 50px;
    }
  }
  div:nth-child(3) {
    background-color: #fff;
    color: black;
    i {
      font-size: 70px;
    }
    h2 {
      font-weight: 700;
      font-size: 60px;
    }
    p {
      font-size: 50px;
    }
  }
`;
const firstLineTitleVariants = {
  hidden: {
    x: '-100vw',
    fontSize: '7vw',
    lineHeight: '50vh',
    color: 'white',
  },
  visible: {
    x: 0,
    fontSize: '7vw',
    lineHeight: '50vh',
    color: 'white',
    marginLeft: '20%',
    transition: {
      type: 'spring',
      delay: 0.5,
      duration: 2,
      stiffness: 120,
    },
  },
};

const secondLineTitleVariants = {
  hidden: {
    x: '100vw',
    color: 'white',
    fontSize: '7vw',
  },
  visible: {
    x: 0,
    color: 'white',
    fontSize: '7vw',
    marginLeft: '35%',
    transition: {
      type: 'spring',
      delay: 2.5,
      duration: 2,
      stiffness: 120,
    },
  },
};

const motionDiv = {
  hover: {
    scale: 1.1,
  },
};

export default function Home(): ReactElement {
  const [showCards, setShowCards] = useState(false);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y < 60;
      if (isShow !== showCards) setShowCards(isShow);
      console.log(prevPos, currPos, showCards);
    },
    [showCards],
    undefined,
    false,
    100,
  );

  return (
    <Wrapper>
      {/* <LineBackground /> */}
      <StyledSection>
        <Image className="star star1" src="/star1.png" layout="fill" />
        <Image className="star star2" src="/star2.png" layout="fill" />
        <Image className="star star3" src="/star3.png" layout="fill" />
        <Image className="star star4" src="/star4.png" layout="fill" />
        <Image className="star star5" src="/star5.png" layout="fill" />
        <Image className="star star6" src="/star6.png" layout="fill" />
        <Image className="star star7" src="/star7.png" layout="fill" />
        <Image className="star star8" src="/star8.png" layout="fill" />

        <motion.div
          variants={firstLineTitleVariants}
          initial="hidden"
          animate="visible"
          exit="pageExit"
        >
          팀을 구하는
        </motion.div>
        <motion.div
          variants={secondLineTitleVariants}
          initial="hidden"
          animate="visible"
          exit="pageExit"
        >
          당신을 구합니다
        </motion.div>
      </StyledSection>
      {showCards && (
        <Card
          initial={{ opacity: 0, y: '200px' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'tween', duration: 2 }}
        >
          <motion.div variants={motionDiv} whileHover="hover">
            <Icon iconName="computer" size="70px" color="white" />
            <h2>공통</h2>
            <p>6주</p>
            <span>웹기술 웹디자인 IOT</span>
          </motion.div>
          <motion.div variants={motionDiv} whileHover="hover">
            <Icon iconName="code" size="70px" color="white" />
            <h2>특화</h2>
            <p>6주</p>
            <span>인공지능 블록체인 빅데이터</span>
          </motion.div>
          <motion.div variants={motionDiv} whileHover="hover">
            <Icon iconName="person" size="70px" color="black" />
            <h2>자율</h2>
            <p>8주</p>
            <span>자유로운 주제 선택</span>
          </motion.div>
        </Card>
      )}
    </Wrapper>
  );
}
