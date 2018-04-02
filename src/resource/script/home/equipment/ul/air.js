var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js";
require('./../../../plugs/nouislider/nouislider.css');
var noUiSlider=require('./../../../plugs/nouislider/nouislider.js');
var airSwitch,sleep,auto,child,timer,wSpeed,first=true;
class Air extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
  }
  componentDidMount(){
	  var deviceId=this.props.match.params.did;
	  var originStart;
	  var that=this;
	  $.ajax({
	       type:"post",
	       url: Base+"/machtalk/datapoints.do",
	       dataType:"json",
	       async:false,
	       data: {
	    	   "userId":GetCookie("userId"),
	    	   "deviceId":deviceId
	       },
	       success:function(data){
	    	   if(data.code==0){
	    		  var pm=data.data['107'];
	    		  airSwitch=data.data['101'];
	    		  sleep=data.data['104'];
	    		  auto=data.data['103'];
	    		  child=data.data['102'];
	    		  timer=data.data['105'];
	    		  that.setState({data:data.data});
	    		  if(pm<50){
	    			  $("#air_grade").html("优");
	    		  }else if(pm<100){
	    			  $("#air_grade").html("良");
	    		  }else if(pm<150){
	    			  $("#air_grade").html("轻度污染");
	    		  }else{
	    			  $("#air_grade").html("重度污染");
	    		  }
	    		  originStart=(data.data['106']);
	    		  var connectSlider = document.getElementById('curtains_plus');
	    		  noUiSlider.create(connectSlider, {
	    			  	start: originStart,
	    			  	step:1,
	    			  	connect: [true, false],
	    			  	range: {
	    			  	  'min': 0,
	    			  	  'max': 10
	    			  	}
	    		  });
	    		  connectSlider.noUiSlider.on('update', function( values, handle ){
	    			  if(first==true){
	    				  first=false;
	    			  }else{
	    				  wSpeed=values[handle];
	    				  that.airOption('106',event);
	    			  }
	    			});
	    	   }else{
	    		   alert(data.msg);
	    	   }
	    	   
	       },
	       error:function(data){
	  	          alert("连接服务器出错，请刷新网络重试！");
	  	   }
	   });
  }
  addOn(event){
	  var event=event||window.event;
	  var dom=$(event.target).closest(".video_ul li");
	  if(dom.hasClass("video_on")){
		  dom.removeClass("video_on");
	  }else{
		  dom.addClass("video_on");
	  }
  }
  goBack(){
	  this.props.history.goBack();
  }
  airOption(key,event){
	  var optValue;
	  var that=this;
	  switch(key){
	  case '101':
		  if(airSwitch==0){
			  airSwitch=1;
			  optValue=1;
		  }else{
			  airSwitch=0;
			  optValue=0;
		  }
		  break;
	  case '102':
		  if(child==0){
			  child=1;
			  optValue=1;
		  }else{
			  child=0;
			  optValue=0;
		  }
		  break;
	  case '103':
		  if(auto==0){
			  optValue=1;
			  auto=1;
		  }else{
			  auto=0;
			  optValue=0;
		  }
		  break;
	  case '104':
		  if(sleep==0){
			  sleep=1;
			  optValue=1;
		  }else{
			  sleep=0;
			  optValue=0;
		  }
		  break;
	  case '106':
		  optValue=Math.round(wSpeed);
		  break;
	  }
	  $.ajax({
	       type:"post",
	       url: Base+"/machtalk/deviceOpt.do",
	       dataType:"json",
	       async:false,
	       data: {
	    	   "userId":GetCookie("userId"),
	    	   "deviceId":that.props.match.params.did,
	    	   "optKey":key,
	    	   "optValue":optValue
	       },
	       success:function(data){
	    	   if(data.code==0){
	    		   
	    	   }else{
	    		   alert(data.msg);
	    	   }
	       },
	       error:function(data){
	  	          alert("连接服务器出错，请刷新网络重试！");
	  	   }
	  });
  }
  goBack(){
	  this.props.history.goBack();
  }
  showBox(){
	  $("#door_box").css("display","block");
  }
  disShowBox(){
	  $("#door_box").css("display","none");
  }
  deleteAir(){
	  var that=this;
	  debugger;
	  return false;
	  $.ajax({
	       type:"post",
	       url: Base+"/machtalk/unbind.do",
	       dataType:"json",
	       data: {
	    	   "userId":GetCookie("userId"),
	    	   "deviceId":that.props.match.params.did
	       },
	       success:function(data){
	    	   if(data.code==0){
	    		   alert("删除设备成功！")
	    		   window.location.href="#/equipment";
	    	   }else{
	    		   alert(data.msg);
	    	   }
	       },
	       error:function(data){
	  	          alert("连接服务器出错，请刷新网络重试！");
	  	   }
	  });
  }
  render() {
    return (
    		<div className="light_wrapper">
    			<div className="template_bg">
    				<img  src="../../../src/resource/images/equipment/air/air_bg.jpg" />
    			</div>
	            <p className="head_nav_light">
	    	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/equipment/light_arrow.png" />
	    	      空气进化器
	    	      <img className="head_eq_right" onClick={this.showBox.bind(this)} src="../../../src/resource/images/equipment/door_option.png" />
			      	<div id="door_box" className="door_box">
			      		<div className="db_bg" onClick={this.disShowBox.bind(this)}></div>
			      		<ul className="db_ul">
			      			<li>
			      				<span>取消设为常用</span>
			      			</li>
			      			<li>
			      				<span onClick={this.deleteAir.bind(this)}>删除设备</span>
			      			</li>
			      		</ul>
			      	</div>
	    	    </p>
	    	    <div className="air_pm_part">
	    	    	<img className="air_bg" src="../../../src/resource/images/equipment/eqbg/air_bg.png" />
	    	    	<p className="air_pm">
	    	    		PM2.5:{this.state.data['107']}
	    	    	</p>
	    	    	<p id="air_grade" className="air_grade">
	    	    	</p>
	    	    	<p className="air_speed">
	    	    		电机转速{this.state.data['108']}转
	    	    	</p>
	    	    </div>
	    	    <p className="air_rest_life">
	    	    	滤网剩余寿命{this.state.data['109']}%
	    	    </p>
	    	    <ul className="air_ul">
		    	    <li onClick={this.airOption.bind(this,"101")}>
			    		<p className="air_icon">
			    			<img src="../../../src/resource/images/equipment/air/icon_5.png" />
			    		</p>
			    		<p className="air_word">开关</p>
			    	</li>
	    	    	<li>
	    	    		<p className="air_icon">
	    	    			<img src="../../../src/resource/images/equipment/air/icon_1.png" />
	    	    		</p>
	    	    		<p className="air_word">睡眠</p>
	    	    	</li>
	    	    	<li>
	    	    		<p className="air_icon">
	    	    		<img src="../../../src/resource/images/equipment/air/icon_2.png" />
	    	    		</p>
	    	    		<p className="air_word">自动</p>
	    	    	</li>
	    	    	<li>
	    	    		<p className="air_icon">
	    	    		<img src="../../../src/resource/images/equipment/air/icon_3.png" />
	    	    		</p>
	    	    		<p className="air_word">儿童锁</p>
	    	    	</li>
	    	    	<li>
	    	    		<p className="air_icon">
	    	    		<img src="../../../src/resource/images/equipment/air/icon_4.png" />
	    	    		</p>
	    	    		<p className="air_word">定时</p>
	    	    	</li>
	    	    </ul>
	    	    <div className="curtains_controll air_controll">
					<span className="cp_off">L</span>
					<div id="curtains_plus" className="curtains_plus"></div>
					<span className="cp_open">H</span>
				</div>
    	    </div>
    );
  }
}
export default Air
