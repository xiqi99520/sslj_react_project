require("./bottomEquip.css");
import {Base} from './../../connect.js';
import {SetCookie,GetCookie} from "./../../cookie.js";
var sceneEq;
var sceneId;
class BottomEquip extends React.Component {
 constructor(props) {
	    super(props);
	    this.state = {
	    data:[]
	    };
	  }
  checkThis(index,event){
    var event = event || window.event;
    var dom=$(event.target).closest(".be_li");
    if(dom.hasClass("be_on")){
      dom.removeClass("be_on");
    }else{
      dom.addClass("be_on");
    }
  }
  beSubmit(){
	  sceneEq=this.state.data;
	  var chooseSceneEqUl=[];
	  $(".be_on").each(function(){
		 var index= $(this).find(".eq_index").html();
		 var chooseSceneEq=sceneEq.slice(index,index+1);
		 chooseSceneEqUl.push(chooseSceneEq[0]);
	  });
	  this.props.selectEq(chooseSceneEqUl);
	  this.shutOff();
  }
  shutOff(){
    $(".bottom_equip,.link_bottom").css("display","none");
  }
  componentDidMount(){
	  if(GetCookie("id")){
		  if(!socketObj){
			  window.getToten(this);
		  }else{
			  sceneEq=[];
			  if(wYzyEq.length==0){
				  this.getListen();
				  window.getSdkEqMsg();
			  }else{
				  this.setState({"data":wYzyEq});
			  }
		  }
	  }else{
		  $("#no_login_shadow").css("display","block");
	  }
  }
  getSend(){
  }
//监听云智易数据上报
  getListen(){
	  var that=this;
	  var eqUl=[];
	  socketObj.on('data', function(data) {
      	if (data.type === 'datapoint') {
          	var ableData=data.data[0].value;
          	var type=ableData.substring(0,2);
          	switch(type){
          	case "01":
          			var shortAddress=ableData.substring(4,8);
		      		var Endpoint=ableData.substring(8,10);
		      		var DeviceId=ableData.substring(14,18);
		      		var statu=ableData.substring(18,20);
		      		var nameLength=parseInt(ableData.substring(20,22),16);
		      		var name=ableData.substring(22,nameLength*2+22);
		      		var online=ableData.substring(nameLength*2+22,nameLength*2+24);
		      		var m=window.prePro(name);
		      		var czName=decodeURI(m);
		      		var IEEE=ableData.substring(nameLength*2+24,nameLength*2+40);
		      		var SNLength=parseInt(ableData.substring(nameLength*2+40,nameLength*2+42),16);
		      		var eqSN=ableData.substring(nameLength*2+42,(nameLength+SNLength)*2+42);
		      		var ZoneType=ableData.substring((nameLength+SNLength)*2+42,(nameLength+SNLength)*2+46);
		      		var des="";
		      		if(statu==0){
		      			des="关";
		      		}else{
		      			des="开";
		      		}
		      		var eqLi=[{
		      				"shortAddress":shortAddress,
		      				"DeviceId":DeviceId.substring(2,4)+DeviceId.substring(0,2),
		      				"name":czName,
		      				"statu":statu,
		      				"online":online,
		      				"Endpoint":Endpoint,
		      				"IEEE":IEEE,
		      				"ZoneType":ZoneType.substring(2,4)+ZoneType.substring(0,2),
		      				"toUrl":"",
		      				"all":ableData,
		      				"des":des,
		      				"click":0,
		      				"eqSN":eqSN,
		      				"trans":false,
		      				"onSrc":"../../../src/resource/images/index/air_pre.png",
		      				"offSrc":"../../../src/resource/images/index/air_nor.png"
		      		}];
		      		eqUl.map(function(item,index){
		      			if(item.Endpoint==Endpoint && item.IEEE==IEEE){
		      				item.shortAddress=shortAddress;
		      				item.DeviceId=DeviceId.substring(2,4)+DeviceId.substring(0,2);
		      				item.name=czName;
		      				item.statu=statu;
		      				item.online=online;
		      				item.all=ableData;
		      				item.ZoneType=ZoneType.substring(2,4)+ZoneType.substring(0,2);
		      				eqLi=null;
		      			}
		      		});
		      		if(eqLi==null || DeviceId.substring(2,4)+DeviceId.substring(0,2)=="0000"){
		      		}else{
		      			eqUl=eqUl.concat(eqLi);
		      		}
		      		eqUl=window.addToUrl(eqUl);
		      		that.setState({"data":eqUl});
		      		wYzyEq=eqUl;
		      		break;
          	default:
          		break;
          	}
          }
      });
  }
  render(){
	var Cthis=this;
	var num=0;
    return (
      <div className="bottom_equip">
        <div className="fixed_bg" onClick={this.shutOff.bind(this)}></div>
        <div className="be_wrapper">
          <ul className="eq_ul">
          	{
          		this.state.data.map(function(item,index){
          			switch(item.DeviceId){
          				case "0002":
          				case "0009":
          				case "0051":
          				case "0100":
          				case "0101":
          				case "0200":
          				case "0102":
          				case "0110":
          				case "0220":
          				case "0210":
          				case "0202":
          					return (
                      				<li className="be_li" onClick={Cthis.checkThis.bind(Cthis,index)}>
                      	              <img className="eq_icon" src={item.offSrc} />
                      	              <span className="eq_name">{item.name}</span>
                      	              <img className="be_add" src="../../../src/resource/images/scene/be_add.png" />
                      	              <img className="be_cancel" src="../../../src/resource/images/scene/be_cancel.png" />
                      	              <div className="dis_show">
                      	                <span className="eq_action">打开</span>
                      	              </div>
                      	              <span className="eq_index" style={{"display":"none"}}>{index}</span>
                      	            </li>
                      			)
          					break;
      					default :
      						break;
          			}
          		})
          	}
          </ul>
          <p className="be_submit" onClick={this.beSubmit.bind(this)}>
            完成操作
          </p>
        </div>
      </div>
    );
  }
}
export default BottomEquip
