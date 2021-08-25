import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { OptionsType, OptionTypeBase } from 'react-select';

import { UserStatusCard, LookupLayout } from '@organisms';
import {
  Filter,
  UserSelectAutoComplete,
  SimpleSelect,
  Title,
  Button,
  Pagination,
} from '@molecules';
import { Icon, Text } from '@atoms';

import useSockStomp from '@hooks/useSockStomp';

import {
  getEachFiltersCodeList,
  getEachFiltersCodeListTracks,
  postByFilteredUsers,
} from '@repository/filterRepository';
import { useAppDispatch, useAuthState, displayModal, setLoading, setPayload, useUiState } from '@store';
import { FILTER_TITLE } from '@utils/constants';
import { MemberOption } from '@utils/type';
import { ModalWrapper } from '@organisms';
import { getUserHasTeam } from '@repository/teamRepository';
import { MODALS } from '@utils/constants';

interface Users {
  id: number;
  introduce: string;
  name: string;
  skillList: string[];
  trackList: string[];
}

const sortByOptions: OptionsType<OptionTypeBase> = [
  {
    label: '이름',
    value: 'name',
  },
];

const WrapFilter = styled.div`
  padding: 10px;
  margin: 10px;
  background-color: white;
  > div > div {
    width: 100%;
  }
`;

const InviteConfirmModal = styled.div`
  position: relative;
  padding: 50px;

  .modal-header {
    text-align: center;

    .close-btn {
      position: absolute;
      right: 10px;
      top: 10px;

      i {
        font-size: 30px;
        cursor: pointer;
      }
    }
  }

  .modal-content {
    text-align: center;
    margin: 20px 0;
  }

  .modal-footer {
    text-align: center;
    margin-top: 30px;

    > button:nth-child(1) {
      margin-right: 20px;
    }
    > button:nth-child(2) {
      background-color: deeppink;
    }
  }
`;

export default function UserStatus(): ReactElement {
  const { payload } = useUiState();

  const {
    user: { id, projectCodes, studentNumber },
  } = useAuthState();

  const { handleSendInvitation, handleSendRtcLink } = useSockStomp({
    room_id: 0,
  });
  const [filterContents, setFilterContents] = useState<any>();
  
  const [users, setUsers] = useState();

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [invitedUser, setInvitedUser] = useState<Users>();
  const [isLeader, setIsLeader] = useState(false);
  const [teamId, setTeamId] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [trackList, setTrackList] = useState([]);

  const [isProjectChange, setIsProjectChange] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      dispatch(setLoading({ isLoading: true }));

      const {
        data: { data },
      } = await getEachFiltersCodeList(studentNumber);

      setFilterContents(data);

      const project = projectCodes[projectCodes.length - 1];

      if (!payload.hasOwnProperty('studentNumber')) {
        dispatch(setPayload({
          project,
          studentNumber,
          sort: 'asc',
          pageNum: 0,
          pageSize: 10,
        }));
      }

      if (project) {
        getUserHasTeam({
          userId: id,
          project: { code: project },
        }).then(({ data: { data } }) => {
          if (data.hasTeam) {
            setTeamId(data.team.id);
            setIsLeader(data.team.leaderId === id);
          }
        });
      } else {
        dispatch(
          displayModal({
            modalName: MODALS.ALERT_MODAL,
            content: '관리자에게 프로젝트 멤버 등록을 요청해주세요',
          }),
        );
      }
      dispatch(setLoading({ isLoading: false }));
    })();
  }, []);

  useEffect(() => {
    if (
      payload.hasOwnProperty('studentNumber') &&
      payload.hasOwnProperty('project')
    ) {
      (async () => {
        try {
          const {
            data: {
              data: { dataList, totPageCnt },
            },
          } = await postByFilteredUsers(payload);

          setUsers(dataList);
          setPageCount(totPageCnt);

          if (payload?.project) {
            const {
              data: { data },
            } = await getEachFiltersCodeListTracks(
              studentNumber,
              payload?.project,
            );
            setTrackList(data['트랙']);
          }
        } catch ({
          response: {
            data: { errorMessage },
          },
          status,
        }) {
          console.error(errorMessage);
          setUsers([]);
        }
      })();

      if (payload.project) {
        getUserHasTeam({
          userId: id,
          project: { code: payload.project },
        }).then(({ data: { data } }) => {
          if (data.hasTeam) {
            setIsLeader(data.team.leaderId === id);
            setTeamId(data.team.id);
          }
        });
      } else {
        dispatch(
          displayModal({
            modalName: MODALS.ALERT_MODAL,
            content: '관리자에게 프로젝트 멤버 등록을 요청해주세요',
          }),
        );
      }
    }
  }, [payload]);

  const handleToggleFilter = (title: string, code: string) => {
    if (code === '전체') {
      const payloadTemp: any = { ...payload, pageNum: 0, sort: 'asc' };
      delete payloadTemp[FILTER_TITLE[title]];
      return dispatch(setPayload(payloadTemp));
    }

    dispatch(setPayload({
      ...payload,
      [FILTER_TITLE[title]]: code,
      pageNum: 0,
      sort: 'asc',
    }));
  };

  const handleFilter = (title: string, code: string) => {
    const convertTitle: any = FILTER_TITLE[title];

    if (payload.hasOwnProperty(convertTitle)) {
      if (payload[convertTitle].includes(code)) {
        return dispatch(setPayload({ ...payload, pageNum: 0, sort: 'asc', [convertTitle]: payload[convertTitle].filter((each) => each !== code) }));
      }
      return dispatch(setPayload({ ...payload, pageNum: 0, sort: 'asc', [convertTitle]: [...payload[convertTitle], code] }));
    }
    return dispatch(setPayload({ ...payload, pageNum: 0, sort: 'asc', [convertTitle]: [code] }));
  };

  const handleFilterArray = (title: string, arr: any) => {
    const payloadTemp: any = { ...payload, pageNum: 0, sort: 'asc' };
    const convertTitle: any = FILTER_TITLE[title];

    if (arr.length === 0) {
      delete payloadTemp[FILTER_TITLE[title]];
    } else {
      payloadTemp[convertTitle] = arr.reduce(
        (acc, cur) => [...acc, cur.value],
        [],
      );
    }

    dispatch(setPayload(payloadTemp));
  };

  const handleChangeUserSelect = (selectedUser: MemberOption | null) => {
    if (selectedUser?.email) {
      return dispatch(setPayload({
        ...payload,
        email: selectedUser?.email,
        pageNum: 0,
        sort: 'asc',
      }));
    }

    const payloadTemp: any = { ...payload, pageNum: 0, sort: 'asc' };

    delete payloadTemp.email;
    dispatch(setPayload(payloadTemp));
  };

  const handleProjectChange = ({ value }: { value: number }) => {
    if (projectCodes?.includes(value)) {
      dispatch(setPayload({
        ...payload,
        project: value,
        pageNum: 0,
        sort: 'asc',
        track: undefined,
      }));
      setIsProjectChange(true);
    }
  };

  const handleClickSort = (sort: string) => {
    dispatch(setPayload({ ...payload, sort, pageNum: 0 }));
  };

  const handleCloseInviteModal = () => {
    setShowInviteModal(false);
    setInvitedUser(undefined);
  };

  const handleClickInviteIcon = (selectedUser: Users) => {
    setShowInviteModal(true);
    setInvitedUser(selectedUser);
  };

  const handleInvite = async () => {
    if (!invitedUser) {
      dispatch(
        displayModal({
          modalName: MODALS.ALERT_MODAL,
          content: `알 수 없는 에러가 발생했습니다. 새로고침한 후 다시 시도해주세요.`,
        }),
      );
      return;
    }

    handleSendInvitation(teamId, id, invitedUser.id);

    setShowInviteModal(false);
    dispatch(setPayload({ ...payload }));
  };

  return (
    <LookupLayout showTeamCreateBtn={false} >
      <div className="filter-container">
        {filterContents && (
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
            (each) =>
              each !== '기수' &&
              each !== '프로젝트' &&
              each !== '트랙' &&
              (each !== '전공/비전공' ? (
                filterContents[each].length < 5 ? (
                  <Filter
                    title={each}
                    contents={filterContents[each]}
                    func={handleFilter}
                    key={`filter-checkbox-${each}`}
                  />
                ) : (
                  <Filter
                    title={each}
                    contents={filterContents[each]}
                    func={handleFilterArray}
                    key={`filter-selectbox-${each}`}
                  />
                )
              ) : (
                <Filter
                  title={each}
                  contents={filterContents[each]}
                  func={handleToggleFilter}
                  key={`filter-radiobutton-${each}`}
                  isRadioButton
                  value={payload[FILTER_TITLE[each]]}
                />
              )),
          )}
        <Filter
          title={'트랙'}
          contents={trackList}
          func={handleFilterArray}
          isChange={isProjectChange}
          setIsChange={setIsProjectChange}
        />
      </div>
      <div className="team-status-list-container">
        <div className="team-status-header">
          <UserSelectAutoComplete
            handleChangeUserSelect={handleChangeUserSelect}
            payload={payload}
          />
          <div className="sort-container">
            <div className="sort-select">
              <SimpleSelect
                options={sortByOptions}
                placeholder={'Sort by...'}
                value={sortByOptions[0]}
              />
            </div>
            <span
              className={
                'sort-icon' + (payload?.sort === 'asc' ? ' rotated' : '')
              }
            >
              <Icon
                iconName="sort"
                func={() =>
                  handleClickSort(payload?.sort === 'asc' ? 'desc' : 'asc')
                }
              />
            </span>
          </div>
        </div>

        {users && users?.length === 0 ? (
          <div className="no-list">일치하는 유저가 없습니다.</div>
        ) : (
          <>
            {users?.map((each: Users) => (
              <UserStatusCard
                key={`status-card-${each?.id}`}
                user={each}
                filterContents={filterContents}
                id={id}
                onClickInviteIcon={() => handleClickInviteIcon(each)}
                currentUserIsLeader={isLeader}
                handleSendRtcLink={handleSendRtcLink}
              />
            ))}
            {pageCount >= 1 && (
              <Pagination
                pageCount={pageCount}
                previousLabel={'<'}
                nextLabel={'>'}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                breakLabel={'...'}
                onPageChange={({ selected }: { selected: number }) =>
                  dispatch(setPayload({ ...payload, pageNum: selected }))
                }
                forcePage={payload?.pageNum}
              />
            )}
          </>
        )}
      </div>
      {showInviteModal && invitedUser && (
        <ModalWrapper modalName="inviteConfirmModal">
          <InviteConfirmModal>
            <div className="modal-header">
              <Text text="팀원 초대" fontSetting="n26b" />
              <div className="close-btn">
                <Icon iconName="close" func={handleCloseInviteModal} />
              </div>
            </div>
            <div className="modal-content">
              <Text
                text={`[${invitedUser.name}]님을 팀으로 초대하시겠습니까?`}
              />
            </div>
            <div className="modal-footer">
              <Button
                title="취소"
                width="100px"
                func={handleCloseInviteModal}
              />
              <Button title="초대" width="100px" func={handleInvite} />
            </div>
          </InviteConfirmModal>
        </ModalWrapper>
      )}
    </LookupLayout>
  );
}
