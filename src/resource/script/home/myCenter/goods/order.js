var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
require("./../../../../style/myCenter.css");
var addressId;
class PointOrder extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	address:[]
	    };
	  }
  componentWillMount(){  
	  try 
	  { 
		  var userAgent=navigator.userAgent;
		  var thisTitle='提交订单'
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
	  if(this.props.match.params.sgId=="null"){
		  this.getDrawGood();
	  }else{
		  this.getSignGood();
	  }
	  if(this.props.match.params.addressId=="null"){
		  this.getDefaultAddress();
	  }else{
		  this.getIdAddress();
	  }
	  addressId=this.props.match.params.addressId;
  }
  getIdAddress(){
	  var that=this;
	  $.ajax({
			type : "GET",
			url : Base + "/receivingaddress/findById.do",
			dataType : "json",
			data:{
				id:this.props.match.params.addressId,
			},
			success : function (data) {
				if(data.isSuccess==0){
					if(!data.entity){
						$("#had_address").css("display","none");
						$("#no_address").css("display","block");
						that.getDefaultAddress();
					}else{
						if(data.entity.isDefault==0){
						}else{
							$("#addr_default").css("display","none");
						}
						$("#addr_msg").html(data.entity.province+data.entity.city+data.entity.area+data.entity.addressName);
						$("#addr_people").html(data.entity.userName);
						$("#addr_phone").html(data.entity.phone);
						$("#had_address").css("display","block");
						$("#no_address").css("display","none");
					}
				}else{
					alert(data.errorMsg);
				}
			}
		});
  }
  orderSubmit(){
	  var that=this;
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
						that.truelySubmit();
					}else{
						window.location.href="#/auth/"+that.props.match.params.userId;
					}
				}else{
					alert(data.errorMsg);
				}
			}
		});
  }
  truelySubmit(){
	  var that=this;
	  if(this.props.match.params.sgId=="null"){
		  $.ajax({
				type : "GET",
				url : Base + "/orderform/updateSave.do",
				dataType : "json",
				data:{
					id:this.props.match.params.orderId,
					addressId:addressId
				},
				success : function (data) {
					if(data.isSuccess==0){
						$("#alertMsg").html("恭喜您，领取成功！我们会在3-10个工作日发货，请耐心等待！");
						$(".alert_button").css("display","none");
						$("#Alert").css("display","block");
						setTimeout(function(){
							$("#Alert").css("display","none");
		    				window.location.href="#/signRecord/"+that.props.match.params.userId+"/1"
		    			},2000);
					}else{
						$("#alertMsg").html(data.errorMsg);
						$("#Alert").css("display","block");
					}
				}
			});
	  }else{
		  $.ajax({
				type : "GET",
				url : Base + "/orderform/addSave.do",
				dataType : "json",
				data:{
					menberId:this.props.match.params.userId,
					goodsId:this.props.match.params.sgId,
					addressId:addressId
				},
				success : function (data) {
					if(data.isSuccess==0){
						$("#alertMsg").html("恭喜您，兑换成功！我们会在3-10个工作日发货，请耐心等待！");
						$(".alert_button").css("display","none");
						$("#Alert").css("display","block");
						setTimeout(function(){
							$("#Alert").css("display","none");
		    				window.location.href="#/signRecord/"+that.props.match.params.userId+"/1"
		    			},2000);
					}else{
						$("#alertMsg").html(data.errorMsg);
						$("#Alert").css("display","block");
					}
				}
			});
	  }
  }
  getSignGood(){
	  $.ajax({
			type : "GET",
			url : Base + "/goodschange/findById.do",
			dataType : "json",
			data:{
				memberId:this.props.match.params.userId,
				id:this.props.match.params.sgId,
			},
			success : function (data) {
				if(data.isSuccess==0){
					$("#good_pic").attr("src",data.entity.imageUrl1);
					$("#good_name").html(data.entity.goodsName);
					$("#good_point").html(data.entity.integral+"积分");
					$("#cose_num").html(data.entity.integral+"积分");
				}else{
					alert(data.errorMsg)
				}
				
			}
		});  
  }
  getDrawGood(){
	  $.ajax({
			type : "GET",
			url : Base + "/goodstake/findById.do",
			dataType : "json",
			data:{
				id:this.props.match.params.dgId,
			},
			success : function (data) {
				if(data.isSuccess==0){
					$("#good_pic").attr("src",data.entity.littleImageUrl);
					$("#good_name").html(data.entity.goodsName);
					$("#good_point").html("抽奖产品").addClass("red_color");
					$("#po_cost").html("抽奖产品").addClass("red_color");
				}else{
					alert(data.errorMsg)
				}
				
			}
		});
  }
  getDefaultAddress(){
	  $.ajax({
			type : "GET",
			url : Base + "/receivingaddress/findDefaultAddress.do",
			dataType : "json",
			data:{
				memberId:this.props.match.params.userId,
			},
			success : function (data) {
				if(data.isSuccess==0){
					if(!data.entity){
						$("#had_address").css("display","none");
						$("#no_address").css("display","block");
					}else{
						if(data.entity.isDefault==0){
						}else{
							$("#addr_default").css("display","none");
						}
						addressId=data.entity.id;
						$("#addr_msg").html("收货地址："+data.entity.province+data.entity.city+data.entity.area+data.entity.addressName);
						$("#addr_people").html("收货人："+data.entity.userName);
						$("#addr_phone").html(data.entity.phone);
						$("#had_address").css("display","block");
						$("#no_address").css("display","none");
					}
				}else{
					alert(data.errorMsg);
				}
			}
		});
  }
  render(){
	  var that=this;
    return (
      <div className="po_wrapper">
      	<div className="po_bg"></div>
      	<p className="over_hidden">
      		<img className="po_top" src="../../../src/resource/images/commen/goods/top_line.png" />
      	</p>
      	<div id="had_address">
	      	<a href={"#/addressList/"+that.props.match.params.userId+"/"+that.props.match.params.sgId+"/"+that.props.match.params.dgId+"/"+that.props.match.params.addressId+"/"+that.props.match.params.orderId}>
		      	<div className="address_li">
		      		<img className="address_left" src="../../../src/resource/images/commen/goods/address.png" />
		      		<div className="address_center">
		      			<span id="addr_default" className="default_address">默认</span>
		      			<p id="addr_msg"  className="address_msg">收货地址：广东深圳中国储能大厦36</p>
		      			<p className="address_contact">
		      				<span id="addr_people" className="ac_people">收货人：刘小星</span>
		      				<span id="addr_phone" className="ac_phone"></span>
		      			</p>
		      		</div>
		      		<img className="address_right" src="../../../src/resource/images/commen/goods/detail.png" />
		      	</div>
	      	</a>
      	</div>
      	<div id="no_address" style={{display:"none"}}>
      		<p className="po_add_address">
      			<a href={"#/addressList/"+that.props.match.params.userId+"/"+that.props.match.params.sgId+"/"+that.props.match.params.dgId+"/"+that.props.match.params.addressId+"/"+that.props.match.params.orderId}><em>+</em>添加地址</a>
      		</p>
      	</div>
      	<div className="po_goods">
	      		<img id="good_pic" className="pg_pic" src="" />
	      		<p id="good_name" className="pg_name"></p>
	      		<p id="good_point" className="pg_point"></p>
      	</div>
      	<p className="po_bottom">
      		<span id="po_cost" className="po_cost">消费积分：<em id="cose_num"></em></span>
      		<span className="po_submit" onClick={this.orderSubmit.bind(this)} >提交订单</span>
      	</p>
      </div>
    )
  }
}
export default PointOrder
