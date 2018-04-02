var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
import "./../../../plugs/flexslider/jquery.flexslider-min.js"
require("./../../../../style/myCenter.css");
class Detail extends React.Component {
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
		  var thisTitle='消息详情'
		  document.title =thisTitle;
		  if(userAgent.indexOf('Android')>=0){
		      NAVIGATION.titleChange(thisTitle);
		  }
	  } 
	  catch(err) 
	  { 
	  }
	  var that=this;
	  debugger;
	  $.ajax({
			type : "GET",
			url : Base + "/usermessage/findById.do",
			dataType : "json",
			data:{
				id:that.props.match.params.id
			},
			success : function (data) {
				debugger;
				if(data.isSuccess==0){
					that.setState({
						data:data.entity
					});
				}else{
					alert(data.errorMsg)
				}
				
			}
		});  
  }
  componentDidMount(){
	  
  }
  render(){
    return (
      <div>
      	<p className="msg_title" dangerouslySetInnerHTML={{__html: this.state.data.title}}>
      	</p>
      	<p className="msg_time" dangerouslySetInnerHTML={{__html: this.state.data.createDate}}>
      	</p>
      	<div className="gd_msg" dangerouslySetInnerHTML={{__html: this.state.data.content}}>
		</div>
      </div>
    )
  }
}
export default Detail
