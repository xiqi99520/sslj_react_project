require("./../../../style/addEq.css");
import {SetCookie,GetCookie} from "./../../cookie.js"
import {Base} from './../../connect.js';

class AddEquipment extends React.Component {
	componentDidMount(){
		if(!socketObj){
			  window.getToten(this);
		  }else{
			  this.getListen();
			  this.getSend();
		  }
	}
	getListen(){
		
	}
	getSend(){
		if(GetCookie("hostId")){
			$("#addHost").attr("href","#/myCenter/host");
		}else{
			$("#addHost").attr("href","#/addEquipment/host/0");
		}
	}
	goBack(){
		  this.props.history.goBack();
	}
  render(){
    return (
      <div>
	    <p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      添加设备
	    </p>
	      <ul className="aeq_ul">
	      	<li>
	      		<a id="addHost" href="#/addEquipment/host/0">
		      		<img className="aeq_pic" src="../../../src/resource/images/addEq/homehost@2x.png" />
		      		智能主机
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/1">
		      		<img className="aeq_pic" src="../../../src/resource/images/addEq/minihost@2x.png" />
		      		Mini智能主机
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/2">
	      			<img className="aeq_pic" src="../../../src/resource/images/addEq/airpurifier@2x.png" />
		      		空气净化器
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/3">
		      		<img className="aeq_pic" src="../../../src/resource/images/addEq/musichost@2x.png" />
		      		智能音乐面板
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/4">
	      			<img className="aeq_pic" src="../../../src/resource/images/addEq/switch@2x.png" />
		      		灯
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/5">
		      		<img className="aeq_pic" src="../../../src/resource/images/addEq/socket@2x.png" />
		      		插座
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/6">
	      			<img className="aeq_pic" src="../../../src/resource/images/addEq/camera@2x.png" />
		      		摄像机
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/7">
		      		<img className="aeq_pic" src="../../../src/resource/images/addEq/controlpanel@2x.png" />
		      		情景面板
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/8">
	      			<img className="aeq_pic" src="../../../src/resource/images/addEq/casualstickers@2x.png" />
		      		随意贴
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/9">
		      		<img className="aeq_pic" src="../../../src/resource/images/addEq/fingerprintcodelock@2x.png" />
		      		智能门锁
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/10">
	      			<img className="aeq_pic" src="../../../src/resource/images/addEq/temperatureandhumiditysensor@2x.png" />
		      		温湿度传感器
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/11">
		      		<img className="aeq_pic" src="../../../src/resource/images/addEq/gasalarm@2x.png" />
		      		可燃气体传感器
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/12">
	      			<img className="aeq_pic" src="../../../src/resource/images/addEq/humanbodyinduction@2x.png" />
		      		人体传感器
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/13">
		      		<img className="aeq_pic" src="../../../src/resource/images/addEq/smokedetector@2x.png" />
		      		烟雾传感器
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/14">
	      			<img className="aeq_pic" src="../../../src/resource/images/addEq/retractablecurtainmotor@2x.png" />
		      		窗帘
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/15">
		      		<img className="aeq_pic" src="../../../src/resource/images/addEq/magnetometer@2x.png" />
		      		门窗传感器
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/16">
	      			<img className="aeq_pic" src="../../../src/resource/images/addEq/waterimmersionalarm@2x.png" />
		      		水浸传感器
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/17">
	      			<img className="aeq_pic" src="../../../src/resource/images/addEq/button@2x.png" />
		      		紧急按钮
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/18">
		      		<img className="aeq_pic" src="../../../src/resource/images/addEq/infraredtransponder@2x.png" />
		      		红外转发器
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/addRobot">
	      			<img className="aeq_pic" src="../../../src/resource/images/addEq/robot@2x.png" />
		      		小白机器人
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      	<li>
	      		<a href="#/addEquipment/detail/19">
		      		<img className="aeq_pic" src="../../../src/resource/images/addEq/infraredtransponder@2x.png" />
		      		智能晾衣架
		      		<img className="aeq_to_icon" src="../../../src/resource/images/myCenter/right_arrow.png" />
	      		</a>
	      	</li>
	      </ul>
      </div>
    );
  }
}
export default AddEquipment
