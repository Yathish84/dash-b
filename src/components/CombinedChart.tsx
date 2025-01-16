import React from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  Cell
} from 'recharts';
import { SurveyData } from '../types';

interface Props {
  data: SurveyData[];
}

export const CombinedRiskChart: React.FC<Props> = ({ data }) => {
  // Step 1: Aggregate data
  const chartData = ['Low', 'Medium', 'High', 'N/A'].flatMap(useCaseRisk =>
    ['Low', 'Medium', 'High'].map(platformRisk => {
      const count = data.filter(
        item =>
          item.platformRiskRating === platformRisk &&
          item.useCaseRiskRating === useCaseRisk
      ).length;

      return {
        platformRiskRating: platformRisk,
        useCaseRiskRating: useCaseRisk,
        count
      };
    })
  );

  // Step 2: Format data for visualization
  const groupedData = ['Low', 'Medium', 'High'].map(platformRisk => {
    const row: any = { platformRiskRating: platformRisk };
    chartData.forEach(item => {
      if (item.platformRiskRating === platformRisk) {
        row[item.useCaseRiskRating] = item.count;
      }
    });
    return row;
  });

  return (
    <div className="h-[400px] w-full ">
      <ResponsiveContainer>
        <BarChart data={groupedData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" label={{ value: 'Count of Use Cases', position: 'insideBottom', offset: 10 }} />
          <YAxis
            dataKey="platformRiskRating"
            type="category"
            label={{ value: 'Application Risk Rating', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          {['Low', 'Medium', 'High', 'N/A'].map((useCaseRisk, index) => (
            <Bar
              key={useCaseRisk}
              dataKey={useCaseRisk}
              stackId="a"
              name={`${useCaseRisk}`}
              fill={['#85C1E9', '#F7DC6F', '#E74C3C', '#95A5A6'][index]} // Different colors for each category
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
