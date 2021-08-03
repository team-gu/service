import { ReactElement } from 'react';
import Select, { OptionsType, OptionTypeBase } from 'react-select';

interface SimpleSelectProps {
  options: OptionsType<OptionTypeBase>;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function SimpleSelect({
  options,
  onChange,
  placeholder,
}: SimpleSelectProps): ReactElement {
  return (
    <Select
      options={options}
      isSearchable={false}
      onChange={(item) => onChange(item?.value)}
      placeholder={placeholder}
    />
  );
}
