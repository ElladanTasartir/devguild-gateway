import { Technology } from 'src/modules/project/interfaces/technology.interface';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  github_id?: number;
  created_at: string;
  updated_at: string;
  technologies: Technology[];
}
