export const logger = (
  msg,
  data = null,
  style = 'color:blue;font-weight:bold;'
) => {
  // eslint-disable-next-line no-console
  console.log(`%cCollab-Edit: ${msg}`, style)
  if (data) {
    // eslint-disable-next-line no-console
    console.log(data)
  }
}
