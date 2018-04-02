var my$;
require("./../../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../../cookie.js"
class FamilyApply extends React.Component {
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
	      家人邀请
	    </p>
        <ul className="family_apply_ul">
        	<li>
        		<img className="family_uPic" src="../../../src/resource/images/myCenter/user.png" />
        		<p className="family_apply_uName">小余请求添加你为家人</p>
        		<p className="family_apply_relation">2017-12-30 15:24</p>
        		<span className="f_apply_statu">已同意</span>
        	</li>
        	<li>
	    		<img className="family_uPic" src="../../../src/resource/images/myCenter/user.png" />
	    		<p className="family_apply_uName">刘轩请求添加你为家人</p>
	    		<p className="family_apply_relation">2017-12-30 15:24</p>
	    		<span className="f_apply_statu f_apply_agree">同意</span>
	    	</li>
	    	<li>
	    		<img className="family_uPic" src="../../../src/resource/images/myCenter/user.png" />
	    		<p className="family_apply_uName">小李解除了与您的家人关系</p>
	    		<p className="family_apply_relation">2017-12-30 15:24</p>
	    	</li>
        </ul>
      </div>
    )
  }
}
export default FamilyApply