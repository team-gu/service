import { ReactElement, useState, useEffect } from 'react';
import { OptionsType, OptionTypeBase } from 'react-select';
import styled from 'styled-components';

import { TeamStatusCard, TeamManageModal, LookupLayout } from '@organisms';
import {
  Filter,
  UserSelectTeamAutoComplete,
  Button,
  SimpleSelect,
  Pagination,
  Title,
} from '@molecules';

import { Icon } from '@atoms';

import { FILTER_TITLE } from '@utils/constants';
import { MemberOption, Team } from '@utils/type';
import { setLoading, useAppDispatch, useAuthState } from '@store';
import {
  getEachFiltersCodeList,
  getEachFiltersCodeListTracks,
} from '@repository/filterRepository';
import { getTeamsFiltered, getUserHasTeam } from '@repository/teamRepository';
import { errorAlert } from '@utils/snippet';

const WrapFilter = styled.div`
  padding: 10px;
  margin: 10px;
  background-color: white;
  > div > div {
    width: 100%;
  }
`;

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

interface Payload {
  project?: number;
  skills?: number[];
  studentNumber?: string;
  track?: number[];
  pageNum?: number;
  pageSize?: number;
}

export default function TeamStatus(): ReactElement {
  const dispatch = useAppDispatch();
  const {
    user: { id: userId, projectCodes, studentNumber },
  } = useAuthState();
  const [filterContents, setFilterContents] = useState<any>({});
  const [payload, setPayload] = useState<Payload>({});
  const [showTeamManageModal, setShowTeamManageModal] = useState(false);
  const [selectedTeamInfo, setSelectedTeaminfo] = useState<Team>();
  const [teams, setTeams] = useState<Team[]>([]);

  const [sortBy, setSortBy] = useState(sortByOptions[0].value);
  const [sortAsc, setSortAsc] = useState(true);
  const [containsUserId, setContainsUserId] = useState<number>();
  const [userHasTeam, setUserHasTeam] = useState<boolean>();
  const [userTeam, setUserTeam] = useState<Team>();
  const [searchWhat, setSearchWhat] = useState<boolean>();
  const [pageCount, setPageCount] = useState(0);
  const [trackList, setTrackList] = useState([]);

  const [loadUserList, setLoadUserList] = useState(false);

  const SERACH_BY_FILTER = true;
  const SEARCH_BY_USERID = false;
  const [projectCode, setProjectCode] = useState(
    projectCodes && projectCodes.length > 0
      ? projectCodes[projectCodes.length - 1]
      : 101,
  );

  useEffect(() => {
    // Fetch Filter content
    getEachFiltersCodeList(studentNumber).then(({ data: { data } }) => {
      setFilterContents(data);
    });

    // Set Filter criteria
    setPayload({
      project:
        projectCodes?.length > 0 ? projectCodes[projectCodes.length - 1] : 101,
      studentNumber,
      pageNum: 0,
      pageSize: 10,
    });

    getUserHasTeam({
      userId,
      project: { code: projectCode },
    }).then(({ data: { data } }) => {
      setUserHasTeam(data.hasTeam);
      setUserTeam(data.team);
    });
  }, []);

  useEffect(() => {
    getUserHasTeam({
      userId,
      project: { code: projectCode },
    }).then(({ data: { data } }) => {
      setUserHasTeam(data.hasTeam);
      setUserTeam(data.team);

      dispatch(setLoading({ isLoading: true }));
      setLoadUserList(false);
      setTimeout(() => {
        setLoadUserList(true);
        dispatch(setLoading({ isLoading: false }));
      }, 100);
    });
  }, [projectCode]);

  useEffect(() => {
    renderTeams(SERACH_BY_FILTER);
    setSearchWhat(SERACH_BY_FILTER);
  }, [sortBy, sortAsc, payload]);

  useEffect(() => {
    renderTeams(SEARCH_BY_USERID);
    setSearchWhat(SEARCH_BY_USERID);
  }, [containsUserId]);

  const renderTeams = (by?: boolean) => {
    const payloadTemp = {
      project: payload.project,
      filteredSkills:
        by === SEARCH_BY_USERID
          ? []
          : payload.skills?.map((s) => ({ code: s })) || [],
      filteredTracks:
        by === SEARCH_BY_USERID
          ? []
          : payload.track?.map((t) => ({ code: t })) || [],
      sortBy,
      sortAsc,
      userId: by === SERACH_BY_FILTER ? 0 : containsUserId || 0,
      studentNumber,
      pageNum: payload?.pageNum,
      pageSize: 10,
    };

    getTeamsFiltered(payloadTemp)
      .then(
        async ({
          data: {
            data: { dataList, totPageCnt },
          },
        }) => {
          setTeams(dataList);
          setPageCount(totPageCnt);

          const {
            data: { data },
          } = await getEachFiltersCodeListTracks(studentNumber, projectCode);
          setTrackList(data['트랙']);
        },
      )
      .catch((err) => {
        errorAlert(dispatch, err);
      });

    getUserHasTeam({
      userId,
      project: { code: projectCode },
    }).then(({ data: { data } }) => {
      setUserHasTeam(data.hasTeam);
      setUserTeam(data.team);
    });
  };

  const handleProjectChange = ({ value }: { value: number }) => {
    if (projectCodes?.includes(value)) {
      setProjectCode(value);
      setPayload({ ...payload, project: value, pageNum: 0 });
    }
  };

  const handleFilter = (title: string, code: string) => {
    const payloadTemp: any = { ...payload, pageNum: 0 };
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
    const payloadTemp: any = { ...payload, pageNum: 0 };
    const convertTitle: any = FILTER_TITLE[title];

    if (arr.length === 0) {
      delete payloadTemp[FILTER_TITLE[title]];
    } else {
      payloadTemp[convertTitle] = arr.reduce(
        (acc: any, cur: any) => [...acc, cur.value],
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

  const handleSortByChange = async (newValue: any) => {
    await setPayload((prev) => ({ ...prev, pageNum: 0 }));

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
    <LookupLayout
      showTeamCreateBtn={!userHasTeam}
    >
      <div className="filter-container">
        {filterContents && filterContents['프로젝트'] && (
          <WrapFilter>
            <Title title="프로젝트">
              <SimpleSelect
                options={filterContents['프로젝트']
                  .filter(({ code }: { code: number }) =>
                    projectCodes.includes(code),
                  )
                  .reduce(
                    (
                      acc: number[],
                      { codeName, code }: { codeName: string; code: number },
                    ) => [...acc, { label: codeName, value: code }],
                    [],
                  )}
                onChange={handleProjectChange}
                value={{
                  label: filterContents['프로젝트'].filter(
                    ({ code }: { code: number }) => projectCodes.includes(code),
                  )[projectCodes?.length - 1]?.codeName,
                  value: filterContents['프로젝트'].filter(
                    ({ code }: { code: number }) => projectCodes.includes(code),
                  )[projectCodes?.length - 1]?.code,
                }}
              />
            </Title>
          </WrapFilter>
        )}
        {filterContents &&
          Object.keys(filterContents).map(
            (each, index) =>
              each === '스킬' &&
              (filterContents[each].length < 5 ? (
                <Filter
                  title={each}
                  contents={filterContents[each]}
                  func={handleFilter}
                  key={index}
                  clear={searchWhat === SEARCH_BY_USERID}
                />
              ) : (
                <Filter
                  title={each}
                  contents={filterContents[each]}
                  func={handleFilterArray}
                  key={index}
                  clear={searchWhat === SEARCH_BY_USERID}
                />
              )),
          )}
        <Filter title={'트랙'} contents={trackList} func={handleFilterArray} />
      </div>
      <div className="team-status-list-container">
        <div className="team-status-header">
          {loadUserList && payload.project && (
            <UserSelectTeamAutoComplete
              projectCode={payload.project}
              handleChangeUserSelect={handleChangeUserSelect}
              clear={searchWhat === SERACH_BY_FILTER}
            />
          )}

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
            <Button
              title="팀 만들기"
              func={handleOpenManageTeamModal}
              width="90px"
            />
          )}
        </div>

        {userTeam && (
          <>
            <Title title="나의 팀">
              <TeamStatusCard
                team={userTeam}
                onClickTeamManage={handleTeamManageModal}
              />
            </Title>
            <hr />
          </>
        )}
        {!teams || (teams && teams.length === 0) ? (
          <div className="no-list">
            현재 등록된 팀이 없거나, 필터링 조건에 일치하는 팀이 없습니다.
          </div>
        ) : (
          <>
            {teams
              .filter(({ id }) => id !== userTeam?.id)
              .map((item, index) => (
                <TeamStatusCard
                  key={index}
                  team={item}
                  onClickTeamManage={handleTeamManageModal}
                />
              ))}
            {pageCount >= 1 && (
              <Pagination
                pageCount={pageCount}
                previousLabel={'<'}
                nextLabel={'>'}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                breakLabel={'...'}
                onPageChange={({ selected }: { selected: number }) =>
                  setPayload((prev) => ({ ...prev, pageNum: selected }))
                }
                forcePage={payload.pageNum ? payload.pageNum : 0}
              />
            )}
          </>
        )}
      </div>
      {showTeamManageModal && (
        <TeamManageModal
          handleClickClose={handleCloseManageTeamModal}
          fetchTeams={renderTeams}
          projectCode={projectCode}
        />
      )}
      {showTeamManageModal && selectedTeamInfo && (
        <TeamManageModal
          handleClickClose={handleCloseManageTeamModal}
          defaultValue={selectedTeamInfo}
          fetchTeams={renderTeams}
          projectCode={projectCode}
        />
      )}
    </LookupLayout>
  );
}
