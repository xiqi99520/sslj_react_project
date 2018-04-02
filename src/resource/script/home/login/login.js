import {SetCookie,GetCookie} from "./../../cookie.js"
import {Base} from './../../connect.js';
import {Link} from 'react-router-dom'
var my$;
require("./../../../style/login.css");
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:""};
  }
  Login(){
    let phone=$("#phone").val();
    let password=$("#password").val();
    if(phone==""){
      alert("手机号码不能为空");
      return false;
    }
    if(!/^1[3-9]\d{9}$/.test(phone)){
      alert("手机号码格式不正确");
      return false;
    }
    if(password==""){
      alert("请输入密码");
      return false;
    }
    $.ajax({
       type:"post",
       url: Base + "/login/passwordlogin.do",
       dataType:"json",
       data:{
          phone:phone,
          password:password
       },
       success:function(Message){
         var id= Message.isSuccess;
         if(id === "0"){
        	 SetCookie("account",Message.account.account,1);
        	 SetCookie("otherId",Message.account.otherId,1);
        	 SetCookie("yPassword",Message.account.password,1);
             SetCookie("id",Message.data.id,1);
             SetCookie("telephone",Message.data.telephone,1);
             SetCookie("username",Message.data.username,1);
             window.location.href="App.html#/index";
         }else{
           alert(Message.errorMsg);
         }
       },
       error:function (xhr,status,statusText){
           alert("服务器维护");
       }
    });
  }
  render() {
    return (
        <div className="login">
          <div className="login_wrapper">
            <p className="login_name">
              <img className="login_icon" src="../../../src/resource/images/login/phone.png" />
              <input id="phone" className="login_input" type="text" placeholder="请输入手机号" />
            </p>
            <p className="login_name">
              <img className="login_icon" src="../../../src/resource/images/login/password.png" />
              <input id="password" className="login_input" type="password" placeholder="输入密码" />
            </p>
            <p className="login_submit" onClick={this.Login.bind(this)}>
              登入
            </p>
            <p className="login_other">
              <a className="to_register" href="App.html#/register">注册</a>
              <span className="login_separate">|</span>
              <a className="to_forget" href="App.html#/forget">忘记密码</a>
              <a className="to_codeLogin" href="App.html#/codeLogin" >验证码登入</a>
            </p>
          </div>
        </div>
    );
  }
}
export default Login
// ReactDOM.render(<Login />, document.getElementById('app'));
