import { GroupData } from '~~/models/GroupData';
import { Query } from '~~/models/Post';

const usersGroupIds = await GroupData.getGroupsByUserId(useUser().value.id);
const groupIds = usersGroupIds.map((group) => group.id).toString();

const userOrGroup = `user_author.eq.${
  useUser().value.id
},group_author.in.(${groupIds.toString()})`;
export const isUserOrInGroup: Query = (q) => q.or(userOrGroup);
