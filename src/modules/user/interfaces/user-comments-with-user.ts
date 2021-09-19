import { UserComments } from './user-comments';
import { User } from './user.interface';

type UserWhoCommented = Pick<User, 'avatar_url' | 'username'>;

export interface UserCommentsWithUser extends UserComments {
  user_comment: UserWhoCommented;
}
