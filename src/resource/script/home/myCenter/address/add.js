var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
import  "./../../../plugs/area.js"
require("./../../../../style/myCenter.css");
var cisDefault=1;
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
  }
  chooseCity(){
	  window.getProvinceBuy();
  }
  chooseDefault(){
	  if($(".if_default").hasClass("a_checked")){
		  $(".if_default").removeClass("a_checked");
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
	  if(!address){
		  $("#alertMsg").html("请输入详细地址");
		  $("#Alert").css("display","block");
		  return false;
	  }
	  if(!province){
		  $("#alertMsg").html("请选取省市");
		  $("#Alert").css("display","block");
		  return false;
	  }
	  if($(".if_default").hasClass("a_checked")){
		  cisDefault=0;
	  }else{
		  cisDefault=1;
	  }
	  var that=this;
	  $.ajax({
			type : "POST",
			url : Base + "/receivingaddress/addSave.do",
			dataType : "json",
			data:{
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
  render(){
    return (
      <div>
      	<ul className="aa_ul">
	      	<li>
	      		<span className="address_word">收货人：</span>
	      		<input id="name"  placeholder="收货人姓名" type="text" />
	      	</li>
	      	<li>
	      		<span className="address_word">联系电话：</span>
		  		<input id="phone" placeholder="联系电话" type="text" />
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
	  	<p className="if_default" onClick={this.chooseDefault.bind(this)}>
	  		<img className="to_default" src="../../../src/resource/images/commen/choose.png" />
	  		<img className="not_default" src="../../../src/resource/images/commen/not_choose.png" />
	  		设为默认地址
	  	</p>
	  	<p className="po_bottom" onClick={this.addAddress.bind(this)}>
      		<span className="add_address">保存</span>
      	</p>
      </div>
    )
  }
}
export default AddAddress
