import { useState, ReactElement } from 'react';
import { PieChart, Pie, Sector } from 'recharts';

import theme from '@styles/theme';

const COMPLETE_COLOR = '#b50b0b';

const renderActiveShape = (props: any, title?: string) => {
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
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={0}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={`${theme.colors.backgroundGray}`}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        fill={payload.name === '완료' && percent === 1 ? COMPLETE_COLOR : payload.color}
        fontSize={payload.name === '완료' && percent === 1 ? 26 : 22}
      >
        {payload.name === '완료' && percent === 1
          ? `COMPLETE`
          : `${(percent * 100).toFixed(2)}% (${payload.value}명)`}
      </text>
      <text
        x={cx}
        y={cy}
        dy={40}
        textAnchor="middle"
        fill={payload.color}
        fontSize={24}
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
      {title && (
        <text
          x={cx}
          y={cy}
          dy={160}
          textAnchor="middle"
          fill="#000"
          fontSize={18}
        >
          {title}
        </text>
      )}
    </g>
  );
};

interface BigDonutChartProps {
  data: any[];
  title?: string;
}

export default function BigDonutChart({
  data,
  title,
}: BigDonutChartProps): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={300} height={320}>
      <Pie
        activeIndex={activeIndex}
        activeShape={(props) => renderActiveShape(props, title)}
        data={data}
        cx={150}
        cy={150}
        innerRadius={90}
        outerRadius={120}
        fill="#dcdcdc"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
}
