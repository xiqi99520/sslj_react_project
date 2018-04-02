require("./../../../style/addEq.css");
import {SetCookie,GetCookie} from "./../../cookie.js"
import {Base} from './../../connect.js';
var newEq=false;
class AddEquipment extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {data:"","YzyEqUl":[]};
	}
	goBack(){
		  this.props.history.goBack();
	}
	componentDidMount(){
		var that=this;
		newEq=false;
		if(GetCookie("id")){
			  if(!socketObj){
				  window.getToten(this);
			  }else{
				  this.getListen();
				  this.getSend();
			  }
		  }else{
			  $("#no_login_shadow").css("display","block");
		  }
		  $.ajax({
		       type:"post",
		       url: "../../../src/resource/script/home/addEquipment/eqMsg.js",
		       dataType:"json",
		       success:function(data){
		    	   that.setState({
		    		   data:data[that.props.match.params.index]
		    	   })
		       },
		       error:function(data){
		  	          alert("连接服务器出错，请刷新网络重试！");
		  	   }
		   });
	}
	//发送获取获取云智易网关下面飞比的设备列表
	  getSend(){
		  var opValue="0800"+GetCookie("SN")+"FE81";
		  window.changeSdkMsg(opValue);
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
	          	case "15":
	          		break;
	          	case "07":
	          		var shortAddress=ableData.substring(4,8);
	          		var Endpoint=ableData.substring(8,10);
	          		var statu=ableData.substring(10,12);
	          		that.state.YzyEqUl.map(function(item,index){
	          			if(shortAddress==item.shortAddress && Endpoint==item.Endpoint){
	          				item.statu=statu;
	          				if(item.statu=="00"){
	          					item.des="关";
	          				}else{
	          					item.des="开";
	          				}
	              		}
	          		});
	          		that.setState({
	      				YzyEqUl:that.state.YzyEqUl
	      			});
	          		break;
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
			      				"show":false,
			      				"newEq":newEq,
			      				"onSrc":"../../../src/resource/images/index/air_pre.png",
			      				"offSrc":"../../../src/resource/images/index/air_nor.png"
			      		}];
			      		switch(that.props.match.params.index){
			      		case "4":
			      			if(eqLi[0].DeviceId=="0100" || eqLi[0].DeviceId=="0101" || eqLi[0].DeviceId=="0200"){
			      				eqLi[0].show=true;
			      			}
			      			break;
			      		case "5":
			      			if(eqLi[0].DeviceId=="0051"){
			      				eqLi[0].show=true;
			      			}
			      			break;
			      		case "7":
			      			if(eqLi[0].DeviceId=="0002"){
			      				eqLi[0].show=true;
			      			}
			      			break;
			      		case "8":
			      			if(eqLi[0].DeviceId=="0000"){
			      				eqLi[0].show=true;
			      			}
			      			break;
			      		case "9":
			      			if(eqLi[0].DeviceId=="000A"){
			      				eqLi[0].show=true;
			      			}
			      			break;
			      		case "10":
			      			if(eqLi[0].DeviceId=="0302" || eqLi[0].DeviceId=="0303"){
			      				eqLi[0].show=true;
			      			}
			      			break;
			      		case "11":
			      			if(eqLi[0].DeviceId=="0402" && (eqLi[0].ZoneType=="002B" || eqLi[0].ZoneType=="8001")){
			      				eqLi[0].show=true;
			      			}
			      			break;
			      		case "12":
			      			if(eqLi[0].DeviceId=="0402" && eqLi[0].ZoneType=="000D" ){
			      				eqLi[0].show=true;
			      			}
			      			break;
			      		case "13":
			      			if(eqLi[0].DeviceId=="0402" && (eqLi[0].ZoneType=="0028" || eqLi[0].ZoneType=="8000")){
			      				eqLi[0].show=true;
			      			}
			      			break;
			      		case "14":
			      			if(eqLi[0].DeviceId=="0202"){
			      				eqLi[0].show=true;
			      			}
			      			break;
			      		case "15":
			      			if(eqLi[0].DeviceId=="0402" && eqLi[0].ZoneType=="0015"){
			      				eqLi[0].show=true;
			      			}
			      			break;
			      		case "16":
			      			if(eqLi[0].DeviceId=="0402" && eqLi[0].ZoneType=="002A"){
			      				eqLi[0].show=true;
			      			}
			      			break;
			      		case "17":
			      			if(eqLi[0].DeviceId=="0402" && eqLi[0].ZoneType=="002C"){
			      				eqLi[0].show=true;
			      			}
			      			break;
			      		case "18":
			      			if(eqLi[0].DeviceId=="0161" || eqLi[0].DeviceId=="0163" ){
			      				eqLi[0].show=true;
			      			}
			      			break;
		      			default :
		      				break;
			      		}
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
			      		if(eqLi==null){
			      		}else{
			      			eqUl=eqUl.concat(eqLi);
			      		}
			      		eqUl=window.addToUrl(eqUl);
			      		that.setState({
			      			"YzyEqUl":eqUl
			      		});
			      		SetCookie("eqLength",eqUl.length,1);
			      		break;
	          	default:
	          		break;
	          	}
	          }
	      });
	  }
	chooseSure(){
		if($(".aed_sure").hasClass("on")){
			$(".aed_sure").removeClass("on");
			$(".aed_submit").removeClass("aed_true");
		}else{
			$(".aed_sure").addClass("on");
			$(".aed_submit").addClass("aed_true");
		}
	}
	addEqNext(){
		if($(".aed_submit").hasClass("aed_true")){
			$("#add_box").css("display","block");
			newEq=true;
			var opValue="0800"+GetCookie("SN")+"FE9F";
			window.changeSdkMsg(opValue);
		}else{
			return false;
		}
	}
	disBox(){
		$("#add_box").css("display","none");
	}
  render(){
    return (
      <div>
	    <p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      添加{this.state.data.name}
	    </p>
	    <p className="aed_pic">
	      <img  src={this.state.data.src} />
	    </p>
	    <div className="aed_msg" dangerouslySetInnerHTML={{__html: this.state.data.tips}}>
	    </div>
	    <p className={this.state.data.reset==""?"aed_other dis_show":"aed_other"}>
	    	<a href={"#/addEquipment/reset/"+this.props.match.params.index}>
	    		添加设备遇到问题<em>&gt;</em>
	    	</a>
	    </p>
	    <p className="aed_sure" onClick={this.chooseSure.bind(this)}>
	    	<img className="aed_sure_icon on_other" src="../../../src/resource/images/scene/be_cancel.png" />
	    	<img className="aed_sure_icon on_this" src="../../../src/resource/images/scene/be_add.png" />
	    	已确认上述操作
	    </p>
	    <p className="aed_submit" onClick={this.addEqNext.bind(this)}>
	    	开始入网
	    </p>
	    <div id="add_box" style={{"display":"none"}}>
	    	<div className="box_bg" onClick={this.disBox.bind(this)}></div>
	    	<div className="add_eq_box">
	    		<p className="add_eq_title">
	    			已绑定的{this.state.data.name}列表
	    		</p>
	    		<ul className="add_eq_ul">
	    		{
					this.state.YzyEqUl.map(function(item,index){
						if(item.show==true){
							return (
									<li>
					    				<img className="add_eq_pic"  src={item.offSrc} />
					    				{item.name}
					    				<span className={item.newEq===true?"add_eq_new":"add_eq_new dis_show"}>新设备</span>
					    			</li>
							)
						}
					})
				}
	    		</ul>
	    		<p className="add_eq_loading">
	    			<img className="addEq_loading"  src="../../../src/resource/images/loading.gif" />
	    			正在添加设备...
	    		</p>
	    		<p className="end_add" onClick={this.disBox.bind(this)}>
	    			结束添加
	    		</p>
	    	</div>
	    </div>
      </div>
    );
  }
}
export default AddEquipment
