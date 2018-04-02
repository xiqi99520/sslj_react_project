var my$;
require("./../../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../../cookie.js"
import {Base} from './../../../connect.js';
class QuestionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	data:[]
    };
  }
  componentDidMount(){
	  try 
	  { 
		  var userAgent=navigator.userAgent;
		  var thisTitle='常见问题详情'
		  document.title =thisTitle;
		  if(userAgent.indexOf('Android')>=0){
		      NAVIGATION.titleChange(thisTitle);
		  }
	  } 
	  catch(err) 
	  { 
	  }
	  var that=this;
	  $.ajax({
	       type:"post",
	       url: Base+"/commonproblem/findById.do",
	       dataType:"json",
	       data:{
	    	   id:that.props.match.params.id
	       },
	       success:function(data){
	    	   if(data.isSuccess==0){
	    		  that.setState({data:data.entity});
	    	   }else{
	    		  alert(data.msg);
	    	   }
	       },
	       error:function(data){
	  	          alert("连接服务器出错，请刷新网络重试！");
	  	   }
	   });
  }
  goBack(){
	  this.props.history.goBack();
  }
  render(){
    return (
      <div>
	    <p className="q_title">
	      {this.state.data.title}
	    </p>
	    <div className="q_detail" dangerouslySetInnerHTML={{__html: this.state.data.content}}>
	    </div>
      </div>
    )
  }
}
export default QuestionDetail
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
