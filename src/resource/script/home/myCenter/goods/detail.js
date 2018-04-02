var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
import "./../../../plugs/flexslider/jquery.flexslider-min.js"
require("./../../../../style/myCenter.css");
class GoodsDetail extends React.Component {
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
		  var thisTitle='积分商品详情'
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
			type : "GET",
			url : Base + "/goodschange/findById.do",
			dataType : "json",
			data:{
				memberId:this.props.match.params.userId,
				id:this.props.match.params.sgId
			},
			success : function (data) {
				if(data.isSuccess==0){
					that.setState({
						data:data.entity
					});
					if(data.countPoint<data.entity.integral){
						$("#submitButton").removeClass("to_order").addClass("gd_submit_no").html("积分不足");
					}
					var imgUl=[];
					  if(data.entity.imageUrl1!=""){
						  imgUl.push(data.entity.imageUrl1)
					  }
					  if(data.entity.imageUrl2!=""){
						  imgUl.push(data.entity.imageUrl2)
					  }
					  if(data.entity.imageUrl3!=""){
						  imgUl.push(data.entity.imageUrl3)
					  }
					  if(data.entity.imageUrl4!=""){
						  imgUl.push(data.entity.imageUrl4)
					  }
					  if(data.entity.imageUrl5!=""){
						  imgUl.push(data.entity.imageUrl5)
					  }
					  if(data.entity.imageUrl6!=""){
						  imgUl.push(data.entity.imageUrl6)
					  }
					  if(imgUl.length>1){
						  $("#gd_banner").flexslider({
							    namespace: 'top-',
							    animation: "slide",
							    slideshow: true,
							    slideshowSpeed: 10000,
							    animationSpeed: 800,
							    pauseOnHover: true,
							    directionNav: false,
							    start: function(slide){
							    },
							    after: function(slide){
							    }
							  });
					  }
				}else{
					alert(data.errorMsg)
				}
				
			}
		});  
  }
  componentDidMount(){
  }
  buttonClick(){
	  if($(".gd_submit").hasClass("to_order")){
		  var that=this;
		  debugger;
		  $.ajax({
				type : "GET",
				url : Base + "/realname/findByMemberId.do",
				dataType : "json",
				data:{
					memberId:that.props.match.params.userId,
				},
				success : function (data) {
					if(data.isSuccess==0){
						if(data.entity.status==2){
							window.location.href="#/order/"+that.props.match.params.userId+"/"+that.props.match.params.sgId+"/null/null/null";
						}else{
							window.location.href="#/auth/"+that.props.match.params.userId;
						}
					}else{
						alert(data.errorMsg);
					}
				}
			});
	  }else{
		  return false;
	  }
  }
  render(){
	  var imgUl=[];
	  if(this.state.data.imageUrl1!=""){
		  imgUl.push(this.state.data.imageUrl1)
	  }
	  if(this.state.data.imageUrl2!=""){
		  imgUl.push(this.state.data.imageUrl2)
	  }
	  if(this.state.data.imageUrl3!=""){
		  imgUl.push(this.state.data.imageUrl3)
	  }
	  if(this.state.data.imageUrl4!=""){
		  imgUl.push(this.state.data.imageUrl4)
	  }
	  if(this.state.data.imageUrl5!=""){
		  imgUl.push(this.state.data.imageUrl5)
	  }
	  if(this.state.data.imageUrl6!=""){
		  imgUl.push(this.state.data.imageUrl6)
	  }
    return (
      <div>
      	<div className="goods_part">
      		<div id="gd_banner" className="gd_pic">
	      		<ul id="gd_ul" className="gd_ul slides">
	      		{
	      			imgUl.map(function(item,index){
	      				return (
	      						<li key={index}>
		    	      				<img src={item} />
		    	      			</li>
	      						)
	      			})
	      		}
	    		</ul>
	    		<p className={this.state.data.remainderNumber==0?"gd_null":"gd_null dis_show"}>
					<img src="../../../src/resource/images/commen/good_null.png" />
				</p>
	    		<div className="nav_an">
	    		</div>
      		</div>
      		<p className="gd_name">{this.state.data.goodsName}</p>
      		<p className="gd_buy">
      			兑换：<span className="gd_point">{this.state.data.integral}积分</span>
      			<span className="gd_money">￥{this.state.data.price}</span>
      		</p>
      		<p className="gd_num">
      			限量：<span>{this.state.data.totalNumber}</span>件&nbsp;&nbsp;&nbsp;剩余<span>{this.state.data.remainderNumber}</span>件
      		</p>
      	</div>
      	<div className="goods_part">
      		<p className="gd_title">
      			兑换说明：
      		</p>
      		<div className="gd_msg" dangerouslySetInnerHTML={{__html: this.state.data.illustrate}}>
      		</div>
      		<p className="gd_title">
	  			商品信息：
	  		</p>
	  		<div className="gd_msg" dangerouslySetInnerHTML={{__html: this.state.data.information}}>
	  		</div>
      	</div>
      	<div className="goods_part gd_bottom">
	  		<p className="gd_title">
	  			图文详情：
	  		</p>
	  		<div className="gd_msg" dangerouslySetInnerHTML={{__html: this.state.data.imageText}}>
	  		</div>
	  	</div>
	  	<p id="submitButton" className={this.state.data.remainderNumber>0?"gd_submit to_order":"gd_submit gd_submit_no"} onClick={this.buttonClick.bind(this)}>
	  		{this.state.data.remainderNumber>0?"立即兑换":"已兑完"}
	  	</p>
      </div>
    )
  }
}
export default GoodsDetail
