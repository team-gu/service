import { ReactElement, useState, useEffect } from 'react';
import { OptionsType, OptionTypeBase } from 'react-select';

import { Icon } from '@atoms';
import {
  Filter,
  UserSelectAutoComplete,
  Button,
  SimpleSelect,
} from '@molecules';

import { TeamStatusCard, TeamManageModal, LookupLayout } from '@organisms';
import { FILTER_TITLE } from '@utils/constants';
import { MemberOption, Team } from '@utils/type';
import { useAuthState, useAppDispatch, setLoading } from '@store';
import { getEachFiltersCodeList } from '@repository/filterRepository';
import { getTeams, getUserHasTeam } from '@repository/teamRepository';

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
    value: 'etc',
  },
];

export default function TeamStatus(): ReactElement {
  const {
    user: { id: userId, projectCode, studentNumber },
  } = useAuthState();
  const [filterContents, setFilterContents] = useState<any>({});
  const [payload, setPayload] = useState({});
  const [showTeamManageModal, setShowTeamManageModal] = useState(false);
  const [selectedTeamInfo, setSelectedTeaminfo] = useState<Team>();
  const [teams, setTeams] = useState<Team[]>([]);

  const [sortBy, setSortBy] = useState(sortByOptions[0].value);
  const [sortAsc, setSortAsc] = useState(true);
  const [containsUserId, setContainsUserId] = useState<number>();
  const [userHasTeam, setUserHasTeam] = useState<boolean>();

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
      setUserHasTeam(data.hasTeam);
    });
  }, []);

  useEffect(() => {
    // TODO: 백엔드 API 완성되면 필터(payload) 추가해서 호출
    renderTeams(sortBy, sortAsc, containsUserId);
  }, [sortBy, sortAsc, containsUserId, payload]);

  const renderTeams = (
    by: string,
    asc: boolean,
    userid: number | undefined,
  ) => {
    dispatch(setLoading({ isLoading: true }));

    getTeams(by, asc, userid).then(({ data: { data } }) => {
      console.log(data);
      setTeams(data);
      dispatch(setLoading({ isLoading: false }));
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
              (each === '스킬' || each === '트랙') && (
                <Filter
                  title={each}
                  contents={filterContents[each]}
                  func={handleFilter}
                  key={index}
                />
              ),
          )}
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
          fetchTeams={() => renderTeams(sortBy, sortAsc, containsUserId)}
        />
      )}
      {showTeamManageModal && selectedTeamInfo && (
        <TeamManageModal
          handleClickClose={handleCloseManageTeamModal}
          defaultValue={selectedTeamInfo}
          fetchTeams={() => renderTeams(sortBy, sortAsc, containsUserId)}
        />
      )}
    </LookupLayout>
  );
}
