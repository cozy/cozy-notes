export const logger = (
  msg,
  data = null,
  style = 'color:blue;font-weight:bold;'
) => {
  console.log(`%cCollab-Edit: ${msg}`, style);
  if (data) {
    console.log(data);
  }
}
