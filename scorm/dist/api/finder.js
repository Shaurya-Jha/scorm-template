export function findAPI(win) {
    let depth = 0;
    while (win && depth < 10) {
        if (win.API_1484_11)
            return win.API_1484_11;
        if (win.parent === win)
            break;
        win = win.parent;
        depth++;
    }
    return null;
}
//# sourceMappingURL=finder.js.map