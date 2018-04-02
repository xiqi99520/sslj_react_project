require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
class OrganizationJoin extends React.Component {
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
		  var thisTitle='填写信息';
		  document.title =thisTitle;
		  if(userAgent.indexOf('Android')>=0){
		      NAVIGATION.titleChange(thisTitle);
		  }
	  } 
	  catch(err) 
	  { 
	  }
	  var that=this;
	  $.ajax({
	       type:"post",
	       url: Base + "/companystaff/isInside.do",
	       dataType:"json",
	       data:{
	    	   memberId:that.props.match.params.id
	       },
	       success:function(Message){
	         if(Message.isSuccess === "0"){
	        	 if(Message.companyStaff.companyId){
	        		 if(Message.companyStaff.isManager==1){
	        			 $("#alertMsg").html("您已加入了部门组织!");
	        			 $("#Alert").css("display","block");
	        			 $("#alert_sure").bind("click",function(){
	        				 $("#alert_sure").unbind();
	        				 $("#Alert").css("display","none");
	        				 window.location.href="#/organization/manager/"+that.props.match.params.id+"/"+Message.companyStaff.companyId+"/0";
	        				 return false;
	        			 });
	        			 setTimeout(function(){
	        				 $("#alert_sure").unbind();
	        				 $("#Alert").css("display","none");
	        				 window.location.href="#/organization/manager/"+that.props.match.params.id+"/"+Message.companyStaff.companyId+"/0";
	        			 },2000);
	        			 return false;
	        		 }
	        		 if(Message.companyStaff.isAuthorize==1){
	        			 $("#alertMsg").html("您已加入了部门组织!");
	        			 $("#Alert").css("display","block");
	        			 $("#alert_sure").bind("click",function(){
	        				 $("#alert_sure").unbind();
	        				 $("#Alert").css("display","none");
	        				 window.location.href="#/organization/manager/"+that.props.match.params.id+"/"+Message.companyStaff.companyId+"/1";
	        				 return false;
	        			 });
	        			 setTimeout(function(){
	        				 $("#alert_sure").unbind();
	        				 $("#Alert").css("display","none");
	        				 window.location.href="#/organization/manager/"+that.props.match.params.id+"/"+Message.companyStaff.companyId+"/1";
	        			 },2000);
	        			 return false;
	        		 }
	        		 if(Message.companyStaff.status==2){
	        			 $("#alertMsg").html("您已加入了部门组织!");
	        			 $("#Alert").css("display","block");
	        			 $("#alert_sure").bind("click",function(){
	        				 $("#alert_sure").unbind();
	        				 $("#Alert").css("display","none");
	        				 window.location.href="#/organization/detail/"+that.props.match.params.id;
	        				 return false;
	        			 });
	        			 setTimeout(function(){
	        				 $("#alert_sure").unbind();
	        				 $("#Alert").css("display","none");
	        				 window.location.href="#/organization/detail/"+that.props.match.params.id;
	        			 },2000);
	        			 return false;
	        		 }else if(Message.companyStaff.status==1){
	        			 alert("正在申请中！");
	        		 }
	        	 }else{
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
  setMsg(){
	  var that=this;
	  var phone=$("#phone").val();
	  var number=$("#number").val();
	  var id=that.props.match.params.id;
	  if(!number){
		  alert("请输入组织编号");
		  return false;
	  }
	  if(id=="phone"){
		  if(!/^1[3-9]\d{9}$/.test(phone)){
		      alert("手机号码格式不正确");
		      return false;
		    }
		  $.ajax({
		       type:"post",
		       url: Base + "/companystaff/addSaveByPhone.do ",
		       dataType:"json",
		       data:{
		    	   password:number,
		    	   phone:phone
		       },
		       success:function(Message){
		         if(Message.isSuccess === "0"){
		        	 alert("申请已提交，请等待部门经理审核");
		         }else{
		           alert(Message.errorMsg);
		         }
		       },
		       error:function (xhr,status,statusText){
		           alert("服务器维护");
		       }
		    });
	  }else{
		  $.ajax({
		       type:"post",
		       url: Base + "/companystaff/addSave.do",
		       dataType:"json",
		       data:{
		    	   memberId:id,
		    	   password:number
		       },
		       success:function(Message){
		         if(Message.isSuccess === "0"){
		        	 alert("申请已提交，请等待部门经理审核");
		         }else{
		           alert(Message.errorMsg);
		         }
		       },
		       error:function (xhr,status,statusText){
		           alert("服务器维护");
		       }
		    });
	  }
  }
  render(){
	  var id=this.props.match.params.id;
    return (
      <div className="join_page">
	    <p className={id=="phone"?"qr_msg_title":"dis_show"}>
			<input id="phone" type="text" placeholder="请输入手机号码" />
		</p>
      	<p className="qr_msg_title">
      		<input id="number" type="text" placeholder="请输入组织编号" />
      	</p>
      	<p className="qr_msg_button" onClick={this.setMsg.bind(this)}>
      		加入公司组织
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
export default OrganizationJoin