//1.先将时间戳转成Date对象  比如const date = new Date(value * 1000)  注：时间戳单位是秒 Date要求传毫秒
//2.使用函数  formatDate(date, 'yyyy-MM-dd hh:mm:ss')   
//非常灵活：如果是两个y则是年份的后两位  '-'可以改成'/'等

export default function formatDate(date, fmt) {     
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
}

function padLeftZero (str) {
return ('00' + str).substr(str.length);
};