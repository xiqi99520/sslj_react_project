var my$;
require("./../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../cookie.js"
class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data:[]
    };
  }
  render(){
    return (
      	<div className="room_wrapper">
	      	<p className="head_nav">
		      <img className="url_back" src="../../../src/resource/images/url_back.png" />
		      房间管理
		    </p>
      		<div className="room_part">
      			<p className="rd_title">
      				<span className="rd_title_span" contentEditable="true">51515</span>
      				<img className="room_edit" src="../../../src/resource/images/myCenter/edit.png" />
      			</p>
      			<ul className="room_edit_ul">
      				<li >
      					默认房间
      				</li>
      				<li >
      					<span contentEditable="true">主卧</span>
      					<img className="room_delete" src="../../../src/resource/images/myCenter/close.png" />
      				</li>
      				<li >
	  					<span contentEditable="true">书房</span>
	  					<img className="room_delete" src="../../../src/resource/images/myCenter/close.png" />
	  				</li>
      				<li className="room_add">
      					+ 添加
      				</li>
      			</ul>
      		</div>
      		<div className="room_part">
	  			<p className="rd_title">
	  				<span className="rd_title_span" contentEditable="true">51515</span>
	  				<img className="room_edit" src="../../../src/resource/images/myCenter/edit.png" />
	  			</p>
	  			<ul className="room_edit_ul">
	  				<li >
	  					默认房间
	  				</li>
	  				<li>
	  					<span contentEditable="true">主卧</span>
	  					<img className="room_delete" src="../../../src/resource/images/myCenter/close.png" />
	  				</li>
	  				<li>
	  					<span contentEditable="true">书房</span>
	  					<img className="room_delete" src="../../../src/resource/images/myCenter/close.png" />
	  				</li>
	  				<li className="room_add">
	  					+ 添加
	  				</li>
	  			</ul>
	  		</div>
	  		<p className="floor_add">
	  			<img src="../../../src/resource/images/equipment/linkage_add.png" />
	  		</p>
      	</div>
    )
  }
}
export default Room
// ReactDOM.render(<Room />, document.getElementById('app'));
