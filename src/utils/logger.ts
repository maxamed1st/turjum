export default function log(src: String, msg: any = "") {
  return console.log(new Date().toLocaleString("sv-sw"), src, "\n", msg);
}
export function logErr(src: string, err: any) {
  err?.status && console.error(src, err.status);
  console.error(src, err?.errors ? JSON.stringify(err.errors) : err);
}
