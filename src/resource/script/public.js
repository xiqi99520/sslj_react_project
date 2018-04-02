import Loading from './component/loading/loading.js';
import Alert from './component/alert/alert.js';
import Success from './component/success/success.js';
import Error from './component/error/error.js';
import Sure from './component/sure/sure.js';

import {Base,Yzy} from './connect.js';
import {SetCookie,GetCookie} from "./cookie.js"
window.ws = null;
window.devices = []; // 设备列表
window.socketObj = null // 当前设备的类
window.YzyEq="";
window.eqUl=[];
window.publicEqUl=[];
window.emergencyValue=true;
window.wYzyEq=[];
window.wScene=[];
if(window.location.href.indexOf("?")>0){
	if(window.location.href.indexOf("html?")>0){
		var trueHost=(window.location.href).split("?")[0];
		var trueMsg=(window.location.href).split("#/")[1];
		window.location.href=trueHost+"#/"+trueMsg;
	}else{
		window.location.href=(window.location.href).split("?")[0];
	}
}
var path=(window.location.href).split("#/")[1].split("/")[0];
if(path=="sign"){
	 setTimeout(function(){
		 if(!$("#num").html()){
			 window.location.reload();
		 }
	 },200);
}else if(path=="recommended"){
	setTimeout(function(){
		 if(!$("#recommended").html()){
			 window.location.reload();
		 }
	 },200);
}else if(path=="signRecord"){
	 setTimeout(function(){
		 if(!$("#Wsign").html()){
			 window.location.reload();
		 }
	 },200);
}
//获取token
window.getToten=function(cThis){
	if(!GetCookie("user_id")){
		  var params = {
			      email: GetCookie("account"),
			      corp_id:  "100fa4b41cb5c000",
			      password: GetCookie("yPassword")
			    };
		  $.ajax({
			  type:"post",
			  url:Yzy+"/v2/user_auth",
			  beforeSend: function(xhr) {
		            xhr.setRequestHeader('Access-Token', GetCookie("access_token"))
		      },
			  data:JSON.stringify(params),
			  success:function(data){
				  SetCookie("access_token",data.access_token,1);
				  SetCookie("refresh_token",data.refresh_token,1);
				  SetCookie("user_id",data.user_id,1);
				  SetCookie("authorize",data.authorize,1);
				  window.getYzyDevices(cThis);
			  },
			  error:function(){
			  }
		  });
	  }else{
		  window.getYzyDevices(cThis);
	  }
}
//获取网关
window.getYzyDevices=function(cThis){
	$.ajax({
		  type:"get",
		  url:Yzy+"/v2/user/"+GetCookie("user_id")+"/subscribe/devices",
		  beforeSend: function(xhr) {
	            xhr.setRequestHeader('Access-Token', GetCookie("access_token"));
	      },
	      dataType:"json",
		  success:function(data){
			 devices = data.map(item => {
			        return {
			            device_id: item.id.toString(),
			            device_name: item.name,
			            device_mac: item.mac,
			            device_pid: item.product_id
			        }
			 });
			 if(!devices[0]){
				 $("#no_host").css("display","block");
			 }else{
				 SetCookie("hostId",data[0].id,1);
				 window.initSdk(cThis);
			 }
		  },
		  error:function(data){
			  var text=JSON.parse(data.responseText);
			  if(text.error.msg=="Access-Token Refresh"){
				  window.refreshToten();
				  return false;
			  }
			  if(text.error.msg=="Access-Token Expired"){
				  window.refreshToten();
				  return false;
			  }
			  alert(text.error.msg);
		  }
	  });
}
//初始化sdk
window.initSdk=function(cThis){
	  ws = new XSDK('mqtt', {
        type: 'app',
        host: 'ws://118.190.126.197:1884/mqtt',
        userid: GetCookie("user_id"), // 用户在云智易平台的user_id，通过获取OpenID接口获取
        authorize: GetCookie("authorize"), // 用户在云智易平台的authorize，通过获取OpenID接口获取
        keepAliveInterval: 40, // 非必填，mqtt通讯时长，默认为40s，每40s发送ping请求
    });
	  ws.on('ready', function() {
	        console.log('成功连上了')
	        ws && ws.emit('adddevices', devices) //_devices 表示用户绑定设备列表
	    });
	    ws.on('devicesready', function(devicesArray) {
	        socketObj = devicesArray[0];
	        changeSdkMsg("0800FFFFFFFFFE9D");
	        cThis.getListen();
	        cThis.getSend();
	        window.getSdkEqMsg();
	        var eqUl=[];
	        socketObj.on('data', function(data) {
	        	if (data.type === 'datapoint') {
	            	var ableData=data.data[0].value;
	            	var type=ableData.substring(0,2);
	            	switch(type){
	            	case "15":
	            		var SN=ableData.substring(14,22);
	                	SetCookie("SN",SN,1);
	            		break;
	            	case "70":
	            		window.emergency(ableData);
	            		break;
	            	case "01":
	          			var shortAddress=ableData.substring(4,8);
			      		var Endpoint=ableData.substring(8,10);
			      		var DeviceId=ableData.substring(14,18);
			      		var statu=ableData.substring(18,20);
			      		var nameLength=parseInt(ableData.substring(20,22),16);
			      		var name=ableData.substring(22,nameLength*2+22);
			      		var online=ableData.substring(nameLength*2+22,nameLength*2+24);
			      		var m=window.prePro(name);
			      		var czName=decodeURI(m);
			      		var IEEE=ableData.substring(nameLength*2+24,nameLength*2+40);
			      		var SNLength=parseInt(ableData.substring(nameLength*2+40,nameLength*2+42),16);
			      		var eqSN=ableData.substring(nameLength*2+42,(nameLength+SNLength)*2+42);
			      		var ZoneType=ableData.substring((nameLength+SNLength)*2+42,(nameLength+SNLength)*2+46);
			      		var des="";
			      		if(statu==0){
			      			des="关";
			      		}else{
			      			des="开";
			      		}
			      		var eqLi=[{
			      				"shortAddress":shortAddress,
			      				"DeviceId":DeviceId.substring(2,4)+DeviceId.substring(0,2),
			      				"name":czName,
			      				"statu":statu,
			      				"online":online,
			      				"Endpoint":Endpoint,
			      				"IEEE":IEEE,
			      				"ZoneType":ZoneType.substring(2,4)+ZoneType.substring(0,2),
			      				"toUrl":"",
			      				"all":ableData,
			      				"des":des,
			      				"click":0,
			      				"eqSN":eqSN,
			      				"onSrc":"../../../src/resource/images/index/air_pre.png",
			      				"offSrc":"../../../src/resource/images/index/air_nor.png"
			      		}];
			      		eqUl.map(function(item,index){
			      			if(item.Endpoint==Endpoint && item.IEEE==IEEE){
			      				item.shortAddress=shortAddress;
			      				item.DeviceId=DeviceId.substring(2,4)+DeviceId.substring(0,2);
			      				item.name=czName;
			      				item.statu=statu;
			      				item.online=online;
			      				item.all=ableData;
			      				item.ZoneType=ZoneType.substring(2,4)+ZoneType.substring(0,2);
			      				eqLi=null;
			      			}
			      		});
			      		if(eqLi==null){
			      		}else{
			      			eqUl=eqUl.concat(eqLi);
			      		}
			      		eqUl=window.addToUrl(eqUl);
			      		publicEqUl=eqUl;
			      		SetCookie("eqLength",eqUl.length,1);
			      		break;
	            	default:
	            		break;
	            	}
	            }
	        });
	       
	    })
}
window.getListen=function(){
}
window.getSend=function(){
}
window.getSdkEqMsg=function(){
	var opValue="0800"+GetCookie("SN")+"FE81";
	if(!GetCookie("SN")){
		opValue="0800FFFFFFFFFE81";
	}
	window.changeSdkMsg(opValue);
}
//设备名字转码
window.prePro=function(data) {
	if (data.length % 2) return '';
	var tmp='';
	for(var i=0;i<data.length;i+=2)
	{
		tmp += '%' + data.charAt(i) + data.charAt(i+1);
	}
	return tmp;
}
//字符串转16
window.stringToByte=function(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;  
    for(var i = 0; i < len; i++) {  
        c = str.charCodeAt(i);  
        if(c >= 0x010000 && c <= 0x10FFFF) {  
            bytes.push(((c >> 18) & 0x07) | 0xF0);  
            bytes.push(((c >> 12) & 0x3F) | 0x80);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000800 && c <= 0x00FFFF) {  
            bytes.push(((c >> 12) & 0x0F) | 0xE0);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000080 && c <= 0x0007FF) {  
            bytes.push(((c >> 6) & 0x1F) | 0xC0);  
            bytes.push((c & 0x3F) | 0x80);  
        } else {  
            bytes.push(c & 0xFF);  
        }  
    }  
    return bytes;  
}

//发送数据
window.changeSdkMsg=function(msg){
	var dataArr = [{
        index: 1, // 数据端点索引
        value:msg, // 数据端点值
        type: 7 // 这个要看文档上的数据端点的列表枚举，string为6
    }];
    socketObj.emit('senddata', {
        type: 'datapoint',
        data: dataArr
    }, function(res) {
        if (res.status === 0) {
        } else {
            alert("发送失败,状态:" + res.status)
        }
    });
}
window.refreshToten=function(){
	var params = {
			 "refresh_token": GetCookie("refresh_token")
		    };
	  $.ajax({
		  type:"post",
		  url:Yzy+"/v2/user/token/refresh",
		  beforeSend: function(xhr) {
	            xhr.setRequestHeader('Access-Token', GetCookie("access_token"))
	      },
		  data:JSON.stringify(params),
		  success:function(data){
			  SetCookie("access_token",data.access_token,1);
			  SetCookie("refresh_token",data.refresh_token,1);
		  },
		  error:function(data){
			  SetCookie("account","",1);
		 	  SetCookie("otherId","",1);
		 	  SetCookie("yPassword","",1);
		      SetCookie("id","",1);
		      SetCookie("telephone","",1);
		      SetCookie("username","",1);
		      SetCookie("access_token","",1);
			  SetCookie("refresh_token","",1);
			  SetCookie("user_id","",1);
			  SetCookie("authorize","",1);
		  }
	  });
}
class Public extends React.Component {
  render(){
    return (
      	<div>
      		<Loading />
      		<Alert />
      		<Success />
      		<Error />
      		<Sure />
      	</div>
    );
  }
}
window.addToUrl=function(ul){
		var errorLi=[];
	  ul.map(function(item,index){
			switch(item.DeviceId){
			case "0000":
				if(!item.name){
					item.name="随意贴";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      			item.des="在线";
	      		}
				item.offSrc="../../../src/resource/images/index/switch_nor.png";
				item.onSrc="../../../src/resource/images/index/switch_pre.png";
				item.toUrl="#/equipment/socket/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0002":
				if(!item.name){
					item.name="开关";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      		}
				item.offSrc="../../../src/resource/images/index/lamp_nor.png";
				item.onSrc="../../../src/resource/images/index/lamp_pre.png";
				item.toUrl="#/equipment/socket/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0004":
				if(!item.name){
					item.name="场景";
				}
				item.offSrc="../../../src/resource/images/index/scene_nor.png";
				item.onSrc="../../../src/resource/images/index/scene_pre.png";
				item.toUrl="#/equipment/light/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0009":
				if(!item.name){
					item.name="插座";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      		}
				item.offSrc="../../../src/resource/images/index/socket_nor.png";
				item.onSrc="../../../src/resource/images/index/socket_pre.png";
				item.toUrl="#/equipment/socket/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0051":
				if(!item.name){
					item.name="智能插座";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      		}
				item.offSrc="../../../src/resource/images/index/socket_nor.png";
				item.onSrc="../../../src/resource/images/index/socket_pre.png";
				item.toUrl="#/equipment/socket/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break; 
			case "0053":
				if(!item.name){
					item.name="智能测量设备";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      			item.des="在线";
	      		}
				item.offSrc="../../../src/resource/images/index/air_nor.png";
				item.onSrc="../../../src/resource/images/index/air_pre.png";
				item.toUrl="#/equipment/defaultEquip/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0100":
			case "0101":
			case "0200":
				if(!item.name){
					item.name="调光灯";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      		}
				item.click=1;
				item.offSrc="../../../src/resource/images/index/lamp_nor.png";
				item.onSrc="../../../src/resource/images/index/lamp_pre.png";
				item.toUrl="#/equipment/light/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0102":
				if(!item.name){
					item.name="彩灯";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      		}
				item.offSrc="../../../src/resource/images/index/lamp_nor.png";
				item.onSrc="../../../src/resource/images/index/lamp_pre.png";
				item.toUrl="#/equipment/light/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0110":
			case "0220":
				if(!item.name){
					item.name="色温灯";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      		}
				item.offSrc="../../../src/resource/images/index/lamp_nor.png";
				item.onSrc="../../../src/resource/images/index/lamp_pre.png";
				item.toUrl="#/equipment/light/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0210":
				if(!item.name){
					item.name="彩灯";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      		}
				item.offSrc="../../../src/resource/images/index/lamp_nor.png";
				item.onSrc="../../../src/resource/images/index/lamp_pre.png";
				item.toUrl="#/equipment/light/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0202":
				if(!item.name){
					item.name="窗帘";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      		}
				item.offSrc="../../../src/resource/images/index/curtain_nor.png";
				item.onSrc="../../../src/resource/images/index/curtain_pre.png";
				item.toUrl="#/equipment/curtains/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0800":
			case "0810":
				if(!item.name){
					item.name="遥控器";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      			item.des="在线";
	      		}
				item.offSrc="../../../src/resource/images/index/scene_nor.png";
				item.onSrc="../../../src/resource/images/index/scene_pre.png";
				item.toUrl="#/equipment/light/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0403":
				if(!item.name){
					item.name="声光报警器";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      			item.des="在线";
	      		}
				item.toUrl="#/equipment/defaultEquip/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0161":
			case "0163":
				if(!item.name){
					item.name="红外转发器";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      			item.des="在线";
	      		}
				item.trans=true;
				item.offSrc="../../../src/resource/images/index/infrared_nor.png";
				item.onSrc="../../../src/resource/images/index/infrared_pre.png";
				item.toUrl="#/equipment/transponder/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0106":
				if(!item.name){
					item.name="光照";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      		}
				item.offSrc="../../../src/resource/images/index/lamp_nor.png";
				item.onSrc="../../../src/resource/images/index/lamp_pre.png";
				item.toUrl="#/equipment/light/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0301":
				if(!item.name){
					item.name="温控器";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      		}
				item.offSrc="../../../src/resource/images/index/temperature_nor.png";
				item.onSrc="../../../src/resource/images/index/temperature_nor_pre.png";
				item.toUrl="#/equipment/defaultEquip";
				break;
			case "0302":
			case "0303":
				if(!item.name){
					item.name="温湿度传感器";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      		}
				item.offSrc="../../../src/resource/images/index/Temperature_humidity_nor.png";
				item.onSrc="../../../src/resource/images/index/Temperature_humidity_pre.png";
				item.toUrl="#/equipment/defaultEquip/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0309":
				if(!item.name){
					item.name="PM 2.5";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      		}
				item.offSrc="../../../src/resource/images/index/air_nor.png";
				item.onSrc="../../../src/resource/images/index/air_pre.png";
				item.toUrl="#/equipment/defaultEquip";
				break;
			case "000A":
				if(!item.name){
					item.name="门锁";
				}
				if(item.online=="00"){
					item.des="不在线";
	      		}else{
	      		}
				item.click=1;
				item.offSrc="../../../src/resource/images/index/door_nor.png";
				item.onSrc="../../../src/resource/images/index/door_pre.png";
				item.toUrl="#/equipment/door/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			case "0402":
				switch(item.ZoneType){
				case "0015":
					if(!item.name){
						item.name="门磁传感器";
					}
					if(item.online=="00"){
						item.des="不在线";
		      		}else{
		      		}
					item.offSrc="../../../src/resource/images/index/door_window_nor.png";
					item.onSrc="../../../src/resource/images/index/door_window_pre.png";
					break;
				case "000D":
					if(!item.name){
						item.name="人体传感器";
					}
					if(item.online=="00"){
						item.des="不在线";
		      		}else{
		      			item.des="在线";
		      		}
					item.offSrc="../../../src/resource/images/index/body_nor.png";
					item.onSrc="../../../src/resource/images/index/body_pre.png";
					break;
				case "0028":
				case "8000":
					if(!item.name){
						item.name="烟雾传感器";
					}
					if(item.online=="00"){
						item.des="不在线";
		      		}else{
		      			item.des="在线";
		      		}
					item.offSrc="../../../src/resource/images/index/fuel_gas_nor.png";
					item.onSrc="../../../src/resource/images/index/fuel_gas_pre.png";
					break;
				case "002B":
				case "8001":
					if(!item.name){
						item.name="气体传感器";
					}
					if(item.online=="00"){
						item.des="不在线";
		      		}else{
		      			item.des="在线";
		      		}
					item.offSrc="../../../src/resource/images/index/dangerous_gas_nor.png";
					item.onSrc="../../../src/resource/images/index/dangerous_gas_pre.png";
					break;
				case "002D":
					if(!item.name){
						item.name="振动传感器";
					}
					if(item.online=="00"){
						item.des="不在线";
		      		}else{
		      			item.des="在线";
		      		}
					item.offSrc="../../../src/resource/images/index/alarm_nor.png";
					item.onSrc="../../../src/resource/images/index/alarm_pre.png";
					break;
				case "002A":
					if(!item.name){
						item.name="水浸传感器";
					}
					if(item.online=="00"){
						item.des="不在线";
		      		}else{
		      			item.des="在线";
		      		}
					item.offSrc="../../../src/resource/images/index/water_nor.png";
					item.onSrc="../../../src/resource/images/index/water_pre.png";
					break;
				case "002C":
					if(!item.name){
						item.name="紧急按钮";
					}
					if(item.online=="00"){
						item.des="不在线";
		      		}else{
		      			item.des="在线";
		      		}
					item.offSrc="../../../src/resource/images/index/button_nor.png";
					item.onSrc="../../../src/resource/images/index/button_pre.png";
					break;
				case "0115":
					if(!item.name){
						item.name="安防传感器";
					}
					if(item.online=="00"){
						item.des="不在线";
		      		}else{
		      			item.des="在线";
		      		}
					item.offSrc="../../../src/resource/images/index/body_nor.png";
					item.onSrc="../../../src/resource/images/index/body_pre.png";
					break;
				default:
					break;
				}
				item.toUrl="#/equipment/defaultEquip/"+item.name+"/"+item.shortAddress+"/"+item.Endpoint+"/"+item.eqSN+"/"+item.DeviceId+"/"+item.ZoneType+"/"+item.IEEE;
				break;
			default:
				item.toUrl="#/equipment/defaultEquip";
				break;
			}
			if(!item.name){
				errorLi.push(index);
			}
		  });
	  		for(var i=errorLi.length-1;i>=0;i--){
	  			ul.splice(errorLi[i],1);
	  		}
		  return ul;
}
window.emergency=function(ableData){
	setTimeout(function(){
		emergencyValue=true;
	},1000);
	if(emergencyValue==false){
		return false;
	}
	emergencyValue=false;
	var shortAddress=ableData.slice(4,8);
	var cluster=ableData.slice(10,14);
	var type=ableData.slice(16,20);
	var value=ableData.slice(22,26);
	var trueValue=value.slice(2,4)+value.slice(0,2);
	var doorOpen=ableData.slice(24,26);
	var doorStatu=ableData.slice(26,28);
	if(cluster=="0101"){
		var interType=ableData.slice(20,22);
		if(interType=="42"){
			var interPassType=ableData.slice(24,28);
			var interPassStatu=ableData.slice(28);
			if(interPassType.toString()=="0"){
				if(interPassStatu.toString()=="0"){
					SetCookie("doorDate",GetCookie("doorDateF"),10);
					SetCookie("doorTime",GetCookie("doorTimeF"),10);
					SetCookie("doorPassword",GetCookie("doorPasswordF"),10);
					$("#controller_interim").click();
				}else{
					alert("临时密码获取失败，请重新获取！");
				}
			}
			if(interPassStatu=="FFFF"){
				$("#loading").css("display","none");
				if(interPassStatu.toString()=="0"){
					SetCookie("doorDate","",1);
					SetCookie("doorTime","",1);
					SetCookie("doorTime","",1);
					$("#interim_msg").css("display","none");
				}
			}
		}
		$("#loading").css("display","none");
		window.clearTimeout(doorTimer);
		if(doorStatu=="00"){
			if(doorOpen=="00"){
				alert("关锁成功");
			}
			if(doorOpen=="01"){
				alert("开锁成功");
			}
		}else if(doorStatu=="01"){
			alert("门锁操作失败");
		}else if(doorStatu=="02" || doorStatu=="7f"){
			alert("远程开门未允许");
		}else{
			alert("门锁操作失败");
		}
		return false;
	}
	publicEqUl.map(function(item,index){
		if(item.shortAddress==shortAddress){
			switch(item.DeviceId){
				case "0402":
					switch(item.ZoneType){
					case "0015":
						if(item.value=="0000"){
						}else{
							alert("门被打开");
						}
						break;
					case "000D":
						if(item.value=="0000"){
						}else{
							alert("有人经过");
						}
						break;
					case "0028":
					case "8000":
						if(item.value=="0000"){
						}else{
							alert("烟雾超标");
						}
						break;
					case "002B":
					case "8001":
						if(item.value=="0000"){
						}else{
							alert("气体异常");
						}
						break;
					case "002D":
						if(item.value=="0000"){
						}else{
							alert("有振动");
						}
						break;
					case "002A":
						if(item.value=="0000"){
						}else{
							alert("有水浸入");
						}
						break;
					case "002C":
						if(item.value=="0000"){
						}else{
							alert("有人按下紧急按钮");
						}
						break;
					default :
						if(item.value=="0000"){
							item.desc="关";
						}else{
							item.desc="开";
						}
						break;
					}
					break;
				default :
					break;
			}
		}
	});
}
export default Public
