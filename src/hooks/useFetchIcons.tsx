/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useClient } from 'cozy-client'

export const useFetchIcons = (): {
  fetchHomeIcon: () => string
  fetchNoteIcon: () => string
} => {
  const client = useClient()

  return {
    fetchHomeIcon: (): string =>
      `${client.options.uri}/assets/images/icon-cozy-home.svg`,
    fetchNoteIcon: (): string =>
      `/public/${
        (client.instanceOptions as { app: { icon: string } }).app.icon
      }`
  }
}
