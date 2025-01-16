import React from 'react';
import { mockData } from './data';
import { RiskRatingBarChart } from './components/RiskRatingBarChart';
import { StackedRiskChart } from './components/StackedRiskChart';
import { ApprovalPieChart } from './components/ApprovalPieChart';
import { TimelineChart } from './components/TimelineChart';
import { ScanFindingsChart } from './components/ScanFindingsChart';
import { BarChart2, PieChart, LineChart, ScatterChart } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Survey Data Analysis Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Platform Risk Rating Distribution</h2>
            </div>
            <RiskRatingBarChart data={mockData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Risk Rating Comparison</h2>
            </div>
            <StackedRiskChart data={mockData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Use Case Approval Distribution</h2>
            </div>
            <ApprovalPieChart data={mockData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Approval Timeline</h2>
            </div>
            <TimelineChart data={mockData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <ScatterChart className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Blackduck Findings Correlation</h2>
            </div>
            <ScanFindingsChart data={mockData} type="blackduck" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <ScatterChart className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Checkmarx Findings Correlation</h2>
            </div>
            <ScanFindingsChart data={mockData} type="checkmarx" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ScatterChart className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">SonarQube Findings Correlation</h2>
            </div>
            <ScanFindingsChart data={mockData} type="sonarqube" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;