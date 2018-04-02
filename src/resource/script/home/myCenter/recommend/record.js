var my$;
require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {Format} from './../../../time.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
var page_g=1;/*当前页*/
var able_g=true;
var end_g=false;/*当前页*/
var pageSize=10;//默认查询10条
var msgUl_g=[];
var page_s=1;/*当前页*/
var able_s=true;
var end_s=false;/*当前页*/
var msgUl_s=[];
var page_c=1;/*当前页*/
var able_c=true;
var end_c=false;/*当前页*/
var msgUl_c=[];
class SignRecord extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	msgUl_g:[],
	    	msgUl_s:[],
	    	msgUl_c:[]
	    };
	  }
  goBack(){
	  this.props.history.goBack();
  }
  componentDidMount(){
	  try 
	  { 
		  var userAgent=navigator.userAgent;
		  var thisTitle='推荐积分记录'
		  document.title =thisTitle;
		  if(userAgent.indexOf('Android')>=0){
		      NAVIGATION.titleChange(thisTitle);
		  }
	  } 
	  catch(err) 
	  { 
	  }
	  var that=this;
	  msgUl_s=[];
	  this.getPageSign(1);
	  page_s=1;
	  able_s=false;
	  end_s=false;
	  $(window).scroll(function () {
		  var thisHref=window.location.href;
		  var path=thisHref.split("#/")[1].split("/")[0];
		  if(path!="recommendRecord"){
			  return false;
		  }
		  if($("#nav_sign").hasClass("sr_on")){
			  if(end_s==0 && able_s==true){
					if (($(window).height() + $(window).scrollTop()+30) >= $("body").height()) {
						that.getPageSign(page_s);
						able_s=false;
					}
				}
		  }
	  });
  }
  newSetSign(){
	  this.setState({
		  msgUl_s:msgUl_s
		});
	  if(msgUl_s.length>0){
		  $("#none1").css("display","none");
	  }else{
		  $("#none1").css("display","block");
	  }
  }
  getPageSign(num){
	  var that=this;
	  $.ajax({
			type : "GET",
			url : Base + "/memberintegrallog/userRewardScoreLog.do",
			dataType : "json",
			data:{
				memberId:that.props.match.params.id,
				pageSize:10,
				pageNo:num
			},
			success : function (data) {
				able_s=true;
				if(data.isSuccess==0){
					if(data.data.pageCount == page_s){//判断是否为最后一页
						end_s=true;
					}
					page_s++;
					msgUl_s=msgUl_s.concat($.extend(true,[],data.data.rows));
					$("#addUlSign").click();
				}else{
					alert(data.errorMsg)
				}
			}
		});  
  }
  render(){
	 var that=this;
    return (
      <div className="o_hidden">
	    <div id="Wsign" className="sr_main rr_top_margin">
	    	<ul className="sr_ul">
	    		{
	    			this.state.msgUl_s.map(function(item,index){
	    				var time=new Date(item.createDate);
	    				time=time.Format("yyyy-MM-dd hh:mm");
	    				return (
	    						<li key={"sr"+index}>
		    		    			<span className="sr_point"></span>
		    		    			<p className="sr_num">+{item.integral}</p>
		    		    			<p className="sr_sign">{item.mark}</p>
		    		    			<p className="sr_date">{item.showDate}</p>
		    		    		</li>
	    				)
	    			})
	    		}
	    	</ul>
	    	<div id="none1" className="none_show">
		  		<p className="none_pic">
		  			<img src="../../../src/resource/images/commen/null.png" />
		  		</p>
		  		<p className="none_word">
		  			暂无记录~
		  		</p>
		  	</div>
	    </div>
	    <span id="addUlSign" style={{display:"none"}} onClick={this.newSetSign.bind(this)}>点击</span>
      </div>
    )
  }
}
export default SignRecord
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
