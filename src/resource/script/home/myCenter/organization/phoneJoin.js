require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
class PhoneJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		data:[]
    };
  }
  componentWillMount(){
	  try 
	  { 
		  var userAgent=navigator.userAgent;
		  var thisTitle='手机登录部门';
		  document.title =thisTitle;
		  if(userAgent.indexOf('Android')>=0){
		      NAVIGATION.titleChange(thisTitle);
		  }
	  } 
	  catch(err) 
	  { 
	  }
  }
  setMsg(){
	  var that=this;
	  var phone=$("#phone").val();
	  if(!/^1[3-9]\d{9}$/.test(phone)){
	      alert("手机号码格式不正确");
	      return false;
	    }
	  $.ajax({
	       type:"post",
	       url: Base + "/member/findByPhone.do",
	       dataType:"json",
	       data:{
	    	   phone:phone
	       },
	       success:function(Message){
	         if(Message.isSuccess === "0"){
	        	if(Message.entity){
	        		window.location.href="#/organization/join/"+Message.entity[0].id;
	        	}else{
	        		alert("请先进行注册");
	        	}
	         }else{
	           alert(Message.errorMsg);
	         }
	       },
	       error:function (xhr,status,statusText){
	           alert("服务器维护");
	       }
	    });
	  
  }
  render(){
	  var id=this.props.match.params.id;
    return (
      <div className="join_page">
	    <p className="qr_msg_title">
			<input id="phone" type="text" placeholder="请输入手机号码" />
		</p>
      	<p className="qr_msg_button" onClick={this.setMsg.bind(this)}>
      		登录公司组织
	  	</p>
      	<div className="recommend_rule">
	  		<div className="rr_head">
	  			<img className="rr_head_pic" src="../../../src/resource/images/myCenter/recommend/rr_head.png" />
	  			<p className="rr_title">规则</p>
	  		</div>
	  		<div className="rr_main qr_rule_ul">
	  			<img className="rr_main_pic" src="../../../src/resource/images/myCenter/recommend/rr_main.png" />
	  			<p className="qr_rule_li">
	  				1.输入所在部门的组织编号，加入组织。
	  			</p>
	  			<p className="qr_rule_li">
	  				2.员工如需要退出切换组织，请联系部门经理。
	  			</p>
	  		</div>
	  	</div>
      </div>
    )
  }
}
export default PhoneJoin