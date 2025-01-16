import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SurveyData } from '../types';
import { parseISO, format } from 'date-fns';

interface Props {
  data: SurveyData[];
}

export const TimelineChart: React.FC<Props> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => 
    parseISO(a.approvedDate).getTime() - parseISO(b.approvedDate).getTime()
  );

  const chartData = sortedData.reduce((acc: any[], curr) => {
    const date = format(parseISO(curr.approvedDate), 'MMM yyyy');
    const existing = acc.find(item => item.date === date);
    
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    
    return acc;
  }, []);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" name="Approvals" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};