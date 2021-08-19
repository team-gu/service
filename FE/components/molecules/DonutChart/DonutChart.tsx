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
        fontSize={payload.name === '완료' && percent === 1 ? 18 : 14}
      >
        {payload.name === '완료' && percent === 1
          ? `COMPLETE`
          : `${(percent * 100).toFixed(2)}% (${payload.value}명)`}
      </text>
      <text
        x={cx}
        y={cy}
        dy={24}
        textAnchor="middle"
        fill={payload.color}
        fontSize={14}
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
      {title && (
        <text
          x={cx}
          y={cy}
          dy={100}
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

interface DonutChart {
  data: any[];
  title?: string;
}

export default function DonutChart({ data, title }: DonutChart): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={200} height={200}>
      <Pie
        activeIndex={activeIndex}
        activeShape={(props) => renderActiveShape(props, title)}
        data={data}
        cx={100}
        cy={80}
        innerRadius={55}
        outerRadius={70}
        fill="#dcdcdc"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
}
