import { Story } from '@storybook/react';
import styled from 'styled-components';

export default {
  title: 'webrtc/Video Chat Layout',
};

const arr = [1,2,2,2];

// 9 ~
const Wrapper = styled.div<{ number: number }>`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;

  .item {
    background-color: yellow;
    border: solid red 1px;
  }

  .item > .video {
    margin: 0 auto;
    background-color: skyblue;
    width: 640px;
    height: 320px;
  }

  .item > .profile {
    margin: 0 auto;
    background-color: gray;
    width: 240px;
    height: 240px;
  }

  .item {
    flex: 0 0 640px;
  }
`;

// ${({ number }) => {
//     if (number > 8) {
//       return `.item { flex: 0 0 240px }`;
//     } else if (number > 4) {
//       return `.item { flex: 0 0 360px }`;
//     } else if (number > 2) {
//       return `.item { flex: 0 0 480px }`;
//     } else {
//       return `.item { flex: 0 0 640px }`;
//     }
//   }}

const Template: Story = () => (
  <Wrapper number={arr.length}>
    {arr.map((item, index) =>
      item % 2 == 0 ? (
        <div key={index} className="item">
          <div className="profile">{item}</div>
        </div>
      ) : (
        <div key={index} className="item">
          <div className="video">{item}</div>
        </div>
      ),
    )}
  </Wrapper>
);

export const videoChatLayout = Template.bind({});
