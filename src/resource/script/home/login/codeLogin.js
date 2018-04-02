import {SetCookie,GetCookie} from "./../../cookie.js"
var my$;
import {Base} from './../../connect.js';
require("./../../../style/login.css");
let  sendCode=true;
class CodeLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg:""
    };
  }
  GetCode(){
    var phone=$("#phone").val();
    if(phone==""){
      alert("手机号码不能为空");
      return false;
    }
    if(!/^1[3-9]\d{9}$/.test(phone)){
      alert("手机号码格式不正确");
      return false;
    }
    if(sendCode==true){
      $.ajax({
         type:"post",
         url:Base+"/login/codeLoginSendMsg.do",
         dataType:"jsonp",
         jsonpCallback:"successCallback",
         jsonp: "callback",
         async:false,
         data:{
            phone:phone
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
  CLogin(){
    let phone=$("#phone").val();
    let code=$("#code").val();
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
    $.ajax({
       type:"post",
       url:Base+"/login/codelogin.do",
       dataType:"jsonp",
       jsonpCallback:"successCallback",
       jsonp: "callback",
       async:false,
       data:{
          phone:phone,
          code:code
       },
       success:function(Message){
         var id= Message.jsonp_result.isSuccess;
         if(id === "0"){
             SetCookie("userId",Message.jsonp_result.data.id,1);
             SetCookie("phone",Message.jsonp_result.data.username,1);
             window.location.href="../myCenter/index.html";
         }else{
           alert(Message.jsonp_result.errorMsg);
         }
       },
       error:function (xhr,status,statusText){
           alert("服务器维护");
       }
    })
  }
  render() {
    return (
        <div className="login">
          <div className="login_wrapper register_wrapper">
            <p className="login_name">
              <img className="login_icon" src="../../../src/resource/images/login/phone.png" />
              <input id="phone" className="login_input" type="text" placeholder="请输入手机号" />
            </p>
            <div className="code_part">
              <p className="code_left">
                <img className="login_icon" src="../../../src/resource/images/login/password.png" />
                <input id="code"  className="login_input" type="text" placeholder="输入验证码" />
              </p>
              <span id="get_code" className="get_code" onClick={this.GetCode.bind(this)}>获取验证码</span>
            </div>
            <p className="register_submit" onClick={this.CLogin.bind(this)}>
              立即登入
            </p>
            <p className="login_other">
              <a className="to_register" href="App.html#/register">注册</a>
              <a className="to_codeLogin" href="App.html#/login" >密码登入</a>
            </p>
          </div>
        </div>
    );
  }
}
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
export default CodeLogin
// ReactDOM.render(<CodeLogin />, document.getElementById('app'));
