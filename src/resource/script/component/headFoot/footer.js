import {SetCookie,GetCookie} from "./../../cookie.js"
require("./header.css");
class Footer extends React.Component {
  ToMyCenter(){
    let cookie=GetCookie("id");
    if(!cookie){
      window.location.href="App.html#/login";
    }else{
      window.location.href="App.html#/myCenter";
    }
  }
  render(){
    return (
      <ul className="footer">
        <li className={this.props.onState=='1'? 'on':''}  >
          <a href="App.html#/">
            <p className="footer_pic">
              <img className="normal" src="../../../src/resource/images/home.png" />
              <img className="onpic" src="../../../src/resource/images/home_on.png" />
            </p>
            <p className="footer_word">
              首页
            </p>
          </a>
        </li>
        <li className={this.props.onState=='2'? 'on':''}>
          <a href="App.html#/scene/0">
            <p className="footer_pic">
              <img className="normal" src="../../../src/resource/images/scene.png" />
              <img className="onpic" src="../../../src/resource/images/scene_on.png" />
            </p>
            <p className="footer_word">
              场景联动
            </p>
          </a>
        </li>
        <li className={this.props.onState=='3'? 'on':''}>
          <a href="App.html#/security">
            <p className="footer_pic">
              <img className="normal" src="../../../src/resource/images/security/home_security_nor.png" />
              <img className="onpic" src="../../../src/resource/images/security/home_security_pre.png" />
            </p>
            <p className="footer_word">
              安防
            </p>
          </a>
        </li>
        <li onClick={this.ToMyCenter.bind(this)} className={this.props.onState=='4'? 'on':''}>
          <p className="footer_pic">
            <img className="normal" src="../../../src/resource/images/my.png" />
            <img className="onpic" src="../../../src/resource/images/my_on.png" />
          </p>
          <p className="footer_word">
            我的
          </p>
        </li>
      </ul>
    );
  }
}
export default Footer
