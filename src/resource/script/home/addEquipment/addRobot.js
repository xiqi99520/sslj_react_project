require("./../../../style/addEq.css");
import {SetCookie,GetCookie} from "./../../cookie.js"
import {Base} from './../../connect.js';

var defaultHouse="";
class AddRobot extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {data:""};
	  }
	componentDidMount(){
		var that=this;
		  $.ajax({
				type : "post",
				url : Base + "/account/getMemberAllAccount.do",
				dataType : "json",
				data:{
					memberId:GetCookie("id")
				},
				success : function (data) {
					if(data.isSuccess==0){
						data.accountList.map(function(item,index){
							if(item.isDefault==0){
								defaultHouse=item.id;
							}
						});
					}else{
						alert(data.errorMsg)
					}
					
				}
			}); 
		
	}
	DisShow(){
		$("#robot_ewm_box").css("display","none");
	  }
	getQrcode(){
		var ssid=$("#ssid").val();
		var psw=$("#psw").val();
		if(!ssid){
			$("#error_msg").html("请输入WIFI账号");
			$("#Error").css("display","block");
			setTimeout(function(){
				$("#Error").css("display","none");
			},1000);
			return false;
		}
		if(!psw){
			$("#error_msg").html("输入WIFI密码");
			$("#Error").css("display","block");
			setTimeout(function(){
				$("#Error").css("display","none");
			},1000);
			return false;
		}
		var param={
				  "company": "sslj",
				  "ssid": ssid,
				  "psw": psw,
				  "data": {
				    "user": defaultHouse
				  }
				};
		$("#qrcode").html("");
		$("#robot_ewm_box").css("display","block");
		new QRCode(document.getElementById('qrcode'), {
		    text: JSON.stringify(param),
		    width: 220,
		    height: 220,
		    colorDark : "#000000",
		    colorLight : "#ffffff"
		});
	}
	componentWillMount(){
		var that=this;
	}
	goBack(){
		  this.props.history.goBack();
	  }
  render(){
    return (
      <div>
	    <p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      添加小白机器人
	    </p>
	    <p className="aed_pic">
	      <img  src="../../../src/resource/images/addEq/robot@3x.png" />
	    </p>
	    <div className="robot_msg">
	    	<p className="robot_tile">
	    		小白智能机器人
	    	</p>
	    	<p className="robot_li">
	    		<span>WIFI账号：</span>
	    		<input id="ssid" type="text" />
	    	</p>
	    	<p className="robot_li">
	    		<span>WIFI密码：</span>
	    		<input id="psw" type="text" />
	    	</p>
	    </div>
	    <p className="aed_submit aed_true" onClick={this.getQrcode.bind(this)}>
	    	下一步
	    </p>
	    <div id="robot_ewm_box" style={{"display":"none"}}>
	    	<div className="box_bg" onClick={this.DisShow.bind(this)}></div>
	    	<div className="robot_box">
	    		<p id="qrcode" className="robot_ewm"></p>
	    		<p className="robot_qrcode_tips">
	    			用小白机器人扫描上方二维码添加入网
	    		</p>
	    	</div>
	    </div>
      </div>
    );
  }
}
export default AddRobot
