require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
class Component extends React.Component {
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
		  var thisTitle='产品体验官招募';
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
  }
  ex_submit(){
	  var name=$("#name").val();
	  var phone=$("#phone").val();
	  var company=$("#company").val();
	  var address=$("#address").val();
	  var type=$("#type").val();
	  if(!name){
		  alert("请输入姓名");
		  return false;
	  }
	  if(!/^1[3-9]\d{9}$/.test(phone)){
		  alert("手机号码格式不正确");
		  return false;
	  }
	  if(!company){
		  alert("请输入公司名称");
		  return false;
	  }
	  if(!address){
		  alert("请输入用户地址");
		  return false;
	  }
	  $.ajax({
	       type:"post",
	       url: Base + "/activityenroll/addSave.do",
	       dataType:"json",
	       data:{
	    	   title:"产品体验官招募",
	    	   username:name,
	    	   phone:phone,
	    	   companyName:company,
	    	   userAddress:address,
	    	   type:type
	       },
	       success:function(Message){
	         var id= Message.isSuccess;
	         if(id === "0"){
	        	 $("#ex_box").css("display","none");
	        	 alert("预约成功");
	         }else{
	           alert(Message.errorMsg);
	         }
	       },
	       error:function (xhr,status,statusText){
	           alert("服务器维护");
	       }
	    });
  }
  disShow(){
	  $("#ex_box").css("display","none");
  }
  showBox(){
	  var height=$(window).scrollTop();
	  $("#ex_main").css("top",height+100+"px");
	  $("#ex_box").css("display","block");
  }
  focus(name,event){
	  $("#"+name).focus();
  }
  render(){
    return (
    		<div>
    			<div id="ex_box" className="ex_box" style={{"display":"none"}}>
    				<div className="box_bg" onClick={this.disShow.bind(this)}></div>
    				<div id="ex_main" className="ex_main">
	    				<p className="ex_wrapper">
	    	              	<input id="name" className="exp_input" type="text" placeholder="请输入姓名" />
	    	            </p>
	    	            <p className="ex_wrapper">
	    	            	<input id="phone" className="exp_input" type="text" placeholder="请输入联系人手机号" />
	    	            </p>
	    	            <p className="ex_wrapper">
	    	            	<input id="company" className="exp_input"  type="text" placeholder="请输入公司名称" />
	    	            </p>
	    	            <p className="ex_wrapper">
	    	            	<input id="address" className="exp_input" type="text" placeholder="请输入用户地址" />
	    	            </p>
	    	            <p className="ex_wrapper">
	    	            	<select id="type" className="exp_input">
	    	            		<option value="1">第一轮产品</option>
	    	            		<option value="2">第二轮产品</option>
	    	            		<option value="3">第三轮产品</option>
	    	            		<option value="4">第四轮产品</option>
	    	            	</select>
	    	            </p>
	    	            <p  className="login_submit" onClick={this.ex_submit.bind(this)}>
	    	              预约
	    	            </p>
    				</div>
    			</div>
	          	<p  onClick={this.showBox.bind(this)}>
	          		<img className="ex_width"  src="../../../src/resource/images/myCenter/huodong/experience.jpg" />
	          	</p>
	        </div>
    )
  }
}
export default Component