import React from 'react';
import Select from 'react-select'; // Import React-Select
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';

interface ChartFiltersProps {
  dateRange: [Date, Date];
  setDateRange: (range: [Date, Date]) => void;
  scanFilter: string;
  setScanFilter: (filter: string) => void;
  showCorrelationGuide: boolean;
  setShowCorrelationGuide: (show: boolean) => void;
  platformRisk: string;
  setPlatformRisk: (risk: string) => void;
  useCaseRisk: string;
  setUseCaseRisk: (risk: string) => void;
  selectedUseCases: string[];
  setSelectedUseCases: (useCases: string[]) => void;
  useCasesList: string[];
}

export const ChartFilters: React.FC<ChartFiltersProps> = ({
  dateRange,
  setDateRange,
  scanFilter,
  setScanFilter,
  showCorrelationGuide,
  setShowCorrelationGuide,
  platformRisk,
  setPlatformRisk,
  useCaseRisk,
  setUseCaseRisk,
  selectedUseCases,
  setSelectedUseCases,
  useCasesList,
}) => {
  const handleDateRangeChange = (months: number) => {
    const end = endOfMonth(new Date());
    const start = startOfMonth(subMonths(end, months));
    setDateRange([start, end]);
  };

  const useCaseOptions = useCasesList.map((useCase) => ({
    value: useCase,
    label: useCase,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      {/* Time Range, Scan Filter, Correlation Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => handleDateRangeChange(Number(e.target.value))}
            defaultValue="3"
          >
            <option value="1">Last Month</option>
            <option value="3">Last 3 Months</option>
            <option value="6">Last 6 Months</option>
            <option value="12">Last Year</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scan Reports Filter</label>
          <select
            className="w-full p-2 border rounded"
            value={scanFilter}
            onChange={(e) => setScanFilter(e.target.value)}
          >
            <option value="all">All Use Cases</option>
            <option value="both">Both Scans Available</option>
            <option value="one">At Least One Scan</option>
            <option value="none">No Scans</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Application Risk</label>
          <select
            className="w-full p-2 border rounded"
            value={platformRisk}
            onChange={(e) => setPlatformRisk(e.target.value)}
          >
            <option value="">All Application Risks</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Use Case Risk and Multi-Select */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Use Case Risk</label>
          <select
            className="w-full p-2 border rounded"
            value={useCaseRisk}
            onChange={(e) => setUseCaseRisk(e.target.value)}
          >
            <option value="">All Use Case Risks</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="N/A">N/A</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Use Cases</label>
          <Select
            isMulti
            options={useCaseOptions}
            value={useCaseOptions.filter((option) => selectedUseCases.includes(option.value))}
            onChange={(selected) =>
              setSelectedUseCases(selected.map((option) => option.value))
            }
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>
    </div>
  );
};
