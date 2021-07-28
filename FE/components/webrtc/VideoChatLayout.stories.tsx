import { Story } from '@storybook/react';
import styled from 'styled-components';

export default {
  title: 'webrtc/Video Chat Layout',
};

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
  }

  .item > .profile {
    margin: 0 auto;
    background-color: gray;
  }

  .item {
    flex: 0 0 640px;
  }

  ${({ number }) => {
    if (number > 8) {
      return `
        .item {
          flex: 0 0 240px;
        }
      `;
    } else if (number > 4) {
      return `
        .item {
          flex: 0 0 360px;
        }
      `;
    } else if (number > 2) {
      return `
        .item {
          flex: 0 0 480px;
        }
      `;
    } else {
      return `
        .item {
          flex: 0 0 640px;
        }
      `;
    }
  }};
`;

const Template: Story = ({arr}) => (
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

videoChatLayout.args = {
  arr: [1,2,2,2,1,2,1,2]
}