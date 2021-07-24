import FloatButton from './FloatButton';

export default {
  title: 'Atoms/Float Button',
  component: FloatButton,
};

export const floatButton = () => <FloatButton func={() => console.log("클릭됨")} />;
