import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SurveyData } from '../types';

interface Props {
  data: SurveyData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export const ApprovalPieChart: React.FC<Props> = ({ data }) => {
  const chartData = ['Blank', 'Conditional', 'Approved'].map(status => ({
    name: status,
    value: data.filter(d => d.useCaseApproval === status).length
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};