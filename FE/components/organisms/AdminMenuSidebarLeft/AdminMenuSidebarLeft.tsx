import { ReactElement, useState } from 'react';
import styled from 'styled-components';

import { Text } from '@atoms';
import { SimpleSelect } from '@molecules';
import { Project } from '@utils/type';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 200px;

  display: flex;
  flex-direction: column;
  box-shadow: 3px 0px 5px rgba(55, 53, 47, 0.4);

  .sidebar-header {
    flex: 0 0 100px;

    display: flex;
    align-items: center;

    border: solid 2px #3848a0;
    background-color: #e8eaf6;

    .selected-project-info {
      flex: 1;
      text-align: center;
    }
  }

  .sidebar-content {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;

    background-color: #3848a0;
    color: white;
    padding-top: 60px;

    > div {
      margin-left: 20px;
      cursor: pointer;
    }
  }
`;

export const MENU_CONTENT = [
  '프로젝트 관리',
  '대시보드',
  '회원 관리',
  '팀 관리',
  '공지사항 관리',
];

interface AdminMenuSidebarLeftProps {
  changeMenu: (selectedMenu: number) => void;
  changeProject: (selectedProjectId: number) => void;
  projects: Project[];
}

export default function AdminMenuSidebarLeft({
  changeMenu,
  changeProject,
  projects,
}: AdminMenuSidebarLeftProps): ReactElement {
  const menuOptions = MENU_CONTENT.map((v, i) => {
    return { id: i, title: v, label: v, value: i };
  });

  const projectOptions = projects.map(({ id, name }) => {
    return { id, name, value: id, label: name };
  });

  const [selectedMenu, setSelectedMenu] = useState(0);
  const [selectedProject, setSelectedProject] = useState({
    ...projects[0],
    label: projects[0].name,
    value: projects[0].id,
  });
  const [clickSelectProject, setClickSelectProject] = useState(false);

  const handleChangeMenu = (index: number) => {
    setSelectedMenu(index);
    changeMenu(index);
  };

  const handleChnageSelectProject = () => {
    setClickSelectProject(!clickSelectProject);
  };

  const handleChangeProject = (project: Project) => {
    setSelectedProject({ ...project, label: project.name, value: project.id });
    changeProject(project.id);
  };

  const customStyles = {
    container: (base: any) => ({
      ...base,
      display: 'inline-block',
      width: '80%',
    }),
    valueContainer: (base: any) => ({
      ...base,
      minHeight: '10px',
    }),
    singleValue: (base: any) => ({
      ...base,
      fontSize: '14px',
    }),
    option: (base: any) => ({
      ...base,
      fontSize: '14px',
    }),
    menuList: (base: any) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    menu: (base: any) => ({
      ...base,
      marginTop: 0,
    }),
  };

  return (
    <Wrapper>
      <div className="sidebar-header">
        <div className="selected-project-info">
          <Text text="현재 선택된 프로젝트" color="gray" fontSetting="n16m" />
          {clickSelectProject ? (
            <SimpleSelect
              options={projectOptions}
              onChange={handleChangeProject}
              onBlur={handleChnageSelectProject}
              customStyles={customStyles}
              value={selectedProject}
            />
          ) : (
            <div onClick={handleChnageSelectProject}>
              <Text text={selectedProject.name} fontSetting="n20m" />
            </div>
          )}
        </div>
      </div>
      <div className="sidebar-content">
        {menuOptions.map(({ id, title }) => (
          <div onClick={() => handleChangeMenu(id)}>
            <Text
              key={id}
              text={title}
              fontSetting={id === selectedMenu ? 'n26b' : 'n16m'}
              color={id === selectedMenu ? 'white' : '#eeeeee'}
              isLineBreak
            />
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
