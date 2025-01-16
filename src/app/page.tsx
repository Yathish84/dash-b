'use client';

import { mockData } from '@/data';
import { ScanFindingsChart } from '@/components/ScanFindingsChart';
import { UseCaseTable } from '@/components/UseCaseTable';
import { ChartFilters } from '@/components/ChartFilters';
import { BarChart2, PieChart, LineChart, ScatterChart, Table, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { startOfMonth, subMonths, endOfMonth } from 'date-fns';
import { CombinedRiskChart } from '@/components/CombinedChart';
import { SummaryCard } from '@/components/SummaryCard';

export default function Home() {
  const [view, setView] = useState<'charts' | 'table'>('charts');
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    startOfMonth(subMonths(new Date(), 3)),
    endOfMonth(new Date())
  ]);
  const [scanFilter, setScanFilter] = useState('all');
  const [showCorrelationGuide, setShowCorrelationGuide] = useState(false);
  const [platformRisk, setPlatformRisk] = useState('');
  const [useCaseRisk, setUseCaseRisk] = useState('');
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);

  // Filter data based on date range and scan filter
  const filteredData = mockData.filter((item) => {
  const itemDate = new Date(item.approvedDate);
  const dateInRange = itemDate >= dateRange[0] && itemDate <= dateRange[1];

  if (!dateInRange) return false;

  // Apply scanFilter logic
  const scanFilterMatches = (() => {
    switch (scanFilter) {
      case 'both':
        return item.preGitHubReports === 'Yes' && item.postGitHubReports === 'Yes';
      case 'one':
        return item.preGitHubReports === 'Yes' || item.postGitHubReports === 'Yes';
      case 'none':
        return item.preGitHubReports === 'No' && item.postGitHubReports === 'No';
      default:
        return true;
    }
  })();

  if (!scanFilterMatches) return false;

  // Apply platformRisk filter
  const platformRiskMatches = platformRisk
    ? item?.platformRiskRating === platformRisk
    : true;

  if (!platformRiskMatches) return false;

  // Apply useCaseRisk filter
  const useCaseRiskMatches = useCaseRisk
    ? item?.useCaseRiskRating === useCaseRisk
    : true;

  if (!useCaseRiskMatches) return false;

  // Apply selectedUseCases filter
  const useCaseMatches = selectedUseCases.length > 0
    ? selectedUseCases.includes(item.useCaseTitle)
    : true;

  if (!useCaseMatches) return false;

  return true;
});


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">KRI Dashboard</h1>
          <div className="space-x-4">
            <button
              onClick={() => setView('charts')}
              className={`px-4 py-2 rounded ${
                view === 'charts' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'
              }`}
            >
              Charts View
            </button>
            <button
              onClick={() => setView('table')}
              className={`px-4 py-2 rounded ${
                view === 'table' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {view === 'charts' && (
          <ChartFilters
  dateRange={dateRange}
  setDateRange={setDateRange}
  scanFilter={scanFilter}
  setScanFilter={setScanFilter}
  showCorrelationGuide={showCorrelationGuide}
  setShowCorrelationGuide={setShowCorrelationGuide}
  platformRisk={platformRisk}
  setPlatformRisk={setPlatformRisk}
  useCaseRisk={useCaseRisk}
  setUseCaseRisk={setUseCaseRisk}
  selectedUseCases={selectedUseCases}
  setSelectedUseCases={setSelectedUseCases}
  useCasesList={Array.from(new Set(mockData.map(item => item.useCaseTitle)))} // Get unique use cases
/>

        )}

        {view === 'charts' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold">Application Risk Rating Distribution</h2>
              </div>
              <CombinedRiskChart data={filteredData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                
                <LayoutDashboard className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold">Approved Requests Summary</h2>
              </div>
              <SummaryCard data={mockData} />
            </div>

            {/* <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold">Use Case Approval Distribution</h2>
              </div>
              <ApprovalPieChart data={filteredData} />
            </div> */}

            {/* <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <LineChart className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold">Approval Timeline</h2>
              </div>
              <TimelineChart data={filteredData} />
            </div> */}
            <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <ScatterChart className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold">SonarQube Findings Correlation</h2>
              </div>
              <ScanFindingsChart data={filteredData} type="sonarqube" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <ScatterChart className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold">Blackduck Findings Correlation</h2>
              </div>
              <ScanFindingsChart data={filteredData} type="blackduck" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <ScatterChart className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold">Checkmarx Findings Correlation</h2>
              </div>
              <ScanFindingsChart data={filteredData} type="checkmarx" />
            </div>

            
            
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Table className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Use Case Details</h2>
            </div>
            <UseCaseTable data={mockData} />
          </div>
        )}
      </div>
    </div>
  );
}