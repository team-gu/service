import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { AdminMenuSidebarLeft } from '@organisms';
import { Project } from '@utils/type';
import { ADMIN_MENU_CONTENT } from '@utils/constants';
import { AdminProjectManage } from '@organisms';
import { DUMMY_PROJECTS } from '@utils/dummy';
import AdminDashboard from '../AdminDashboard';

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
    // TODO: 서버에서 프로젝트 가져오기
    const p = DUMMY_PROJECTS;
    setProjects(p);
  };

  return (
    <Wrapper>
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
            [ADMIN_MENU_CONTENT[1]]: (<AdminDashboard />),
            [ADMIN_MENU_CONTENT[2]]: <div>회원 관리</div>,
            [ADMIN_MENU_CONTENT[3]]: <div>팀 관리</div>,
            [ADMIN_MENU_CONTENT[4]]: <div>공지사항 관리</div>,
          }[ADMIN_MENU_CONTENT[selectedMenu]]
        }
      </div>
    </Wrapper>
  );
}
