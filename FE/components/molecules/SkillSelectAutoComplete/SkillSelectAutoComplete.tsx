import { ReactElement, useState, useEffect } from 'react';
import Select from 'react-select';
import { getSkillList } from '@repository/baseRepository';

interface SkillSelectAutoCompleteProps {
  handleChangeSkillSelect: (newValue: object) => void;
}

export default function SkillSelectAutoComplete({
  handleChangeSkillSelect,
}: SkillSelectAutoCompleteProps): ReactElement {
  const [skillOptions, setSkillOptions] = useState([]);

  const loadSkills = async () => {
    const skillList = await getSkillList();
    const options = skillList.map((sk) => {
      return { label: sk.skill, value: sk.skill, id: sk.id };
    });
    return options;
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
      onChange={(item) => handleChangeSkillSelect(item)}
    />
  );
}
