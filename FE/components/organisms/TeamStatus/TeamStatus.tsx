import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { OptionsType, OptionTypeBase } from 'react-select';

import {
  Filter,
  UserSelectAutoComplete,
  Button,
  SimpleSelect,
} from '@molecules';
import { TeamStatusCard } from '@organisms';
import { FILTER_IN_TEAMPAGE } from '@utils/constants';

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

// TODO: 타입 이게 맞나?
interface TeamStatusProps {
  teams: object[];
}

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

export default function TeamStatus({ teams }: TeamStatusProps): ReactElement {
  const [filterContents, setFilterContents] = useState(FILTER_IN_TEAMPAGE);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [sortby, setSortby] = useState('');

  const handleFilter = (filterTitle: string, eachTitle: string) => {
    const cont = { ...filterContents };
    cont[filterTitle][eachTitle] = !cont[filterTitle][eachTitle];
    setFilterContents(cont);
  };

  const handleClickCreateTeamBtn = () => {
    setShowCreateTeamModal(true);
  };

  const handleChangeUserSelect = (selectedUser: object) => {
    console.log(selectedUser);
  }

  const handleSortByChange = (newValue: string) => {
    console.log(newValue);
    setSortby(newValue);
  }

  return (
    <Wrapper>
      <div className="filter-container">
        {Object.keys(filterContents).map((each, index) => (
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
              func={handleClickCreateTeamBtn}
              width="90px"
            />
          </div>
        </div>
        {teams.map((item, index) => (
          <TeamStatusCard team={item} key={index} />
        ))}
      </div>
      {showCreateTeamModal && <div>MODAL</div>}
    </Wrapper>
  );
}
