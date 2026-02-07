export type IdeaStatus =
  | "pending_hod"
  | "rejected_hod"
  | "pending_md"
  | "approved"
  | "rejected_md"
  | "in_execution";

export type IdeaType =
  | "cost_savings"
  // | "process_improvement"
  // | "revenue_generation"
  // | "quality_improvement"
  // | "safety_improvement"
  | "new_product"
  | "process_enhancement"
  | "learning_and_development"
  | "others";

export type Department =
  | "sales"
  | "engineering"
  | "hr"
  | "finance"
  | "operations"
  | "marketing"
  | "it"
  | "qa"
  | "procurement";

export interface FlowNode {
  id: string;
  type: "process" | "decision" | "terminal";
  x: number;
  y: number;
  text: string;
}

export interface FlowConnection {
  id: string;
  from: string;
  to: string;
}

export interface FlowchartData {
  nodes: FlowNode[];
  connections: FlowConnection[];
}

export interface Idea {
  id: string;
  refNo: string;
  employeeId: string;
  employeeName: string;
  employeeDept: string;
  submissionDate: string;
  ideaType: IdeaType;
  functionTheme: Department;
  description: string;
  flowchart: FlowchartData | null;
  status: IdeaStatus;
  hodRemarks?: string;
  mdRemarks?: string;
  hodApprovedBy?: string;
  hodApprovedDate?: string;
  mdApprovedBy?: string;
  mdApprovedDate?: string;
}

export interface AppUser {
  id: string;
  name: string;
  dept: string;
  role: "employee" | "hod" | "md";
}

export const IDEA_TYPES: Record<IdeaType, string> = {
  cost_savings: "Cost Savings",
  // process_improvement: "Process Improvement",
  // revenue_generation: "Revenue Generation",
  // quality_improvement: "Quality Improvement",
  // safety_improvement: "Safety Improvement",
  new_product: "New Product",
  process_enhancement: "Process Enhancement",
  learning_and_development: "Learning & Development",
  others: "Others",
};

export const DEPARTMENTS: Record<Department, string> = {
  sales: "Sales",
  engineering: "Production",
  hr: "HR & Admin",
  finance: "Finance",
  operations: "Stores",
  marketing: "Marketing",
  it: "Information Technology",
  procurement: "Logistics",
  qa: "Quality Assurance",
};

export const STATUS_LABELS: Record<IdeaStatus, string> = {
  pending_hod: "Pending HOD",
  rejected_hod: "HOD Rejected",
  pending_md: "Pending MD",
  approved: "Approved",
  rejected_md: "MD Rejected",
  in_execution: "In Execution",
};
