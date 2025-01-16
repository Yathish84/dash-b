import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SurveyData } from '../types';

interface Props {
  data: SurveyData[];
}

export const StackedRiskChart: React.FC<Props> = ({ data }) => {
  const chartData = ['Low', 'Medium', 'High'].map(platformRisk => ({
    platformRisk,
    Low: data.filter(d => d.platformRiskRating === platformRisk && d.useCaseRiskRating === 'Low').length,
    Medium: data.filter(d => d.platformRiskRating === platformRisk && d.useCaseRiskRating === 'Medium').length,
    High: data.filter(d => d.platformRiskRating === platformRisk && d.useCaseRiskRating === 'High').length,
    NA: data.filter(d => d.platformRiskRating === platformRisk && d.useCaseRiskRating === 'N/A').length,
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="platformRisk" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Low" stackId="a" fill="#82ca9d" />
          <Bar dataKey="Medium" stackId="a" fill="#8884d8" />
          <Bar dataKey="High" stackId="a" fill="#ff8042" />
          <Bar dataKey="NA" stackId="a" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};