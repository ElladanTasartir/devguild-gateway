import { Technology } from './technology.interface';

export interface Project {
  id: string;
  title: string;
  description: string;
  repository: string;
  created_at: string;
  updated_at: string;
  technologies?: Technology[];
}
