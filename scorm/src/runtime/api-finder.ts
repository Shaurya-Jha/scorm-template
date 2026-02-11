export function findAPI(win: any, name: string) {
  let tries = 0;
  while (win && tries < 10) {
    if (win[name]) return win[name];
    win = win.parent;
    tries++;
  }
  return null;
}
