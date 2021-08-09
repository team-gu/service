import { ReactElement } from 'react';
import Select, {
  OptionsType,
  OptionTypeBase,
  Styles,
  GroupTypeBase,
} from 'react-select';

interface SimpleSelectProps {
  options: OptionsType<OptionTypeBase>;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  placeholder?: string;
  value?: OptionTypeBase | null;
  customStyles?: Partial<Styles<any, false, GroupTypeBase<any>>> | undefined;
  isDisabled?: boolean | undefined;
}

export default function SimpleSelect({
  options,
  onChange,
  placeholder,
  onBlur,
  value,
  customStyles,
  isDisabled,
}: SimpleSelectProps): ReactElement {
  const styles = {
    menuList: (base: any) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 101,
      marginTop: 0,
    }),
    ...customStyles,
  };

  return (
    <Select
      options={options}
      isSearchable={false}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={value}
      onBlur={onBlur}
      styles={styles}
      isDisabled={isDisabled}
    />
  );
}
