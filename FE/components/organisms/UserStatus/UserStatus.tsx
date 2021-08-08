import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { OptionsType, OptionTypeBase } from 'react-select';

import { UserStatusCard, LookupLayout } from '@organisms';
import {
  Filter,
  UserSelectAutoComplete,
  SimpleSelect,
  Title,
} from '@molecules';
import { Icon } from '@atoms';

import {
  getEachFiltersCodeList,
  postByFilteredUsers,
} from '@repository/filterRepository';
import { useAuthState } from '@store';
import { FILTER_TITLE, OPTIONS } from '@utils/constants';
import { MemberOption } from '@utils/type';

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
  box-shadow: 0 6px 12px 0 rgba(4, 4, 161, 0.1);
  > div > div {
    width: 100%;
  }
`;

export default function UserStatus(): ReactElement {
  const {
    user: { projectCode, studentNumber },
  } = useAuthState();
  const [filterContents, setFilterContents] = useState<any>();
  const [payload, setPayload] = useState({});

  const [sortAsc, setSortAsc] = useState(true);

  const [users, setUsers] = useState([]);
  // TODO: Search contain
  const [containsUserId, setContainsUserId] = useState<number>();

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await getEachFiltersCodeList(studentNumber);

      setFilterContents(data);
    })();

    setPayload({
      project:
        projectCode?.length > 1 ? projectCode[projectCode.length - 1] : 101,
      studentNumber,
      sort: 'asc',
    });
  }, []);

  useEffect(() => {
    if (
      payload.hasOwnProperty('studentNumber') &&
      payload.hasOwnProperty('project')
    ) {
      (async () => {
        try {
          const {
            data: { data },
          } = await postByFilteredUsers(payload);

          setUsers(data);
        } catch ({
          response: {
            data: { errorMessage },
          },
          status,
        }) {
          setUsers([]);
          // if (errorMessage === '일치하는 유저가 없습니다') {
          //   setUsers([]);
          // }
        }
      })();
    }
  }, [payload]);

  const handleToggleFilter = (title: string, code: string) => {
    if (code === '전체') {
      const payloadTemp: any = { ...payload };
      delete payloadTemp[FILTER_TITLE[title]];
      return setPayload(payloadTemp);
    }

    setPayload((prev) => ({ ...prev, [FILTER_TITLE[title]]: code }));
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

  const handleChangeUserSelect = (selectedUser: MemberOption | null) => {
    if (selectedUser) {
      setContainsUserId(selectedUser.id);
    } else {
      setContainsUserId(undefined);
    }
  };

  const handleSortByChange = ({ value }: { value: number }) => {
    if (projectCode?.includes(value)) {
      setPayload({ ...payload, project: value });
    }
  };

  const handleClickSort = (sort: string) => {
    setPayload({ ...payload, sort });
    setSortAsc(!sortAsc);
  };

  return (
    <LookupLayout>
      <div className="filter-container">
        <WrapFilter>
          <Title title="프로젝트">
            <SimpleSelect
              options={OPTIONS.slice(0, 1)} // projectCode?.length)}
              onChange={handleSortByChange}
              value={{ label: '공통', value: 101 }}
            />
          </Title>
        </WrapFilter>
        {filterContents &&
          Object.keys(filterContents).map(
            (each, index) =>
              each !== '기수' &&
              each !== '프로젝트' &&
              (each !== '전공/비전공' ? (
                filterContents[each].length < 5 ? (
                  <Filter
                    title={each}
                    contents={filterContents[each]}
                    func={handleFilter}
                    key={index}
                  />
                ) : (
                  <Filter
                    title={each}
                    contents={filterContents[each]}
                    func={handleFilterArray}
                    key={index}
                  />
                )
              ) : (
                <Filter
                  title={each}
                  contents={filterContents[each]}
                  func={handleToggleFilter}
                  key={index}
                  isRadioButton
                />
              )),
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
              <Icon
                iconName="sort"
                func={() => handleClickSort(sortAsc ? 'asc' : 'desc')}
              />
            </span>
          </div>
        </div>
        {users && users.length === 0 ? (
          <div>일치하는 유저가 없습니다.</div>
        ) : (
          users.map((each: Users) => (
            <UserStatusCard
              key={each?.id}
              user={each}
              filterContents={filterContents}
              id={each?.id}
            />
          ))
        )}
      </div>
    </LookupLayout>
  );
}
