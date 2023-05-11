export interface Job {
  id: number;
  post: string;
  description: string;
  salary: string;
  criteria: string;
  process?: string;
  companyId: number;
  collegeId: number;
  createdAt: Date;
  updatedAt: Date;
}
