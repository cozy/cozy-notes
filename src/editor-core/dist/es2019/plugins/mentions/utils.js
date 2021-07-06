import { INVITE_ITEM_DESCRIPTION } from './ui/InviteItem'
export const isTeamType = userType => userType === 'TEAM'
export const isTeamStats = stat => stat && !isNaN(stat.teamMentionDuration)
export const isInviteItem = mention =>
  mention && mention.id === INVITE_ITEM_DESCRIPTION.id
