import { ReactElement, useState, useEffect } from 'react';
import Select, { OptionsType } from 'react-select';
import { getSkillList } from '@repository/baseRepository';
import { Skill, SkillOption } from '@utils/type';

interface SkillSelectAutoCompleteProps {
  onChangeSkills: (newValue: OptionsType<SkillOption>) => void;
  value?: Skill[] | null;
}

export default function SkillSelectAutoComplete({
  onChangeSkills,
  value,
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

  const loadSkills = async () => {
    const skillList = await getSkillList();
    return skillList.map((s) => {
      return {
        id: s.id,
        name: s.name,
        label: s.name,
        value: s.id,
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
    />
  );
}
