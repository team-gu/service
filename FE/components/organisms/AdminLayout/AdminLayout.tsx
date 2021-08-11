import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';

import { AdminMenuSidebarLeft } from '@organisms';
import { Text } from '@atoms';
import { Project } from '@utils/type';
import { ADMIN_MENU_CONTENT } from '@utils/constants';
import { AdminProjectManage } from '@organisms';
import { AdminDashboard } from '@organisms';
import { getAdminProject } from '@repository/adminRepository';
import { DateTime } from 'luxon';

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  min-height: 90vh;

  .sidebar {
    flex: 0 0 200px;
  }

  .content {
    flex: auto;
  }
`;

export default function AdminLayout(): ReactElement {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [selectedProject, setSelectedProject] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChangeMenu = (menuIndex: number) => {
    setSelectedMenu(menuIndex);
  };

  const handleChangeProject = (projectId: number) => {
    setSelectedProject(projectId);
  };

  const fetchProjects = () => {
    console.log('fetchProjects');

    // const p = DUMMY_PROJECTS;
    getAdminProject().then(({ data: { data } }) => {
      setProjects(
        data.map((p: any) => ({
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
        })),
      );
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
            />
          </div>
          <div className="content">
            {
              {
                [ADMIN_MENU_CONTENT[0]]: (
                  <AdminProjectManage
                    projects={projects}
                    fetchProjects={fetchProjects}
                  />
                ),
                [ADMIN_MENU_CONTENT[1]]: <AdminDashboard />,
                [ADMIN_MENU_CONTENT[2]]: <div>회원 관리</div>,
                [ADMIN_MENU_CONTENT[3]]: <div>팀 관리</div>,
                [ADMIN_MENU_CONTENT[4]]: <div>공지사항 관리</div>,
              }[ADMIN_MENU_CONTENT[selectedMenu]]
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
