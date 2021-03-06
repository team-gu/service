import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { saveItem, loadItem, removeItem } from '@utils/storage';

import {
  AdminMenuSidebarLeft,
  AdminTeamManage,
  AdminUserManage,
  AdminDashboard,
  AdminProjectManage,
  AdminProjectUserManage,
  Notice,
  NoticeEdit,
  NoticeDetail,
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

export default function AdminLayout(): ReactElement {
  const tabNum = loadItem('adminPageTab');
  const DEFAULT_SELECTED_MENU = tabNum
    ? Number(tabNum)
    : ADMIN_MENU_CONTENT.find(({ title }) => title === '대시보드')?.id || 0;

  const [selectedMenu, setSelectedMenu] = useState(DEFAULT_SELECTED_MENU);
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [projects, setProjects] = useState<Project[]>([]);

  const [editNotice, setEditNotice] = useState(false);
  const [editValue, setEditValue] = useState(-1);
  const [detailValue, setDetailValue] = useState(-1);

  useEffect(() => {
    fetchProjects();
    if (tabNum) {
      removeItem('adminPageTab');
    }
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

  const getNoticePage = () => {
    if (editNotice) {
      saveItem('adminPageTab', 5);
      return (
        <NoticeEdit
          edit={editNotice}
          setEditNotice={setEditNotice}
          editValue={editValue}
        />
      );
    }
    if (detailValue >= 0) {
      saveItem('adminPageTab', 5);
      return (
        <NoticeDetail
          detailValue={detailValue}
          setDetailValue={setDetailValue}
        />
      );
    }
    return (
      <Notice
        edit={editNotice}
        setEditNotice={setEditNotice}
        setEditValue={setEditValue}
        setDetailValue={setDetailValue}
      />
    );
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
              defaultSelectedMenu={selectedMenu}
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
                [ADMIN_MENU_CONTENT[5].id]: getNoticePage(),
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
