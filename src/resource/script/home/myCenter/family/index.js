var my$;
require("./../../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../../cookie.js"
class Family extends React.Component {
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
	      我的家人
	      <a href="#/myCenter/familyApply">
	      	<img className="head_eq_right" src="../../../src/resource/images/myCenter/family/tab_invite.png" />
	      </a>
	    </p>
        <ul className="family_ul">
        	<li>
        		<a href="#/myCenter/familyDetail">
	        		<img className="family_uPic" src="../../../src/resource/images/myCenter/user.png" />
	        		<p className="family_uName">刘力</p>
	        		<p className="family_relation">你是他的爸爸</p>
	        		<img className="family_to" src="../../../src/resource/images/myCenter/family/more.png" />
        		</a>
        	</li>
        	<li>
	        	<a href="#/myCenter/familyDetail">
		    		<img className="family_uPic" src="../../../src/resource/images/myCenter/user.png" />
		    		<p className="family_uName">刘力</p>
		    		<p className="family_relation">你是他的爸爸</p>
		    		<img className="family_to" src="../../../src/resource/images/myCenter/family/more.png" />
				</a>
	    	</li>
        </ul>
        <ul className="family_type">
	    	<li>
	    		<a href="#/myCenter/addFamily/0">
		    		<img className="family_type_bg" src="../../../src/resource/images/myCenter/family/gray_bg.png" />
		    		亲爱的
	    		</a>
	    	</li>
	    	<li>
	    		<a href="#/myCenter/addFamily/1">
		    		<img className="family_type_bg" src="../../../src/resource/images/myCenter/family/gray_bg.png" />
		    		爸爸
	    		</a>
	    	</li>
	    	<li>
	    		<a href="#/myCenter/addFamily/2">
		    		<img className="family_type_bg" src="../../../src/resource/images/myCenter/family/gray_bg.png" />
		    		妈妈
	    		</a>
	    	</li>
	    	<li>
	    		<a href="#/myCenter/addFamily/3">
		    		<img className="family_type_bg" src="../../../src/resource/images/myCenter/family/gray_bg.png" />
		    		儿子
	    		</a>
	    	</li>
	    	<li>
	    		<a href="#/myCenter/addFamily/4">
		    		<img className="family_type_bg" src="../../../src/resource/images/myCenter/family/gray_bg.png" />
		    		女儿
	    		</a>
	    	</li>
	    	<li>
	    		<a href="#/myCenter/addFamily/5">
		    		<img className="family_type_bg" src="../../../src/resource/images/myCenter/family/gray_bg.png" />
		    		同居密友
	    		</a>
	    	</li>
	    	<li>
	    		<a href="#/myCenter/addFamily/6">
		    		<img className="family_type_bg" src="../../../src/resource/images/myCenter/family/gray_bg.png" />
		    		其他家人
	    		</a>
	    	</li>
	    </ul>
      </div>
    )
  }
}
export default Family
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
