import { Story } from '@storybook/react';
import styled from 'styled-components';

export default {
  title: 'webrtc/Video Chat Layout',
};

const Wrapper = styled.div`
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

const Template: Story = ({arr}) => (
  <Wrapper>
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
  arr: [1,2,2,1]
}