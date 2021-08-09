import { ReactElement, useState, useEffect } from 'react';
import { OptionsType, OptionTypeBase } from 'react-select';

import { Icon } from '@atoms';
import {
  Filter,
  UserSelectTeamAutoComplete,
  Button,
  SimpleSelect,
} from '@molecules';

import { TeamStatusCard, TeamManageModal, LookupLayout } from '@organisms';
import { FILTER_TITLE } from '@utils/constants';
import { MemberOption, Team } from '@utils/type';
import { useAuthState, useAppDispatch, setLoading } from '@store';
import { getEachFiltersCodeList } from '@repository/filterRepository';
import {
  getTeams,
  getTeamsFiltered,
  getUserHasTeam,
} from '@repository/teamRepository';

const sortByOptions: OptionsType<OptionTypeBase> = [
  {
    label: '생성날짜',
    value: 'createAt',
  },
  {
    label: '팀원 수',
    value: 'numberOfMembers',
  },
  {
    label: '팀 이름',
    value: 'teamName',
  },
];

export default function TeamStatus(): ReactElement {
  const {
    user: { id: userId, projectCode, studentNumber },
  } = useAuthState();
  const [filterContents, setFilterContents] = useState<any>({});
  const [payload, setPayload] = useState<{
    project?: number;
    skills?: number[];
    studentNumber?: string;
    track?: number[];
  }>({});
  const [showTeamManageModal, setShowTeamManageModal] = useState(false);
  const [selectedTeamInfo, setSelectedTeaminfo] = useState<Team>();
  const [teams, setTeams] = useState<Team[]>([]);

  const [sortBy, setSortBy] = useState(sortByOptions[0].value);
  const [sortAsc, setSortAsc] = useState(true);
  const [containsUserId, setContainsUserId] = useState<number>();
  const [userHasTeam, setUserHasTeam] = useState<boolean>();
  const [filterClear, setFilterClear] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch Filter content
    (async () => {
      const {
        data: { data },
      } = await getEachFiltersCodeList(studentNumber);

      setFilterContents(data);
    })();

    // Set Filter criteria
    setPayload({
      project:
        projectCode?.length > 1 ? projectCode[projectCode.length - 1] : 101,
      studentNumber,
    });

    const project =
      projectCode && projectCode.length > 0
        ? projectCode[projectCode.length - 1]
        : 101;
    getUserHasTeam({
      userId,
      project: { code: project },
    }).then(({ data }) => {
      setUserHasTeam(data.data.hasTeam);
    });
  }, []);

  useEffect(() => {
    setFilterClear(false);
    renderTeams();
  }, [sortBy, sortAsc, payload]);

  useEffect(() => {
    if (containsUserId) {
      setFilterClear(true);
      setContainsUserId(undefined);
      renderTeams();
    }
  }, [containsUserId]);

  const renderTeams = () => {
    let payloadTemp = {
      project: payload.project,
      filteredSkills: payload.skills?.map((s) => ({ code: s })) || [],
      filteredTracks: payload.track?.map((t) => ({ code: t })) || [],
      sortBy,
      sortAsc,
      userId: containsUserId || 0,
      studentNumber,
    };
    console.log(payloadTemp);

    getTeamsFiltered(payloadTemp).then(({ data: { data } }) => {
      console.log('RESULT getTeamsFiltered');
      console.log(data);
      setTeams(data);
    });
  };

  const handleFilter = (title: string, code: string) => {
    const payloadTemp: any = { ...payload };
    const convertTitle: any = FILTER_TITLE[title];

    if (!payloadTemp.hasOwnProperty(convertTitle)) {
      payloadTemp[convertTitle] = [];
    }

    if (payloadTemp[convertTitle].includes(code)) {
      payloadTemp[convertTitle].splice(
        payloadTemp[convertTitle].indexOf(code),
        1,
      );
    } else {
      payloadTemp[convertTitle].push(code);
    }

    setPayload(payloadTemp);
  };

  const handleFilterArray = (title: string, arr: any) => {
    const payloadTemp: any = { ...payload };
    const convertTitle: any = FILTER_TITLE[title];

    if (arr.length === 0) {
      delete payloadTemp[FILTER_TITLE[title]];
    } else {
      payloadTemp[convertTitle] = arr.reduce(
        (acc, cur) => [...acc, cur.value],
        [],
      );
    }

    setPayload(payloadTemp);
  };

  const handleOpenManageTeamModal = () => {
    setShowTeamManageModal(true);
  };

  const handleCloseManageTeamModal = () => {
    setShowTeamManageModal(false);
    setSelectedTeaminfo(undefined);
  };

  const handleChangeUserSelect = (selectedUser: MemberOption | null) => {
    if (selectedUser) {
      setContainsUserId(selectedUser.id);
    } else {
      setContainsUserId(undefined);
    }
  };

  const handleSortByChange = (newValue: any) => {
    setSortBy(newValue.value);
  };

  const handleTeamManageModal = (team: Team) => {
    setSelectedTeaminfo(team);
    setShowTeamManageModal(true);
  };

  const handleClickSort = () => {
    setSortAsc(!sortAsc);
  };

  return (
    <LookupLayout showTeamCreateBtn={!userHasTeam}>
      <div className="filter-container">
        {filterContents &&
          Object.keys(filterContents).map(
            (each, index) =>
              (each === '스킬' || each === '트랙') &&
              (filterContents[each].length < 5 ? (
                <Filter
                  title={each}
                  contents={filterContents[each]}
                  func={handleFilter}
                  key={index}
                  clear={filterClear}
                />
              ) : (
                <Filter
                  title={each}
                  contents={filterContents[each]}
                  func={handleFilterArray}
                  key={index}
                  clear={filterClear}
                />
              )),
          )}
      </div>
      <div className="team-status-list-container">
        <div className="team-status-header">
          <UserSelectTeamAutoComplete
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
          {!userHasTeam && (
            <div>
              <Button
                title="팀 만들기"
                func={handleOpenManageTeamModal}
                width="90px"
              />
            </div>
          )}
        </div>
        {(!teams || teams.length === 0) && (
          <div>
            현재 등록된 팀이 없거나, 필터링 조건에 일치하는 팀이 없습니다.
          </div>
        )}
        {teams.map((item, index) => (
          <TeamStatusCard
            key={index}
            team={item}
            onClickTeamManage={handleTeamManageModal}
          />
        ))}
      </div>
      {showTeamManageModal && (
        <TeamManageModal
          handleClickClose={handleCloseManageTeamModal}
          fetchTeams={renderTeams}
        />
      )}
      {showTeamManageModal && selectedTeamInfo && (
        <TeamManageModal
          handleClickClose={handleCloseManageTeamModal}
          defaultValue={selectedTeamInfo}
          fetchTeams={renderTeams}
        />
      )}
    </LookupLayout>
  );
}
