var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js";
require('./../../../plugs/nouislider/nouislider.css');
var noUiSlider=require('./../../../plugs/nouislider/nouislider.js');
var toSlide=true;
class Curtains extends React.Component {
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
		  	  'max': 1
		  	}
		  });
	  connectSlider.noUiSlider.on('update', function( values, handle ){
		  if(toSlide==false){
			  toSlide=true;
		  }else{
			  if(parseInt(values[handle])==0){
				  that.offLight();
			  }else{
				  that.onLight();
			  }
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
	  $(".curtains_pic").removeClass("curtains_off").addClass("curtains_open");
  }
  offLight(){
	  var opValue="1600"+GetCookie("SN")+"FE820D02"+this.props.match.params.shortAddress+"FFFFFFFFFFFF"+this.props.match.params.Endpoint+"FFFF00";
	  window.changeSdkMsg(opValue);
	  $(".curtains_pic").removeClass("curtains_open").addClass("curtains_off");
  }
  goBack(){
	  this.props.history.goBack();
  }
  render() {
    return (
    	<div className="curtains_wrapper">
          	<div className="curtains_bg">
	          	<p className="head_nav_light">
		        	<img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/equipment/light_arrow.png" />
			      	{this.props.match.params.name}
			      	<a href={"#/equipment/option/"+this.props.match.params.name+"/"+this.props.match.params.shortAddress+"/"+this.props.match.params.Endpoint+"/"+this.props.match.params.eqSN+"/"+this.props.match.params.DeviceId+"/"+this.props.match.params.ZoneType+"/"+this.props.match.params.IEEE}>
			      		<img className="head_eq_right" src="../../../src/resource/images/equipment/door_option.png" />
			      	</a>
			    </p>
    			<p className="curtains_pic curtains_open">
    				<img className="open" src="../../../src/resource/images/equipment/curtains_open.png" />
    				<img className="center" src="../../../src/resource/images/equipment/curtains_center.png" />
    				<img className="off" src="../../../src/resource/images/equipment/curtains_off.png" />
    			</p>
    		</div>
    		<p className="de_type">
    			设备类型：{decodeURI(window.prePro(this.props.match.params.eqSN))}
    		</p>
    		<div className="curtains_controll">
    			<span className="cp_off">关</span>
    			<div id="curtains_plus" className="curtains_plus"></div>
    			<span className="cp_open">开</span>
    		</div>
          </div>
    );
  }
}
export default Curtains
