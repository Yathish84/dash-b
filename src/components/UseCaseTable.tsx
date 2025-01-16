import React, { useState } from 'react';
import { SurveyData } from '../types';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface Props {
  data: SurveyData[];
}

export const UseCaseTable: React.FC<Props> = ({ data }) => {
  const [sortField, setSortField] = useState<keyof SurveyData>('approvedDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState({
    platformRisk: '',
    useCaseRisk: '',
    approval: '',
    champion: ''
  });
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleSort = (field: keyof SurveyData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredData = data.filter(item => {
    return (
      (!filters.platformRisk || item.platformRiskRating === filters.platformRisk) &&
      (!filters.useCaseRisk || item.useCaseRiskRating === filters.useCaseRisk) &&
      (!filters.approval || item.useCaseApproval === filters.approval) &&
      (!filters.champion || item.regionalChampion === filters.champion)
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortDirection === 'asc') {
      return String(a[sortField]) > String(b[sortField]) ? 1 : -1;
    }
    return String(a[sortField]) < String(b[sortField]) ? 1 : -1;
  });

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 grid grid-cols-4 gap-4">
        <select
          className="p-2 border rounded"
          value={filters.platformRisk}
          onChange={(e) => setFilters({ ...filters, platformRisk: e.target.value })}
        >
          <option value="">All Application Risks</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          className="p-2 border rounded"
          value={filters.useCaseRisk}
          onChange={(e) => setFilters({ ...filters, useCaseRisk: e.target.value })}
        >
          <option value="">All Use Case Risks</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="N/A">N/A</option>
        </select>
        <select
          className="p-2 border rounded"
          value={filters.approval}
          onChange={(e) => setFilters({ ...filters, approval: e.target.value })}
        >
          <option value="">All Approval Status</option>
          <option value="Blank">Blank</option>
          <option value="Conditional">Conditional</option>
          <option value="Approved">Approved</option>
        </select>
        <select
          className="p-2 border rounded"
          value={filters.champion}
          onChange={(e) => setFilters({ ...filters, champion: e.target.value })}
        >
          <option value="">All Regional Champions</option>
          {Array.from(new Set(data.map(item => item.regionalChampion))).map(champion => (
            <option key={champion} value={champion}>{champion}</option>
          ))}
        </select>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 cursor-pointer" onClick={() => handleSort('approvedDate')}>
              <div className="flex items-center">
                Approved Date
                {sortField === 'approvedDate' && (
                  sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                )}
              </div>
            </th>
            <th className="p-4">Use Case Title</th>
            <th className="p-4">Application Risk</th>
            <th className="p-4">Use Case Risk</th>
            <th className="p-4">Approval Status</th>
            <th className="p-4">Regional Champion</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <React.Fragment key={item.id}>
              <tr className="border-t hover:bg-gray-50">
                <td className="p-4">{format(new Date(item.approvedDate), 'MMM dd, yyyy')}</td>
                <td className="p-4">{item.useCaseTitle}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    item.platformRiskRating === 'High' ? 'bg-red-100 text-red-800' :
                    item.platformRiskRating === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.platformRiskRating}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    item.useCaseRiskRating === 'High' ? 'bg-red-100 text-red-800' :
                    item.useCaseRiskRating === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    item.useCaseRiskRating === 'Low' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.useCaseRiskRating}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    item.useCaseApproval === 'Approved' ? 'bg-green-100 text-green-800' :
                    item.useCaseApproval === 'Conditional' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.useCaseApproval}
                  </span>
                </td>
                <td className="p-4">{item.regionalChampion}</td>
                <td className="p-4">
                  <button
                    onClick={() => setExpandedRow(expandedRow === item.id ? null : item.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {expandedRow === item.id ? 'Hide Details' : 'Show Details'}
                  </button>
                </td>
              </tr>
              {expandedRow === item.id && (
                <tr>
                  <td colSpan={7} className="p-4 bg-gray-50">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Comments & Notes</h4>
                        <p className="text-gray-700">{item.chasedComments}</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Blackduck Scan</h4>
                          <p>Pre-GitHub: {item.blackduck.pre}</p>
                          <p>Post-GitHub: {item.blackduck.post}</p>
                          <p className="text-sm text-gray-600">{item.blackduck.notes}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Checkmarx Scan</h4>
                          <p>Pre-GitHub: {item.checkmarx.pre}</p>
                          <p>Post-GitHub: {item.checkmarx.post}</p>
                          <p className="text-sm text-gray-600">{item.checkmarx.notes}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">SonarQube Scan</h4>
                          <p>Pre-GitHub: {item.sonarqube.pre}</p>
                          <p>Post-GitHub: {item.sonarqube.post}</p>
                          <p className="text-sm text-gray-600">{item.sonarqube.notes}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">GitHub Reports</h4>
                        <p>Pre-GitHub: {item.preGitHubReports}</p>
                        <p>Post-GitHub: {item.postGitHubReports}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};