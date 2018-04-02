var my$;
require("./../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../cookie.js"
class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data:[]
    };
  }
  render(){
    return (
      <div className="msg_wrapper">
	    <p className="head_nav">
	      <img className="url_back" src="../../../src/resource/images/url_back.png" />
	      消息通知
	    </p>
      	<div className="msg_phone">
      		<p className="msg_line">
      			<span className="msg_radio"></span>
      			当设备触发时，采用手机短信通知
      		</p>
      		<p className="msg_phone_input">
      			<input type="text" placeholder="输入手机号" maxLength="15" />
      			<span>更改手机号</span>
      		</p>
      	</div>
      	<ul className="msg_ul">
      		<li className="checked">
	      		<span className="msg_radio"></span>
	  			当设备触发时，采用APP消息推送通知
      		</li>
	  		<li>
	      		<span className="msg_radio"></span>
	  			当设备触发时，采用手机振动通知
      		</li>
	  		<li>
	      		<span className="msg_radio"></span>
	  			当主机不在线时，通知我
      		</li>
	  		<li>
	      		<span className="msg_radio"></span>
	  			当有消息回复我时，通知我
      		</li>
      	</ul>
      </div>
    )
  }
}
export default Message
// ReactDOM.render(<Complaint />, document.getElementById('app'));
