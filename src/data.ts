import { SurveyData } from './types';
import { format, subDays } from 'date-fns';

const regionalChampions = ['John Smith', 'Emma Wilson', 'Michael Chen', 'Sarah Johnson'];
const submitters = ['Alice Brown', 'Bob Wilson', 'Carol Martinez', 'David Kim', 'Eva Patel'];

function generateRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateRandomComments(): string {
  const comments = [
    'Security concerns need to be addressed',
    'Pending additional documentation',
    'Implementation looks good',
    'Requires further review',
    'Code quality issues found',
    'Documentation incomplete',
    'Performance concerns noted',
    'Integration tests needed',
    'Compliance requirements met',
    'Technical debt identified'
  ];
  
  return comments[Math.floor(Math.random() * comments.length)];
}

export const mockData: SurveyData[] = Array.from({ length: 50 }, (_, i) => {
  const endDate = new Date();
  const startDate = subDays(endDate, 365);
  const date = generateRandomDate(startDate, endDate);

  return {
    id: `UC${i + 1}`,
    approvedDate: format(date, 'yyyy-MM-dd'),
    submittedBy: submitters[Math.floor(Math.random() * submitters.length)],
    useCaseTitle: `Approved Request ${i + 1}`,
    platformRiskRating: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as SurveyData['platformRiskRating'],
    useCaseRiskRating: ['Low', 'Medium', 'High', 'N/A'][Math.floor(Math.random() * 4)] as SurveyData['useCaseRiskRating'],
    useCaseApproval: ['Blank', 'Conditional', 'Approved'][Math.floor(Math.random() * 3)] as SurveyData['useCaseApproval'],
    scanReport: `https://example.com/scan/${i + 1}`,
    regionalChampion: regionalChampions[Math.floor(Math.random() * regionalChampions.length)],
    preGitHubReports: ['Yes', 'No', 'Few', 'Something'][Math.floor(Math.random() * 4)] as SurveyData['preGitHubReports'],
    postGitHubReports: ['Yes', 'No', 'Few', 'Something'][Math.floor(Math.random() * 4)] as SurveyData['postGitHubReports'],
    chasedComments: generateRandomComments(),
    blackduck: {
      pre: Math.floor(Math.random() * 100),
      post: Math.floor(Math.random() * 50),
      notes: 'Sample Blackduck notes'
    },
    checkmarx: {
      pre: Math.floor(Math.random() * 100),
      post: Math.floor(Math.random() * 50),
      notes: 'Sample Checkmarx notes'
    },
    sonarqube: {
      pre: Math.floor(Math.random() * 100),
      post: Math.floor(Math.random() * 50),
      notes: 'Sample SonarQube notes'
    }
  };
});