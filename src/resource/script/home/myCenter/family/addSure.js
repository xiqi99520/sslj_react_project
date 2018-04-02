var my$;
require("./../../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../../cookie.js"
class AddFamilySure extends React.Component {
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
	      新增家人
	    </p>
	    <div className="af_sure">
	    	<p className="afs_pic">
	    	 	<img  src="../../../src/resource/images/myCenter/user.png" />
	    	</p>
	    	<p className="afs_name">
	    		刘力
	    	</p>
	    	<p className="afs_relation">
	    		亲爱的
	    	</p>
	    </div>
	    <p className="af_submit">
	    	确认添加
	    </p>
      </div>
    )
  }
}
export default AddFamilySure