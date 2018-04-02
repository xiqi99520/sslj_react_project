var my$;
require("./../../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../../cookie.js"
class RoomAdd extends React.Component {
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
	      房间添加
	    </p>
	    <p className="room_page_title">选择一个你要创建的房间</p>
	    <ul className="ra_ul">
	    	<li>
	    		<p className="ra_icon_wrapper">
	    			<img className="ra_icon" src="../../../src/resource/images/myCenter/room/living_room.png" />
	    		</p>
	    		<p className="ra_word">
	    			客厅
	    		</p>
	    	</li>
		    	<li>
	    		<p className="ra_icon_wrapper">
	    			<img className="ra_icon" src="../../../src/resource/images/myCenter/room/bedroom.png" />
	    		</p>
	    		<p className="ra_word">
	    			卧室
	    		</p>
	    	</li>
	    	<li>
	    		<p className="ra_icon_wrapper">
	    			<img className="ra_icon" src="../../../src/resource/images/myCenter/room/children.png" />
	    		</p>
	    		<p className="ra_word">
	    			儿童房
	    		</p>
	    	</li>
		    	<li>
	    		<p className="ra_icon_wrapper">
	    			<img className="ra_icon" src="../../../src/resource/images/myCenter/room/study.png" />
	    		</p>
	    		<p className="ra_word">
	    			书房
	    		</p>
	    	</li>
	    	<li>
	    		<p className="ra_icon_wrapper">
	    			<img className="ra_icon" src="../../../src/resource/images/myCenter/room/kitchen.png" />
	    		</p>
	    		<p className="ra_word">
	    			厨房
	    		</p>
	    	</li>
		    	<li>
	    		<p className="ra_icon_wrapper">
	    			<img className="ra_icon" src="../../../src/resource/images/myCenter/room/toilet.png" />
	    		</p>
	    		<p className="ra_word">
	    			卫生间
	    		</p>
	    	</li>
	    </ul>
      </div>
    )
  }
}
export default RoomAdd