const cache = {};
const themeAction = {
    grey() {
        if (!cache.grey) {
            cache.grey = import('./grey.useable.scss');
        }
        return cache.grey;
    },
    royalblue() {
        if (!cache.royalblue) {
            cache.royalblue = import('./royalblue.useable.scss');
        }
        return cache.royalblue;
    }
};
let current = null;
async function setTheme(theme, current) {
    if (themeAction[theme]) {
        const style = await themeAction[theme]();
        if (current) {
            current.unuse();
        }
        style.use();
        current = style;
    }
}
window.setTheme = setTheme;
export default setTheme;