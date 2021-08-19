import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { OptionTypeBase } from 'react-select';
import Image from 'next/image';

import { Text } from '@atoms';
import { SimpleSelect } from '@molecules';
import { Project } from '@utils/type';
import { ADMIN_MENU_CONTENT } from '@utils/constants';
import { useRouter } from 'next/dist/client/router';

const Wrapper = styled.div`
  position: fixed;
  width: 200px;
  height: 100vh;
  z-index: 50;

  display: flex;
  flex-direction: column;
  box-shadow: 3px 0px 5px rgba(55, 53, 47, 0.4);

  .sidebar-header {
    flex: 0 0 auto;

    display: flex;
    flex-direction: column;

    border: ${({
      theme: {
        colors: { samsungBlue },
      },
    }) => `solid 2px ${samsungBlue}`};
    background-color: #e8eaf6;

    .selected-project-info {
      flex: 1;
      text-align: center;
      margin: 20px 0;

      .current-project-text {
        cursor: pointer;
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 3px;
      }
    }

    .sidebar-header-menu {
      flex: 1 0 auto;
      padding: 30px 0;

      display: flex;
      flex-direction: column;
      gap: 20px;

      background-color: white;
      border-bottom: solid 2px #3848a0;

      > div {
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }

  .sidebar-content {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;

    background-color: ${({
      theme: {
        colors: { samsungBlue },
      },
    }) => samsungBlue};
    color: white;
    padding: 30px 0;

    > div {
      margin-left: 20px;
      cursor: pointer;
    }
  }

  .sidebar-footer {
    background-color: ${({
      theme: {
        colors: { samsungBlue },
      },
    }) => samsungBlue};
    ${({ theme: { flexRow } }) => flexRow()};

    .logo {
      cursor: pointer;
      position: relative;
      background-color: white;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-bottom: 20px;
    }
  }
`;

interface AdminMenuSidebarLeftProps {
  onChangeMenu: (selectedMenu: number) => void;
  onChangeProject: (selectedProject: Project) => void;
  projects: Project[];
  defaultSelectedMenu: number;
}

export default function AdminMenuSidebarLeft({
  onChangeMenu,
  onChangeProject,
  projects,
  defaultSelectedMenu,
}: AdminMenuSidebarLeftProps): ReactElement {
  const router = useRouter();
  const projectOptions = projects.map((project) => {
    return { ...project, value: project.id, label: project.name };
  });

  const [selectedMenu, setSelectedMenu] = useState(defaultSelectedMenu);
  const [selectedProject, setSelectedProject] = useState<OptionTypeBase>();
  const [clickSelectProject, setClickSelectProject] = useState(false);

  useEffect(() => {
    if (projects && projects.length > 0) {
      const projectIdx = projects.length - 1;
      setSelectedProject({
        ...projects[projectIdx],
        label: projects[projectIdx].name,
        value: projects[projectIdx].id,
      });
    }
  }, [projects]);

  const handleChangeMenu = (index: number) => {
    setSelectedMenu(index);
    onChangeMenu(index);
  };

  const handleChangeSelectProject = () => {
    setClickSelectProject(!clickSelectProject);
  };

  const handleChangeProject = (project: Project) => {
    if (project.id) {
      setSelectedProject({
        ...project,
        label: project.name,
        value: project.id,
      });
      onChangeProject(project);
    }
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

  const goHome = () => {
    router.push('/');
  };

  return (
    <Wrapper>
      <div className="sidebar-header">
        <div className="sidebar-header-menu">
          {ADMIN_MENU_CONTENT.slice(0, 2).map(({ id, title }) => (
            <div key={id} onClick={() => handleChangeMenu(id)}>
              <Text
                text={title}
                fontSetting={id === selectedMenu ? 'n22b' : 'n16m'}
                color={id === selectedMenu ? 'black' : 'gray'}
                isLineBreak
              />
            </div>
          ))}
        </div>
        <div className="selected-project-info">
          <Text text="현재 선택된 프로젝트" color="gray" fontSetting="n16m" />
          {clickSelectProject ? (
            <SimpleSelect
              options={projectOptions}
              onChange={handleChangeProject}
              onBlur={handleChangeSelectProject}
              customStyles={customStyles}
              value={selectedProject}
              autofocus={true}
            />
          ) : (
            <div
              onClick={handleChangeSelectProject}
              className="current-project-text"
            >
              <Text text={selectedProject?.name} fontSetting="n20m" />
            </div>
          )}
        </div>
      </div>
      <div className="sidebar-content">
        {ADMIN_MENU_CONTENT.slice(2).map(({ id, title }) => (
          <div key={id} onClick={() => handleChangeMenu(id)}>
            <Text
              text={title}
              fontSetting={id === selectedMenu ? 'n22b' : 'n16m'}
              color={id === selectedMenu ? 'white' : '#eeeeee'}
              isLineBreak
            />
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="logo" onClick={goHome}>
          <Image
            alt="팀구"
            src="/favicon.png"
            layout="fill"
            objectPosition="0 5px"
          />
        </div>
      </div>
    </Wrapper>
  );
}
