(function() {
	var yui = {
		/**
		 * 获取url参数
		 * @param {String} name
		 */
		getUrlParam(name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                    var p = window.location.href.split("?")[1];
                    if (p) {
                        var r = p.match(reg);
                        if (r) {
                            return decodeURIComponent(r[2]);
                        }
                    }
                    return null;
                },
        /**
          获取cookie
        */
		getCookie: function(key) {
			//根据key值获取对应的cookie
			var data = document.cookie;
			//获取key第一次出现的位置
			var startIndex = data.indexOf(key + '=');
			//如果开始索引值大于0表示有cookie
			if(startIndex > -1) {
				//key的起始位置等于出现的位置加key的长度+1
				startIndex = startIndex + key.length + 1;
				//结束位置等于从key开始的位置之后第一次;号所出现的位置
				var endIndex = data.indexOf(';', startIndex);
				//如果未找到结尾位置则结尾位置等于cookie长度，之后的内容全部获取
				endIndex = endIndex < 0 ? data.length : endIndex;
				var str = decodeURIComponent(data.substring(startIndex, endIndex));
				return window.JSON.parse(str);
			}
			return '';
		},
		/**
		 * 设置cookie
		 * @param {String} key
		 * @param {Object} value
		 * @param {Number} time 过期时间（天）
		 */
		setCookie: function(key, value, time) {
			//默认保存时间
			var time = time;
			//获取当前时间
			var cur = new Date();
			var undefined;
			//设置指定时间
			cur.setTime(cur.getTime() + time * 24 * 3600 * 1000);
			//创建cookie  并且设置生存周期为GMT时间
			document.cookie = key + '=' + encodeURIComponent(window.JSON.stringify(value)) + ';expires=' + (time === undefined ? '' : cur.toGMTString());
		},
		
		// 删除cookie
		delCookie: function(key) {
			//获取cookie
			var data = this.getCookie(key);
			//如果获取到cookie则重新设置cookie的生存周期为过去时间
			if(data !== false) {
				this.setCookie(key, data, -1);
			}
		},
		
		setSessionStorage: function(key, value) {
			if(window.sessionStorage) {
				window.sessionStorage.setItem(key, window.JSON.stringify(value));
			}
		},
		getSessionStorage: function(key) {
			var json = "";
			if(window.sessionStorage) {
				json = window.sessionStorage.getItem(key);
			}
			return window.JSON.parse(json);
		},
		setLocalStorage: function(key, value) {
			if(window.localStorage) {
				window.localStorage.setItem(key, window.JSON.stringify(value));
			}
		},
		getLocalStorage: function(key) {
			var json = "";
			if(window.localStorage) {
				json = window.localStorage.getItem(key);
			}
			return window.JSON.parse(json);
		},
		checkMobile: function(nub) {
			if(!(/^1[0-9]{10}$/.test(nub))) {
				mui.alert('手机号码输入有误，请检查', '', '', '', 'div');
				return false;
			}
			return true;
		},
                /**
	         * 倒计时
	         * @param {Number}  time  倒计时秒数
	         * @param {Function}  tickFunc  每秒执行后回调
	         * @param {Function}  done     结束后回调
	         */
	        countDown(time, tickFunc, done){
		    let tick = ()=> {
			setTimeout(()=>{
        	            if(time>0){
        	                time--;
        	                tickFunc(time);
        	                tick();
        	            }else{
        	                done();
        	                return;
        	            }
        	        },1000);
      	            };
      	            tick();
	        },
	         
                /**
	         * 判断Android还是iOS
	         */
	        checkDevice() {
		    let u = navigator.userAgent;
		    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		    if (isAndroid) {
			return 'Android';
		    } else if (isiOS) {
			return 'iOS';
		    } else {
			return 'others';
		    }
	        },
				/**
                 * 四舍五入强制保留n位小数
                 * @param {Number}  x  操作数字
                 * @param {Number}  n 保留位数
                 */
                toDecimal(x, n) {
                    var f = parseFloat(x);
                    if (isNaN(f) && isNaN(n)) {
                        return false;
                    }
                    if (n === 0) return Math.round(x);
                    var num = Number("1E" + n);
                    var f = Math.round(x * num) / num;
                    var s = f.toString();
                    var rs = s.indexOf(".");
                    if (rs < 0) {
                        rs = s.length;
                        s += ".";
                    }
                    while (s.length <= rs + n) {
                        s += "0";
                    }
                    return s;
                },
		/**
		 * 判断两个对象是否相等
		 * @param {Object} x 对象1
		 * @param {Object} y 对象2
		 */
		equals: function(x, y) {
			var in1 = x instanceof Object;
			var in2 = y instanceof Object;
			if(!in1 || !in2) {
				return x === y;
			}
			if(Object.keys(x).length !== Object.keys(y).length) {
				return false;
			}
			for(var p in x) {
				var a = x[p] instanceof Object;
				var b = y[p] instanceof Object;
				if(a && b) {
					return this.equals(x[p], y[p]);
				} else if(x[p] !== y[p]) {
					return false;
				}
			}
			return true;
		},
		/**
		 * 获取日期时间 格式 "yyyy-MM-dd HH:MM"
		 * @param {Data} data  可选 指定时间
		 */
		getNowDate: function(data) {
			var date = data || new Date();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			var minutes = date.getMinutes();
			var seconds = date.getSeconds();
			month >= 1 && month <= 9 ? month = "0" + month : '';
			strDate >= 0 && strDate <= 9 ? strDate = "0" + strDate : '';
			minutes >= 0 && minutes <= 9 ? minutes = "0" + minutes : '';
			seconds >= 0 && seconds <= 9 ? seconds = "0" + seconds : '';
			var currentdate = date.getFullYear() + "-" + month + "-" + strDate + " " + date.getHours() + ":" + minutes + ":" + seconds;
			return currentdate;
		},
		/**
		 * 计算两个时间差
		 * @param {Data} startTime 开始时间（xxxx-xx-xx）
		 * @param {Data} endTime   结束时间（xxxx-xx-xx）
		 * return xx年xx天  || xx天xx小时 || xx小时xx分
		 */
		getDateDiff: function(startTime, endTime) {
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
		},
		/*
		 * 图片压缩，默认同比例压缩
		 * @param {Object} path 
		 *   pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
		 * @param {Object} obj
		 *   obj 对象 有 width， height， quality(0-1)
		 * @param {Object} callback
		 *   回调函数有一个参数，base64的字符串数据
		 *	调用示例	    yui.compressImg('../img/time.jpg',{width:100,height:100,quality:0.8},function(res){
					    	console.log(res);//base64的字符串数据
					    });
		 */
		compressImg: function(path, obj, callback){
			var img = new Image();
			img.src = path;
			img.onload = function(){
			var that = this;
			// 默认按比例压缩
			var w = that.width,
			    h = that.height,
			    scale = w / h;
			    w = obj.width || w;
			    h = obj.height || (w / scale);
			var quality = 0.7;  // 默认图片质量为0.7
			//生成canvas
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			// 创建属性节点
			var anw = document.createAttribute("width");
			anw.nodeValue = w;
			var anh = document.createAttribute("height");
			anh.nodeValue = h;
			canvas.setAttributeNode(anw);
			canvas.setAttributeNode(anh); 
			ctx.drawImage(that, 0, 0, w, h);
			// 图像质量
			if(obj.quality && obj.quality <= 1 && obj.quality > 0){
			 quality = obj.quality;
			}
			// quality值越小，所绘制出的图像越模糊
			var base64 = canvas.toDataURL('image/jpeg', quality );
			// 回调函数返回base64的值
			callback(base64);
			};
		}
	}
	window.yui = yui;
})()