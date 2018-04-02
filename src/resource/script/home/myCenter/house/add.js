var my$;
require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
class HouseAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data:[],
    base64:""
    };
  }
  choosePic(){
	  var file=document.getElementById('imgUrl');
	  var prevDiv = document.getElementById('preview'); 
	  var that=this;
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
  addHouse(){
	  var that=this;
	  var name=$("#houseName").val();
	  if(!name){
		  	$("#alertMsg").html("请填写房屋名称");
			$("#Alert").css("display","block");
			setTimeout(function(){
				$("#Alert").css("display","none");
			},2000);
		  return false;
	  }
	  $.ajax({
			type : "post",
			url : Base + "/account/addSave.do",
			dataType : "json",
			data:{
				memberId:GetCookie("id"),
				name:name,
				imgUrl:that.state.base64
			},
			success : function (data) {
				debugger;
				if(data.isSuccess==0){
					$("#success_msg").html("成功添加房屋");
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
  focusInput(){
	  $("#houseName").focus();
  }
  goBack(){
	  this.props.history.goBack();
  }
  render(){
    return (
      <div>
      	<p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      创建房屋
	    </p>
	    <div>
		    <ul className="ah_ul">
		    	<li onClick={this.focusInput.bind(this)}>
		    		名称
		    		<input id="houseName" className="ah_name_input" type="text" placeholder="请输入名称" />
		    		<img className="ah_to" src="../../../src/resource/images/myCenter/family/more.png" />
		    	</li>
		    	<li>
		    		图片
		    		<input id="imgUrl" className="ah_file" type="file" onChange={this.choosePic.bind(this)} />
		    		<span id="preview">
		    			<img className="ah_pic" src="../../../src/resource/images/myCenter/house/picture_edit.png" />
		    		</span>
		    		<img className="ah_to" src="../../../src/resource/images/myCenter/family/more.png" />
		    	</li>
		    </ul>
	    </div>
	    <p className="ah_submit" onClick={this.addHouse.bind(this)}>
	    	创建
	    </p>
      </div>
    )
  }
}
export default HouseAdd