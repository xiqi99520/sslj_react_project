var my$;
require("./../../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../../cookie.js"
class AddFamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data:[]
    };
  }
  submit(){
	  window.location.href="#/myCenter/addFamilySure";
  }
  goBack(){
	  this.props.history.goBack();
  }
  render(){
    return (
      <div className="add_family">
      	<p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      新增家人
	    </p>
	    <div className="af_li">
	    	<p className="af_title">
	    		称呼
	    	</p>
	    	<p className="af_input">
	    		<input type="text" placeholder="输入用户称呼" />
	    	</p>
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
	    	添加家人
	    </p>
	    <p className="af_tips">
	    	如果对方账号没有绑定手机，请邀请您的好友绑定手机号码
	    </p>
      </div>
    )
  }
}
export default AddFamily
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
