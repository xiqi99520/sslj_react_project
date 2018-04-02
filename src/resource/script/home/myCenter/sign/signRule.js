var my$;
import {Base} from './../../../connect.js';
import {Format} from './../../../time.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
require("./../../../../style/myCenter.css");
var continuNum=0;
var todayIs=false;
var countPoint;
class SignRule extends React.Component {
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
			  var thisTitle='积分规则';
			  document.title =thisTitle;
			  if(userAgent.indexOf('Android')>=0){
			      NAVIGATION.titleChange(thisTitle);
			  }
		  } 
		  catch(err) 
		  { 
		  } 
	  }
  goBack(){
	  this.props.history.goBack();
  }
  render(){
    return (
      <div>
	    <div className="rule_part">
	    	<p className="rule_title">签到规则</p>
	    	<div className="rule_content">
	    		<p>连续签到1天   5积分</p>
	    		<p>连续签到2天   6积分</p>
	    		<p>连续签到3天   7积分</p>
	    		<p>连续签到4天   8积分</p>
	    		<p>连续签到5天   9积分</p>
	    		<p>连续签到6天   10积分</p>
	    		<p>连续签到7天   11积分</p>
	    		<p>连续签到7天以后按下一周期计算，以此循环</p>
	    		<p>单天签到1天   5积分</p>
	    		<p>连续签到几天，中间断开，后面从第一天开始计算</p>
	    	</div>
	    </div>
	    <div className="rule_part">
	    	<p className="rule_title">1.什么是积分？</p>
	    	<div className="rule_content">
	    		<p>乐居智家的积分是乐居智家的用户对签到等行为的奖励。</p>
	    	</div>
	    </div>
	    <div className="rule_part">
	    	<p className="rule_title">2.积分能干什么？</p>
	    	<div className="rule_content">
	    		<p>1.在乐居智家的积分商城中免费兑换礼品以及其他专属优惠。</p>
	    		<p>2.在积分商城中参与抽奖，奖品很丰厚哦！</p>
	    	</div>
	    </div>
	    <div className="rule_part">
	    	<p className="rule_title">3.如何获得更多积分？</p>
	    	<div className="rule_content">
	    		<p>目前只要完成注册、签到或者邀请好友，就能获得相应积分。</p>
	    	</div>
	    </div>
	    <div className="rule_part">
	    	<p className="rule_title">4.积分的其他问题？</p>
	    	<div className="rule_content">
	    		<p>积分来源和支出可以在记录中查看。</p>
	    	</div>
	    </div>
	    <div className="rule_part">
	    	<p className="rule_title">5.积分的期限？</p>
	    	<div className="rule_content">
	    		<p>乐居智家积分有效期为一年，当年产生的积分在下个自然年12月31日前有效，逾期将作废。</p>
	    	</div>
	    </div>
      </div>
    )
  }
}
export default SignRule
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
