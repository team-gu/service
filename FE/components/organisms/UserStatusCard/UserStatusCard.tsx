import { ReactElement } from 'react';
import styled from 'styled-components';

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

  min-height: 200px;

  .grid-container {
    display: grid;
    grid-template-columns: 0.5fr 1.5fr;
    grid-template-rows: auto auto;

    .profiles-container {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      margin-bottom: 20px;

      .profiles {
        padding: 0 15px 0 5px;
        .profile {
          display: inline-block;
          margin: 10px;
          text-align: center;
          i {
            margin-top: 20px;
            cursor: pointer;
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
            margin-top: 10px;
            > div {
              display: inline-block;
              margin: 2px 5px;
            }
          }
        }
      }
      cursor: pointer;
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
  };
  filterContents: any;
  id: number;
  onClickInviteIcon?: () => void;
  currentUserIsLeader: boolean;
  handleSendRtcLink: (
    teamId: number,
    leaderId: number,
    inviteeId?: number,
  ) => Promise<void> | any;
}

export default function UserStatusCard({
  user: { name, introduce, trackList, skillList, id: opponentId },
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
              <ProfileImage size={80} />
              <Text text={name} />
              <Icon
                iconName="call"
                color="green"
                func={() => handleSendRtcLink(id, opponentId)}
              />
              {currentUserIsLeader && (
                <Icon iconName="person_add_alt" func={onClickInviteIcon} />
              )}
            </div>
          </div>
        </div>
        <div
          className="description-container"
          onClick={() => router.push({ pathname: `/userdetail/${opponentId}` })}
        >
          <div className="item-container">
            <div className="items">
              <Text text="트랙" color="gray" />
              <div className="items-tags">
                {filterContents &&
                  trackList?.map((each, index) => (
                    <>
                      <Tag
                        text={
                          filterContents['트랙'].find(
                            ({ code }) => code == each,
                          )?.codeName
                        }
                        key={`track-${filterContents['트랙'][index].codeName}`}
                      />
                    </>
                  ))}
              </div>
            </div>
            <div className="items">
              <Text text="기술" color="gray" />
              <div className="items-tags">
                {filterContents &&
                  skillList?.map((each, index) => (
                    <Tag
                      text={
                        filterContents['스킬'].find(({ code }) => code == each)
                          .codeName
                      }
                      key={`skill-${filterContents['스킬'][index].codeName}`}
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
