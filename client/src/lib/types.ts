// Logic Framework types
export interface LogicFrameworkData {
  organization: string;
  contact: string;
  email: string;
  problem: string;
  goal: string;
  targetGroup: string;
  action1: string;
  action2: string;
  action3: string;
  successIndicators: string;
  challenges?: string;
}

export interface LogicFrameworkResponse {
  html: string;
}

// SWOT Analysis types
export interface SwotAnalysisData {
  projectName: string;
  projectDescription: string;
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
}

export interface SwotAnalysisResponse {
  html: string;
}
