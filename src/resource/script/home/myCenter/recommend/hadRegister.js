require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
class Recommended extends React.Component {
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
		  var thisTitle='推荐分享';
		  document.title =thisTitle;
		  if(userAgent.indexOf('Android')>=0){
		      NAVIGATION.titleChange(thisTitle);
		  }
	  } 
	  catch(err) 
	  { 
	  }
  }
  GetCode(){
	  
  }
  render(){
    return (
      <div className="hadRegister_wrapper">
      	<img className="recommend_bg" src="../../../src/resource/images/myCenter/recommend/recommend_bg.png" />
      	<div className="recommend_main">
      		<p className="hr_pic">
      			<img  src="../../../src/resource/images/myCenter/recommend/had_register.png" />
      		</p>
      		<p className="hr_coincidence">
      			好巧！
	  		</p>
      		<p className="hr_tips">
      			原来你已经注册了乐居智家呀！
	  		</p>
      		<p className="recommend_together">
      			一起来邀请好友吧
      		</p>
      	</div>
      </div>
    )
  }
}
export default Recommended