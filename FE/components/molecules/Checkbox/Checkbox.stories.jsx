import Checkbox from './Checkbox';
import { Text } from '@atoms';

export default {
  title: 'Molecules/Checkbox',
  component: Checkbox,
};

export const checkbox = () => (
  <Checkbox>
    <Text text="JavaScript" fontSetting="n14b" />
  </Checkbox>
);
