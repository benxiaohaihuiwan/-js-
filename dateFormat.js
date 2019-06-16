/**
 * 格式化时间
 * @param date 日期
 * @param format 需要转出的格式
 * @returns {*}
 */
 function dateTimeFormatter (date, format) {
  if (!date || date === '') {
    return ''
  }
 
  if (typeof date === 'string') {
    var mts = date.match(/(\/Date\((\d+)\)\/)/)
    if (mts && mts.length >= 3) {
      date = parseInt(mts[2])
    }
  }
 
  date = new Date(date)
  if (!date || date.toUTCString() === 'Invalid Date') {
    return ''
  }
 
  var map = {
    'M': date.getMonth() + 1, // 月份
    'd': date.getDate(), // 日
    'h': date.getHours(), // 小时
    'm': date.getMinutes(), // 分
    's': date.getSeconds(), // 秒
    'q': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
 
  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    var v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })
 
  return format
}


/**
* 获取星期几
* @param date 日期字符串
* return {String}
*/

function dayFormat (date) {
  switch (new Date(date).getDay()) {
    case 0:
      return '星期日'
    case 1:
      return '星期一'
    case 2:
      return '星期二'
    case 3:
      return '星期三'
    case 4:
      return '星期四'
    case 5:
      return '星期五'
    case 6:
      return '星期六'
  }
}

/**
 * 计算两个时间差
 * @param {Data} startTime 开始时间（xxxx-xx-xx）
 * @param {Data} endTime   结束时间（xxxx-xx-xx）
 * return xx年xx天  || xx天xx小时 || xx小时xx分
 */
function getDateDiff(startTime, endTime) {
 //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
 startTime = startTime.replace(/\-/g, "/");
 endTime = endTime.replace(/\-/g, "/");
 var sTime = new Date(startTime); //开始时间
 var eTime = new Date(endTime); //结束时间
 var timeOff = eTime - sTime; //相差时间戳（毫秒数）
 var timeMinute = 1000 * 60;
 var timeHour = 1000 * 3600;
 var timeDay = 1000 * 3600 * 24;
 var timeYear = 1000 * 3600 * 24 * 365;
 if(timeOff / timeYear >= 1) {
    return parseInt(timeOff / timeYear) + "年" + parseInt((timeOff % timeYear)/timeDay) + "天";
 } else if(timeOff / timeDay >= 1) {
    return parseInt(timeOff / timeDay) + "天" + parseInt((timeOff % timeDay)/timeHour) + "小时";
 } else {
   return parseInt(timeOff / timeHour) + "小时" + parseInt((timeOff % timeHour)/timeMinute) + "分";
 }
}


/**
	获取两个日期差的天数
 */
 function dateDiff (sDate1, sDate2) {
    let arrDate, objDate1, objDate2, iDays;
    arrDate = sDate1.split('-');
    objDate1 = new Date(arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0])
    arrDate = sDate2.split('-');
    objDate2 = new Date(arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0]);
    iDays = parseInt(Math.abs(objDate1 - objDate2) / 1000 / 60 / 60 / 24); // 相差毫秒数转成天数
    return iDays;
}