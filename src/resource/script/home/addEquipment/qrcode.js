require("./../../../style/addEq.css");
import {SetCookie,GetCookie} from "./../../cookie.js"
import {Base,Yzy} from './../../connect.js';

class Qrcode extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {data:""};
	  }
	componentDidMount(){
	}
	base64decode(str) {
		var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	     var base64DecodeChars = new Array(
	         -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	         -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	         -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
	         52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
	         -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
	         15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
	        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
	        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = "";
        while(i < len) {
        
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while(i < len && c1 == -1);
        if(c1 == -1)
            break;
        
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while(i < len && c2 == -1);
        if(c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if(c3 == 61)
            return out;
            c3 = base64DecodeChars[c3];
        } while(i < len && c3 == -1);
        if(c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if(c4 == 61)
            return out;
            c4 = base64DecodeChars[c4];
        } while(i < len && c4 == -1);
        if(c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    }
	ajaxFileUpload(){
		var that=this;
		$.ajaxFileUpload({
            url: '/zzjj-app/qrcode/analysisQrcode.do', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: 'file', //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data){
              that.getQrcode(data.resultValue);
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
        });
	}
	getQrcode(msg){
		var that=this;
		if(msg.indexOf("GT")<0){
			
			that.addYzyEq(msg);
			return false;
		}
		var newMsg=msg.split("GT");
		var arrayMsg=newMsg[1].split("pass");
		$.ajax({
			type:"post",
			url: '/zzjj-app/feibiuser/findUrl.do', //用于文件上传的服务器端请求地址
            dataType: 'json', //返回值类型 一般设置为json
            data:{
            	 account:arrayMsg[0],
            	 password:arrayMsg[1]
            },
            success: function (data){
            	if(data.isSuccess=="0"){
            		that.addYzyEq(data.qrcode);
            	}else{
            		
            	}
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
		})
	}
	addYzyEq(msg){
		var that=this;
		var params = {
				"qrcode": msg
			    };
		$.ajax({
			  type:"post",
			  url:Yzy+"/v2/user/"+GetCookie("user_id")+"/qrcode_subscribe",
			  beforeSend: function(xhr) {
		            xhr.setRequestHeader('Access-Token', GetCookie("access_token"));
		      },
		      data:JSON.stringify(params),
			  success:function(data){
				  that.setHostType();
			  },
			  error:function(data){
				  var text=JSON.parse(data.responseText);
				  if(text.error.msg=="Access-Token Refresh"){
					  window.refreshToten();
					  return false;
				  }
				  if(text.error.msg=="Access-Token Expired"){
					  window.refreshToten();
					  return false;
				  }
				  if(text.error.msg=="device subscribe faild by scan mode."){
					  alert("主机被其他人员绑定了");
					  return false;
				  }
				  alert(text.error.msg);
			  }
		  });
	}
	setHostType(){
		$.ajax({
		       type:"post",
		       url: Base+"/account/updateSave.do",
		       dataType:"json",
		       data:{
		    	   id:GetCookie("otherId"),
		    	   uid:GetCookie("hostId"),
		    	   type:1
				},
		       success:function(data){
		    	   if(data.isSuccess==0){
		    		  $("#success_msg").html("成功添加设备");
					  $("#Success").css("display","block");
					  window.location.href="#/index";
					  setTimeout(function(){
						  $("#Success").css("display","none");
					  },2000);
		    	   }else{
		    		   alert(data.errorMsg);
		    	   }
		       },
		       error:function(data){
		          alert("服务器返回数据错误");
		       }
		  });
	}
	qrFile(){
		$("#textName").val($("#file").val());
	}
	goBack(){
		  this.props.history.goBack();
	}
  render(){
    return (
      <div>
	    <p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      添加设备
	    </p>
	    <div className="qr_main">
		    <div className="report_file">
		        <span>上传设备二维码</span>
		        <input  name="file" id="file" className="file_prew" type="file" onChange={this.qrFile.bind(this)}  />
		   </div>
		   <input className="qr_text" type="text" id="textName" />
	    </div>
    	<p className="aed_submit aed_true" onClick={this.ajaxFileUpload.bind(this)}>
			添加设备
		</p>
      </div>
    );
  }
}
export default Qrcode
