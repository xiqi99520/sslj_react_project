var my$;
require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
var ul=[];
class Question extends React.Component {
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
		  var thisTitle='常见问题列表'
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
	       url: Base+"/commonproblem/grid.do",
	       dataType:"json",
	       data: {
	    	  pageSize:100
	    	},
	       success:function(data){
	    	   if(data.isSuccess==0){
	    		  that.setState({data:data.data.rows});
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
	      常见问题
	    </p>
	    <ul className="q_ul">
	    {
	    	this.state.data.map(function(item,index){
	    		return (
	    				 <li>
		    		        <a href={"#/myCenter/questionDetail/"+item.id}>
		    		          {item.title}
		    		          <img className="q_pic" src="../../../src/resource/images/myCenter/right_arrow.png" />
		    		        </a>
		    		      </li>	
	    		)
	    	})
	    }
	    </ul>
      </div>
    )
  }
}
export default Question
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
