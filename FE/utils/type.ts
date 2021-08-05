import { OptionsType, OptionTypeBase } from 'react-select';
import { DateTime } from 'luxon';

export interface Member {
  id: number;
  name: string;
  email: string;
  profileSrc: string;
}

export interface Skill {
  id: number;
  name: string;
  backgroundColor?: string;
  color?: string;
}

export interface Team {
  id: number;
  name: string;
  introduce: string;

  completeYN: number;
  nowNumber: number;
  maxNumber: number;

  leaderId: number;
  trackName: string;

  skills: Skill[];
  teamMembers: Member[];
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
