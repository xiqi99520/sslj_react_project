var my$;
import {Base} from './../../../connect.js';
import {Format} from './../../../time.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
require("./../../../../style/myCenter.css");
var continuNum=0;
var todayIs=false;
var countPoint;
class Sign extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data:[],
	    	goods:[]
	    };
	  }
  goBack(){
	  this.props.history.goBack();
  }
  topMsg(){
	  if(countPoint!=""){
		  $("#num").html(countPoint);
	  }
	  if(continuNum!=""){
		  $("#continue").html(continuNum);
	  }
  }
  componentWillMount(){
	  try 
	  { 
		  var userAgent=navigator.userAgent;
		  var thisTitle='积分签到'
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
	  this.getMsg();
	  this.getGoods();
  }
  getGoods(){
	  var that=this;
	  $.ajax({
	       type:"post",
	       url: Base+"/goodschange/findDefaultGood.do",
	       dataType:"json",
	       success:function(data){
	    		if(data.isSuccess==0){
	    			that.setState({goods:data.data});
	    		}else{
	    			alert(data.errorMsg);
	    		}
	    	},
	    	error:function(data){
	    		 alert("获取服务器数据失败，请刷新网络重试！");
	    	}
	    });
  }
  getMsg(){
	  var that=this;
	  $.ajax({
	       type:"post",
	       url: Base+"/memberintegrallog/findTwoIntegralLog.do",
	       dataType:"json",
	       async:false,
	       data: {
	    	   "memberId":that.props.match.params.userId
	    	},
	    	success:function(data){
	    		if(data.isSuccess==0){
	    			countPoint=data.countPoint;
	    			that.topMsg();
	    			that.setState({data:data.data});
	    		}else{
	    			alert(data.errorMsg);
	    		}
	    	},
	    	error:function(data){
	    		 alert("获取服务器数据失败，请刷新网络重试！");
	    	}
	    });
  }
  signSubmit(){
	  var that=this;
	  if(todayIs==true){
		  alert("今天已经签到了！");
		  return false; 
	  }
	  $.ajax({
	       type:"post",
	       url: Base+"/memberintegral/addSave.do ",
	       dataType:"json",
	       data: {
	    	   "memberId":that.props.match.params.userId
	    	},
	    	success:function(data){
	    		if(data.isSuccess==0){
	    			that.getMsg();
	    			$("#getSign").css("display","block");
	    			setTimeout(function(){
	    				$("#getSign").css("display","none");
	    			},3000);
	    			that.topMsg();
	    		}else{
	    			alert(data.errorMsg);
	    		}
	    	},
	    	error:function(data){
	    		 alert("获取服务器数据失败，请刷新网络重试！");
	    	}
	    });
  }
  DisShow(){
	$("#getSign").css("display","none");
  }
  render(){
	  var that=this;
	  if(this.state.data.length==0){
		  var newD=0;
		  var secondD=0;
	  }else{
		  var newDate=this.state.data[0].createDate;
		  var newD=(new Date(newDate)).Format("MM月dd日");
		  if(this.state.data.length==1){
			  var secondD=0;
		  }else{
			  var secondDate=this.state.data[1].createDate;
			  var secondD=(new Date(secondDate)).Format("MM月dd日");
		  }
	  }
	  
	  var date=(new Date()).valueOf();
	  var yestDate=date-1000*60*60*24;
	  var todayDate=date;
	  var oneDate=date+1000*60*60*1;
	  var twoDate=date+1000*60*60*24*2;
	  var threeDate=date+1000*60*60*24*3;
	  var fourDate=date+1000*60*60*24*4;
	  var yestD=(new Date(yestDate)).Format("MM月dd日");
	  var todayD=(new Date(todayDate)).Format("MM月dd日");
	  var oneD=(new Date(oneDate)).Format("MM月dd日");
	  var twoD=(new Date(twoDate)).Format("MM月dd日");
	  var threeD=(new Date(threeDate)).Format("MM月dd日");
	  var fourD=(new Date(fourDate)).Format("MM月dd日");
	  var baseNum=0;
	  var yestIs=false;
	  var day = 11;
	  var sep;
	  var flag=false;
	  switch(newD){
		  case yestD:
			  yestIs=true;
			  baseNum=this.state.data[0].integral;
			  continuNum=baseNum - 4;
/*			  if(yestD=="12月21日" ||yestD=="12月22日"){
				  continuNum=continuNum+4;
				  day =7;
			  }
			  if(todayD=="12月23日"){
				  baseNum=baseNum+4;
			  }*/
			  break;
		  case todayD:
			  if(yestD==secondD){
				  yestIs=true;
			  }
			  baseNum=this.state.data[0].integral-1;
			  if(yestIs==true&&baseNum==4){
				  baseNum=11;
			  }
			  var currPoint = this.state.data[0].integral;
			 
			  continuNum=this.state.data[0].integral-4;
/*			  if(todayD=="12月22日"){
				  continuNum=continuNum+4;
				  day =7;
			  }*/
			  todayIs=true;
			  break;
		  default :
			  flag=true;
			  baseNum=4;
			  /*if(todayD=="12月22日"){
				  baseNum=0;
			  }*/
	  }
	  sep=5;
/*	  if(todayD=="12月22日"){
		  if(flag){
			  sep=1;
		  }else{
			  sep=baseNum;
		  }
	  }else{
		  sep=5;
	  }*/
    return (
      <div>
	    <div className="point_main">
	    	<p className="point_title">
	    		您的可用积分
	    		<a className="sign_rule_a" href="#/signRule">规则 &gt;</a>
	    	</p>
	    	<p id="num" className="point_num">0</p>
	    	<p className="point_continue">已经连续签到<span id="continue">{continuNum}</span>天</p>
	    </div>
	    <div className="sign_part">
	    	<img className="sign_bg" src="../../../src/resource/images/commen/sr_bg.png" />
	    	<div className="sign_bottom">
		    	<div className="sign_button">
		    		<div className="sign_show_days">
		    			<p className="sp_num">
		    				<span className={yestIs==true?'orange':''}>+{(baseNum == 0 || baseNum == 4) ? sep : baseNum}</span>
		    				<span id="tNum" className={todayIs==true?'orange':''}>+{Number(baseNum)+1>day?Number(Number(baseNum)-6) : Number(baseNum)+1}</span>
		    				<span>+{Number(baseNum)+2>day?Number(Number(baseNum)-5) : Number(baseNum)+2}</span>
		    				<span>+{Number(baseNum)+3>day?Number(Number(baseNum)-4) : Number(baseNum)+3}</span>
		    				<span>+{Number(baseNum)+4>day?Number(Number(baseNum)-3) : Number(baseNum)+4}</span>
		    				<span>+{Number(baseNum)+5>day?Number(Number(baseNum)-2) : Number(baseNum)+5}</span>
		    			</p>
		    			<p className="sp_line">
		    				<span className={yestIs==true?'sp_signed':''}>
		    					<em></em>
		    					<img src="../../../src/resource/images/commen/dot.png" />
		    				</span>
		    				<span id="tPoint" className={todayIs==true?'sp_signed':''}>
		    					<em></em>
		    					<img src="../../../src/resource/images/commen/dot.png" />
		    				</span>
		    				<span>
		    					<em></em>
		    					<img src="../../../src/resource/images/commen/dot.png" />
		    				</span>
		    				<span>
		    					<em></em>
		    					<img src="../../../src/resource/images/commen/dot.png" />
		    				</span>
		    				<span>
		    					<em></em>
		    					<img src="../../../src/resource/images/commen/dot.png" />
		    				</span>
		    				<span>
		    					<em></em>
		    					<img src="../../../src/resource/images/commen/dot.png" />
		    				</span>
		    			</p>
		    			<p className="sp_date">
		    				<span>昨天</span>
		    				<span>今天</span>
		    				<span>明天</span>
		    				<span>{twoD}</span>
		    				<span>{threeD}</span>
		    				<span>{fourD}</span>
		    			</p>
		    		</div>
		    		<p className="sign_submit">
		    			<span className={todayIs==true?'sign_botton have_signed':'sign_botton'} onClick={this.signSubmit.bind(this)}>签到</span>
		    			<a className="draw_botton" href={"#/draw/"+this.props.match.params.userId}>抽奖</a>
		    		</p>
		    	</div>
	    	</div>
	    </div>
	    <div className="sign_goods">
	    	<p className="sign_goods_title">
	    		积分兑好礼
	    		<a href={"#/goodList/"+this.props.match.params.userId}>更多&gt;</a>
	    	</p>
	    	<ul className="goods_ul">
	    	{
	    		this.state.goods.map(function(item,index){
	    			return (
	    					<li key={index}>
	    						<a href={"#/goodsDetail/"+that.props.match.params.userId+"/"+item.id}>
		    						<p className={item.remainderNumber==0?"goods_null":"goods_null dis_show"}>
				    					<img src="../../../src/resource/images/commen/good_null.png" />
				    				</p>
			    	    			<p className="goods_pic">
			    	    				<img src={item.imageUrl1} />
			    	    			</p>
			    	    			<p className="goods_name">
			    	    			{item.goodsName}
			    	    			</p>
			    	    			<p className="goods_points">
			    	    			{item.integral}积分
			    	    			</p>
			    	    			<p className={item.remainderNumber==0?"goods_exchange gray_button":"goods_exchange"}>
			    	    				立即兑换
			    	    			</p>
		    	    			</a>
		    	    		</li>
	    			)
	    		})
	    	}
	    	</ul>
	    </div>
	    <div id="getSign" style={{display:"none"}}>
			<div className="box_bg" onClick={this.DisShow.bind(this)}></div>
	    	<div className="get_sign">
	    		<p className="sign_box_num">
	    			+<span>{Number(baseNum)+1>12?Number(Number(baseNum)-6) : Number(baseNum)+1}</span>
	    		</p>
	    		<p className="sign_box_word">
	    			恭喜获取积分
	    		</p>
	    	</div>
	    </div>
      </div>
    )
  }
}
export default Sign
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
