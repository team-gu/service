import { useState } from 'react';
import { Story } from '@storybook/react';
import Filter, { Content } from './Filter';

export default {
  title: 'Molecules/Filter',
  component: Filter,
};

const Template: Story = ({ props }) => {
  const [contents, setContents] = useState(props);

  const handleData = (data: string) => {
    setContents(
      contents.reduce(
        (
          acc: Content[],
          cur: Content,
        ) => {
          if (cur.title === data) {
            return [...acc, { ...cur, checked: !cur.checked }];
          }

          return [...acc, cur];
        },
        [],
      ),
    );
  };

  return <Filter contents={contents} func={handleData} />;
};

export const filter = Template.bind({});

filter.args = {
  props: [
    { title: '서울', checked: false },
    { title: '대전', checked: false },
    { title: '광주', checked: false },
    { title: '구미', checked: false },
    { title: '불경', checked: false },
  ],
};
