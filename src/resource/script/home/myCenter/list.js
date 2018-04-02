var my$;
import {SetCookie,GetCookie} from "./../../cookie.js";
require("./../../../style/myCenter.css");
import Footer from './../../component/headFoot/Footer.js';
class MyCenter extends React.Component {
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
	  var userId=GetCookie("id");
    return (
      <div>
	    <div className="c_main">
	      <p className="c_user">
	        <img className="user_pic" src="../../../src/resource/images/myCenter/user.png" />
	      </p>
	      <p className="cb_word">
	        <a href="#/login">登录/</a>
	        <a href="#/register">注册</a>
	      </p>
	      <ul className="my_msg">
	      	<li>
	      		<p className="my_msg_num">0</p>
	      		<p className="my_msg_word">设备</p>
	      	</li>
	      	<li>
	      		<p className="my_msg_num">0</p>
	      		<p className="my_msg_word">家人</p>
	      	</li>
	      	<li>
	      		<p className="my_msg_num">0</p>
	      		<p className="my_msg_word">积分</p>
	      	</li>
	      </ul>
	    </div>
        <ul className="mc_ul">
          <li>
            <a href="#/myCenter/shareEquipment">
              <p className="mc_icon">
                <img src="../../../src/resource/images/myCenter/shared_device.png" />
              </p>
              <p className="mc_word">
              	共享设备
              </p>
            </a>
          </li>
          <li>
            <a href="#/myCenter/family">
              <p className="mc_icon">
                <img src="../../../src/resource/images/myCenter/my_family.png" />
              </p>
              <p className="mc_word">
              	我的家人
              </p>
            </a>
          </li>
          <li>
            <a href="#/myCenter/host">
              <p className="mc_icon">
                <img src="../../../src/resource/images/myCenter/host.png" />
              </p>
              <p className="mc_word">
                主机
              </p>
            </a>
          </li>
          <li>
	          <a href={"#/sign/"+userId}>
	            <p className="mc_icon">
	              <img src="../../../src/resource/images/myCenter/sign.png" />
	            </p>
	            <p className="mc_word">
	              积分签到
	            </p>
	          </a>
	      </li>
	      <li>
	          <a href="#/myCenter/house">
	            <p className="mc_icon">
	              <img src="../../../src/resource/images/myCenter/supplies.png" />
	            </p>
	            <p className="mc_word">
	              房屋管理
	            </p>
	          </a>
	        </li>
          <li>
            <a href="#/myCenter/complaint">
              <p className="mc_icon">
                <img src="../../../src/resource/images/myCenter/opinion.png" />
              </p>
              <p className="mc_word">
                意见反馈
              </p>
            </a>
          </li>
          <li>
	          <a href={"#/myCenter/question"}>
	            <p className="mc_icon">
	              <img src="../../../src/resource/images/myCenter/problem.png" />
	            </p>
	            <p className="mc_word">
	              常见问题
	            </p>
	          </a>
	      </li>
          <li>
            <a href="#/myCenter/aboutUs">
              <p className="mc_icon">
                <img src="../../../src/resource/images/myCenter/us.png" />
              </p>
              <p className="mc_word">
                关于我们
              </p>
            </a>
          </li>
	      <li>
	          <a href="#/myCenter/setting">
	            <p className="mc_icon">
	              <img src="../../../src/resource/images/myCenter/Set_up.png" />
	            </p>
	            <p className="mc_word">
	              设置
	            </p>
	          </a>
	        </li>
        </ul>
        <Footer onState="4" />
      </div>
    )
  }
}
export default MyCenter
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
