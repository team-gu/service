import { OptionsType, OptionTypeBase } from 'react-select';
import { DateTime } from 'luxon';

export interface Member {
  id: number;
  name: string;
  email: string;
  profileSrc: string;
  leader: boolean;
}

export interface Skill {
  id: number;
  name: string;
  backgroundColor: string;
  color: string;
}

export interface Team {
  name: string;
  region: string;
  class: string;
  track: string;
  description: string;
  skills: Skill[];
  members: Member[];
  isCompleted: boolean;
}

export interface SkillOption extends OptionTypeBase, Skill {}

export interface MemberOption extends OptionTypeBase, Member {}

export interface Project {
  name: string;
  id: number;
  stage: string;
  category: string;
  track: string[];
  activateDate: DateTime;
  startDate: DateTime;
  endDate: DateTime;
}
