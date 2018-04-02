import {SetCookie,GetCookie} from "./../../cookie.js"
import {Base} from './../../connect.js';
class AddEquipment extends React.Component {
  closeBox(){
    $("#add_equip").css("display","none");
  }
  addEq(event){
	  var event = event || window.event;
	  $(event.target).closest(".ae_ul li").addClass("clicked");
	  $.ajax({
          type:"post",
          url: Base+"/smart/sdk.do",
          dataType:"json",
          data:{
         	"userName":GetCookie("znjjUsername"),
            "password":GetCookie("znjjPassword"),
            "uri":"/api/startDeviceSearch",
            "uid":GetCookie("uid"),
          },
          success:function(data){
         	 if(data.status==0){
         	 }else{
         		alert(data.msg); 
         	 }
          },
          error:function(data){
         	 alert("获取服务器信息失败，请检查网络重试");
          }
       });
  }
  render(){
    return (
      <div id="add_equip" className="add_equip">
        <div className="box_bg" onClick={this.closeBox}></div>
        <div className="ae_wrapper">
          <p className="ae_title">发现新设备</p>
          <ul className="ae_ul">
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_24.png" />
              <span className="ae_name">空气进化器</span>
              <img className="ae_add"  src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_7.png" />
              <span className="ae_name">智能音乐面板</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_1.png" />
              <span className="ae_name">灯</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_2.png" />
              <span className="ae_name">插座</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_14.png" />
              <span className="ae_name">摄像机</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_50.png" />
              <span className="ae_name">情景面板</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/paste.png" />
              <span className="ae_name">随意贴</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_21.png" />
              <span className="ae_name">智能门锁</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_22.png" />
              <span className="ae_name">温度传感器</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_23.png" />
              <span className="ae_name">湿度传感器</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_25.png" />
              <span className="ae_name">可燃气体传感器</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_26.png" />
              <span className="ae_name">人体感应器</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_27.png" />
              <span className="ae_name">烟雾传感器</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_8.png" />
              <span className="ae_name">窗帘</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_46.png" />
              <span className="ae_name">门磁感应器</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_26.png" />
              <span className="ae_name">窗磁感应器</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_54.png" />
              <span className="ae_name">水浸感应器</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_56.png" />
              <span className="ae_name">紧急按钮</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/eq_11.png" />
              <span className="ae_name">红外转发器</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
            <li onClick={this.addEq.bind(this)}>
              <img className="ae_icon" src="../../../src/resource/images/equipment/17.png" />
              <span className="ae_name">小白机器人</span>
              <img className="ae_add" src="../../../src/resource/images/equipment/add.png" />
              <img className="ae_add_gray" src="../../../src/resource/images/equipment/add_gray.png" />
            </li>
          </ul>
          <p className="ae_submit" onClick={this.closeBox}>
            确定
          </p>
        </div>
      </div>
    );
  }
}
export default AddEquipment
