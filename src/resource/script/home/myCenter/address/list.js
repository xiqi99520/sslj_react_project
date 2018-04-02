var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
require("./../../../../style/myCenter.css");
var page=1;/*当前页*/
var able=true;
var end=false;/*当前页*/
var pageSize=10;//默认查询10条
class AddressList extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data:[]
	    };
	  }
  componentWillMount(){ 
	  var that=this;
	  $.ajax({
			type : "GET",
			url : Base + "/receivingaddress/grid.do",
			dataType : "json",
			data:{
				pageSize:50,
				pageNo:1,
				memberId:this.props.match.params.userId
			},
			success : function (data) {
				if(data.isSuccess==0){
					that.setState({'data':data.data.rows});
					if(data.data.rows.length>0){
						  $(".none_show").css("display","none");
					  }else{
						  $(".none_show").css("display","block");
					  }
				}else{
					alert(data.errorMsg)
				}
			}
		}); 
  }
  componentDidMount(){
  }
  render(){
	  var that = this;
    return (
      <div className="po_wrapper">
      	<p className="over_hidden">
      		<img className="po_top" src="../../../src/resource/images/commen/goods/top_line.png" />
      	</p>
      	<div className="address_ul">
	      	{
	    		this.state.data.map(function(item,index){
	    			return (
				      	   <div key={index} className="address_li">
					  		  <img className="address_left" src="../../../src/resource/images/commen/goods/address.png" />
					  		  <a href={"#/order/"+that.props.match.params.userId+"/"+that.props.match.params.sgId+"/"+that.props.match.params.dgId+"/"+item.id+"/"+that.props.match.params.orderId}>
						  		  <div className="address_center">
						  		  	<span className={item.isDefault==0?"default_address":"default_address dis_show"}>默认</span>
						  			<p className="address_msg">收货地址：{item.addressName}</p>
						  			<p className="address_contact">
						  				<span className="ac_people">收货人：{item.userName}</span>
						  				<span className="ac_phone">{item.phone}</span>
						  			</p>
						  		  </div>
					  		  </a>
					  		  <a href={"#/addressEdit/"+that.props.match.params.userId+"/"+that.props.match.params.sgId+"/"+that.props.match.params.dgId+"/"+item.id+"/"+that.props.match.params.orderId}><img className="address_edit" src="../../../src/resource/images/commen/goods/edit.png" /></a>
					  		</div>
	    			)
	    		})
	    	}
      	</div>
      	<div className="none_show">
      		<p className="none_pic">
      			<img src="../../../src/resource/images/commen/null_address.png" />
      		</p>
      		<p className="none_word">
      			暂无地址~
      		</p>
      	</div>
      	<p className="po_bottom">
      		<a className="add_address" href={"#/addressAdd/"+that.props.match.params.userId+"/"+that.props.match.params.sgId+"/"+that.props.match.params.dgId+"/"+that.props.match.params.addressId+"/"+that.props.match.params.orderId}>+ 添加地址</a>
      	</p>
      </div>
    )
  }
}
export default AddressList
