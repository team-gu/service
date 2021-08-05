import { ReactElement, useState, useEffect } from 'react';
import Select, { OptionsType } from 'react-select';
import { getSkillList } from '@repository/baseRepository';
import { Skill, SkillOption } from '@utils/type';

interface SkillSelectAutoCompleteProps {
  onChangeSkills?: (newValue: OptionsType<SkillOption>) => void;
  value?: Skill[] | null;
  disabled?: boolean;
}

export default function SkillSelectAutoComplete({
  onChangeSkills,
  value,
  disabled = false,
}: SkillSelectAutoCompleteProps): ReactElement {
  const [skillOptions, setSkillOptions] = useState<Skill[]>([]);
  const ops: OptionsType<SkillOption> | undefined = value?.map((s) => {
    return {
      id: s.id,
      name: s.name,
      label: s.name,
      value: s.id,
    };
  });

  const colourStyles = {
    multiValue: (styles: object, { data }: any) => {
      const color = skillOptions.find(
        (option) => option.name === data.name,
      )?.backgroundColor;
      return {
        ...styles,
        backgroundColor: color,
      };
    },
    multiValueLabel: (styles: object, { data }): any => ({
      ...styles,
      color: skillOptions.find((option) => option.name === data.name)?.color,
      fontWeight: '900',
    }),
  };

  const loadSkills = async () => {
    const skillList = await getSkillList();
    return skillList.map((s) => {
      return {
        id: s.id,
        name: s.name,
        label: s.name,
        value: s.id,
        backgroundColor: s.backgroundColor,
        color: s.color,
      };
    });
  };

  useEffect(() => {
    loadSkills().then((data) => {
      setSkillOptions(data);
    });
  }, []);

  return (
    <Select
      isMulti
      options={skillOptions}
      onChange={onChangeSkills}
      defaultValue={ops}
      styles={colourStyles}
      isDisabled={disabled}
    />
  );
}
