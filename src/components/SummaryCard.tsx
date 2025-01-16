import React from 'react';
import { SurveyData } from '../types';

interface Props {
  data: SurveyData[];
}

export const SummaryCard: React.FC<Props> = ({ data }) => {
  // Calculate key metrics
  const totalProjects = data.length;
  const preScanReports = data.filter(item => item.preGitHubReports === 'Yes').length;
  const postScanReports = data.filter(item => item.postGitHubReports === 'Yes').length;
  const approvedProjects = data.filter(item => item.useCaseApproval === 'Approved').length;
  const highRiskUseCases = data.filter(item => item.useCaseRiskRating === 'High').length;

  return (
    <div className="w-full ">
     
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span>Total Number of Approved Requests</span>
          <span className="text-2xl font-bold">{totalProjects}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Number of Approved Requests Submitted Pre-Scan Reports</span>
          <span className="text-2xl font-bold">{preScanReports}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Number of Approved Requests Submitted Post-Scan Reports</span>
          <span className="text-2xl font-bold">{postScanReports}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Number of Approved Approved Requests</span>
          <span className="text-2xl font-bold">{approvedProjects}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>High Risk Use Cases</span>
          <span className="text-2xl font-bold text-red-600">{highRiskUseCases}</span>
        </div>
      </div>
    </div>
  );
};
