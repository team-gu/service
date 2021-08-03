import { useState } from 'react';
import { Story } from '@storybook/react';
import Filter, { Content } from './Filter';

export default {
  title: 'Molecules/Filter',
  component: Filter,
};

const Template: Story = ({ props }) => {
  const [contents, setContents] = useState(props);

  console.log(contents);
  const handleData = (keyOne: string, keyTwo: string) => {
    const contentsTemp = { ...contents };
    console.log(keyOne, keyTwo);
    contentsTemp[keyOne][keyTwo] = !contentsTemp[keyOne][keyTwo];

    setContents(contentsTemp);
  };

  return (
    <>
      {Object.keys(props).map((each) => (
        <Filter title={each} contents={contents[each]} func={handleData} />
      ))}
    </>
  );
};

export const filter = Template.bind({});

filter.args = {
  props: {
    지역: {
      서울: false,
      대전: false,
      광주: false,
      구미: false,
      불경: false,
    },
    역할: {
      프론트: false,
      백엔드: false,
      임베디드: false,
    },
    트랙: {
      기술: false,
      디자인: false,
      IoT: false,
    },
    스킬: {
      javascript: false,
      spring: false,
    },
    '전공/비전공': {
      전공: false,
      비전공: false,
    },
  },
};
