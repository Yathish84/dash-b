import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SurveyData } from '../types';

interface Props {
  data: SurveyData[];
}

export const RiskRatingBarChart: React.FC<Props> = ({ data }) => {
  const chartData = ['Low', 'Medium', 'High'].map(rating => ({
    rating,
    count: data.filter(d => d.platformRiskRating === rating).length
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};