import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { OptionsType, OptionTypeBase } from 'react-select';

import { Icon } from '@atoms';
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
    grid-template-columns: auto 200px 100px;
    align-items: center;
    justify-items: center;
    gap: 10px;

    > div {
      width: 100%;
    }

    .sort-container {
      display: flex;
      align-items: center;
      gap: 10px;

      .sort-icon {
        flex: 1;
        transform-origin: center;
        transition: all 0.3s ease-in;
      }
      .rotated {
        transform: rotate(0.5turn);
      }

      .sort-select {
        flex: 9;
      }
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
    label: '팀 이름',
    value: 'etc',
  },
];

export default function TeamStatus(): ReactElement {
  const [filterContents, setFilterContents] = useState(FILTER_IN_TEAMPAGE);
  const [showTeamManageModal, setShowTeamManageModal] = useState(false);
  const [selectedTeamInfo, setSelectedTeaminfo] = useState<Team>();
  const [teams, setTeams] = useState<Team[]>([]);

  const [sortBy, setSortBy] = useState(sortByOptions[0].value);
  const [sortAsc, setSortAsc] = useState(true);
  const [containsUserId, setContainsUserId] = useState<number>();

  // when initial render
  useEffect(() => {
    renderTeams(sortBy, sortAsc, containsUserId);
  }, []);

  // when change sortBy or sortAsc
  useEffect(() => {
    renderTeams(sortBy, sortAsc, containsUserId);
  }, [sortBy, sortAsc]);

  const renderTeams = (
    by: string,
    asc: boolean,
    userid: number | undefined,
  ) => {
    getTeams(by, asc, userid).then((data) => {
      setTeams(data);
    });
  };

  const handleFilter = (filterTitle: string, eachTitle: string) => {
    const content = { ...filterContents };
    content[filterTitle][eachTitle] = !content[filterTitle][eachTitle];
    setFilterContents(content);
  };

  const handleOpenManageTeamModal = () => {
    setShowTeamManageModal(true);
  };
  const handleCloseManageTeamModal = () => {
    setShowTeamManageModal(false);
    setSelectedTeaminfo(undefined);
  };

  const handleChangeUserSelect = (selectedUser: object) => {
    console.log(selectedUser);
  };

  const handleSortByChange = (newValue: string) => {
    setSortBy(newValue);
  };

  const handleTeamManageModal = (team: Team) => {
    setSelectedTeaminfo(team);
    setShowTeamManageModal(true);
  };

  const handleClickSort = () => {
    setSortAsc(!sortAsc);
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
          <div className="sort-container">
            <div className="sort-select">
              <SimpleSelect
                options={sortByOptions}
                onChange={handleSortByChange}
                placeholder={'Sort by...'}
                value={sortByOptions[0]}
              />
            </div>

            <span className={'sort-icon' + (sortAsc ? '' : ' rotated')}>
              <Icon iconName="sort" func={handleClickSort} />
            </span>
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
      {showTeamManageModal && selectedTeamInfo && (
        <TeamManageModal
          handleClickClose={handleCloseManageTeamModal}
          defaultValue={selectedTeamInfo}
        />
      )}
    </Wrapper>
  );
}
