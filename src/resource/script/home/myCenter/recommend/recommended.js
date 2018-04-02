require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
let  sendCode=true;
let wait=60;
function time(o) {
  if (wait == 0) {
    o.html("获取验证码");
    wait = 60;
    sendCode=true;
  }
  else {
    o.html(wait + "s后可重发");
    wait--;
    setTimeout(function() {
      time(o)
    },
    1000)
  }
}
class Recommended extends React.Component {
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
		  var thisTitle='推荐分享';
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
	  var phone=this.props.match.params.phone;
	  phone="*******"+phone.substring(7);
	  $("#rs_code").html("邀请码：&nbsp;"+phone);
  }
  IfUser(){
	  var that=this;
	  var phone=$("#phone").val();
	  if(!phone){
		  alert("请输入手机号码");
		  return false;
	  }
	  if(!/^1[3-9]\d{9}$/.test(phone)){
	      alert("手机号码格式不正确");
	      return false;
	  }
	  $.ajax({
	       type:"post",
	       url: Base + "/member/findUserInfo.do",
	       dataType:"json",
	       data:{
	    	   phone:phone
	       },
	       success:function(Message){
	         if(Message.isSuccess === "0"){
	        	 window.location.href="#/hadRegister/1/1";
	         }else{
	        	 that.GetCode();
	         }
	       },
	       error:function (xhr,status,statusText){
	         $("#error_msg").html("服务器维护");
        	 $("#Error").css("display","block");
        	 setTimeout(function(){
        		 $("#Error").css("display","none");
        	 },2000);
	       }
	    });
  }
  GetCode(){
	  var phone=$("#phone").val();
	  if(sendCode==true){
	      $.ajax({
	         type:"post",
	         url:Base+"/register/sendCodeMsg.do",
	         dataType:"jsonp",
	         jsonpCallback:"successCallback",
	         jsonp: "callback",
	         async:false,
	         data:{
	            phone:phone,
	            registerType:"1"
	         },
	         success:function(Message){
	           var id= Message.jsonp_result.isSuccess;
	           if(id === "0"){
	             sendCode=false;
	             time($("#get_code"));
	           }else{
	             alert(Message.jsonp_result.errorMsg);
	           }
	         }
	       });
	    }else{

	    }
  }
  downApp(){
	  var that=this;
	  var phone=$("#phone").val();
	    var code=$("#code").val();
	    if(phone==""){
	      alert("手机号码不能为空");
	      return false;
	    }
	    if(!/^1[3-9]\d{9}$/.test(phone)){
	      alert("手机号码格式不正确");
	      return false;
	    }
	    if(!code){
	      alert("请输入验证码");
	      return false;
	    }
	    var channelType=""
	    var userAgent=navigator.userAgent;
		if(userAgent.indexOf('Android')>=0){
			channelType="Android";
		}else{
			channelType="IOS";
		}
		var browser = {
			    versions: function () {
			        var u = navigator.userAgent, app = navigator.appVersion;
			        return {         //移动终端浏览器版本信息
			            trident: u.indexOf('Trident') > -1, //IE内核
			            presto: u.indexOf('Presto') > -1, //opera内核
			            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			            iPad: u.indexOf('iPad') > -1, //是否iPad
			            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			        };
			    }(),
			    language: (navigator.browserLanguage || navigator.language).toLowerCase()
			}

			if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
			        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
			        if (ua.match(/MicroMessenger/i) == "micromessenger") {
			        	channelType="wx";
			                //在微信中打开
							//alert("请点击右上角选择[复制链接]用浏览器打开");
							//location.href = "http://fusion.qq.com/app_download?appid=1105381812&platform=qzone&via=QZ.MOBILEDETAIL.QRCODE&u=3046917960";
							//window.open("http://fusion.qq.com/app_download?appid=1481959275&platform=qzone&via=QZ.MOBILEDETAIL.QRCODE&u=3046917960");
							//location.href ="http://fusion.qq.com/app_download?appid=1105253405&platform=qzone&via=QZ.MOBILEDETAIL.QRCODE&u=3046917960";
			        }
			        else if (browser.versions.ios) {
					//if (browser.versions.ios) {
			                //是否在IOS浏览器打开
							//下载 iosApp
							//alert("IOS");
							//window.open ('https://itunes.apple.com/cn/app/sheng-shi-le-ju/id1000293279?mt=8&uo=4');
							/* location.href = "https://itunes.apple.com/cn/app/id1276056635?mt=8"; */
			        	channelType="IOS";
							
							
			        } 
			        //else if(browser.versions.android){
					else{
			                //是否在安卓浏览器打开
							//下载 安卓App
							//alert("Android");
							//window.open ('http://www.sslj.com/huodong/H5/AndroidAPP/app_sslj.apk');
						channelType="Android";
							
			        }
					
			} else {
				channelType="PC";
			}
	    $.ajax({
	        type:"post",
	        url:Base+"/register/appRegister.do",
	        dataType:"jsonp",
	        jsonpCallback:"successCallback",
	        jsonp: "callback",
	        async:false,
	        data:{
	           phone:phone,
	           code:code,
	           password:"123456",
	           introducer:that.props.match.params.phone,
	           registerType:"1",
	           channelType:channelType,
	           channelUrl:window.location.href
	        },
	        success:function(Message){
	          var id= Message.jsonp_result.isSuccess;
	          if(id == "0"){
	             window.location.href="#/download";
	          }else{
	            alert(Message.jsonp_result.errorMsg);
	          }
	        },
	        error:function (xhr,status,statusText){
	            alert("服务器维护");
	        }
	     })
  }
  render(){
    return (
      <div id="recommended" className="recommend_wrapper">
      	<img className="recommend_bg" src="../../../src/resource/images/myCenter/recommend/recommend_bg.png" />
      	<div className="recommend_main">
	      	<div className="rm_ten_num">
				<p>接受乐居智家小伙伴的邀请</p>
				<p>邀请<span>16</span>人,奖励价值<span>147</span>元充电宝</p>
				<p className="rm_elecpic">
					<img src="../../../src/resource/images/myCenter/recommend/charge.jpg" />
				</p>
			</div>
      		<ul className="rs_ul">
      			<li>
      				<input id="phone" type="text" placeholder="输入手机号接受邀请" />
      			</li>
      			<li className="rs_li">
	  				<input id="code" type="text" placeholder="输入验证码" />
	  				<span id="get_code" className="re_get_code" onClick={this.IfUser.bind(this)}>获取验证码</span>
	  			</li>
      		</ul>
      		<p className="recommend_button"  onClick={this.downApp.bind(this)}>
      			接受邀请
      		</p>
      	</div>
      	<div className="recommended_bottom">
	  		<p className="rb_title">
	  			中国值得信赖的智能科技企业
	  		</p>
	  		<p className="rb_pic">
	  			<img src="../../../src/resource/images/myCenter/recommend/recommend_top.jpg" />
	  		</p>
	  		<p className="rb_new_word">
	  			中国智能家装赴美上市第一股
	  		</p>
	  	</div>
      	<div className="recommended_bottom">
      		<p className="rb_title">
      			10万+智能家庭的选择
      		</p>
      		<p className="rb_pic">
      			<img src="../../../src/resource/images/myCenter/recommend/recommend1.jpg" />
      		</p>
      	</div>
      	<div className="recommended_bottom">
	  		<p className="rb_title">
	  			3000+家服务网点遍布全国，<br />随时随地为您服务
	  		</p>
	  		<p className="rb_pic">
	  			<img src="../../../src/resource/images/myCenter/recommend/recommend2.jpg" />
	  		</p>
	  	</div>
	  	<p className="bottom_logo">
	  		<img src="../../../src/resource/images/logo.png" />
	  	</p>
      </div>
    )
  }
}
export default Recommended