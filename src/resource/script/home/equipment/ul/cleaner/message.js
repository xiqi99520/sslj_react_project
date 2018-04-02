var my$;
import {Base} from './../../../../connect.js';
import {SetCookie,GetCookie} from "./../../../../cookie.js";
class CleanerMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
  }
  componentDidMount(){
  }
  goBack(){
	  this.props.history.goBack();
  }
  showBox(){
	  $("#door_box").css("display","block");
  }
  disShowBox(){
	  $("#door_box").css("display","none");
  }
  render() {
    return (
    		<div>
	    		<p className="head_nav">
		  	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
		  	      扫地机消息
		  	      <span className="head_option">
		  	      	清空
		  	      </span>
		  	    </p>
		  	    <div className="cm_part">
		  	    	<p className="cm_time">
		  	    		2017-11-24 15:20
		  	    	</p>
		  	    	<div className="cm_li">
		  	    		<img className="cm_icon" src="../../../src/resource/images/equipment/cleaner/message_photo.png" />
		  	    		<div className="cm_wrapper">
			  	    		<span className="cm_msg">
				  	    		<img className="cm_bg" src="../../../src/resource/images/equipment/cleaner/dialog_box.9.png" />
				  	    		机器模式改为自动
			  	    		</span>
		  	    		</div>
		  	    	</div>
		  	    	<div className="cm_li">
			  	    	<img className="cm_icon" src="../../../src/resource/images/equipment/cleaner/message_photo.png" />
			  	    	<div className="cm_wrapper">
			  	    		<span className="cm_msg">
				  	    		<img className="cm_bg" src="../../../src/resource/images/equipment/cleaner/dialog_box.9.png" />
				  	    		机器模式改为自动
			  	    		</span>
		  	    		</div>
		  	    	</div>
		  	    </div>
			  	  <div className="cm_part">
		  	    	<p className="cm_time">
		  	    		2017-11-24 15:20
		  	    	</p>
		  	    	<div className="cm_li">
			  	    	<img className="cm_icon" src="../../../src/resource/images/equipment/cleaner/message_photo.png" />
			  	    	<div className="cm_wrapper">
			  	    		<span className="cm_msg">
				  	    		<img className="cm_bg" src="../../../src/resource/images/equipment/cleaner/dialog_box.9.png" />
				  	    		机器模式改为自动
			  	    		</span>
		  	    		</div>
		  	    	</div>
		  	    	<div className="cm_li">
			  	    	<img className="cm_icon" src="../../../src/resource/images/equipment/cleaner/message_photo.png" />
			  	    	<div className="cm_wrapper">
			  	    		<span className="cm_msg">
				  	    		<img className="cm_bg" src="../../../src/resource/images/equipment/cleaner/dialog_box.9.png" />
				  	    		机器模式改为自动
			  	    		</span>
		  	    		</div>
		  	    	</div>
		  	    </div>
    	    </div>
    );
  }
}
export default CleanerMessage
