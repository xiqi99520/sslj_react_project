var my$;
require("./../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../cookie.js"
class Complaint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data:[]
    };
  }
  render(){
    return (
      <div className="complain_wrapper">
      	<img className="complain_pic" src="../../../src/resource/images/myCenter/complain.png" />
      	<div className="complain_main">
      		<p className="complain_line">
      			400-1539-888
      		</p>
  			<p className="complain_call">
	            <a href="tel:400-1539-888">呼叫</a>
	        </p>
      	</div>
      </div>
    )
  }
}
export default Complaint
// ReactDOM.render(<Complaint />, document.getElementById('app'));
