require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
class ToRecommend extends React.Component {
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
		  var thisTitle='推荐有礼';
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
	  var that=this;
	  $("#recommend_code").html("我的邀请码："+that.props.match.params.phone);
	  $.ajax({
	       type:"post",
	       url: Base + "/register/introducerList.do",
	       dataType:"json",
	       data:{
	    	   introducer:that.props.match.params.phone
	       },
	       success:function(Message){
	         if(Message.isSuccess === "0"){
	        	 if(Message.member.isInside=="0"){
	        		 $("#to_exp").css("display","block");
	        	 }
	        	 $("#rm_num").html(Message.total);
	         }else{
	        	 $("#error_msg").html(Message.system_result_message_key);
	        	 $("#Error").css("display","block");
	        	 setTimeout(function(){
	        		 $("#Error").css("display","none");
	        	 },2000);
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
	  $.ajax({
	       type:"post",
	       url: Base + "/memberintegrallog/userRewardScoreCnt.do",
	       dataType:"json",
	       data:{
	    	   memberId:that.props.match.params.id
	       },
	       success:function(Message){
	         if(Message.isSuccess === "0"){
	        	 $("#orange_num").html(Message.countPoint);
	         }else{
	        	 $("#error_msg").html(Message.system_result_message_key);
	        	 $("#Error").css("display","block");
	        	 setTimeout(function(){
	        		 $("#Error").css("display","none");
	        	 },2000);
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
  recommendFriend(){
	  var that=this;
	  var userAgent=navigator.userAgent;
	  if(userAgent.indexOf('Android')>=0){
	      NAVIGATION.recommendFriend(that.props.match.params.id,that.props.match.params.phone);
	  }else if(userAgent.indexOf('iPhone')>=0){
		  window.webkit.messageHandlers.recommendFriend.postMessage({userId:that.props.match.params.id,phone:that.props.match.params.phone});
	  }
  }
  showRule(){
	  window.location.href="#/recommendRule/"+this.props.match.params.id+"/"+this.props.match.params.phone;
  }
  shareEwm(){
	  window.location.href="#/recommendQrcode/"+this.props.match.params.id+"/"+this.props.match.params.phone;
  }
  toDetail(){
	  window.location.href="#/recommendRecord/"+this.props.match.params.id+"/"+this.props.match.params.phone;
  }
  render(){
    return (
      <div className="recommend_wrapper">
      	<img className="recommend_bg" src="../../../src/resource/images/myCenter/recommend/recommend_bg.png" />
      	<div id="recommend_main" className="recommend_main">
	      	<div className="rm_ten_num">
				<p>邀请<span>16</span>人,奖励价值<span>147</span>元充电宝</p>
				<p className="rm_elecpic">
					<img src="../../../src/resource/images/myCenter/recommend/charge.jpg" />
				</p>
			</div>
      		<p className="rm_people">
      			成功邀请人数
      		</p>
      		<p className="rm_people_num">
      			<span>
      				<img src="../../../src/resource/images/myCenter/recommend/recommend_num.png" />
      				<em id="rm_num">0</em>
      			</span>
      		</p>
      		<p id="recommend_code" className="recommend_code">
      			我的邀请码：
	  		</p>
      		<p className="rm_to_rule" onClick={this.showRule.bind(this)}>
      			查看奖励规则&gt;
      		</p>
      		<p className="recommend_friend">
      			<span onClick={this.shareEwm.bind(this)}>分享二维码</span>
      			<span onClick={this.recommendFriend.bind(this)} className="rf_right">马上邀请好友</span>
      		</p>
      		<p id="to_exp" className="to_exp" style={{"display":"none"}}>
      			<a href="#/HDExperience">
      				产品体验官招募 &gt;
      			</a>
      		</p>
      		<p className="recommend_num">
      			已获得积分 : <span id="orange_num" className="orange_num"></span>分
      			<span className="to_recNum" onClick={this.toDetail.bind(this)} >查看&gt;</span>
      		</p>
      	</div>
      </div>
    )
  }
}
export default ToRecommend