var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js";
require('./../../../plugs/nouislider/nouislider.css');
var noUiSlider=require('./../../../plugs/nouislider/nouislider.js');
var toSlide=true;
class Light extends React.Component {
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
	  var that=this;
	  var connectSlider = document.getElementById('curtains_plus');
	  var first=0;
	  var cStep;
	  noUiSlider.create(connectSlider, {
		  	start: 0,
		  	step:1,
		  	connect: [true, false],
		  	range: {
		  	  'min': 0,
		  	  'max': 255
		  	}
		  });
	  connectSlider.noUiSlider.on('update', function( values, handle ){
		  if(toSlide==false){
			  toSlide=true;
		  }else{
			  that.setLighting(parseInt(values[handle]));
		  }
		});
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
          		var shortAddress=ableData.substring(4,8);
          		var Endpoint=ableData.substring(8,10);
          		var light=parseInt(ableData.substring(10,12),16);
          		if(shortAddress==that.props.match.params.shortAddress && Endpoint==that.props.match.params.Endpoint){
          			if(light>1){
          				if(light==that.state.lighting){
          					return false;
          				}
          				toSlide=false;
          				document.getElementById('curtains_plus').noUiSlider.set([light]);
          				that.setState({lighting:light});
          			}
          		}
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
  setLighting(num){
	  var setLighting=num.toString(16).toUpperCase();
	  var opValue="1800"+GetCookie("SN")+"FE830F02"+this.props.match.params.shortAddress+"FFFFFFFFFFFF"+this.props.match.params.Endpoint+"FFFF"+setLighting+"0000";
	  window.changeSdkMsg(opValue);
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
		<div className="curtains_controll light_controll">
			<span className="cp_off">暗</span>
			<div id="curtains_plus" className="curtains_plus"></div>
			<span className="cp_open">亮</span>
		</div>
		<div className="light_bg"></div>
      </div>
    );
  }
}
export default Light
