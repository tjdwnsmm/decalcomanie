import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

interface PieChartComponentProps {
  data: {
    id: string;
    name: string;
    value: number;
    color: string;
  }[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  const totalSum = data.reduce((sum, entry) => sum + entry.value, 0);

  const adjustedData = data.map((entry) => ({
    ...entry,
    value: (entry.value / totalSum) * 100,
  }));

  return (
    <PieChart width={300} height={300}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={adjustedData}
        cx={150}
        cy={150}
        outerRadius={80}
        fill="#8884d8"
        label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
          const RADIAN = Math.PI / 180;
          const radius = 24 + innerRadius + (outerRadius - innerRadius);
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              x={x}
              y={y}
              fontSize={'12px'}
              fontWeight={'500'}
              fill="var(--primary-color)"
              textAnchor={x > cx ? 'start' : 'end'}
              dominantBaseline="central"
            >
              {data[index].name.length > 5
                ? data[index].name.slice(0, 4) + '...'
                : data[index].name}
            </text>
          );
        }}
      >
        {adjustedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} fontSize={10} />
        ))}
      </Pie>
      <Tooltip
        formatter={(value: number) => `${value.toFixed(2)}%`}
        contentStyle={{
          fontSize: '10px',
          fontWeight: '400',
          color: 'var(--primary-color)',
          border: 'none',
        }}
      />
    </PieChart>
  );
};

export default PieChartComponent;
