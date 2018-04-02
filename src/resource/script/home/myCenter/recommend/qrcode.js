require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
class RecommendRecord extends React.Component {
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
		  var thisTitle='推荐有奖';
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
	  var thisHref=window.location.href;
	  var path=thisHref.split("#/")[0];
	  $("#rqr_pic").qrcode({
			render: "canvas", //table方式
			width: 250, //宽度
			height:250, //高度
			text:path+"#/recommended/"+that.props.match.params.id+"/"+that.props.match.params.phone //任意内容
		});
  }
  render(){
    return (
      <div>
      	<p className="rqr_title">
      		邀请16人，奖励价值147元的充电宝
      	</p>
      	<p id="rqr_pic" className="rqr_pic">
      	
      	</p>
      	<p className="bottom_logo">
      		<img src="../../../src/resource/images/logo.png" />
      	</p>
      </div>
    )
  }
}
export default RecommendRecord