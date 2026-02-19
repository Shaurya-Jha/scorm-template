export function findAPI(win, name) {
    let tries = 0;
    while (win && tries < 10) {
        if (win[name])
            return win[name];
        if (win.parent && win.parent !== win) {
            win = win.parent;
        }
        else if (win.opener) {
            win = win.opener;
        }
        else {
            break;
        }
        tries++;
    }
    return null;
}
// export function findAPI(win: any, name: string) {
//   let tries = 0;
//   while (win && tries < 10) {
//     if (win[name]) return win[name];
//     win = win.parent;
//     tries++;
//   }
//   return null;
// }
//# sourceMappingURL=api-finder.js.map