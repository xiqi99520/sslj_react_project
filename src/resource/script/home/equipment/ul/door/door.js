var my$;
import {Base} from './../../../../connect.js';
import {SetCookie,GetCookie} from "./../../../../cookie.js";
class Door extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:""};
  }
  componentDidMount(){
	  if(!socketObj){
		  window.getToten(this);
	  }else{
		  this.getListen();
		  this.getSend();
	  }
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
  goBack(){
	  this.props.history.goBack();
  }
  showBox(){
	  $("#door_box").css("display","block");
  }
  disShowBox(){
	  $("#door_box").css("display","none");
  }
  openDoor(){
	  var that=this;
	  $("#door_box").css("display","block");
	  $("#door_input").focus();
  }
  doorDisShow(){
	  $("#door_box").css("display","none");
  }
  doorSure(){
	var doorValue=$("#door_input").val();
	if(doorValue.length!=6){
	  alert("密码错误");
	  return false;
	}
	var password=doorValue.split("");
	var key = [70,69,73,66,73,71];//加密密钥
	var npass="";
	for (var i = 0; i < 6; i ++)
	{
		npass =npass+(key[i] ^ password[i]).toString(16).toUpperCase();
	}
	var opValue="1D00"+GetCookie("SN")+"FE821402"+this.props.match.params.shortAddress+"000000000000"+this.props.match.params.Endpoint+"00000106"+npass;
	window.changeSdkMsg(opValue);
	this.doorDisShow();
  }
  render() {
    return (
      <div className="curtains_wrapper">
      	<div className="door_bg">
	        <div className="head_nav_light">
		      	<img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/equipment/light_arrow.png" />
		      	智能门锁
		      	<a href={"#/equipment/option/"+this.props.match.params.name+"/"+this.props.match.params.shortAddress+"/"+this.props.match.params.Endpoint+"/"+this.props.match.params.eqSN+"/"+this.props.match.params.DeviceId+"/"+this.props.match.params.ZoneType+"/"+this.props.match.params.IEEE}>
		      		<img className="head_eq_right" src="../../../src/resource/images/equipment/door_option.png" />
		      	</a>
		    </div>
			<p className="door_pic door_open">
				<img className="open" src="../../../src/resource/images/equipment/door_open.png" />
				<img className="lock" src="../../../src/resource/images/equipment/door_lock.png" />
			</p>
		</div>
		<p className="de_type">
			设备类型：{decodeURI(window.prePro(this.props.match.params.eqSN))}
		</p>
		<div className="door_option door_open">
			<img className="open" onClick={this.openDoor.bind(this)} src="../../../src/resource/images/equipment/door_icon_open.png" />
			<img className="lock" src="../../../src/resource/images/equipment/door_icon_lock.png" />
		</div>
		<p className="temporary_pass">
			<a href={"#/equipment/interimPassword/"+this.props.match.params.shortAddress+"/"+this.props.match.params.Endpoint}>临时密码授权</a>
		</p>
		<div id="door_box" className="door_box">
	    	<div className="box_bg" onClick={this.doorDisShow.bind(this)}></div>
	    	<div className="sure_main door_main">
	    		<p className="sure_title">请输入密码</p>
	    		<p className="index_door">
	    			<input id="door_input" type="text" />
	    		</p>
	    		<p className="sure_button">
	    			<span id="sureCancel" className="sureCancel" onClick={this.doorDisShow.bind(this)}>取消</span>
	    			<span id="sureOk" className="sureOk" onClick={this.doorSure.bind(this)}>确定</span>
	    		</p>
	    	</div>
	    </div>
      </div>
    );
  }
}
export default Door
