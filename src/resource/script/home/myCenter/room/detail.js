var my$;
require("./../../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../../cookie.js"
class RoomDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data:[]
    };
  }
  goBack(){
	  this.props.history.goBack();
  }
  render(){
    return (
      <div>
      	<p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      房间管理
	      <span className="room_top_a">保存</span>
	    </p>
	    <p className="room_page_title">当前房间</p>
	    <ul className="family_apply_ul">
	    	<li>
	    		<img className="room_uPic" src="../../../src/resource/images/myCenter/user.png" />
	    		<p className="rd_name">客厅</p>
	    		<span className="room_delete">删除</span>
	    	</li>
	    </ul>
	    <p className="room_page_title">已添加2台设备</p>
	    <ul className="family_apply_ul">
	    	<li className="on">
	    		<img className="room_uPic" src="../../../src/resource/images/myCenter/user.png" />
	    		<p className="family_apply_uName">客厅</p>
	    		<p className="family_apply_relation">6个设备</p>
	    		<img className="room_tick on_other" src="../../../src/resource/images/myCenter/room/no_tick.png" />
	    		<img className="room_tick on_this" src="../../../src/resource/images/myCenter/room/tick.png" />
	    	</li>
	    	<li>
	    		<img className="room_uPic" src="../../../src/resource/images/myCenter/user.png" />
	    		<p className="family_apply_uName">客厅</p>
	    		<p className="family_apply_relation">6个设备</p>
	    		<img className="room_tick on_other" src="../../../src/resource/images/myCenter/room/no_tick.png" />
	    		<img className="room_tick on_this" src="../../../src/resource/images/myCenter/room/tick.png" />
	    	</li>
	    </ul>
      </div>
    )
  }
}
export default RoomDetail