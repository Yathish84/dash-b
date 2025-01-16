export type RiskRating = 'Low' | 'Medium' | 'High' | 'N/A';
export type ApprovalStatus = 'Blank' | 'Conditional' | 'Approved';
export type ReportStatus = 'Yes' | 'No' | 'Few' | 'Something';

export interface SurveyData {
  id: string;
  approvedDate: string;
  submittedBy: string;
  useCaseTitle: string;
  platformRiskRating: Exclude<RiskRating, 'N/A'>;
  useCaseRiskRating: RiskRating;
  useCaseApproval: ApprovalStatus;
  scanReport: string;
  regionalChampion: string;
  preGitHubReports: ReportStatus;
  postGitHubReports: ReportStatus;
  chasedComments: string;
  blackduck: {
    pre: number;
    post: number;
    notes: string;
  };
  checkmarx: {
    pre: number;
    post: number;
    notes: string;
  };
  sonarqube: {
    pre: number;
    post: number;
    notes: string;
  };
}