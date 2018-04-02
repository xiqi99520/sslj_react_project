var my$;
import {SetCookie,GetCookie} from "./../../cookie.js";
require("./../../../style/security.css");
import Footer from './../../component/headFoot/Footer.js';
class Cecurity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data:[]
    };
  }
  componentDidMount(){
	  if(GetCookie("username")){
		  $(".cb_word").html(GetCookie("username"));
	  }
  }
  render(){
	  var userId=GetCookie("userId");
    return (
      <div>
      	<p className="security_set">
	      	<a href="#/securitySetting">
		  		<img className="security_set_pic" src="../../../src/resource/images/security/setting.png" />
		  	</a>
      	</p>
      	<div className="security_statu on">
      		<img className="on_other" src="../../../src/resource/images/security/removal.png" />
      		<img className="on_this" src="../../../src/resource/images/security/protection.png" />
      	</div>
      	<ul className="se_class">
      		<li className="on">
      			<p className="se_class_pic">
      				<img className="on_other" src="../../../src/resource/images/security/out_protection_btn_nor.png" />
      				<img className="on_this" src="../../../src/resource/images/security/out_protection_btn_pre.png" />
      			</p>
      			<p className="se_class_word">
      				外出布防
	  			</p>
      		</li>
      		<li>
	      		<p className="se_class_pic">
					<img className="on_other" src="../../../src/resource/images/security/home_protection_btn_nor.png" />
					<img className="on_this" src="../../../src/resource/images/security/home_protection_btn_pre.png" />
				</p>
	  			<p className="se_class_word">
	  			 	在家布防
	  			</p>
	  		</li>
	  		<li>
		  		<p className="se_class_pic">
					<img className="on_other" src="../../../src/resource/images/security/removal_btn_nor.png" />
					<img className="on_this" src="../../../src/resource/images/security/removal.png" />
				</p>
	  			<p className="se_class_word">
	  				撤防
	  			</p>
	  		</li>
      	</ul>
      	<div className="security_li">
      		<p className="security_li_title">
      			摄像机
      		</p>
      		<div className="security_li_main">
      			<img className="security_li_pic" src="../../../src/resource/images/equipment/6.png" />
      			<div className="security_li_right">
      				<p className="security_li_name">摄像机</p>
      				<p className="security_li_word">
      					<span>客厅</span>
      					<span className="security_li_time">今天08:20打开</span>
      				</p>
      			</div>
      		</div>
      	</div>
      	<div className="security_li">
	  		<p className="security_li_title">
	  			摄像机
	  		</p>
	  		<div className="security_li_main">
	  			<img className="security_li_pic" src="../../../src/resource/images/equipment/6.png" />
	  			<div className="security_li_right">
	  				<p className="security_li_name">摄像机</p>
	  				<p className="security_li_word">
	  					<span>客厅</span>
	  					<span className="security_li_time">今天08:20打开</span>
	  				</p>
	  			</div>
	  		</div>
	  		<div className="security_li_main">
	  			<img className="security_li_pic" src="../../../src/resource/images/equipment/6.png" />
	  			<div className="security_li_right">
	  				<p className="security_li_name">摄像机</p>
	  				<p className="security_li_word">
	  					<span>客厅</span>
	  					<span className="security_li_time">今天08:20打开</span>
	  				</p>
	  			</div>
	  		</div>
	  	</div>
	  	<div className="bottom_blank"></div>
        <Footer onState="3" />
      </div>
    )
  }
}
export default Cecurity
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
