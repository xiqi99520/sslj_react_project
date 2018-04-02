import {SetCookie,GetCookie} from "./../../cookie.js";
import {Link} from 'react-router-dom';
import {Base} from './../../connect.js';
var my$;
require("./../../../style/login.css");
let  sendCode=true;
class Forget extends React.Component {
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
         url:Base+"/login/updatePasswordSendMsg.do",
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
  Forget(){
    let phone=$("#phone").val();
    let code=$("#code").val();
    let set_psw=$("#set_psw").val();
    let sure_psw=$("#sure_psw").val();
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
    if(set_psw==""){
      alert("请设置密码");
      return false;
    }
    if(sure_psw==""){
      alert("请确认密码");
      return false;
    }
    if(!(sure_psw==set_psw)){
      alert("请确保两次输入密码一致");
      return false;
    }
    $.ajax({
       type:"post",
       url:Base+"/login/updatePassword.do	",
       dataType:"jsonp",
       jsonpCallback:"successCallback",
       jsonp: "callback",
       data:{
          phone:phone,
          code:code,
          password:set_psw
       },
       success:function(Message){
         var id= Message.jsonp_result.isSuccess;
         if(id == "0"){
            alert("修改密码成功，进入登录页面登录！");
             window.location.href="#/login";
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
            <p className="login_name">
              <img className="login_icon" src="../../../src/resource/images/login/set_psw.png" />
              <input id="set_psw" className="login_input" type="password" placeholder="设置密码" />
            </p>
            <p className="login_name">
              <img className="login_icon" src="../../../src/resource/images/login/sure_psw.png" />
              <input id="sure_psw" className="login_input" type="password" placeholder="确认密码" />
            </p>
            <p className="register_submit" onClick={this.Forget.bind(this)}>
              立即修改
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
export default Forget
// ReactDOM.render(<Forget />, document.getElementById('app'));
