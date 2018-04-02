var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js";
var studyNum="";
class DefineTrans extends React.Component {
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
	    	   debugger;
	    	   if(data.isSuccess==0){
	    		   that.setState({data:data.data});
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
	  $("#dt_add").css("display","inline-block");
  }
  toStudy(){
	  $("#dt_add").css("display","none");
	  $("#tv_option").css("display","none");
	  $("#door_box").css("display","none");
	  $("#tv_save").css("display","inline-block");
  }
  studySuccess(){
	  if(studyNum==""){
		  return false;
	  }
	  var that=this;
	  $.ajax({
	       type:"post",
	       url: Base+"/infrareddevicekey/updateSave.do",
	       dataType:"json",
	       data:{
	    	   keyValue:"0",
	    	   id:studyNum
			},
	       success:function(data){
	    	   if(data.isSuccess==0){
	    		   $("#button"+studyNum).addClass("define_studied");
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
	  var data="0B"+GetCookie("transVersion")+"830005"+newNum;
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
  controllKey(number){
	  if($("#button"+number).hasClass("define_studied")==false){
		  alert("此按钮还没有学习");
		  return false;
	  }
	  var sixNumber=number.toString(16);
	  var newNum=sixNumber;
	  for(var i=0;i<(4-sixNumber.length);i++){
		  newNum="0"+newNum;
	  }
	  newNum=newNum.substring(2,4)+newNum.substring(0,2);
	  var data="0B"+GetCookie("transVersion")+"820005"+newNum;
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
  dtSure(){
	  var that=this;
	  var name=$("#dt_input").val();
	  if(!name){
		  return false;
	  }
	  $.ajax({
	       type:"post",
	       url: Base+"/infrareddevicekey/addSave.do",
	       dataType:"json",
	       data:{
	    	   userId:GetCookie("houseId"),
	    	   keyName:name,
	    	   keyValue:"1",
	    	   deviceId:that.props.match.params.id
			},
	       success:function(data){
	    	   if(data.isSuccess==0){
	    		  window.location.reload();
	    	   }else{
	    		   alert(data.errorMsg);
	    	   }
	       },
	       error:function(data){
	          alert("服务器返回数据错误");
	       }
	  });
  }
  dtShow(){
	  $("#dt_box").css("display","block");
  }
  dtDisShow(){
	  $("#dt_box").css("display","none");
  }
  goBack(){
	  this.props.history.goBack();
  }
  render() {
	  var myOrder;
	  var that=this;
    return (
      <div className="o_hidden">
        <div className="head_nav_none border_bottom">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      	{this.props.match.params.name}
	      	<img id="tv_option" className="head_eq_right" onClick={this.showBox.bind(this)} src="../../../src/resource/images/scene/setting.png" />
	      	<span id="tv_save" className="tv_save" onClick={this.saveTV.bind(this)}>保存</span>
	      	<div id="door_box" className="door_box">
	      		<div className="db_bg" onClick={this.disShowBox.bind(this)}></div>
	      		<ul className="db_ul">
	      			<li onClick={this.toStudy.bind(this)}>
	      				<a href="javascript:void(0);">进入学习模式</a>
	      			</li>
	      			<li onClick={this.toStudy.bind(this)}>
	      				<a href={"#/equipment/defineTransEdit/"+this.props.match.params.id+"/"+this.props.match.params.name+"/"+this.props.match.params.shortAddress+"/"+this.props.match.params.Endpoint+"/"+this.props.match.params.deviceType}>按键编辑</a>
	      			</li>
	      			<li>
	      				<a href={"#/equipment/optionTV/"+this.props.match.params.id+"/"+this.props.match.params.name+"/"+this.props.match.params.shortAddress+"/"+this.props.match.params.Endpoint}>
	      					通用设置
	      				</a>
	      			</li>
	      		</ul>
	      	</div>
	    </div>
	    <div className="dt_main">
	    	{
	    		this.state.data.map(function(item,index){
	    			return (
	    					<span id={"button"+item.id} key={index} className={item.keyValue=="0"?"dt_li define_studied":"dt_li"} onClick={that.studyNumber.bind(that,item.id)}>{item.keyName}</span>
	    			)
	    		})
	    	}
	    	<span id="dt_add" className="dt_li dt_add" onClick={this.dtShow.bind(this)}>+添加</span>
	    </div>
	    <div id="dt_box" className="door_box">
	    	<div className="box_bg" onClick={this.dtDisShow.bind(this)}></div>
	    	<div className="sure_main door_main">
	    		<p className="sure_title">编辑名称</p>
	    		<p className="index_door">
	    			<input id="dt_input" type="text" />
	    		</p>
	    		<p className="sure_button">
	    			<span  className="sureCancel" onClick={this.dtDisShow.bind(this)}>取消</span>
	    			<span  className="sureOk" onClick={this.dtSure.bind(this)}>确定</span>
	    		</p>
	    	</div>
	    </div>
      </div>
    );
  }
}
export default DefineTrans
