import { ReactElement, useState, useEffect } from 'react';
import Select, { OptionsType } from 'react-select';
import { Skill, SkillOption } from '@utils/type';
import { getEachFiltersCodeList } from '@repository/filterRepository';
import { useAuthState } from '@store';
interface SkillSelectAutoCompleteProps {
  onChangeSkills?: (newValue: OptionsType<SkillOption>) => void;
  value?: Skill[] | null;
  disabled?: boolean;
  options?: Skill[];
}

export default function SkillSelectAutoComplete({
  onChangeSkills,
  value,
  disabled = false,
  options,
}: SkillSelectAutoCompleteProps): ReactElement {
  const {
    user: { studentNumber },
  } = useAuthState();
  const [skillOptions, setSkillOptions] = useState<Skill[]>([]);
  const defaultSkillOptions: OptionsType<SkillOption> | undefined = value?.map(
    (s) => {
      return {
        ...s,
        label: s.codeName,
        value: s.code,
      };
    },
  );

  const colourStyles = {
    multiValue: (styles: object, { data }: any) => {
      const color = skillOptions.find(
        (option) => option.codeName === data.name,
      )?.backgroundColor;
      return {
        ...styles,
        backgroundColor: color ? color : '#eeeeee',
      };
    },
    multiValueLabel: (styles: object, { data }: any) => ({
      ...styles,
      color: skillOptions.find((option) => option.codeName === data.name)
        ?.color,
      fontWeight: '900',
    }),
  };

  useEffect(() => {
    if (!options) {
      getEachFiltersCodeList(studentNumber).then(({ data }) => {
        setSkillOptions(
          data.data['스킬'].reduce(
            (acc: Skill[], cur: any) => [
              ...acc,
              { ...cur, value: cur.code, label: cur.codeName },
            ],
            [],
          ),
        );
      });
    }
  }, []);

  return (
    <Select
      isMulti
      options={options || skillOptions}
      onChange={onChangeSkills}
      defaultValue={defaultSkillOptions}
      styles={colourStyles}
      isDisabled={disabled}
    />
  );
}
