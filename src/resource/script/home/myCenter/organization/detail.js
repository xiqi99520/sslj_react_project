require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
class OrganizationDetail extends React.Component {
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
		  var thisTitle='部门组织详情';
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
	        			 window.location.href="#/organization/manager/"+that.props.match.params.id+"/"+Message.companyStaff.companyId+"/0";
	        			 return false;
	        		 }
	        		 if(Message.companyStaff.isAuthorize==1){
	        			 window.location.href="#/organization/manager/"+that.props.match.params.id+"/"+Message.companyStaff.companyId+"/1";
	        		 }else{
	        			 $("#name").html("部门名称："+Message.bcm.branchCompany);
	        			 $("#manager").html("部门经理："+Message.bcm.manager);
	        			 $("#password").html("部门加入编码："+Message.bcm.password);
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
  render(){
    return (
      <div>
      	<div className="recommend_rule Organization_Detail">
	  		<div className="rr_head">
	  			<img className="rr_head_pic" src="../../../src/resource/images/myCenter/recommend/rr_head.png" />
	  			<p className="rr_title">您已加入部门</p>
	  		</div>
	  		<div className="rr_main qr_rule_ul">
	  			<img className="rr_main_pic" src="../../../src/resource/images/myCenter/recommend/rr_main.png" />
	  			<p id="name" className="qr_rule_li">
	  			</p>
	  			<p id="manager" className="qr_rule_li">
	  				
	  			</p>
	  			<p id="password" className="qr_rule_li">
	  			</p>
	  		</div>
	  	</div>
      </div>
    )
  }
}
export default OrganizationDetail