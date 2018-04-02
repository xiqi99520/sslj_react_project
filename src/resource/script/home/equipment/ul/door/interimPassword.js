var my$;
import {Base} from './../../../../connect.js';
import {SetCookie,GetCookie} from "./../../../../cookie.js";
var MobileSelect=require('./../../../../plugs/mobileSelect.min.js');
require('./../../../../plugs/mobileSelect.css');
var inTime=30;
var sTimer;
var originDate=new Date();
class InterimPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:""};
  }
  defaultTime(){
	  var defaultDate=new Date(originDate.valueOf()+1000*60*30);
	  var month=defaultDate.getMonth() + 1;
	  var day=defaultDate.getDate();
	  var week=defaultDate.getDay();
	  var cWeek;
	  switch(week){
	  case 0:
		  cWeek=" 周日";
		  break;
	  case 1:
		  cWeek=" 周一";
		  break;
	  case 2:
		  cWeek=" 周二";
		  break;
	  case 3:
		  cWeek=" 周三";
		  break;
	  case 4:
		  cWeek=" 周四";
		  break;
	  case 5:
		  cWeek=" 周五";
		  break;
	  case 6:
		  cWeek=" 周六";
		  break;
	  }
	  var dtime=month+"月"+day+"日"+cWeek;
	  var dateString=dtime+" "+defaultDate.getHours()+"时"+defaultDate.getMinutes()+"分";
	  $("#interim_time").html(dateString);
  }
  componentDidMount(){
	  if(!socketObj){
		  window.getToten(this);
	  }else{
		  this.getListen();
		  this.getSend();
	  }
	  this.initFun();
	  var dayUl=[];
	  var cWeek;
	  this.defaultTime();
	  for(var i=0;i<10;i++){
		  var date=new Date(originDate.valueOf()+1000*60*60*24*i);
		  var month=date.getMonth() + 1;
		  var day=date.getDate();
		  var week=date.getDay();
		  switch(week){
		  case 0:
			  cWeek=" 周日";
			  break;
		  case 1:
			  cWeek=" 周一";
			  break;
		  case 2:
			  cWeek=" 周二";
			  break;
		  case 3:
			  cWeek=" 周三";
			  break;
		  case 4:
			  cWeek=" 周四";
			  break;
		  case 5:
			  cWeek=" 周五";
			  break;
		  case 6:
			  cWeek=" 周六";
			  break;
		  }
		  dayUl.push(month+"月"+day+"日"+cWeek);
	  }
	  
	  var hour=["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
	  var minute=["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20",
	                  "21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40",
	                "41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60"];
	  var oneSelect = new MobileSelect({
	        trigger: '#selectPlug2',
	        title: '',
	        wheels: [{data:dayUl},{data:hour},{data:minute}],
	        callback:function(indexArr, data){
	        	var cTime=indexArr[0]*24*60+indexArr[1]*60+indexArr[2]-originDate.getHours()*60-originDate.getMinutes();
	        	if(cTime<=0){
	        		alert("有效时间不能小于当前时间");
	        	}else{
	        		inTime=cTime;
		        	$("#interim_time").html(data[0]+" "+data[1]+"时"+data[2]+"分");
	        	}
	        }
	    });
  }
  getListen(){
	  var that=this;
	  socketObj.on('data', function(data) {
		  if (data.type === 'datapoint') {
          	var ableData=data.data[0].value;
          	var type=ableData.substring(0,2);
          	switch(type){
          	case "07":
          		var shortAddress=ableData.substring(4,8);
          		var Endpoint=ableData.substring(8,10);
          		var statu=ableData.substring(10,12);
          		if(shortAddress==that.props.match.params.shortAddress && Endpoint==that.props.match.params.Endpoint){
          			that.setState({
          				statu:statu
          			});
          		}
          		break;
          	default:
          		break;
          	}
          }
      });
  }
  getSend(){}
  initFun(){
	  if(GetCookie("doorDate")){
		  $("#interim_msg").css("display","block");
		  this.countDown();
	  }
  }
  getInterim(){
	  var that=this;
	  if(inTime<=0){
		  alert("有效时间不能小于当前时间");
		  return false;
	  }
	  $("#interim_msg").css("display","block");
	  var number=Math.floor(Math.random()*1000000);
	  $("#im_num").html(number);
	  this.getNumber(number,inTime);
  }
  getNumber(number,inTime){
	  	var time=inTime.toString(16).toUpperCase();
	  	for(var i=0;i<4-time.length;){
	  		time ="0"+time;
	  	}
	  	time=time.slice(2,4)+time.slice(0,2);
	  	var password=number.toString().split("");
		var key = [70,69,73,66,73,71];//加密密钥
		var npass="";
		for (var i = 0; i < 6; i ++)
		{
			npass =npass+(key[i] ^ password[i]).toString(16).toUpperCase();
		}
		var opValue="1E00"+GetCookie("SN")+"FE8D1202"+this.props.match.params.shortAddress
		+this.props.match.params.Endpoint+"0101FF3302420A0000"+npass+time;
		SetCookie("doorDateF",new Date(),10);
		SetCookie("doorTimeF",inTime,10);
		SetCookie("doorPasswordF",number,10);
		window.changeSdkMsg(opValue);
  }
  deleteInter(){
	  var opValue="1E00"+GetCookie("SN")+"FE8D1202"+this.props.match.params.shortAddress
		+this.props.match.params.Endpoint+"0101FF3302420AFFFF0000000000000000";
	  $("#loading").css("display","block");
		window.changeSdkMsg(opValue);
  }
  countDown(){
	  var date=GetCookie("doorDate");
	  var time=GetCookie("doorTime");
	$("#im_num").html(GetCookie("doorPassword"));
	var nowDate=new Date();
	var rTime= Math.floor(Date.parse(date)/1000)+time*60-Math.floor(Date.parse(nowDate)/1000);
	clearInterval(sTimer);
	sTimer=setInterval(function(){
		if(rTime>0){
			var rhour=Math.floor(rTime/(60*60));
			var rminute=Math.floor((rTime-rhour*60*60)/60);
			var rsecond=rTime%60;
			var rString=rhour+"小时"+rminute+"分"+rsecond+"秒";
			$("#rest_timer").html(rString);
			rTime--;
		}else{
			$("#interim_msg").css("display","none");
			clearInterval(sTimer);
		}
	},1000);
  }
  checkTime(){
	  $("#selectPlug2").click();
  }
  goBack(){
	  this.props.history.goBack();
  }
  render() {
    return (
      <div className="curtains_wrapper"> 
      	<p className="head_nav">
      		<img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
      		临时开锁密码
      	</p>
	    <ul className="interim_ul">
	    	<li>
	    		临时密码名称：<span className="interim_name" contentEditable="true">名称么 还没想好</span>
	    	</li>
	    	<li onClick={this.checkTime.bind(this)}>
	    		临时密码有效期至：<span id="interim_time" className="interim_time">2017-07-03  11：09</span>
	    	</li>
	    </ul>
	    <p id="interim_submit" className="interim_submit" onClick={this.getInterim.bind(this)}>
	    	获取临时密码
	    </p>
    	<div id="interim_msg" className="interim_msg">
    		<p className="im_title">
    			—   密码   —
    		</p>
    		<p id="im_num" className="im_num">
    		</p>
    		<p className="im_people">
    			等待临时密码开锁
    		</p>
    		<p className="im_time">
    			剩余：<span id="rest_timer"></span>
    		</p>
    		<p className="im_delete" onClick={this.deleteInter.bind(this)}>
    			删除授权
    		</p>
    	</div>
    	<div className="interim_tips">
    		<p>
    			系统自动创建一个随机的开机密码
    		</p>
    		<p>
    			在密码有效期内只能使用一次
    		</p>
    	</div>
    	<div id="selectPlug2" className="dis_show"></div>
        <div id="show_select">
        </div>
        <div id="controller_interim" onClick={this.countDown.bind(this)}></div>
      </div>
    );
  }
}
export default InterimPassword
