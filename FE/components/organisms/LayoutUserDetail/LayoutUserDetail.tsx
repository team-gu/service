import { ReactElement } from 'react';
import styled from 'styled-components';
import { respondTo } from '@styles/respondTo';

interface LayoutUserDetailProps {
  children: ReactElement;
  isProject?: boolean;
}

const Wrapper = styled.div<{ isProject?: boolean }>`
  width: 60vw;
  height: fit-content;
  margin: 0 auto 20px auto;

  ${respondTo.mobile`
    width: 100%;
  `}

  .profile-container {
    ${({ theme: { flexCol } }) => flexCol('space-between')}
    height: 150px;
    margin: 30px 0px;
    position: relative;

    .photo-edit-icon {
      position: absolute;
      top: 75px;
      right: calc(50% - 55px);

      cursor: pointer;
    }
  }

  .button-container {
    ${({ theme: { flexRow } }) => flexRow()}
    button {
      width: 100%;
      height: 50px;
      border: none;
      font-size: 14px;
      font-weight: bold;
      background-color: white;
      :first-child {
        ${({
          isProject,
          theme: {
            colors: { samsungLightBlue },
          },
        }) =>
          !isProject
            ? `background-color: ${samsungLightBlue};color: white;`
            : `background-color: lightgray`}
      }
      :nth-child(2) {
        ${({
          isProject,
          theme: {
            colors: { samsungLightBlue },
          },
        }) =>
          isProject
            ? `background-color: ${samsungLightBlue};color: white;`
            : `background-color: lightgray`}
      }
    }

    margin: 20px 0px;
  }

  .typography {
    background-color: white;
    padding: 50px;

    .icons {
      ${({ theme: { flexRow } }) => flexRow('flex-end')}

      i {
        padding-left: 10px;
        cursor: pointer;
        :hover {
          opacity: 0.5;
        }
      }
    }

    .introduction {
      margin: auto;
      display: grid;
      grid-template-columns: 0.8fr 1.2fr;
      grid-template-areas: 'manifesto profileImage';
      gap: 40px;
      ${respondTo.mobile`
        grid-template-columns: 1fr;
        grid-template-areas:
          'profileImage'
          'manifesto';
      `}

      .portrait {
        width: 100% auto;
        margin-right: 15px;
        img {
          border-radius: 50%;
        }
        .basicInfo {
          margin-bottom: 20px;
        }
        .track {
          margin-bottom: 20px;
        }
        .position {
          margin-bottom: 20px;
        }
        .skills {
          margin-bottom: 20px;
          width: 100%;
          .skill-tags {
            margin-top: 5px;
            > div {
              display: inline-block;
              margin: 0 5px 5px 0px;
            }
          }
        }
        .introduce {
          margin-bottom: 20px;
        }
      }

      .manifesto {
        p {
          font-size: 20px;
          line-height: 1.4;
          width: 80%;
          & + * {
            margin-top: 1em;
          }
        }
      }
    }

    .button-right {
      text-align: end;
    }

    .projects {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-areas: 'project project project';

      ${respondTo.mobile`
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'project project';
      `}

      a {
        text-decoration: none;
        color: black;
      }
      p {
        grid-column: span 3;
        font-size: 15px;
        font-weight: 600;
        line-height: 1.4;
        width: 80%;

        ${({
          theme: {
            font: { ellipse },
          },
        }) => ellipse()}
      }

      .project {
        position: relative;
        border: 1px solid #eaeaea;
        padding: 24px;
        border-radius: 5px;
        text-align: left;
        height: 80px;
        cursor: pointer;
        flex: 1.1;
        transition: box-shadow 0.2s;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
        :hover {
          transform: scale(1.02);
          height: inherit;
        }
        .top {
          min-height: 25px;
          display: flex;
          font-size: 10px;
        }
        .middle {
          margin-bottom: 8px;
          font-size: 10px;
          ${({
            theme: {
              font: { ellipse },
            },
          }) => ellipse()}
        }
        .introduce {
          position: absolute;
        }
      }

      margin-bottom: 20px;
    }

    .awards {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-areas: 'award award award';

      ${respondTo.mobile`
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'award award';
      `}

      p {
        grid-column: span 3;
        font-size: 15px;
        font-weight: 600;
        line-height: 1.4;
        width: 80%;

        ${({
          theme: {
            font: { ellipse },
          },
        }) => ellipse()}
      }

      .award {
        position: relative;
        border: 1px solid #eaeaea;
        padding: 24px;
        border-radius: 5px;
        text-align: left;
        height: 80px;
        cursor: pointer;
        flex: 1.1;
        transition: box-shadow 0.2s;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
        :hover {
          transform: scale(1.02);
          height: inherit;
        }
        .top {
          min-height: 25px;
          display: flex;
          font-size: 10px;
        }
        .middle {
          margin-bottom: 8px;
          font-size: 10px;
          ${({
            theme: {
              font: { ellipse },
            },
          }) => ellipse()}
        }
      }
    }
  }

  .name {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
  }

  .text-area {
    border: none;
    background-color: transparent;
    resize: none;
    width: 100%;
    min-height: 200px;
  }

  .text-area-edit {
    resize: none;
    width: 100%;
    min-height: 200px;
  }
`;

export default function LyaoutUserDetail({
  children,
  isProject,
}: LayoutUserDetailProps): ReactElement {
  return <Wrapper isProject={isProject}>{children}</Wrapper>;
}
