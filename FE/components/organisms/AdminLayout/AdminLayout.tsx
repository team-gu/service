import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';

import {
  AdminMenuSidebarLeft,
  AdminTeamManage,
  AdminUserManage,
  AdminDashboard,
  AdminProjectManage,
  AdminProjectUserManage,
  Notice,
} from '@organisms';
import { Text } from '@atoms';
import { Project } from '@utils/type';
import { ADMIN_MENU_CONTENT } from '@utils/constants';
import { getAdminProject } from '@repository/adminRepository';
import { DateTime } from 'luxon';

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;

  .sidebar {
    flex: 0 0 200px;
  }

  .content {
    flex: auto;
    margin: 30px;
  }
`;

const DEFAULT_SELECTED_MENU =
  ADMIN_MENU_CONTENT.find(({ title }) => title === '대시보드')?.id || 0;

export default function AdminLayout(): ReactElement {
  const [selectedMenu, setSelectedMenu] = useState(DEFAULT_SELECTED_MENU);
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChangeMenu = (menuIndex: number) => {
    setSelectedMenu(menuIndex);
  };

  const handleChangeProject = (project: Project) => {
    setSelectedProject(project);
  };

  const fetchProjects = () => {
    getAdminProject().then(({ data: { data } }) => {
      const tmpProjects = data.map((p: any) => ({
        ...p,
        activeDate: p.activeDate
          ? DateTime.fromISO(p.activeDate).toFormat('yyyy-MM-dd')
          : null,
        startDate: p.startDate
          ? DateTime.fromISO(p.startDate).toFormat('yyyy-MM-dd')
          : null,
        endDate: p.endDate
          ? DateTime.fromISO(p.endDate).toFormat('yyyy-MM-dd')
          : null,
        name: `${p.stage.codeName} ${p.project.codeName} 프로젝트`,
      }));
      setProjects(tmpProjects);
      setSelectedProject(tmpProjects[tmpProjects.length - 1]);
    });
  };

  return (
    <Wrapper>
      {projects ? (
        <>
          <div className="sidebar">
            <AdminMenuSidebarLeft
              onChangeMenu={handleChangeMenu}
              onChangeProject={handleChangeProject}
              projects={projects}
              defaultSelectedMenu={DEFAULT_SELECTED_MENU}
            />
          </div>
          <div className="content">
            {
              {
                [ADMIN_MENU_CONTENT[0].id]: selectedProject && (
                  <AdminUserManage project={selectedProject} />
                ),
                [ADMIN_MENU_CONTENT[1].id]: (
                  <AdminProjectManage
                    projects={projects}
                    fetchProjects={fetchProjects}
                  />
                ),
                [ADMIN_MENU_CONTENT[2].id]: selectedProject && (
                  <AdminDashboard project={selectedProject} />
                ),
                [ADMIN_MENU_CONTENT[3].id]: selectedProject && (
                  <AdminProjectUserManage project={selectedProject} />
                ),
                [ADMIN_MENU_CONTENT[4].id]: selectedProject && (
                  <AdminTeamManage project={selectedProject} />
                ),
                [ADMIN_MENU_CONTENT[5].id]: <Notice />,
              }[ADMIN_MENU_CONTENT[selectedMenu].id]
            }
          </div>
        </>
      ) : (
        <div>
          <Text text="프로젝트를 가져오는데 실패했습니다." fontSetting="n20m" />
        </div>
      )}
    </Wrapper>
  );
}
