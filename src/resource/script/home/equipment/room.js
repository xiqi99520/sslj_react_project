var my$;
import {SetCookie,GetCookie} from "./../../cookie.js"
import {Base} from './../../connect.js';
let startX,startY,endX,endY;
class EquipmentList extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {msg:[],zcyun:[]};
	  }
  componentWillMount(){
      // 获取当前用户查询设备
      var userId = GetCookie("userId");
      if(userId != null){
        this.getuser(userId);
        this.getzcyunDeviceList(userId);
      }
  }
  // 获取智能家居账户名和密码
  getuser(userId) {
    var mythis = this;
      $.ajax({
        type:"get",
        url:Base+"/member/findById.do",
        dataType:"json",
        data:{
          id:userId
        },
        success:function(data){
          if(data.isSuccess == "0") {
            var znjjUsername =  data.entity.znjjUsername;
            var znjjPassword =  data.entity.znjjPassword;
            mythis.getUserDeviceList(znjjUsername,znjjPassword);
          }
        },
        error:function(data){
          alert("服务器返回数据错误");
        }
      });
  }
  // 获取欧瑞博设备列表
  getUserDeviceList(znjjUsername,znjjPassword) {
    var mythis = this;
    $.ajax({
        type:"post",
        url:Base+"/smart/sdk.do",
        dataType:"json",
        data:{
          userName:znjjUsername,
          password:znjjPassword,
          uri:"/api/getDeviceListNoScene"
        },
        success:function(data){
          if(data.status == "0") {
            mythis.setState({msg: data.dList});
          }
        },
        error:function(data){
          alert("服务器返回数据错误");
        }
      });
  }
  // 获取智城云设备列表
  getzcyunDeviceList(userId) {
    var mythis = this;
    $.ajax({
        type:"post",
        url:Base+"/machtalk/getDeviceList.do",
        dataType:"json",
        data:{
          userId:userId
        },
        success:function(data){
          if(data.code == "0") {
              if(data.data != null && data.data.devs != null) {
                mythis.setState({zcyun: data.data.devs});
              }
          }
        },
        error:function(data){
          alert("服务器返回数据错误");
        }
      });
  }
    
  onTouchStart(event){
    var event = event || window.event;
    startX=event.touches[0].clientX;
    startY=event.touches[0].clientY;
  }
  onTouchEnd(event){
    var event = event || window.event;
    endX=event.changedTouches[0].clientX;
    endY=event.changedTouches[0].clientY;
    if(endX-startX>10){
      $(event.target).closest(".eq_state").removeClass("eq_off").addClass("eq_on");
    }
    if(startX-endX>10){
      $(event.target).closest(".eq_state").addClass("eq_off").removeClass("eq_on");
    }else{

    }
  }
  stateClick(event){
    var event = event || window.event;
    var dom=$(event.target).parent();
    if(dom.hasClass("eq_on")){
      dom.removeClass("eq_on").addClass("eq_off");
    }else{
      dom.removeClass("eq_off").addClass("eq_on");
    }
  }
  render(){
	var nthis=this;
    var des="";
    var toUrl="";
    return (
      <div id="room_part" style={{display:'none'}}>
        <ul className="room_ul">
              <li>
                <a href="javaScript:void(0)">
                  <span className="eq_name_room">默认房间</span>
                </a>
              </li>
              {
                  this.state.msg.map(function(item){
                	  	if(item.deviceType==1||item.deviceType==2||item.deviceType==6||item.deviceType==32||item.deviceType==34){
                	  		var state=item.value1;
                	  		switch(item.deviceType){
                	  		case 1:
                	  			toUrl="#/equipment/light/"+item.deviceId+"/"+item.extAddr+"/"+item.deviceName;
                	  			break;
    	            	  	case 2:
    	        	  			toUrl="#/equipment/socket/"+item.deviceId+"/"+item.extAddr+"/"+item.deviceName;
    	        	  			break;
    			            case 6:
    			  	  			toUrl="#/equipment/TV/"+item.deviceId+"/"+item.extAddr+"/"+item.deviceName;
    			  	  			break;
    			            case 32:
    			  	  			toUrl="";
    			  	  			break;
    					    case 34:
    					    	state=item.value1>25?"0":"1";
    							toUrl="#/equipment/curtains/"+item.deviceId+"/"+item.extAddr+"/"+item.deviceName;
    							break;
    						}
                	  		return (
                                    <li>
                                      <a href={toUrl}>
                                        <img className="eq_icon" src={"../../../src/resource/images/equipment/eq_"+item.deviceType+".png"} />
                                        <span className="eq_name">{item.deviceName}</span>
                                      </a>
                                     <span className={state==0?"eq_state eq_on":"eq_state eq_off"} onTouchStart={nthis.onTouchStart.bind(this)} onTouchEnd={nthis.onTouchEnd.bind(this)}>
                                        <em className="bottom_state" onClick={nthis.stateClick.bind(this)}></em>
                                        <em className="on_pointer"></em>
                                     </span>
                                    </li>
                                  )
                	  	}else{
                	  		switch(item.deviceType){
                	  		case 22:
                	  			des="温度："+item.value1/100+"℃";
                	  			toUrl="#/equipment/defaultEquip/"+item.deviceId+"/"+item.deviceType+"/"+item.extAddr+"/"+item.deviceName;
                	  			break;
                	  		case 23:
                	  			des="湿度："+item.value1/100+"%";
                	  			toUrl="#/equipment/defaultEquip/"+item.deviceId+"/"+item.deviceType+"/"+item.extAddr+"/"+item.deviceName;
                	  			break;
                	  		case 25:
                	  			des=item.value1==0?"正常":"可燃气体浓度超标报警！";
                	  			toUrl="#/equipment/defaultEquip/"+item.deviceId+"/"+item.deviceType+"/"+item.extAddr+"/"+item.deviceName;
                	  			break;
                	  		case 26:
                	  			des=item.value1==0?"正常":"有人经过";
                	  			toUrl="#/equipment/defaultEquip/"+item.deviceId+"/"+item.deviceType+"/"+item.extAddr+"/"+item.deviceName;
                	  			break;
                	  		case 27:
                	  			des=item.value1==0?"正常":"烟雾浓度超标报警！";
                	  			toUrl="#/equipment/defaultEquip/"+item.deviceId+"/"+item.deviceType+"/"+item.extAddr+"/"+item.deviceName;
                	  			break;
                	  		case 46:
                	  			des=item.value1==0?"关闭":"打开";
                	  			toUrl="#/equipment/defaultEquip/"+item.deviceId+"/"+item.deviceType+"/"+item.extAddr+"/"+item.deviceName;
                	  			break;
                	  		case 47:
                	  			des=item.value1==0?"关闭":"打开";
                	  			toUrl="#/equipment/defaultEquip/"+item.deviceId+"/"+item.deviceType+"/"+item.extAddr+"/"+item.deviceName;
                	  			break;
                	  		case 54:
                	  			des=item.value1==0?"正常":"有水侵入报警！";
                	  			toUrl="#/equipment/defaultEquip/"+item.deviceId+"/"+item.deviceType+"/"+item.extAddr+"/"+item.deviceName;
                	  			break;
                	  		case 56:
                	  			des=item.value1==0?"正常":"有危险，紧急求救！";
                	  			toUrl="#/equipment/defaultEquip/"+item.deviceId+"/"+item.deviceType+"/"+item.extAddr+"/"+item.deviceName;
                	  			break;
                	  		default:
                	  			des="";
                	  		}
                	  		return (
                	  		<li>
    	                        <a href={toUrl}>
    	                          <img className="eq_icon" src={"../../../src/resource/images/equipment/eq_"+item.deviceType+".png"} />
    	                          <span className="eq_name">{item.deviceName}</span>
    	                          <span className="eq_msg">
    	                            {des}
    	                            <img className="eq_to" src="../../../src/resource/images/equipment/arrow.png" />
    	                          </span>
    	                        </a>
    	                      </li>
    	                      )
                	  	}
                  })
                }
                 {
                     this.state.zcyun.map(function(item){
                         return (
                           <li>
                             <a href="">
                               <img className="eq_icon" src="../../../src/resource/images/equipment/eq_24.png" />
                               <span className="eq_name">{item.name}</span>
                             </a>
                            <span className="eq_state eq_off" onTouchStart={nthis.onTouchStart.bind(this)} onTouchEnd={nthis.onTouchEnd.bind(this)}>
                               <em className="bottom_state" onClick={nthis.stateClick.bind(this)}></em>
                               <em className="on_pointer"></em>
                            </span>
                           </li>
                         )
                     })
                   }
        </ul>
      </div>
    );
  }
}
export default EquipmentList
