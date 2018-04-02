var my$;
require("./../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../cookie.js"
class MySetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data:[]
    };
  }
  signOut(){
	  SetCookie("account","",1);
 	  SetCookie("otherId","",1);
 	  SetCookie("yPassword","",1);
      SetCookie("id","",1);
      SetCookie("telephone","",1);
      SetCookie("username","",1);
      SetCookie("access_token","",1);
	  SetCookie("refresh_token","",1);
	  SetCookie("user_id","",1);
	  SetCookie("authorize","",1);
      window.location.href="App.html#/index";
  }
  goBack(){
	  this.props.history.goBack();
  }
  render(){
    return (
      <div>
      	<p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      设置
	    </p>
        <p className="setting_change">
        	<a href="App.html#/forget">
        		修改密码
        		<img className="setting_right" src="../../../src/resource/images/myCenter/right_arrow.png" />
        	</a>
        </p>
        <p className="sign_out" onClick={this.signOut.bind(this)}>
	    	退出登入
	    </p>
      </div>
    )
  }
}
export default MySetting
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
