import { useMemo } from 'react';
import { Story, Meta } from '@storybook/react';
import styled from 'styled-components';
import Table from './Table';
import { DUMMY_TABLE_COLUMNS, DUMMY_TABLE_DATA } from '@utils/dummy';

const Wrapper = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export default {
  title: 'Molecules/Table',
  component: Table,
} as Meta;

const Template: Story = () => {
  const columns = useMemo(() => DUMMY_TABLE_COLUMNS, []);

  return (
    <Wrapper>
      <Table data={DUMMY_TABLE_DATA} columns={columns} />
    </Wrapper>
  );
};

export const table = Template.bind({});
