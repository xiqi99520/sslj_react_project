var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
require("./../../../../style/myCenter.css");
class GoodsDetail extends React.Component {
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
		  var thisTitle='商品兑换进度'
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
      <div>
      	<div className="progress_word">
      		<p>扫描下方工作人员二维码或</p>
      		<p>添加微信号&nbsp;ljzn01</p>
      		<p>进行查询商品兑换进度</p>
      	</div>
      	<p className="progress_pic">
      		<img src="../../../src/resource/images/myCenter/progress.jpg" />
      	</p>
      </div>
    )
  }
}
export default GoodsDetail
