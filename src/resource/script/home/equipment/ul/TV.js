var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js";
var studyNum="";
class TV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
  }
  componentDidMount(){
	  if(GetCookie("id")){
		  if(!socketObj){
			  window.getToten(this);
		  }else{
			  this.getListen();
			  this.getSend();
		  }
	  }else{
		 
	  }
	  this.getBindingKey();
  }
  getBindingKey(){
	  var that=this;
	  $.ajax({
	       type:"post",
	       url: Base+"/infrareddevicekey/getKeyList.do",
	       dataType:"json",
	       data:{
	    	   deviceId:that.props.match.params.id
			},
	       success:function(data){
	    	   if(data.isSuccess==0){
	    		   data.data.map(function(item,index){
	    			   $("#button"+item.keyId).addClass("had_binding");
	    		   });
	    	   }else{
	    		   alert(data.errorMsg);
	    	   }
	       },
	       error:function(data){
	          alert("服务器返回数据错误");
	       }
	  });
  }
//发送获取获取云智易网关下面飞比的设备列表
  getSend(){
	  var SN=GetCookie("SN");
	  if(!SN){
		  SN="FFFFFFFF";
	  }
	  var opValue="1500"+SN+"FEA70C"+this.props.match.params.shortAddress+this.props.match.params.Endpoint+"030700555502800082";
	  window.changeSdkMsg(opValue);
  }
  //监听云智易数据上报
  getListen(){
	  var that=this;
	  socketObj.on('data', function(data) {
	      	if (data.type === 'datapoint') {
	          	var ableData=data.data[0].value;
	          	var type=ableData.substring(0,2);
	          	switch(type){
	          	case "70":
	          		var shortAddress=ableData.substring(4,8);
	          		var Endpoint=ableData.substring(8,10);
	          		if(that.props.match.params.shortAddress==shortAddress && that.props.match.params.Endpoint==Endpoint){
	          			var datas=ableData.substring(24);
	          			var version=datas.substring(6,18);
	          			var funcType=datas.substring(18,22);
	          			if(!GetCookie("transVersion")){
	          				SetCookie("transVersion",version,1);
	          			}
	          			switch(funcType){
	          				case "8300":
	          					var result=datas.substring(28,30);
	          					if(result=="00"){
	          						that.studySuccess();
	          					}else if(result=="02"){
	          						$("#error_msg").html("存储器空间已满");
	          						$("#Error").css("display","block");
	          						setTimeout(function(){
	          							$("#Error").css("display","none");
	          						},2000);
	          					}else{
	          						$("#error_msg").html("学习失败");
	          						$("#Error").css("display","block");
	          						setTimeout(function(){
	          							$("#Error").css("display","none");
	          						},2000);
	          					}
	          					break;
	          				case "8200":
	          					break;
	          				default :
	          					break;
	          			}
	          		}
	          		break;
	          	default:
	          		break;
	          	}
	      	}
	  });
  }
  showBox(){
	  $("#door_box").css("display","block");
  }
  disShowBox(){
	  $("#door_box").css("display","none");
  }
  saveTV(){
	  $("#tv_save").css("display","none");
	  $("#tv_option").css("display","inline-block");
  }
  toStudy(){
	  $("#tv_option").css("display","none");
	  $("#door_box").css("display","none");
	  $("#tv_save").css("display","inline-block");
  }
  studyNumber(number,event){
	  if(!GetCookie("transVersion")){
		  this.getListen();
		  return false;
	  }
	  if($("#tv_save").css("display")=="none"){
		  this.controllKey(number);
		  return false;
	  }
	  var sixNumber=number.toString(16);
	  var newNum=sixNumber;
	  for(var i=0;i<(4-sixNumber.length);i++){
		  newNum="0"+newNum;
	  }
	  newNum=newNum.substring(2,4)+newNum.substring(0,2);
	  var data="0B"+GetCookie("transVersion")+"83000"+this.props.match.params.deviceType+newNum;
	  var sum=0;
	  for(var i=0;i<12;i++){
		  var li=parseInt(data.substring(i*2,i*2+2),16);
		  sum=sum+li;
	  }
	  sum=sum.toString(16);
	  sum=sum.substring(sum.length-2);
	  var opValue="1F00"+GetCookie("SN")+"FEA717"+this.props.match.params.shortAddress+this.props.match.params.Endpoint
	  +"0311005555"+data+sum+"26";
	  window.changeSdkMsg(opValue);
	  studyNum=number;
  }
  studySuccess(){
	  if(studyNum==""){
		  return false;
	  }
	  var that=this;
	  $.ajax({
	       type:"post",
	       url: Base+"/infrareddevicekey/addSave.do",
	       dataType:"json",
	       data:{
	    	   keyId:studyNum,
	    	   keyName:"tv",
	    	   keyValue:0,
	    	   deviceId:that.props.match.params.id
			},
	       success:function(data){
	    	   if(data.isSuccess==0){
	    		   $("#button"+studyNum).addClass("had_binding");
	    		   $("#success_msg").html("学习成功");
					$("#Success").css("display","block");
					setTimeout(function(){
						$("#Success").css("display","none");
					},2000);
	    	   }else{
	    		   alert(data.errorMsg);
	    	   }
	       },
	       error:function(data){
	          alert("服务器返回数据错误");
	       }
	  });
  }
  controllKey(number){
	  if($("#button"+number).hasClass("had_binding")==false){
		  alert("此按钮还没有学习");
		  return false;
	  }
	  var sixNumber=number.toString(16);
	  var newNum=sixNumber;
	  for(var i=0;i<(4-sixNumber.length);i++){
		  newNum="0"+newNum;
	  }
	  newNum=newNum.substring(2,4)+newNum.substring(0,2);
	  var data="0B"+GetCookie("transVersion")+"82000"+this.props.match.params.deviceType+newNum;
	  var sum=0;
	  for(var i=0;i<12;i++){
		  var li=parseInt(data.substring(i*2,i*2+2),16);
		  sum=sum+li;
	  }
	  sum=sum.toString(16);
	  sum=sum.substring(sum.length-2);
	  var opValue="1E00"+GetCookie("SN")+"FEA716"+this.props.match.params.shortAddress+this.props.match.params.Endpoint
	  +"0310005555"+data+sum;
	  window.changeSdkMsg(opValue);
  }
  goBack(){
	  this.props.history.goBack();
  }
  render() {
	  var myOrder;
    return (
      <div className="light_wrapper o_hidden">
        <div className="head_nav_light">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/equipment/light_arrow.png" />
	      	{this.props.match.params.name}
	      	<img id="tv_option" className="head_eq_right" onClick={this.showBox.bind(this)} src="../../../src/resource/images/equipment/door_option.png" />
	      	<span id="tv_save" className="tv_save" onClick={this.saveTV.bind(this)}>保存</span>
	      	<div id="door_box" className="door_box">
	      		<div className="db_bg" onClick={this.disShowBox.bind(this)}></div>
	      		<ul className="db_ul">
	      			<li onClick={this.toStudy.bind(this)}>
	      				<a href="javascript:void(0);">进入学习模式</a>
	      			</li>
	      			<li>
	      				<a href={"#/equipment/optionTV/"+this.props.match.params.id+"/"+this.props.match.params.name+"/"+this.props.match.params.shortAddress+"/"+this.props.match.params.Endpoint}>
	      					通用设置
	      				</a>
	      			</li>
	      		</ul>
	      	</div>
	    </div>
	    <div className="tv_top">
	    	<ul className="tv_left">
	    		<li>
	    			<span id="button151" onClick={this.studyNumber.bind(this,151)}>1</span>
	    		</li>
	    		<li>
	    			<span id="button152" onClick={this.studyNumber.bind(this,152)}>2</span>
	    		</li>
	    		<li>
	    			<span id="button153" onClick={this.studyNumber.bind(this,153)}>3</span>
	    		</li>
	    		<li>
	    			<span id="button154" onClick={this.studyNumber.bind(this,154)}>4</span>
	    		</li>
	    		<li>
	    			<span id="button155" onClick={this.studyNumber.bind(this,155)}>5</span>
	    		</li>
	    		<li>
	    			<span id="button156" onClick={this.studyNumber.bind(this,156)}>6</span>
	    		</li>
	    		<li>
	    			<span id="button157" onClick={this.studyNumber.bind(this,157)}>7</span>
	    		</li>
	    		<li>
	    			<span id="button158" onClick={this.studyNumber.bind(this,158)}>8</span>
	    		</li>
	    		<li>
    				<span id="button159" onClick={this.studyNumber.bind(this,159)}>9</span>
	    		</li>
	    		<li>
	    			<span id="button150" onClick={this.studyNumber.bind(this,150)}>0</span>
	    		</li>
	    		<li className="tv_back">
	    			<span id="button164" onClick={this.studyNumber.bind(this,164)}>返回</span>
	    		</li>
	    	</ul>
	    	<div className="tv_right">
	    		<div className="tv_channel">
	    			<p className="tv_add" id="button162" onClick={this.studyNumber.bind(this,162)}>+</p>
	    			<p className="tv_channel_word">节目</p>
	    			<p className="tv_reduce" id="button163" onClick={this.studyNumber.bind(this,163)}>-</p>
	    		</div>
	    		<div className="tv_channel tv_voice">
	    			<p className="tv_add" id="button160" onClick={this.studyNumber.bind(this,160)}>+</p>
	    			<p className="tv_channel_word">音量</p>
	    			<p className="tv_reduce" id="button161" onClick={this.studyNumber.bind(this,161)}>-</p>
	    		</div>
	    	</div>
	    </div>
	    <ul className="tv_option">
			<li>
				<span id="button166" onClick={this.studyNumber.bind(this,166)}>主页</span>
			</li>
			<li>
				<span id="button167" onClick={this.studyNumber.bind(this,167)}>信号源</span>
			</li>
			<li>
				<span id="button168" onClick={this.studyNumber.bind(this,168)}>模式</span>
			</li>
			<li>
				<span id="button179" onClick={this.studyNumber.bind(this,179)}>3D</span>
			</li>
			<li>
				<span id="button180" onClick={this.studyNumber.bind(this,180)}>设置</span>
			</li>
			<li>
				<span id="button169" onClick={this.studyNumber.bind(this,169)}>列表</span>
			</li>
			<li>
				<span id="button170" onClick={this.studyNumber.bind(this,170)}>语音</span>
			</li>
			<li>
				<span id="button171" onClick={this.studyNumber.bind(this,171)}>鼠标</span>
			</li>
			<li>
				<span id="button172" onClick={this.studyNumber.bind(this,172)}>键盘</span>
			</li>
			<li>
				<span id="button181" onClick={this.studyNumber.bind(this,181)}>回看</span>
			</li>
		</ul>
		<div className="video_direction tv_direction">
			<span className="tv_two tv_mute" id="button165" onClick={this.studyNumber.bind(this,165)}>
				<img src="../../../src/resource/images/equipment/tv/mute.png" />
			</span>
			<p className="vd_main">
				<img className="vd_pic" id="button178"  src="../../../src/resource/images/equipment/tv/option.png" />
				<span id="button174" className="vd_top" onClick={this.studyNumber.bind(this,174)}>
					<img src="../../../src/resource/images/equipment/tv/arrow.png" />
				</span>
				<span id="button176" className="vd_bottom" onClick={this.studyNumber.bind(this,176)}>
					<img src="../../../src/resource/images/equipment/tv/arrow.png" />
				</span>
				<span id="button175" className="vd_left" onClick={this.studyNumber.bind(this,175)}>
					<img src="../../../src/resource/images/equipment/tv/arrow.png" />
				</span>
				<span id="button177" className="vd_right" onClick={this.studyNumber.bind(this,177)}>
					<img src="../../../src/resource/images/equipment/tv/arrow.png" />
				</span>
				<span id="button178" className="vd_center" onClick={this.studyNumber.bind(this,178)}></span>
			</p>
			<span  id="button173" className="tv_two tv_switch" onClick={this.studyNumber.bind(this,173)}>
				<img src="../../../src/resource/images/equipment/tv/switch.png" />
			</span>
		</div>
		<div className="template_bg">
			<img src="../../../src/resource/images/equipment/tv_bg.jpg" />
		</div>
      </div>
    );
  }
}
export default TV
