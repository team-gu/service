import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { OptionsType, OptionTypeBase } from 'react-select';

import {
  Filter,
  UserSelectAutoComplete,
  Button,
  SimpleSelect,
} from '@molecules';
import { TeamStatusCard, TeamManageModal } from '@organisms';
import { getTeams } from '@repository/baseRepository';
import { FILTER_IN_TEAMPAGE } from '@utils/constants';
import { Team } from '@utils/type';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: auto;
  gap: 20px;

  .filter-container {
  }

  .team-status-header {
    display: grid;
    grid-template-columns: auto 150px 100px;
    align-items: center;
    justify-items: center;
    gap: 10px;

    > div {
      width: 100%;
    }
  }

  .team-status-list-container {
    > div {
      margin-bottom: 20px;
    }
  }
`;

const sortByOptions: OptionsType<OptionTypeBase> = [
  {
    label: '날짜',
    value: 'createAt',
  },
  {
    label: '팀원 수',
    value: 'numberOfMembers',
  },
  {
    label: '기타',
    value: 'etc',
  },
];

export default function TeamStatus(): ReactElement {
  const [filterContents, setFilterContents] = useState(FILTER_IN_TEAMPAGE);
  const [showTeamManageModal, setShowTeamManageModal] = useState(false);
  const [teamInfo, setTeaminfo] = useState<Team>();
  const [sortby, setSortby] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    getTeams().then((data) => {
      setTeams(data);
    });
  }, []);

  const handleFilter = (filterTitle: string, eachTitle: string) => {
    const content = { ...filterContents };
    content[filterTitle][eachTitle] = !content[filterTitle][eachTitle];
    setFilterContents(content);
  };

  const handleOpenManageTeamModal = () => {
    setShowTeamManageModal(true);
  }
  const handleCloseManageTeamModal = () => {
    setShowTeamManageModal(false);
    setTeaminfo(undefined);
  };

  const handleChangeUserSelect = (selectedUser: object) => {
    console.log(selectedUser);
  };

  const handleSortByChange = (newValue: string) => {
    console.log(newValue);
    setSortby(newValue);
  };

  const handleTeamManageModal = (team: Team) => {
    setTeaminfo(team);
    setShowTeamManageModal(true);
  };

  return (
    <Wrapper>
      <div className="filter-container">
        {Object.keys(FILTER_IN_TEAMPAGE).map((each, index) => (
          <Filter
            title={each}
            contents={filterContents[each]}
            func={handleFilter}
            key={index}
          />
        ))}
      </div>
      <div className="team-status-list-container">
        <div className="team-status-header">
          <UserSelectAutoComplete
            handleChangeUserSelect={handleChangeUserSelect}
          />
          <div>
            <SimpleSelect
              options={sortByOptions}
              onChange={handleSortByChange}
              placeholder={'Sort by...'}
            />
          </div>
          <div>
            <Button
              title="팀 만들기"
              func={handleOpenManageTeamModal}
              width="90px"
            />
          </div>
        </div>
        {teams.map((item, index) => (
          <TeamStatusCard
            key={index}
            team={item}
            onClickTeamManage={handleTeamManageModal}
          />
        ))}
      </div>
      {showTeamManageModal && (
        <TeamManageModal handleClickClose={handleCloseManageTeamModal} />
      )}
      {showTeamManageModal && teamInfo && (
        <TeamManageModal
          handleClickClose={handleCloseManageTeamModal}
          defaultValue={teamInfo}
        />
      )}
    </Wrapper>
  );
}
