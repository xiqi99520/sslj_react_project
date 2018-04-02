var my$;
require("./../../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../../cookie.js"
class FamilyDetail extends React.Component {
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
      <div className="add_family">
      	<p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      家人详情
	    </p>
	    <div className="af_sure">
	    	<p className="afs_pic">
	    	 	<img  src="../../../src/resource/images/myCenter/user.png" />
	    	</p>
	    	<p className="afs_name">
	    		刘力
	    	</p>
	    </div>
	    <p className="af_submit">
	    	修改家人关系
	    </p>
	    <p className="fd_delete">
	    	删除家人
	    </p>
	    <div id="change_relation">
	    	<div className="box_bg"></div>
	    	<div className="cfr_box">
	    		<p className="cfr_title">输入家人关系</p>
	    		<p className="cfr_input">
	    			<input type="" />
	    		</p>
	    		<p className="cfr_button">
	    			<span>确定</span>
	    			<span className="cfr_cancel">取消</span>
	    		</p>
	    	</div>
	    </div>
      </div>
    )
  }
}
export default FamilyDetail