require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
class Shopping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		data:[]
    };
  }
  componentWillMount(){
	  try 
	  { 
		  var userAgent=navigator.userAgent;
		  var thisTitle='乐居商城';
		  document.title =thisTitle;
		  if(userAgent.indexOf('Android')>=0){
		      NAVIGATION.titleChange(thisTitle);
		  }
	  } 
	  catch(err) 
	  { 
	  }
  }
  componentDidMount(){
  }
  render(){
    return (
    		<div>
	          	<p className="shopping_pic">
	          		<a href="https://h5.youzan.com/v2/showcase/homepage?alias=jvkc4u7n">
		          		<img  src="../../../src/resource/images/myCenter/shopping.jpg" />
	          		</a>
	          	</p>
	        </div>
    )
  }
}
export default Shopping