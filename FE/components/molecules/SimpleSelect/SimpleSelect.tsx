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
  autofocus?: boolean | undefined;
  isDisabled?: boolean | undefined;
  isMulti?: boolean;
}

export default function SimpleSelect({
  options,
  onChange,
  placeholder,
  onBlur,
  value,
  customStyles,
  autofocus,
  isDisabled,
  isMulti,
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
      autoFocus={autofocus}
      styles={styles}
      isDisabled={isDisabled}
      isMulti={isMulti}
    />
  );
}
