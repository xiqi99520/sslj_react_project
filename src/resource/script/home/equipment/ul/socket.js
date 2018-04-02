var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js";
require('./../../../plugs/nouislider/nouislider.css');
var noUiSlider=require('./../../../plugs/nouislider/nouislider.js');
var toSlide=true;
class Socket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:"",statu:"",lighting:0};
  }
  componentDidMount(){
	  if(!socketObj){
		  window.getToten(this);
	  }else{
		  this.getListen();
		  this.getSend();
	  }
  }
  controllLight(){
	  
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
          	case "08":
          		break;
          	default:
          		break;
          	}
          }
      });
  }
  getSend(){
	  var opValue="1500"+GetCookie("SN")+"FE850C02"+this.props.match.params.shortAddress+"FFFFFFFFFFFF"+this.props.match.params.Endpoint+"FFFF";
	  window.changeSdkMsg(opValue);
	  opValue="1500"+GetCookie("SN")+"FE860C02"+this.props.match.params.shortAddress+"FFFFFFFFFFFF"+this.props.match.params.Endpoint+"FFFF";
	  window.changeSdkMsg(opValue);
  }
  onLight(){
	  var opValue="1600"+GetCookie("SN")+"FE820D02"+this.props.match.params.shortAddress+"FFFFFFFFFFFF"+this.props.match.params.Endpoint+"FFFF01";
	  window.changeSdkMsg(opValue);
	  $(".light_pic").removeClass("light_off").addClass("light_on");
  }
  offLight(){
	  var opValue="1600"+GetCookie("SN")+"FE820D02"+this.props.match.params.shortAddress+"FFFFFFFFFFFF"+this.props.match.params.Endpoint+"FFFF00";
	  window.changeSdkMsg(opValue);
	  $(".light_pic").removeClass("light_on").addClass("light_off");
  }
  goBack(){
	  this.props.history.goBack();
  }
  render() {
    return (
      <div className="light_wrapper">
        <p className="head_nav_light">
        	<img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/equipment/light_arrow.png" />
	      	{this.props.match.params.name}
	      	<a href={"#/equipment/option/"+this.props.match.params.name+"/"+this.props.match.params.shortAddress+"/"+this.props.match.params.Endpoint+"/"+this.props.match.params.eqSN+"/"+this.props.match.params.DeviceId+"/"+this.props.match.params.ZoneType+"/"+this.props.match.params.IEEE}>
	      		<img className="head_eq_right" src="../../../src/resource/images/equipment/door_option.png" />
	      	</a>
	    </p>
		<div className={this.state.statu==0?"light_pic light_off":"light_pic light_on"} >
			<img className="on" onClick={this.offLight.bind(this)} src="../../../src/resource/images/equipment/light_on.png" />
			<img className="off" onClick={this.onLight.bind(this)} src="../../../src/resource/images/equipment/light_off.png" />
			<p className="light_type">
				设备类型：{decodeURI(window.prePro(this.props.match.params.eqSN))}
			</p>
		</div>
		<div className="light_bg"></div>
      </div>
    );
  }
}
export default Socket
