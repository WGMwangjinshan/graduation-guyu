// 获取当前的时间
export const getNowTime = () => {
    var date=new Date();
    var year=date.getFullYear(); //获取当前年份
    var mon=date.getMonth()+1; //获取当前月份
    var da=date.getDate(); //获取当前日
    var h=date.getHours(); //获取小时
    var m=date.getMinutes(); //获取分钟
    var s=date.getSeconds(); //获取秒 
   var now = year+'年'+mon+'月'+da+'日'+' '+h+':'+m+':'+s;
    return now;
};