import { ReactElement } from 'react';
import styled from 'styled-components';

import { Project } from '@utils/type';
import { Text, Icon } from '@atoms';

const Wrapper = styled.div`
  display: inline-block;
  padding: 30px;
  border-radius: 5%;
  box-shadow: 0px 0px 5px 2px rgba(55, 53, 47, 0.2);
  width: 240px;
  height: fit-content;
  background-color: white;

  transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
  :hover {
    transform: scale(1.02);
  }

  .project-name-container {
    margin-bottom: 20px;
    div:nth-child(2) {
      line-height: 30px;
    }
  }

  .flex-container {
    display: flex;
    margin-bottom: 20px;
  }

  .project-stage-container {
    flex: 1;
    div:nth-child(2) {
      line-height: 24px;
    }
  }

  .project-category-container {
    flex: 1;
    div:nth-child(2) {
      line-height: 24px;
    }
  }

  .project-tracks-container {
    margin-bottom: 20px;
    > div:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      > div {
        word-spacing: -2px;
        margin-right: 10px;
      }
    }
  }

  .project-activate-date-container {
    margin-bottom: 20px;
    div:nth-child(2) {
      line-height: 30px;
    }
  }

  .project-period-container {
    margin-bottom: 20px;
    div:nth-child(2) {
      line-height: 26px;
    }
    div:nth-child(3) {
      line-height: 26px;
      text-align: right;
    }
  }

  .project-card-footer {
    display: block;
    margin-top: 20px;
    text-align: right;

    > i {
      margin-left: 5px;
      cursor: pointer;
    }
  }
`;

interface ProjectCardProps {
  project: Project;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export default function ProjectCard({
  project,
  onClickEdit,
  onClickDelete,
}: ProjectCardProps): ReactElement {
  return (
    <Wrapper>
      <div className="project-name-container">
        <Text text="프로젝트" color="gray" fontSetting="n12m" />
        <Text
          text={`${project.stage.codeName} ${project.project.codeName} 프로젝트`}
          fontSetting="n26b"
          isLineBreak
        />
      </div>

      <div className="flex-container">
        <div className="project-stage-container">
          <Text text="기수" color="gray" fontSetting="n12m" />
          <Text text={project.stage.codeName} fontSetting="n22m" isLineBreak />
        </div>

        <div className="project-category-container">
          <Text text="구분" color="gray" fontSetting="n12m" />
          <Text
            text={project.project.codeName}
            fontSetting="n22m"
            isLineBreak
          />
        </div>
      </div>

      <div className="project-tracks-container">
        <Text text="트랙" color="gray" fontSetting="n12m" />
        <div>
          {project.track.map((v, i) => (
            <Text key={i} text={v.codeName} fontSetting="n18m" isLineBreak />
          ))}
        </div>
      </div>

      <div className="project-activate-date-container">
        <Text text="활성화 시작 날짜" color="gray" fontSetting="n12m" />
        <Text
          text={project.activeDate ? project.activeDate : '미정'}
          fontSetting="n18m"
          isLineBreak
        />
      </div>

      <div className="project-period-container">
        <Text text="프로젝트 기간" color="gray" fontSetting="n12m" />
        <Text
          text={
            (project.startDate ? project.startDate : '미정') +
            ' ~ ' +
            (project.endDate ? project.endDate : '미정')
          }
          fontSetting="n18m"
          isLineBreak
        />
      </div>

      <div className="project-card-footer">
        <Icon iconName="edit" color="green" func={onClickEdit} />
        <Icon iconName="delete" color="crimson" func={onClickDelete} />
      </div>
    </Wrapper>
  );
}
