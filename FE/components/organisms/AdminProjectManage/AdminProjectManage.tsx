import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Project } from '@utils/type';
import { Text, Icon } from '@atoms';
import { ProjectCard } from '@molecules';
import { AdminProjectManageModal } from '@organisms';

const Wrapper = styled.div`
  i {
    cursor: pointer;
  }
  .manage-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    > div {
      margin-right: 10px;
    }
    > i {
      font-size: 30px;
    }
  }

  .manage-content {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
`;

interface AdminProjectManageProps {
  projects: Project[];
  fetchProjects: () => void;
}

export default function AdminProjectManage({
  projects,
  fetchProjects,
}: AdminProjectManageProps): ReactElement {
  const [showManageeModal, setShowManageeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project>();

  const handleShowCreateModal = () => {
    setShowManageeModal(true);
  };

  const handleShowDeleteModal = () => {
    console.log('DELETE MODAL');
  };

  const handleShowEditModal = (p: Project) => {
    setSelectedProject(p);
    setShowManageeModal(true);
  };

  const handleCloseProjectManageModal = () => {
    setShowManageeModal(false);
  };

  const handleCloseProjectManageModalAndRerender = () => {
    setShowManageeModal(false);
    fetchProjects();
  };

  return (
    <Wrapper>
      <div className="manage-header">
        <Text text="프로젝트 목록" fontSetting="n22m" />
        <Icon iconName="add_box" func={handleShowCreateModal} />
      </div>
      <div className="manage-content">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onClickDelete={handleShowDeleteModal}
            onClickEdit={() => handleShowEditModal(p)}
          />
        ))}
      </div>
      {showManageeModal && (
        <AdminProjectManageModal
          defaultValue={selectedProject}
          handleClickClose={handleCloseProjectManageModal}
          closeModalAndRerender={handleCloseProjectManageModalAndRerender}
        />
      )}
    </Wrapper>
  );
}
