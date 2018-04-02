var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js";
class eqOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:""};
  }
  componentDidMount(){
	  $("#eo_name_input").val(this.props.match.params.name);
	  if(!socketObj){
		  window.getToten(this);
	  }else{
		  this.getListen();
	  }
  }
  getListen(){
	  var that=this;
	  socketObj.on('data', function(data) {
		  if (data.type === 'datapoint') {
          	var ableData=data.data[0].value;
          	var type=ableData.substring(0,2);
          	switch(type){
          	case "29":
          		var type=ableData.substring(4,6);
          		var deleteNum=ableData.substring(6,8);	
          		var shortAddress=ableData.substring(6,10);
          		var Endpoint=ableData.substring(10,12);
          		var nameLength=ableData.substring(12,14);
          		var name=ableData.substring(14,parseInt(nameLength,16)*2+14);
          		if(type=="03" && shortAddress==that.props.match.params.shortAddress && Endpoint==that.props.match.params.Endpoint&& name==that.state.data){
          			$("#loading").css("display","none");
          			$("#success_msg").html("成功修改名称");
          			$("#Success").css("display","block");
          			setTimeout(function(){
          				$("#Success").css("display","none");
          			},1500);
          			window.location.href="#/equipment/defaultEquip/"+$("#eo_name_input").val()+"/"+that.props.match.params.shortAddress+"/"+that.props.match.params.Endpoint+"/"+that.props.match.params.eqSN+"/"+that.props.match.params.DeviceId+"/"+that.props.match.params.ZoneType+"/"+that.props.match.params.IEEE;
          		}
          		if(type=="04" && deleteNum=="95"){
          			$("#loading").css("display","none");
          			$("#success_msg").html("成功删除设备");
          			$("#Success").css("display","block");
          			setTimeout(function(){
          				$("#Success").css("display","none");
          			},1500);
          			window.location.href="#/index";
          		}
          		break;
          	default:
          		break;
          	}
          }
      });
  }
  getSend(){
  }
  deleteEq(){
	  var that=this;
	  $("#sureMsg").html("确定删除本设备？");
	  $("#Sure").css("display","block");
	  $("#sureOk").bind("click",function(){
		  $("#sureOk").unbind();
		  $("#loading").css("display","block");
		  var opValue="1500"+GetCookie("SN")+"FE950C02"+that.props.match.params.shortAddress+that.props.match.params.IEEE+that.props.match.params.Endpoint;
		  window.changeSdkMsg(opValue);
	  });
  }
  saveEq(){
	  var name=$("#eo_name_input").val();
	  if(name==this.props.match.params.name){
		  this.goBack();
		  return false;
	  }
	  var byte=window.stringToByte(name);
	  var result="";
	  for(var i=0;i<byte.length;i++){
		  result=(result+byte[i].toString(16)).toUpperCase();
	  }
	  var length=result.length/2;
	  var length16=length.toString(16);
	  var lengthValue=length16.length<2?"0"+length16:length16;
	  var allLength=(4+length).toString(16);
	  var allLengthValue=allLength.length<2?"0"+allLength:allLength;
	  var opValue="1000"+GetCookie("SN")+"FE94"+allLengthValue+this.props.match.params.shortAddress+this.props.match.params.Endpoint+lengthValue+result;
	  opValue=opValue.toUpperCase();
	  this.setState({data:result});
	  $("#loading").css("display","block");
	  window.changeSdkMsg(opValue);
  }
  focusInput(){
	  $("#eo_name_input").focus();
  }
  goBack(){
	  this.props.history.goBack();
  }
  render() {
	var myOrder;
    return (
      <div className="">
        <p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      	常用设置
	      	<span className="head_sure" onClick={this.saveEq.bind(this)}>
	      		保存
	      	</span>
	    </p>
	    <ul className="eo_ul">
	    	<li onClick={this.focusInput.bind(this)}>
	    		设备名称
	    		<img className="setting_right" src="../../../src/resource/images/myCenter/right_arrow.png" />
	    		<input id="eo_name_input" className="eo_name_input" type="text" placeholder="请输入名称" />
	    	</li>
	    	<li>
	    		所属房间
	    		<img className="setting_right" src="../../../src/resource/images/myCenter/right_arrow.png" />
	    		<span className="eo_name">默认房间</span>
	    	</li>
	    </ul>
	    <p className="eo_delete" onClick={this.deleteEq.bind(this)}>
	    	删除设备
	    </p>
      </div>
    );
  }
}
export default eqOption
