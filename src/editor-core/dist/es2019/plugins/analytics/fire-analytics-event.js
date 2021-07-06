import { editorAnalyticsChannel } from './consts'
export const fireAnalyticsEvent = createAnalyticsEvent => ({
  payload,
  channel = editorAnalyticsChannel
}) => {
  return createAnalyticsEvent && createAnalyticsEvent(payload).fire(channel)
}
