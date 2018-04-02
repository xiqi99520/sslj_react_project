var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
import  "./../../../plugs/area.js"
require("./../../../../style/myCenter.css");
var cisDefault=1;
var province_old,city_old,area_old;
class AddAddress extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data:[]
	    };
	  }
  componentWillMount(){  
  }
  componentDidMount(){
	  var that=this;
	  
	  $.ajax({
			type : "GET",
			url : Base + "/receivingaddress/findById.do",
			dataType : "json",
			data:{
				id:that.props.match.params.addressId
			},
			success : function (data) {
				if(data.isSuccess==0){
					that.setState({data:data.entity});
					$("#name").val(data.entity.userName);
					$("#phone").val(data.entity.phone);
					$("#shengshi").val(data.entity.province + data.entity.city + data.entity.area);
					$("#address").val(data.entity.addressName);
					province_old=data.entity.province;
					city_old=data.entity.city;
					area_old=data.entity.area;
				}else{
					alert(data.errorMsg)
				}
				
			}
		});
  }
  chooseCity(){
	  window.getProvinceBuy();
  }
  chooseDefault(){
	  if($(".if_default").hasClass("a_checked")){
		 alert("不能取消默认地址！");
	  }else{
		  $(".if_default").addClass("a_checked");
	  }
  }
  addAddress(){
	  var name=$("#name").val();
	  var phone=$("#phone").val();
	  var shengshi=$("#shengshi").val();
	  var address=$("#address").val();
	  var province=$("#shengshi").attr("SS");
	  var city=$("#shengshi").attr("SQ");
	  var area=$("#shengshi").attr("XS");
	  if(!name){
		  $("#alertMsg").html("请输入收货人姓名");
		  $("#Alert").css("display","block");
		  return false;
	  }
	  if(!phone){
		  $("#alertMsg").html("请输入联系电话");
		  $("#Alert").css("display","block");
		  return false;
	  }
	  if(!/^\d{0,15}$/.test(phone)){
		  $("#alertMsg").html("请输入正确联系电话");
		  $("#Alert").css("display","block");
		  return false;
	  }
	  if(!address){
		  $("#alertMsg").html("请输入详细地址");
		  $("#Alert").css("display","block");
		  return false;
	  }
	  if(!province){
		  province=province_old;
		  city=city_old;
		  area=area_old;
	  }
	  if($(".if_default").hasClass("a_checked")){
		  cisDefault=0;
	  }else{
		  cisDefault=1;
	  }
	  var that=this;
	  $.ajax({
			type : "POST",
			url : Base + "/receivingaddress/updateSave.do",
			dataType : "json",
			data:{
				id:that.props.match.params.addressId,
				memberId:that.props.match.params.userId,
				province:province,
				city:city,
				area:area,
				addressName:address,
				userName:name,
				phone:phone,
				isDefault:cisDefault
			},
			success : function (data) {
				if(data.isSuccess==0){
					window.location.href="#/addressList/"+that.props.match.params.userId+"/"+that.props.match.params.sgId+"/"+that.props.match.params.dgId+"/"+that.props.match.params.addressId+"/"+that.props.match.params.orderId;
				}else{
					alert(data.errorMsg)
				}
				
			}
		});
  }
  deleteAddress(){
	  var that=this;
	  $("#alertMsg").html("确定删除地址！");
	  $(".alert_button").css("display","block");
	  $("#Alert").css("display","block");
	  $(".alert_button").on("click",function(){
		  $("#Alert").css("display","none");
		  $.ajax({
				type : "POST",
				url : Base + "/receivingaddress/deleteById.do",
				dataType : "json",
				data:{
					id:that.props.match.params.addressId,
				},
				success : function (data) {
					 $(".alert_button").unbind();
					if(data.isSuccess==0){
						$("#alertMsg").html("删除地址成功！");
						$(".alert_button").css("display","none");
						$("#Alert").css("display","block");
						setTimeout(function(){
							$("#Alert").css("display","none");
							window.location.href="#/addressList/"+that.props.match.params.userId+"/"+that.props.match.params.sgId+"/"+that.props.match.params.dgId+"/"+that.props.match.params.addressId+"/"+that.props.match.params.orderId;
		    			},1000);
					}else{
						alert(data.errorMsg)
					}
					
				}
			});
	  });
  }
  render(){
    return (
      <div>
      	<ul className="aa_ul">
	      	<li>
	      		<span className="address_word">收货人：</span>
	      		<input id="name"  placeholder="收货人" type="text" />
	      	</li>
	      	<li>
	      		<span className="address_word">联系电话：</span>
		  		<input id="phone" placeholder="联系电话" type="number" />
		  	</li>
		  	<li>
		  		<span className="address_word">省市区：</span>
		  		<input id="shengshi" onClick={this.chooseCity.bind(this)} placeholder="省份、城市、区县" readOnly="readonly" type="text" />
		  		<img className="aa_select" src="../../../src/resource/images/commen/goods/detail.png" />
		  	</li>
		  	<li>
			  	<span className="address_word">详细地址：</span>
		  		<textarea id="address" placeholder="详细地址，如街道、门牌号等" type="text"></textarea>
		  	</li>
	  	</ul>
	  	<p className={this.state.data.isDefault == 0 ? "if_default a_checked" : "if_default"} onClick={this.chooseDefault.bind(this)}>
	  		<img className="to_default" src="../../../src/resource/images/commen/choose.png" />
	  		<img className="not_default" src="../../../src/resource/images/commen/not_choose.png" />
	  		设为默认地址
	  	</p>
	  	<p onClick={this.deleteAddress.bind(this)} className="delete_address">
	  		删除地址
	  	</p>
	  	<p className="po_bottom" onClick={this.addAddress.bind(this)}>
      		<span className="add_address">保存</span>
      	</p>
      </div>
    )
  }
}
export default AddAddress
