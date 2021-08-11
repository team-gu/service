import { OptionTypeBase } from 'react-select';
import { DateTime } from 'luxon';

export interface Member {
  id: number;
  name: string;
  email: string;
  img: string | null | undefined;
}

export interface Skill {
  code: number;
  codeName: string;
  backgroundColor?: string;
  color?: string;
}

export interface Team {
  id: number;
  name: string;
  introduce: string;
  completeYn: number;

  leaderId: number;
  track: Code;

  skills: Skill[];
  teamMembers: Member[];
}

export interface SkillOption extends OptionTypeBase, Skill {}

export interface MemberOption extends OptionTypeBase, Member {}

export interface Code {
  code: number;
  codeName: string;
}

export interface Project {
  name: string;
  id: number;
  stage: Code;
  project: Code;
  track: Code[];
  activeDate: DateTime;
  startDate: DateTime;
  endDate: DateTime;
}

export interface ProjectModalType {
  userId?: number;
  id: number | null;
  name: string | null;
  position: string | null;
  url: string | null;
  introduce: string | null;
}

export interface AwardModalType {
  userId?: number;
  id: number | null;
  agency: string;
  date: string;
  name: string;
  introduce: string;
}
