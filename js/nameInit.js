let _arrFirst = ["赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", "褚", "卫", "蒋", "沈", "韩", "杨"];
let _arrSecond = ["彪", "巨昆", "锐", "花", "小小", "撒撒", "萧", "慕", "紫韵", "娜", "怜花", "月", "风", "云", "霜", "伟", "岩"];

function initName() {
    let fir_length = _arrFirst.length;
    let last_length = _arrSecond.length;
    let fir_name = _arrFirst[Math.floor(Math.random() * fir_length)];
    let last_name = _arrSecond[Math.floor(Math.random() * last_length)];
    return fir_name + last_name;
}