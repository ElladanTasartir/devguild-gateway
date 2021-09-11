import { User } from '../../user/interfaces/user.interface';

export interface Credentials {
  user: User;
  token: string;
}
