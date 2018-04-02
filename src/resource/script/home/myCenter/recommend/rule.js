require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
class RecommendRule extends React.Component {
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
		  var thisTitle='推荐规则';
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
  render(){
    return (
    		<div className="recommend_wrapper">
          	<img className="recommend_bg" src="../../../src/resource/images/myCenter/recommend/recommend_bg.png" />
          	<div id="recommend_rule" className="recommend_rule">
          		<div className="rr_head">
          			<img className="rr_head_pic" src="../../../src/resource/images/myCenter/recommend/rr_head.png" />
          			<p className="rr_title">推荐规则</p>
          		</div>
          		<div className="rr_main">
    	  			<img className="rr_main1" src="../../../src/resource/images/myCenter/recommend/rr_main_01.png" />
    	  			<img className="rr_main3" src="../../../src/resource/images/myCenter/recommend/rr_main_03.png" />
    	  			<div className="p_relative">
    		  			<p className="rr_li first_li">
    		  				<img src="../../../src/resource/images/myCenter/recommend/num1.png" />
    		  				点击推荐注册链接，推荐好友注册乐居智能会员；
    		  			</p>
    		  			<p className="rr_li recom_li">
    		  				<img src="../../../src/resource/images/myCenter/recommend/num2.png" />
    		  				好友通过点击链接或者扫描二维码，注册乐居智家会员，即可参加推荐 ；
    		  			</p>
    		  			<p className="rr_li recom_li">
    		  				<img src="../../../src/resource/images/myCenter/recommend/num3.png" />
    		  				好友成功注册后，成功登录后，您即可获得<span className="orange_num">500</span>积分，积分奖励将即时发放到您的积分账户；（每天推荐上限25000积分）
    		  			</p>
    		  			<p className="rr_li recom_li">
    		  				<img src="../../../src/resource/images/myCenter/recommend/num4.png" />
    		  				直接提现或者在积分商城<span className="orange_num">兑换礼品</span>；
    		  			</p>
    		  			<p className="rr_li recom_li">
    		  				<img src="../../../src/resource/images/myCenter/recommend/num5.png" />
    		  				积分兑换的商品，客服会在10个工作日内将商品寄出；
    		  			</p>
    		  			<p className="rr_li secend_li">
    		  				<img src="../../../src/resource/images/myCenter/recommend/num6.png" />
    		  				乐居智家积分有效期为一年，当年产生的积分在下个自然年12月31日前有效，逾期将作废。
    		  			</p>
    		  			<p className="rr_li secend_li">
    		  				<img src="../../../src/resource/images/myCenter/recommend/num7.png" />
    		  				活动最终解释权归盛世乐居（亚东）智能科技有限公司所有。
    		  			</p>
    	  			</div>
    	  		</div>
          	</div>
          </div>
    )
  }
}
export default RecommendRule