import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { MarginFrame } from '../../../style';

export interface SeasonSuitability {
  season: string;
  degree: number;
}

interface SeasonSuitabilityChartProps {
  data: SeasonSuitability[];
}

const SeasonSuitabilityChart: React.FC<SeasonSuitabilityChartProps> = ({
  data,
}) => {
  return (
    <MarginFrame margin="-10px 0 20px 0px">
      <BarChart
        width={360}
        height={200}
        data={data}
        margin={{ top: 20, right: 50, left: 0, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={false}
          vertical={false}
        />
        <XAxis dataKey="season" />
        <YAxis hide />
        <Tooltip
          formatter={(value: number) => `${value.toFixed(2)}%`}
          contentStyle={{
            fontWeight: '400',
            color: 'var(--primary-color)',
            border: 'none',
          }}
        />
        <Bar dataKey="degree" fill="#8884d8" barSize={40} />
      </BarChart>
    </MarginFrame>
  );
};

export default SeasonSuitabilityChart;
