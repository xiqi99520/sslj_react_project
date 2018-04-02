require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
let  sendCode=true;
let wait=60;
function time(o) {
  if (wait == 0) {
    o.html("获取验证码");
    wait = 60;
    sendCode=true;
  }
  else {
    o.html(wait + "s后可重发");
    wait--;
    setTimeout(function() {
      time(o)
    },
    1000)
  }
}
class Recommended extends React.Component {
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
		  var thisTitle='推荐分享';
		  document.title =thisTitle;
		  if(userAgent.indexOf('Android')>=0){
		      NAVIGATION.titleChange(thisTitle);
		  }
	  } 
	  catch(err) 
	  { 
	  }
  }
  componentDidMount(){
	  $("#rs_code").html("邀请码：&nbsp;"+this.props.match.params.phone);
  }
  IfUser(){
	  var that=this;
	  var phone=$("#phone").val();
	  if(!phone){
		  alert("请输入手机号码");
		  return false;
	  }
	  if(!/^1[3-9]\d{9}$/.test(phone)){
	      alert("手机号码格式不正确");
	      return false;
	  }
	  $.ajax({
	       type:"post",
	       url: Base + "/member/findUserInfo.do",
	       dataType:"json",
	       data:{
	    	   phone:phone
	       },
	       success:function(Message){
	         if(Message.isSuccess === "0"){
	        	 window.location.href="#/hadRegister/1/1";
	         }else{
	        	 that.GetCode();
	         }
	       },
	       error:function (xhr,status,statusText){
	         $("#error_msg").html("服务器维护");
        	 $("#Error").css("display","block");
        	 setTimeout(function(){
        		 $("#Error").css("display","none");
        	 },2000);
	       }
	    });
  }
  GetCode(){
	  var phone=$("#phone").val();
	  if(sendCode==true){
	      $.ajax({
	         type:"post",
	         url:Base+"/register/sendCodeMsg.do",
	         dataType:"jsonp",
	         jsonpCallback:"successCallback",
	         jsonp: "callback",
	         async:false,
	         data:{
	            phone:phone
	         },
	         success:function(Message){
	           var id= Message.jsonp_result.isSuccess;
	           if(id === "0"){
	             sendCode=false;
	             time($("#get_code"));
	           }else{
	             alert(Message.jsonp_result.errorMsg);
	           }
	         }
	       });
	    }else{

	    }
  }
  downApp(){
	  var that=this;
	  var phone=$("#phone").val();
	    var code=$("#code").val();
	    if(phone==""){
	      alert("手机号码不能为空");
	      return false;
	    }
	    if(!/^1[3-9]\d{9}$/.test(phone)){
	      alert("手机号码格式不正确");
	      return false;
	    }
	    if(!code){
	      alert("请输入验证码");
	      return false;
	    }
	    $.ajax({
	        type:"post",
	        url:Base+"/register/appRegister.do",
	        dataType:"jsonp",
	        jsonpCallback:"successCallback",
	        jsonp: "callback",
	        async:false,
	        data:{
	           phone:phone,
	           code:code,
	           password:"123456",
	           introducer:that.props.match.params.phone
	        },
	        success:function(Message){
	          var id= Message.jsonp_result.isSuccess;
	          if(id == "0"){
	             window.location.href="#/download";
	          }else{
	            alert(Message.jsonp_result.errorMsg);
	          }
	        },
	        error:function (xhr,status,statusText){
	            alert("服务器维护");
	        }
	     })
  }
  render(){
    return (
      <div id="recommended" className="recommend_wrapper">
      	<img className="recommend_bg" src="../../../src/resource/images/myCenter/recommend/recommend_bg.png" />
      	<div className="recommend_main">
      		<ul className="rs_ul">
      			<li>
      				<input id="phone" type="text" placeholder="请输入手机号码" />
      			</li>
      			<li className="rs_li">
	  				<input id="code" type="text" placeholder="输入验证码" />
	  				<span id="get_code" className="re_get_code" onClick={this.IfUser.bind(this)}>获取验证码</span>
	  			</li>
	  			<li>
	  				<p id="rs_code" className="rs_code">
	  					邀请码：<span>VR499690</span>
	  				</p>
	  			</li>
      		</ul>
      		<p className="recommend_friend"  onClick={this.downApp.bind(this)}>
      			下载好礼
      		</p>
      	</div>
      	<p className="rs_tips">
      		<a href="https://shop19251147.youzan.com/v2/showcase/homepage?alias=jvkc4u7n&sls=2YyTEp&sf=qq_sm">
	      		<img src="../../../src/resource/images/myCenter/recommend/shopping_cart.png" />
	      		亲，购买我们的产品也可得好礼哟！
      		</a>
      	</p>
      </div>
    )
  }
}
export default Recommended