import { useState, ReactElement, useCallback } from 'react';

import { PieChart, Pie, Sector } from 'recharts';
const data = [
  { name: '팀 완성', value: 400, color: '#0088FE' },
  { name: '팀 미완성', value: 300, color: '#FF8042' },
];

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    percent,
    payload,
  } = props;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        fill={payload.color}
        fontSize={38}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <text
        x={cx}
        y={cy}
        dy={32}
        textAnchor="middle"
        fill={payload.color}
        fontSize={26}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={payload.color}
      />
    </g>
  );
};
export default function DonutChart(): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  return (
    <PieChart width={400} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={200}
        cy={200}
        innerRadius={120}
        outerRadius={160}
        fill="#dcdcdc"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
}
