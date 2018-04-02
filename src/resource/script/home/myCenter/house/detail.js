var my$;
require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
class HouseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		data:{},
	    base64:""
    };
  }
  choosePic(){
	  var file=document.getElementById('imgUrl');
	  var prevDiv = document.getElementById('preview'); 
	  var that=this;
	  that.setState({"base64":""});
	  if (file.files && file.files[0]){  
		  var reader = new FileReader();  
		  reader.onload = function(evt){  
			  that.setState({"base64":evt.target.result});
			  prevDiv.innerHTML = '<img class="ah_pic" src="' + evt.target.result + '" />';
		  }
		  reader.readAsDataURL(file.files[0]);  
	 }  
	  else{  
		  prevDiv.innerHTML = '<em class="img ah_pic" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></em>';  
	  } 
  }
  componentDidMount(){
	  var that=this;
	  $.ajax({
			type : "post",
			url : Base + "/account/getMemberAllAccount.do",
			dataType : "json",
			data:{
				memberId:GetCookie("id")
			},
			success : function (data) {
				if(data.isSuccess==0){
					
					that.setState({
						data:data.accountList[that.props.match.params.index]
					});
					$("#name").val(data.accountList[that.props.match.params.index].name);
					$("#ah_pic").attr("src",data.accountList[that.props.match.params.index].imgUrl);
				}else{
					alert(data.errorMsg)
				}
				
			}
		});
  }
  changeHouse(){
	  var that=this;
	  var name=$("#name").val();
	  if(!name){
		  	$("#alertMsg").html("房屋名称不能为空");
			$("#Alert").css("display","block");
			setTimeout(function(){
				$("#Alert").css("display","none");
			},2000);
		  return false;
	  }
	  if(!that.state.base64 &&name==that.state.data.name){
		  $("#alertMsg").html("没有进行修改操作");
		  $("#Alert").css("display","block");
			setTimeout(function(){
				$("#Alert").css("display","none");
			},2000);
		  return false;
	  }
	  var myData={
			  id:GetCookie("id")  
	  };
	  if(name!=that.state.data.name){
		  myData.name=name;
	  }
	  if(that.state.base64!=""){
		  myData.imgUrl=that.state.base64;
	  }
	  $.ajax({
			type : "post",
			url : Base + "/account/updateSave.do",
			dataType : "json",
			data:myData,
			success : function (data) {
				if(data.isSuccess==0){
					$("#success_msg").html("成功修改房屋");
					$("#Success").css("display","block");
					window.location.href="#/myCenter/house";
					setTimeout(function(){
						$("#Success").css("display","none");
					},1000);
				}else{
					alert(data.errorMsg)
				}
			}
		}); 
  }
  deleteHouse(){
	  var that=this;
	  $("#sureMsg").html("您确定删除此房屋？");
	  $("#Sure").css("display","block");
	  $("#sureOk").bind("click",function(){
		  $("#Sure").css("display","none");
		  $("#sureOk").unbind();
		  $.ajax({
				type : "post",
				url : Base + "/account/deleteById.do",
				dataType : "json",
				data:{
					id:that.state.data.id
				},
				success : function (data) {
					if(data.isSuccess==0){
						$("#success_msg").html("成功删除房屋");
						$("#Success").css("display","block");
						window.location.href="#/myCenter/house";
						setTimeout(function(){
							$("#Success").css("display","none");
						},1000);
					}else{
						alert(data.errorMsg);
					}
				}
			}); 
	  });
  }
  focusInput(){
	  $("#name").focus();
  }
  goBack(){
	  this.props.history.goBack();
  }
  render(){
    return (
      <div>
      	<p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      房屋管理
	      <a className="room_top_a" href="#/myCenter/houseAdd">创建</a>
	    </p>
	    <div>
		    <ul className="ah_ul">
		    	<li onClick={this.focusInput.bind(this)}>
		    		名称
		    		<input id="name" className="ah_name_input" type="text" placeholder="请输入名称" />
		    		<img className="ah_to" src="../../../src/resource/images/myCenter/family/more.png" />
		    	</li>
		    	<li>
		    		图片
		    		<input id="imgUrl" className="ah_file" type="file" onChange={this.choosePic.bind(this)} />
		    		<span id="preview">
		    			<img id="ah_pic" className="ah_pic" src="../../../src/resource/images/myCenter/house/picture_edit.png" />
		    		</span>
		    		<img className="ah_to" src="../../../src/resource/images/myCenter/family/more.png" />
		    	</li>
		    	<li>
		    		<a className="hd_a" href="#/myCenter/family">
			    		家人管理
			    		<img className="ah_to" src="../../../src/resource/images/myCenter/family/more.png" />
		    		</a>
		    	</li>
		    </ul>
	    </div>
	    <p className="ah_submit" onClick={this.changeHouse.bind(this)}>
	    	保存
	    </p>
	    <p className="ah_submit hd_delect" onClick={this.deleteHouse.bind(this)}>
	    	删除
	    </p>
      </div>
    )
  }
}
export default HouseDetail