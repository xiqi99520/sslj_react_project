require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js";
var refused=false;
var authId="";
class Authentication extends React.Component {
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
		  var thisTitle='身份认证';
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
	  this.remenberMsg();
  }
  remenberMsg(){
	  var that=this;
	  $.ajax({
	       type:"post",
	       url: Base + "/realname/findByMemberId.do",
	       dataType:"json",
	       data:{
	    	   memberId:that.props.match.params.id,
	       },
	       success:function(Message){
	         if(Message.isSuccess === "0"){
	        	 $("#name").val(Message.entity.realname);
	        	 $("#phone").val(Message.entity.phone);
	        	 $("#textName1").append("<img style='width:10rem;display:block;' src='"+Message.entity.idPositive+"' />");
	        	 $("#authDiv2").append("<img style='width:10rem;display:block;' src='"+Message.entity.idOpposite+"' />");
	        	 if(Message.entity.status==1){
	        		 $("#auth_statu").html("认证信息正在审核中...");
	        		 $("#auth_button").addClass("gray_color");
	        	 }else if(Message.entity.status==2){
	        		 $("#auth_button").addClass("gray_color");
	        		 $("#auth_statu").html("认证信息已通过");
	        	 }else if(Message.entity.status==3){
	        		 refused=true;
	        		 authId=Message.entity.id;
	        		 $("#auth_statu").html("认证信息未通过");
	        	 }
	         }else{
	           alert(Message.errorMsg);
	         }
	       },
	       error:function (xhr,status,statusText){
	           alert("服务器维护");
	       }
	    });
  }
  setMsg(){
	  var that=this;
	  if($("#auth_button").hasClass("gray_color")){
		  return false;
	  }
	  var name=$("#name").val();
	  var phone=$("#phone").val();
	  if(!name){
		  alert("请输入真实姓名");
		  return false;
	  }
	  if(!phone){
		  alert("请输入手机号码");
		  return false;
	  }
	  if(!/^1[3-9]\d{9}$/.test(phone)){
	      alert("手机号码格式不正确");
	      return false;
	  }
	  if(refused==true){
		  $("#loading").css("display","block");
		  $.ajaxFileUpload({
	          url: Base+'/realname/updateSave.do', //用于文件上传的服务器端请求地址
	          secureuri: false, //是否需要安全协议，一般设置为false
	          fileElementId: ['file','file1'], //文件上传域的ID
	          dataType: 'json', //返回值类型 一般设置为json
	          data:{
	        	  id:authId,
	        	  memberId:that.props.match.params.id,
	        	  phone:phone,
	        	  realname:name
	          },
	          success: function (data){
	        	  $("#loading").css("display","none");
	        	  if(data.isSuccess=="0"){
	        		$("#auth_button").addClass("gray_color");
	              	alert("认证信息成功提交，请等待工作人员验证通过。");
	              	$("#auth_statu").html("认证信息正在审核中...");
	              }else{
	              	alert(data.errorMsg);
	              }
	          },
	          error: function (data, status, e)//服务器响应失败处理函数
	          {
	        	  $("#loading").css("display","none");
	              alert(e);
	          }
	      });
	  }else{
		  if(!$("#file").val()){
		      alert("请上传身份证正面");
		      return false;
		  }
		  if(!$("#file1").val()){
		      alert("请上传身份证反面");
		      return false;
		  }
		  $("#loading").css("display","block");
		  $.ajaxFileUpload({
	          url: Base+'/realname/addSave.do', //用于文件上传的服务器端请求地址
	          secureuri: false, //是否需要安全协议，一般设置为false
	          fileElementId: ['file','file1'], //文件上传域的ID
	          dataType: 'json', //返回值类型 一般设置为json
	          data:{
	        	  memberId:that.props.match.params.id,
	        	  phone:phone,
	        	  realname:name
	          },
	          success: function (data){
	        	  $("#loading").css("display","none");
	        	  if(data.isSuccess=="0"){
	        		$("#auth_button").addClass("gray_color");
	              	alert("认证信息成功提交，请等待工作人员验证通过。");
	              	$("#auth_statu").html("认证信息正在审核中...");
	              }else{
	              	alert(data.errorMsg);
	              }
	          },
	          error: function (data, status, e)//服务器响应失败处理函数
	          {
	        	  $("#loading").css("display","none");
	              alert(e);
	          }
	      });
	  }
  }
  qrFile1(){
		var docObj = document.getElementById("file");
		 var dd1 = document.getElementById("textName1");
		 dd1.innerHTML = "";
		 var fileList = docObj.files;
		 for (var i = 0; i < fileList.length; i++) {
		 dd1.innerHTML += "<div style='float:left' > <img id='imgPositive" + i + "' /> </div>";
		 var imgObjPreview = document.getElementById("imgPositive"+i);
		 if (docObj.files && docObj.files[i]) {
		 //火狐下，直接设img属性
		 imgObjPreview.style.display = 'block';
		 //控制缩略图大小
		 imgObjPreview.style.width = '10rem';
		 //imgObjPreview.src = docObj.files[0].getAsDataURL();
		 //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
		 imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);
		 }
		 else {
		 //IE下，使用滤镜
		 docObj.select();
		 var imgSrc = document.selection.createRange().text;
		 alert(imgSrc)
		 var localImagId = document.getElementById("imgPositive" + i);
		 //必须设置初始大小
		 localImagId.style.width = "70px";
		 localImagId.style.height = "70px";
		 //图片异常的捕捉，防止用户修改后缀来伪造图片
		 try {
		  localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
		  localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		 }
		 catch (e) {
		  alert("您上传的图片格式不正确，请重新选择!");
		  return false;
		 }
		 imgObjPreview.style.display = 'none';
		 document.selection.empty();
		 }
		 }
	}
  qrFile2(){
	  var docObj = document.getElementById("file1");
		 var dd = document.getElementById("authDiv2");
		 dd.innerHTML = "";
		 var fileList = docObj.files;
		 for (var i = 0; i < fileList.length; i++) {
		 dd.innerHTML += "<div style='float:left' > <img id='imgOpposite" + i + "' /> </div>";
		 var imgObjPreview = document.getElementById("imgOpposite"+i);
		 if (docObj.files && docObj.files[i]) {
		 //火狐下，直接设img属性
		 imgObjPreview.style.display = 'block';
		 //控制缩略图大小
		 imgObjPreview.style.width = '10rem';
		 //imgObjPreview.src = docObj.files[0].getAsDataURL();
		 //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
		 imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);
		 }
		 else {
		 //IE下，使用滤镜
		 docObj.select();
		 var imgSrc = document.selection.createRange().text;
		 alert(imgSrc)
		 var localImagId = document.getElementById("imgOpposite" + i);
		 //必须设置初始大小
		 localImagId.style.width = "70px";
		 localImagId.style.height = "70px";
		 //图片异常的捕捉，防止用户修改后缀来伪造图片
		 try {
		  localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
		  localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		 }
		 catch (e) {
		  alert("您上传的图片格式不正确，请重新选择!");
		  return false;
		 }
		 imgObjPreview.style.display = 'none';
		 document.selection.empty();
		 }
		 }
	}
  render(){
    return (
      <div>
	    <p className="qr_msg_title">
			<input id="name" type="text" placeholder="请输入真实姓名" />
		</p>
      	<p className="qr_msg_title auth_code">
      		<input id="phone" type="text" placeholder="请输入手机号" />
      	</p>
      	<div className="auth_file">
		    <div className="report_file">
		        <span>上传身份证正面照</span>
		        <input  name="file" id="file" className="file_prew" type="file" onChange={this.qrFile1.bind(this)}  />
		   </div>
		   <div className="auth_div" id="textName1" ></div>
	    </div>
	    <div className="auth_file">
		    <div className="report_file">
		        <span>上传身份证反面照</span>
		        <input  name="file1" id="file1" className="file_prew" type="file" onChange={this.qrFile2.bind(this)}  />
		   </div>
		   <div className="auth_div" id="authDiv2" ></div>
	    </div>
      	<p id="auth_button" className="qr_msg_button" onClick={this.setMsg.bind(this)}>
      		进行认证
	  	</p>
      	<p id="auth_statu" className="auth_statu">
      		&nbsp;
      	</p>
      </div>
    )
  }
}
export default Authentication