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

interface DashBoardBarChartProps {
  width: number;
  height: number;
  data: TeamStatusData[];
  color: { 미소속: string; 진행중: string; 완료: string };
  legend?: boolean;
}

interface TeamStatusData {
  name: string;
  미소속: number;
  진행중: number;
  완료: number;
}

export default function DashBoardBarChart({
  data,
  width,
  height,
  color,
  legend = true,
}: DashBoardBarChartProps) {
  // TODO: 애니메이션이 mount 될 때만 발생 -> 이후에 data 바뀌어도 애니메이션 없음.
  // const chartData = useMemo(() => data.slice(), [data]);
  // 이렇게 하면 애니메이션은 나타나지만, 프로젝트를 바꿔도 반영되지 않음.
  const chartData = useMemo(() => data.slice(), []);

  return (
    <>
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

        <Bar dataKey="미소속" fill={color['미소속']} />
        <Bar dataKey="진행중" fill={color['진행중']} />
        <Bar dataKey="완료" fill={color['완료']} />
      </BarChart>
    </>
  );
}
