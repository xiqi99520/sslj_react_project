var my$;
import {Base} from './../../../connect.js';
import {Format} from './../../../time.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
require("./../../../../style/myCenter.css");
var continuNum=0;
var todayIs=false;
class Sign extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data:[]
	    };
	  }
  goBack(){
	  this.props.history.goBack();
  }
  componentDidMount(){
	  var that=this;
	  $.ajax({
	       type:"post",
	       url: Base+"/memberintegral/grid.do",
	       dataType:"json",
	       async:false,
	       data: {
	    	   "memberId":that.props.match.params.userId
	    	},
	    	success:function(data){
	    		if(data.isSuccess==0){
	    			$("#num").html(data.data.total);
	    			$("#continue").html(continuNum);
	    		}else{
	    			alert(data.errorMsg);
	    		}
	    	},
	    	error:function(data){
	    		 alert("获取服务器数据失败，请刷新网络重试！");
	    	}
	    });
  }
  componentWillMount(){
	  var that=this;
	  $.ajax({
	       type:"post",
	       url: Base+"/memberintegrallog/grid.do",
	       dataType:"json",
	       async:false,
	       data: {
	    	   "memberId":that.props.match.params.userId
	    	},
	    	success:function(data){
	    		if(data.isSuccess==0){
	    			var myData=data.data.rows;
	    			that.setState({data:myData.reverse()});
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
	    			alert("签到成功");
	    		}else{
	    			alert(data.errorMsg);
	    		}
	    	},
	    	error:function(data){
	    		 alert("获取服务器数据失败，请刷新网络重试！");
	    	}
	    });
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
	  switch(newD){
		  case yestD:
			  yestIs=true;
			  baseNum=this.state.data[0].integral;
			  continuNum=baseNum;
			  break;
		  case todayD:
			  if(yestD==secondD){
				  yestIs=true;
				  baseNum=this.state.data[1].integral;
			  }else{
				  baseNum=this.state.data[0].integral-1;
			  }
			  continuNum=this.state.data[0].integral;
			  todayIs=true;
			  break;
		  default :
			  baseNum=0;
	  }
	  baseNum=1;
    return (
      <div>
      	<p className="head_nav">
	      积分签到
	      <a href={"#/signRecord/"+that.props.match.params.userId}>
	      	<img className="timer_pic" src="../../../src/resource/images/commen/record.png" />
	      </a>
	    </p>
	    <div className="point_main">
	    	<p className="point_title">您的可用积分</p>
	    	<p id="num" className="point_num">1</p>
	    	<p className="point_continue">已经连续签到<span id="continue">1</span>天</p>
	    </div>
	    <div className="sign_part">
	    	<img className="sign_bg" src="../../../src/resource/images/commen/sr_bg.png" />
	    	<div className="sign_bottom">
		    	<div className="sign_button">
		    		<div className="sign_show_days">
		    			<p className="sp_num">
		    				<span className={yestIs==true?'orange':''}>+{baseNum}</span>
		    				<span className={todayIs==true?'orange':''}>+{baseNum}</span>
		    				<span>+{baseNum}</span>
		    				<span>+{baseNum}</span>
		    				<span>+{baseNum}</span>
		    				<span>+{baseNum}</span>
		    			</p>
		    			<p className="sp_line">
		    				<span className={yestIs==true?'sp_signed':''}>
		    					<em></em>
		    					<img src="../../../src/resource/images/commen/dot.png" />
		    				</span>
		    				<span className={todayIs==true?'sp_signed':''}>
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
		    			<span className="sign_botton" onClick={this.signSubmit.bind(this)}>签到</span>
		    			<span className="draw_botton">抽奖</span>
		    		</p>
		    	</div>
	    	</div>
	    </div>
      </div>
    )
  }
}
export default Sign
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
