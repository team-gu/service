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
}

export default function SimpleSelect({
  options,
  onChange,
  placeholder,
  onBlur,
  value,
  customStyles,
  autofocus,
}: SimpleSelectProps): ReactElement {
  return (
    <Select
      options={options}
      isSearchable={false}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={value}
      onBlur={onBlur}
      styles={customStyles}
      autoFocus={autofocus}
    />
  );
}
