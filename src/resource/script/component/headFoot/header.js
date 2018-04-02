import {SetCookie,GetCookie} from "./../../cookie.js"
import {Base} from './../../connect.js';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		data:{"city":"城市选择"},
    		house:[]
    };
  }
  showChangeHouse(){
	  $("#changeHouse").css("display","block");
  }
  disShowChangeHouse(){
	  $("#changeHouse").css("display","none");
  }
  componentDidMount(){
	  var that=this;
	  if(GetCookie("id")){
		  $.ajax({
				type : "post",
				url : Base + "/account/getMemberAllAccount.do",
				dataType : "json",
				data:{
					memberId:GetCookie("id")
				},
				success : function (data) {
					if(data.isSuccess==0){
						data.accountList.map(function(item,index){
				    		if(item.isDefault==0){
				    			SetCookie("houseId",item.id,0.08);
				    		}
						});
						that.setState({
							house:data.accountList
						});
					}else{
						alert(data.errorMsg)
					}
					
				}
			}); 
	  }
	   
  }
  changeHouse(houseId,index,event){
	  var that=this;
	  if($(".ch_ul li").eq(index).hasClass("on")){
		  return false;
	  }
	  $.ajax({
			type : "post",
			url : Base + "/account/changeDefaultAccount.do",
			dataType : "json",
			data:{
				memberId:GetCookie("id"),
				accountId:houseId
			},
			success : function (data) {
				if(data.isSuccess==0){
					location.reload();
				}else{
					alert(data.errorMsg)
				}
				
			}
		});
  }
  toLogin(){
	  $("#sureMsg").html("还未登陆，请先去登录");
	  $("#Sure").css("display","block");
	  $("#sureOk").bind("click",function(){
		  $("#Sure").css("display","none");
		  $("#sureOk").unbind();
		  window.location.href="#/login";
	  });
  }
  render(){
	  var imgUrl;
	  var that=this;
    return (
      <div className="head_part">
      		<div id="no_login_shadow" className="no_login_shadow" onClick={this.toLogin.bind(this)}></div>
      		<div id="changeHouse" style={{"display":"none"}}>
			<div className="house_box_bg" onClick={this.disShowChangeHouse.bind(this)}></div>
		  	<div className="change_house">
		  		<img className="house_triangle" src="../../../src/resource/images/myCenter/house/triangle.png" />
		  		<p className="ch_title">
		  			切换房屋
		  		</p>
		  		<ul className="ch_ul">
		  		{
			    	this.state.house.map(function(item,index){
			    		if(!item.imgUrl){
			    			imgUrl="../../../src/resource/images/myCenter/house/picture_default.png";
			    		}else{
			    			imgUrl=item.imgUrl;
			    		}
			    		return (
			    				<li className={item.isDefault==0?"on":""} onClick={that.changeHouse.bind(that,item.id,index)}>
					  				<img className="ch_li_pic" src={imgUrl} />
					  				{item.name}
					  			</li>
			    		)
			    	})
			    }
		  		</ul>
		  	</div>
		</div>
	      <div className="index_wrapper">
		  	<img className="index_bg" src="../../../src/resource/images/index/home_bg.png" />
		  	<img className="index_house" onClick={this.showChangeHouse.bind(this)} src="../../../src/resource/images/myCenter/house/picture_default.png" />
		  	<a href="#/addEquipment/list">
		  		<img className="index_add" src="../../../src/resource/images/index/add.png" />
		  	</a>
		  	<div className="index_msg">
		  		<div className="im_outer">
		  			<p className="im_left">
		  				<span>16</span>°c
		  			</p>
		  			<div className="im_right">
		  				<p className="im_address">深圳市.南山区</p>
		  				<p className="im_weather">多云</p>
		  			</div>
		  		</div>
		  		<div className="im_in">
		  			<span className="index_separate">室内温度 24°c</span>
		  			<span className="index_separate">室内湿度 60%</span>
		  			<span>室內PM 40</span>
		  		</div>
		  	</div>
		  </div>
      </div>
    );
  }
}
export default Header
