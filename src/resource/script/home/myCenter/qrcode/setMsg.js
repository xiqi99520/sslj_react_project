require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
class QrcodeMsg extends React.Component {
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
  }
  setMsg(){
	  var that=this;
	  var phone=$("#phone").val();
	  if(!phone){
		  alert("请输入收货人手机号码");
		  return false;
	  }
	  if(!/^1[3-9]\d{9}$/.test(phone)){
	      alert("手机号码格式不正确");
	      return false;
	  }
	  $.ajax({
	       type:"post",
	       url: Base + "/appOrder/addSave.do",
	       dataType:"json",
	       data:{
	    	  bookingPerson:phone,
	    	  introducer:that.props.match.params.id
	       },
	       success:function(Message){
	         if(Message.isSuccess === "0"){
	        	 window.location.href="https://shop19251147.youzan.com/v2/showcase/homepage?alias=jvkc4u7n&sls=2YyTEp&sf=qq_sm";
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
      	<p className="qr_msg_title">
      		<input id="phone" type="text" placeholder="请输入收货人手机号码" />
      	</p>
      	<p className="qr_msg_button" onClick={this.setMsg.bind(this)}>
      		购买盛世乐居产品
	  	</p>
      	<div className="recommend_rule">
	  		<div className="rr_head">
	  			<img className="rr_head_pic" src="../../../src/resource/images/myCenter/recommend/rr_head.png" />
	  			<p className="rr_title">规则</p>
	  		</div>
	  		<div className="rr_main qr_rule_ul">
	  			<img className="rr_main_pic" src="../../../src/resource/images/myCenter/recommend/rr_main.png" />
	  			<p className="qr_rule_li">
	  				1.填写推荐人号码，被推荐人成功注册后，推荐人即可获得500积分；
	  			</p>
	  			<p className="qr_rule_li">
	  				2.积分奖励将即时发放到推荐人积分账户；
	  			</p>
	  			<p className="qr_rule_li">
	  				3.购买盛世乐居产品，可获得相应商城的大优惠；
	  			</p>
	  			<p className="qr_rule_li">
	  				4.收货人手机号码必须与购买者手机号一致。
	  			</p>
	  		</div>
	  	</div>
      </div>
    )
  }
}
export default QrcodeMsg