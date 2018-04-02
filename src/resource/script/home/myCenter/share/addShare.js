var my$;
require("./../../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../../cookie.js"
class AddShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data:[]
    };
  }
  submit(){
	  window.location.href="#/myCenter/shareSure";
  }
  goBack(){
	  this.props.history.goBack();
  }
  render(){
    return (
      <div className="add_family">
      	<p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      新添设备共享
	    </p>
	    <div className="as_tips">
	    	共享设备和家人一起享受智能生活
	    </div>
	    <div className="af_li">
	    	<p className="af_title">
	    		账号
	    	</p>
	    	<p className="af_input">
	    		<input type="text" placeholder="输入手机号/邮箱" />
	    	</p>
	    </div>
	    <p className="af_submit" onClick={this.submit.bind(this)}>
	    	确定
	    </p>
      </div>
    )
  }
}
export default AddShare
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
