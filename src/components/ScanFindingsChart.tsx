import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Text,
  LabelList,
} from 'recharts';
import { SurveyData } from '../types';

interface Props {
  data: SurveyData[];
  type: 'blackduck' | 'checkmarx' | 'sonarqube';
}

export const ScanFindingsChart: React.FC<Props> = ({ data, type }) => {
const chartData = data.map((item) => ({
  pre: item[type].pre,
  post: item[type].post,
  name: item.useCaseTitle,
  improvement: ((item[type].pre - item[type].post) / item[type].pre * 100).toFixed(1),
  // comment: item.chasedComments || '', // Chased comments as reasons for negative improvement
  notes: item[type].notes, // Include notes for the selected tool
}));


  const maxValue = Math.max(
    ...chartData.map((item) => Math.max(item.pre || 0, item.post || 0))
  );

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-white p-3 border rounded shadow-lg">
        <p className="font-semibold">{data.name}</p>
        <p>Pre-GitHub: {data.pre} findings</p>
        <p>Post-GitHub: {data.post} findings</p>
        <p className={parseFloat(data.improvement) > 0 ? 'text-green-600' : 'text-red-600'}>
          Improvement: {data.improvement}%
        </p>
        {(data.notes && (parseFloat(data.improvement) <= 0) ) && (
          <p className="mt-2 text-sm text-gray-600">
            <strong>Notes:</strong> {data.notes}
          </p>
        )}
        {/* {data.comment && (
          <p className="mt-2 text-sm text-gray-600">
            <strong>Reason:</strong> {data.comment}
          </p>
        )} */}
      </div>
    );
  }
  return null;
};


  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <ScatterChart>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis
    type="number"
    dataKey="pre"
    name="Pre-GitHub Findings"
    label={{ value: 'Pre-GitHub Findings', position: 'bottom' }}
    domain={[0, maxValue]} // Explicit domain
  />
  <YAxis
    type="number"
    dataKey="post"
    name="Post-GitHub Findings"
    label={{ value: 'Post-GitHub Findings', angle: -90, position: 'left', offset: 20 }} // Offset added
    domain={[0, maxValue]} // Explicit domain
  />
  <Tooltip content={<CustomTooltip />} />
  <Legend />
  <ReferenceLine
    segment={[
      { x: 0, y: 0 },
      { x: maxValue, y: maxValue },
    ]}
    stroke="#666"
    strokeDasharray="3 3"
  />
  <Scatter
    name={`${type.charAt(0).toUpperCase() + type.slice(1)} Findings`}
    data={chartData}
  >
    {chartData.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={parseFloat(entry.improvement) > 0 ? '#28A745' : '#dc3545'}
      />
    ))}
    {/* <LabelList
      dataKey="improvement"
      content={(props: any) => {
        const { x, y, value } = props;
        if (parseFloat(value) <= 0) {
          return (
            <Text x={x} y={y} dy={-10} dx={10} fontSize="12" fill="#dc3545">
              Needs Attention
            </Text>
          );
        }
        return null;
      }}
    /> */}
  </Scatter>
</ScatterChart>

      </ResponsiveContainer>
    </div>
  );
};
