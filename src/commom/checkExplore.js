export default function checkExplore() {
    var browserName = "";
    var browserInf = navigator.userAgent.toLowerCase()
    if (browserInf.indexOf('edge') >= 0) {
        browserName = 'Edge浏览器';
        return false
    } else if (browserInf.indexOf('qqbrowser') >= 0) {
        browserName = 'QQ浏览器';
        return false
    } else if (browserInf.indexOf('ubrowser') >= 0) {
        browserName = 'UC浏览器';
        return false
    } else if (browserInf.indexOf('firefox') >= 0) {
        browserName = '火狐浏览器';
        return false
    } else if (browserInf.indexOf('trident') >= 0) {
        browserName = '360浏览器';
        return false
    } else if (browserInf.indexOf('chrome') >= 0 && browserInf.indexOf('se 2.x') < 0) {
        browserName = 'Chrome浏览器';
        return true
    } else if (browserInf.indexOf('se 2.x') >= 0) {
        browserName = "搜狗浏览器";
        return false
    } else {
        browserName = '未知是什么鸟浏览器';
        return false
    }
}
