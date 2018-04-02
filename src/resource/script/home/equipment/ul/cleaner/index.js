var my$;
import {Base} from './../../../../connect.js';
import {SetCookie,GetCookie} from "./../../../../cookie.js";
class Cleaner extends React.Component {
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
    		<div className="light_wrapper">
    			<div className="template_bg">
    				<img  src="../../../src/resource/images/equipment/cleaner/bg.jpg" />
    			</div>
	            <p className="head_nav_light">
	    	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/equipment/light_arrow.png" />
	    	      扫地机器人
	    	      <a href="#/equipment/cleanerMessage">
	    	      	<img className="cleaner_message"  src="../../../src/resource/images/equipment/cleaner/message.png" />
	    	      </a>
	    	      <img className="head_eq_right" onClick={this.showBox.bind(this)} src="../../../src/resource/images/equipment/door_option.png" />
			      	<div id="door_box" className="door_box">
			      		<div className="db_bg" onClick={this.disShowBox.bind(this)}></div>
			      		<ul className="db_ul">
			      			<li>
			      				<span>取消设为常用</span>
			      			</li>
			      			<li>
			      				<span>删除设备</span>
			      			</li>
			      		</ul>
			      	</div>
	    	    </p>
	    	    <p className="cleaner_statu">
	    	    	<img src="../../../src/resource/images/equipment/cleaner/in_clean.png" />
	    	    	清扫中
	    	    </p>
	    	    <div className="cleaner_direction">
		    	    <img className="cleaner_pic" src="../../../src/resource/images/equipment/cleaner/option.png" />
		    	    <span className="cleaner_top"></span>
		    	    <span className="cleaner_bottom"></span>
		    	    <span className="cleaner_left"></span>
		    	    <span className="cleaner_right"></span>
		    	    <span className="cleaner_center"></span>
	    	    </div>
	    	    <div className="cleaner_msg">
	    	    	<div className="cleaner_electric">
	    	    		<p className="ce_num">
	    	    			<span className="cleaner_bigger">80</span>%
	    	    		</p>
	    	    		<p className="ce_word">
	    	    			电量剩余
	    	    		</p>
	    	    	</div>
	    	    	<div className="cleaner_time">
	    	    		<p className="ce_num">
	    	    			<span className="cleaner_bigger">80</span>min
	    	    		</p>
	    	    		<p className="ce_word">
	    	    			清洁时间
	    	    		</p>
	    	    	</div>
	    	    </div>
	    	    <ul className="cleaner_ul">
		    	    <li>
			    		<p className="air_icon">
			    			<img src="../../../src/resource/images/equipment/cleaner/switch.png" />
			    		</p>
			    		<p className="air_word">开关</p>
			    	</li>
	    	    	<li>
	    	    		<p className="air_icon">
	    	    			<img src="../../../src/resource/images/equipment/cleaner/mode.png" />
	    	    		</p>
	    	    		<p className="air_word">模式</p>
	    	    	</li>
	    	    	<li>
	    	    		<p className="air_icon">
	    	    		<img src="../../../src/resource/images/equipment/cleaner/timer.png" />
	    	    		</p>
	    	    		<p className="air_word">定时</p>
	    	    	</li>
	    	    	<li>
	    	    		<p className="air_icon">
	    	    		<img src="../../../src/resource/images/equipment/cleaner/recharge.png" />
	    	    		</p>
	    	    		<p className="air_word">回充</p>
	    	    	</li>
	    	    </ul>
    	    </div>
    );
  }
}
export default Cleaner
