import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface TeamStatusBarChartProps {
  width: number;
  height: number;
  data: { name: string; 미소속: number; 진행중: number; 완료: number }[];
  color: { 미소속: string; 진행중: string; 완료: string };
  legend?: boolean;
}

export default function TeamStatusBarChart({
  data,
  width,
  height,
  color,
  legend = true,
}: TeamStatusBarChartProps) {
  const chartData = useMemo(() => data.slice(), []);

  return (
    <BarChart
      width={width}
      height={height}
      data={chartData}
      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="1 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {legend && <Legend />}

      <Bar dataKey="미소속" fill={color['미소속']} isAnimationActive />
      <Bar dataKey="진행중" fill={color['진행중']} isAnimationActive />
      <Bar dataKey="완료" fill={color['완료']} isAnimationActive />
    </BarChart>
  );
}
