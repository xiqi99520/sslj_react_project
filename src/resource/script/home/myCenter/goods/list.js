var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
require("./../../../../style/myCenter.css");
var page=1;/*当前页*/
var able=true;
var end=false;/*当前页*/
var pageSize=10;//默认查询10条
var msgUl=[];
class Goods extends React.Component {
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
		  var thisTitle='积分商品列表'
		  document.title =thisTitle;
		  if(userAgent.indexOf('Android')>=0){
		      NAVIGATION.titleChange(thisTitle);
		  }
	  } 
	  catch(err) 
	  { 
	  }
	  msgUl=[];
	  this.getPage(1);
	  page=1;
	  able=false;
	  end=false;
  }
  componentDidMount(){
	  var that=this;
	  $(window).scroll(function () {
		  var thisHref=window.location.href;
		  var path=thisHref.split("#/")[1].split("/")[0];
		  if(path!="goodList"){
			  return false;
		  }
			if(end==0 && able==true){
				if (($(window).height() + $(window).scrollTop()+30) >= $("body").height()) {
					that.getPage(page);
					able=false;
				}
			}else{
				return false;
			}
	  });
  }
  getPage(num){
	  var that=this;
	  $.ajax({
			type : "GET",
			url : Base + "/goodschange/grid.do",
			dataType : "json",
			data:{
				pageSize:10,
				pageNo:num
			},
			success : function (data) {
				able=true;
				if(data.isSuccess==0){
					if(data.data.pageCount == page){//判断是否为最后一页
						end=true;
					}
					page++;
					msgUl=msgUl.concat($.extend(true,[],data.data.rows));
					$("#addUl").click();
				}else{
					alert(data.errorMsg)
				}
				
			}
		});  
  }
  newSet(){
	  this.setState({
			data:msgUl
		});
	  if(msgUl.length>0){
		  $(".none_show").css("display","none");
	  }else{
		  $(".none_show").css("display","block");
	  }
  }
  render(){
	  var that=this;
    return (
      <div>
  		<a className="good_progress" href="#/progress">
  			已兑换商品进度查询
  		</a>
	      <ul className="goods_ul">
			{
	    		this.state.data.map(function(item,index){
	    			return (
	    					<li key={index}>
	    						<a href={"#/goodsDetail/"+that.props.match.params.userId+"/"+item.id}>
			    					<p className={item.remainderNumber==0?"goods_null":"goods_null dis_show"}>
				    					<img src="../../../src/resource/images/commen/good_null.png" />
				    				</p>
			    	    			<p className="goods_pic">
			    	    				<img src={item.imageUrl1} />
			    	    			</p>
			    	    			<p className="goods_name">
			    	    			{item.goodsName}
			    	    			</p>
			    	    			<p className="goods_points">
			    	    			{item.integral}积分
			    	    			</p>
			    	    			<p className={item.remainderNumber==0?"goods_exchange gray_button":"goods_exchange"}>
			    	    				立即兑换
			    	    			</p>
		    	    			</a>
		    	    		</li>
	    			)
	    		})
	    	}
		</ul>
		<div className="none_show">
	  		<p className="none_pic">
	  			<img src="../../../src/resource/images/commen/null.png" />
	  		</p>
	  		<p className="none_word">
	  			暂无记录~
	  		</p>
	  	</div>
		<span id="addUl" style={{display:"none"}} onClick={this.newSet.bind(this)}>点击</span>
      </div>
    )
  }
}
export default Goods
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
