var my$;
require("./../../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../../cookie.js"
class Room extends React.Component {
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
	      <a className="room_top_a" href="#/myCenter/roomAdd">添加</a>
	    </p>
	    <div style={{display:"none"}}>
		    <p className="room_page_title">我的房间</p>
		    <ul className="room_index_ul">
		    	<li>
		    		<a href="#/myCenter/roomDetail">
			    		<img className="room_uPic" src="../../../src/resource/images/myCenter/user.png" />
			    		<p className="family_apply_uName">客厅</p>
			    		<p className="family_apply_relation">6个设备</p>
			    		<img className="room_to" src="../../../src/resource/images/myCenter/family/more.png" />
		    		</a>
		    	</li>
		    	<li>
		    		<a href="#/myCenter/roomDetail">
			    		<img className="room_uPic" src="../../../src/resource/images/myCenter/user.png" />
			    		<p className="family_apply_uName">客厅</p>
			    		<p className="family_apply_relation">6个设备</p>
			    		<img className="room_to" src="../../../src/resource/images/myCenter/family/more.png" />
		    		</a>
		    	</li>
		    </ul>
	    </div>
	    <div>
	    	<p className="room_null_pic">
	    		<img  src="../../../src/resource/images/myCenter/room/illustrations.png" />
	    	</p>
	    	<p className="room_null_word">
	    		还未添加任何设备，不能进行相应操作
	    	</p>
	    </div>
      </div>
    )
  }
}
export default Room