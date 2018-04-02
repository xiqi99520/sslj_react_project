var my$;
import {SetCookie,GetCookie} from "./../../cookie.js";
require("./../../../style/security.css");
class SecuritySetting extends React.Component {
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
		      安防设置
		  </p>
		  <ul className="ss_ul">
		  	<li>
		  		<a href="">
		  			外出安防
		  			<img className="ss_img" src="../../../src/resource/images/myCenter/right_arrow.png" />
		  		</a>
		  	</li>
		  	<li>
		  		<a href="">
		  			外出安防
		  			<img className="ss_img" src="../../../src/resource/images/myCenter/right_arrow.png" />
		  		</a>
		  	</li>
		  </ul>
      </div>
    )
  }
}
export default SecuritySetting
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
