import { ReactElement, useState } from 'react';
import styled from 'styled-components';

import { Text, Icon } from '@atoms';
import { Button, ProjectCard } from '@molecules';
import { AdminProjectManageModal } from '@organisms';
import { ModalWrapper } from '@organisms';
import { deleteAdminProject } from '@repository/adminRepository';
import { Project } from '@utils/type';

const Wrapper = styled.div`
  i {
    cursor: pointer;
  }
  .manage-header {
    display: flex;
    align-items: center;
    margin: 20px 0;
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

  .delete-modal-container {
    padding: 50px;

    .delete-text {
      margin-bottom: 20px;
      text-align: center;
    } 

    .delete-btns {
      text-align: center;

      button {
        width: 90px;
        margin 0 10px;
      }

      > button:nth-child(2) {
        background-color: crimson;
      }
    }
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

  const handleShowDeleteModal = (p: Project) => {
    setSelectedProject(p);
    setShowDeleteModal(true);
  };

  const handleShowEditModal = (p: Project) => {
    setSelectedProject(p);
    setShowManageeModal(true);
  };

  const handleCloseProjectManageModal = () => {
    setShowManageeModal(false);
    setSelectedProject(undefined);
  };

  const handleCloseProjectManageModalAndRerender = () => {
    setShowManageeModal(false);
    setSelectedProject(undefined);
    fetchProjects();
  };

  const handleCloseProjectDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedProject(undefined);
  };

  const handleDeleteProject = () => {
    setShowDeleteModal(false);
    setSelectedProject(undefined);

    if (selectedProject && selectedProject.id) {
      deleteAdminProject({ projectId: selectedProject.id }).then(() => {
        fetchProjects();
      });
    }
  };

  return (
    <Wrapper>
      <div className="manage-header">
        <Text text="프로젝트 목록" fontSetting="n26b" />
        <Icon iconName="add_box" func={handleShowCreateModal} />
      </div>
      <div className="manage-content">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onClickDelete={() => handleShowDeleteModal(p)}
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
      {showDeleteModal && selectedProject && (
        <ModalWrapper modalName="deleteAdminProjectModal" zIndex={101}>
          <div className="delete-modal-container">
            <div className="delete-text">
              <Text
                text={`[${selectedProject.name}] 프로젝트를 삭제하시겠습니까?`}
                fontSetting="n20m"
              />
            </div>
            <div className="delete-btns">
              <Button title="취소" func={handleCloseProjectDeleteModal} />
              <Button title="예" func={handleDeleteProject} />
            </div>
          </div>
        </ModalWrapper>
      )}
    </Wrapper>
  );
}
