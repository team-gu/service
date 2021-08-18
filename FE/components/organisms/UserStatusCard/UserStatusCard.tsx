import { ReactElement } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { useRouter } from 'next/router';

import { Text, Icon } from '@atoms';
import { Tag, ProfileImage } from '@molecules';

const Wrapper = styled.div`
  position: relative;
  border-radius: 18px;
  background-color: white;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
  transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
  :hover {
    transform: scale(1.02);
  }
  width: calc(100% - 40px);
  padding: 20px;

  .grid-container {
    display: grid;
    grid-template-columns: 0.4fr 1.6fr;
    grid-template-rows: auto auto;

    .profiles-container {
      grid-column: 1 / 2;
      grid-row: 1 / 2;

      .profiles {
        padding: 0 15px 0 5px;
        .profile {
          ${({ theme: { flexCol } }) => flexCol()}
          margin: 10px;
          text-align: center;
          .icon-container {
            ${({ theme: { flexRow } }) => flexRow()}
            margin-top: 20px;
            padding: 5px;

            i {
              cursor: pointer;
            }

            i:not(:last-child) {
              padding-right: 5px;
            }

            i:hover {
              opacity: 0.5;
            }

            border: 3px solid
              ${({
                theme: {
                  colors: { samsungBlue },
                },
              }) => samsungBlue};
            border-radius: 30px;
          }
        }
      }
    }

    .description-container {
      grid-column: 2 / 3;
      grid-row: 1 / 3;

      .item-container {
        padding-top: 20px;

        display: grid;
        grid-template-columns: 0.75fr 1.25fr;
        grid-template-rows: auto auto;

        .items {
          min-height: 51px;
          margin-bottom: 20px;

          .items-tags {
            margin-top: 5px;
            > div {
              display: inline-block;
              margin: 0 5px 5px 0px;
            }
          }
        }
      }
    }
  }
`;

interface UserStatusCardProps {
  user: {
    name: string;
    introduce: string;
    trackList: string[];
    skillList: string[];
    id: number;
    profileUrl: string;
  };
  filterContents: any;
  id: number;
  onClickInviteIcon?: () => void;
  currentUserIsLeader: boolean;
  handleSendRtcLink: (
    from: number,
    target: number,
    isRoom?: boolean,
  ) => Promise<void> | any;
}

export default function UserStatusCard({
  user: { name, introduce, trackList, skillList, id: opponentId, profileUrl },
  filterContents,
  id,
  onClickInviteIcon,
  currentUserIsLeader,
  handleSendRtcLink,
}: UserStatusCardProps): ReactElement {
  const router = useRouter();
  return (
    <Wrapper>
      <div className="grid-container">
        <div className="profiles-container">
          <div className="profiles">
            <div className="profile">
              <ProfileImage size={80} src={profileUrl} />
              <Text text={name} />
              <div className="icon-container">
                <Icon
                  iconName="call"
                  color="green"
                  func={() => handleSendRtcLink(id, opponentId)}
                />

                {currentUserIsLeader && (
                  <Icon iconName="person_add_alt" func={onClickInviteIcon} />
                )}
                <div
                  onClick={async () =>
                    await router.push({
                      pathname: `/userdetail/[id]`,
                      query: { id: opponentId },
                    })
                  }
                >
                  <Icon iconName="info_outline" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="description-container">
          <div className="item-container">
            <div className="items">
              <Text text="트랙" color="gray" />
              <div className="items-tags">
                {filterContents &&
                  trackList?.map((each) => (
                    <>
                      <Tag
                        text={
                          filterContents['트랙'].find(
                            ({ code }) => code == each,
                          )?.codeName
                        }
                        key={`track-${
                          filterContents['트랙'].find(
                            ({ code }) => code == each,
                          ).codeName
                        }`}
                      />
                    </>
                  ))}
              </div>
            </div>
            <div className="items">
              <Text text="기술" color="gray" />
              <div className="items-tags">
                {filterContents &&
                  skillList?.map((each) => (
                    <Tag
                      text={
                        filterContents['스킬'].find(({ code }) => code == each)
                          .codeName
                      }
                      key={`skill-${
                        filterContents['스킬'].find(({ code }) => code == each)
                          .codeName
                      }`}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="description">
            <Text text="소개" color="gray" />
            <Text text={introduce} isLineBreak fontSetting="n16m" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
