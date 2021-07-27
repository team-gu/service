import { Story } from '@storybook/react';
import styled from 'styled-components';

export default {
  title: 'webrtc/Video Chat Layout',
};

const arr = [1,2,3,4,5,6,7,8,9];

// 9 ~
const Wrapper = styled.div<{ number: number }>`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  flex-grow: 1;

  .item {
    background-color: yellow;
    border: solid red 1px;
  }

  ${({number}) => {
    if (number > 8) {
      return `.item { flex: 0 0 240px }`

    } else if (number > 4) {
      return `.item { flex: 0 0 360px }`

    } else if (number > 1) {
      return `.item { flex: 0 0 480px }`

    } else {
      return `.item { flex: 0 0 640px }`
    }
  }}
`;

const Template: Story = () => (
  <Wrapper number={arr.length}>
    {arr.map((item, index) => (
      <div key={index} className="item">{item}</div>
    ))}
  </Wrapper>
);

export const videoChatLayout = Template.bind({});
