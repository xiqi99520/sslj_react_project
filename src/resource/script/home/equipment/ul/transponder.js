var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js";
class Transponder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:""};
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
  }
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
	          		}
	          		break;
	          	default:
	          		break;
	          	}
	      	}
	  });
  }
  goBack(){
	  this.props.history.goBack();
  }
  transSubmit(){
	  var that=this;
	  var deviceType;
	  var study;
	  var word=$("#transponder_select").val();
	  if(word=="智能电视"){
		  deviceType="02";
		  study=1;
	  }
	  if(word=="机顶盒"){
		  deviceType="03";
		  study=1;
	  }
	  if(word=="自定义红外"){
		  deviceType="05";
		  study=0;
	  }
	  GetCookie("transVersion");
	  $.ajax({
	       type:"post",
	       url: Base+"/infrareddevice/addSave.do",
	       dataType:"json",
	       data:{
	    	   	'study':study,
	    	   	'version':GetCookie("transVersion"),
				  'deviceName':word,
				  'deviceType':deviceType,
				  'userId':GetCookie("houseId"),
				  'ieee':that.props.match.params.IEEE
			},
	       success:function(data){
	    	   if(data.isSuccess==0){
	    		   alert("成功添加设备");
	    		   that.goBack();
	    	   }else{
	    		   alert(data.errorMsg);
	    	   }
	       },
	       error:function(data){
	          alert("服务器返回数据错误");
	       }
	  });
  }
  render() {
    return (
      <div className="curtains_wrapper">
      	<div className="transponder_bg">
	        <p className="head_nav_light">
	        	<img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/equipment/light_arrow.png" />
		      	红外转发器
		      	<a href={"#/equipment/option/"+this.props.match.params.name+"/"+this.props.match.params.shortAddress+"/"+this.props.match.params.Endpoint+"/"+this.props.match.params.eqSN+"/"+this.props.match.params.DeviceId+"/"+this.props.match.params.ZoneType+"/"+this.props.match.params.IEEE}>
	      			<img className="head_eq_right" src="../../../src/resource/images/equipment/door_option.png" />
	      		</a>
		    </p>
			<p className="curtains_pic curtains_open">
				<img className="open" src="../../../src/resource/images/equipment/transponder.png" />
			</p>
		</div>
		<p className="de_type">
			设备类型：{decodeURI(window.prePro(this.props.match.params.eqSN))}
		</p>
		<div className="transponder_choose">
			<select id="transponder_select" className="transponder_select">
				<option>智能电视</option>
				<option>机顶盒</option>
				<option>自定义红外</option>
			</select>
		</div>
		<p className="transponder_submit" onClick={this.transSubmit.bind(this)}>
			保存
		</p>
      </div>
    );
  }
}
export default Transponder
