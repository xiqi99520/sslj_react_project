var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
import "./../../../plugs/flexslider/jquery.flexslider-min.js"
require("./../../../../style/myCenter.css");
class drawGoods extends React.Component {
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
		  var thisTitle='抽奖商品详情'
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
			url : Base + "/goodstake/findById.do",
			dataType : "json",
			data:{
				memberId:this.props.match.params.userId,
				id:this.props.match.params.dgId
			},
			success : function (data) {
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
  buttonClick(){
	  var that=this;
	  if($(".gd_submit").hasClass("to_order")){
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
							window.location.href="#/order/"+that.props.match.params.userId+"/null/"+that.props.match.params.dgId+"/null/null";
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
					<li>
	      				<img src={this.state.data.littleImageUrl} />
	      			</li>
	    		</ul>
	    		<div className="nav_an">
	    		</div>
      		</div>
      		<p className="gd_name">{this.state.data.goodsName}</p>
      	</div>
      	<div className="goods_part">
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
	  	<p className="gd_submit gd_submit_no" onClick={this.buttonClick.bind(this)}>
	  		已领取
	  	</p>
      </div>
    )
  }
}
export default drawGoods
