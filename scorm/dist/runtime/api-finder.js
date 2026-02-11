export function findAPI(win, name) {
    let tries = 0;
    while (win && tries < 10) {
        if (win[name])
            return win[name];
        win = win.parent;
        tries++;
    }
    return null;
}
//# sourceMappingURL=api-finder.js.map