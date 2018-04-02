var my$;
require("./../../style/index.css");
import {SetCookie,GetCookie} from "./../cookie.js"
import {Base,Yzy} from './../connect.js';
import Header from './../component/headFoot/header.js';
import Footer from './../component/headFoot/footer.js';
var getTrans=true;
class HomeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		msg:[],
    		"YzyEqUl":[],
    		"shortAddress":"",
    		"Endpoint":"",
    		"transEq":[],
    		"transShortAddress":"",
    		"transEndpoint":""
    };
  }
  componentDidMount(){
	  getTrans=true;
	  if(GetCookie("id")){
		  if(!socketObj){
			  window.getToten(this);
		  }else{
			  this.getListen();
			  window.getSdkEqMsg();
		  }
	  }else{
		  $("#no_login_shadow").css("display","block");
	  }
  }
  getTransponderEq(ieee,shortAddress,Endpoint){
	  var that=this;
	  $.ajax({
	       type:"post",
	       url: Base+"/infrareddevice/getDeviceList.do",
	       dataType:"json",
	       data:{
				  userId:GetCookie("houseId"),
				  ieee:ieee
			},
	       success:function(data){
	    	   if(data.isSuccess=="0"){
	    		   that.setState({"transEq":data.data});
	    		   that.setState({"transShortAddress":shortAddress});
	    		   that.setState({"transEndpoint":Endpoint});
	    	   }else{
	    		   alert(data.msg);
	    	   }
	       },
	       error:function(data){
	          alert("服务器返回数据错误");
	       }
	  });
  }
  //发送获取获取云智易网关下面飞比的设备列表
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
		      		that.setState({
		      			"YzyEqUl":eqUl
		      		});
		      		wYzyEq=eqUl;
		      		break;
          	default:
          		break;
          	}
          }
      });
  }
  defaultClick(DeviceId,shortAddress,Endpoint,statu,event){
	  if(DeviceId=="000A"){
		  this.doorClick(DeviceId,shortAddress,Endpoint);
	  }else{
		  if(statu=="00"){
			  var opValue="1600"+GetCookie("SN")+"FE820D02"+shortAddress+"FFFFFFFFFFFF"+Endpoint+"FFFF01";
		  }else{
			  var opValue="1600"+GetCookie("SN")+"FE820D02"+shortAddress+"FFFFFFFFFFFF"+Endpoint+"FFFF00";
		  }
		  window.changeSdkMsg(opValue);
	  }
  }
  doorClick(DeviceId,shortAddress,Endpoint,statu,event){
	  $("#door_box").css("display","block");
	  $("#door_input").focus();
	  this.setState({shortAddress:shortAddress});
	  this.setState({Endpoint:Endpoint});
  }
  doorDisShow(){
	  $("#door_box").css("display","none");
  }
  doorSure(){
	var doorValue=$("#door_input").val();
	if(doorValue.length!=6){
	  alert("密码错误");
	  return false;
	}
	var password=doorValue.split("");
	var key = [70,69,73,66,73,71];//加密密钥
	var npass="";
	for (var i = 0; i < 6; i ++)
	{
		npass =npass+(key[i] ^ password[i]).toString(16).toUpperCase();
	}
	var opValue="1D00"+GetCookie("SN")+"FE821402"+this.state.shortAddress+"000000000000"+this.state.Endpoint+"00000106"+npass;
	window.changeSdkMsg(opValue);
	this.doorDisShow();
  }
  showDefault(index,event){
	  $(".index_right .ir_show").css("display","none").eq(index).css("display","block");
	  $(".il_ul li").removeClass("on").eq(index).addClass("on");
  }
  toAddHost(){
	  window.location.href="#/addEquipment/host/0";
  }
  render() {
	  var that=this;
	  var transSrc="../../../src/resource/images/index/infrared_nor.png";
	  var transLink="";
    return (
      <div className="index_part">
        <Header />
        <div className="index_main">
			<ul className="il_ul">
				<li className="on" onClick={this.showDefault.bind(this,0)}>
					<img className="on_other" src="../../../src/resource/images/index/used_nol.png" />
					<img className="on_this" src="../../../src/resource/images/index/used_pre.png" />
					<span className="il_line"></span>
				</li>
				<li onClick={this.showDefault.bind(this,1)}>
	    			<img className="on_other" src="../../../src/resource/images/index/living_room_nor.png" />
					<img className="on_this" src="../../../src/resource/images/index/living_room_pre.png" />
				</li>
				<li>
	    			<img className="on_other" src="../../../src/resource/images/index/bedroom_nol.png" />
					<img className="on_this" src="../../../src/resource/images/index/bedroom_pre.png" />
				</li>
				<li>
					<img className="on_other" src="../../../src/resource/images/index/study_nol.png" />
					<img className="on_this" src="../../../src/resource/images/index/study_pre.png" />
				</li>
				<li>
					<a href="#/myCenter/room">
						<span className="il_line_top"></span>
						<img className="on_other" src="../../../src/resource/images/index/room_nol.png" />
	    				<img className="on_this" src="../../../src/resource/images/index/room_pre.png" />
					</a>
				</li>
			</ul>
			<div className="index_right">
				<div id="no_host" className="index_no_login" onClick={this.toAddHost.bind(this)} style={{"display":"none"}}>
					<img className="login_add" src="../../../src/resource/images/index/add_black.png" />
					点击添加主机
				</div>
				<div className="ir_show">
					<ul className="is_ul">
						{
							this.state.YzyEqUl.map(function(item,index){
								if(item.trans==true && getTrans==true){
									getTrans=false;
									that.getTransponderEq(item.IEEE,item.shortAddress,item.Endpoint);
								}
								return (
										<li>
											<a className="is_detail_a" href={item.toUrl}>
				    							<img className="is_detail" src="../../../src/resource/images/index/more.png" />
				    						</a>
											<div className={item.des=="开" ? "is_wrapper on":"is_wrapper"} onClick={item.click==0?"":that.defaultClick.bind(that,item.DeviceId,item.shortAddress,item.Endpoint,item.statu)}>
					    						
					    						<p className="is_pic">
					    							<img className="on_other" src={item.offSrc} />
					    							<img className="on_this" src={item.onSrc} />
					    						</p>
					    						<p className="is_name">
					    							{item.name}
					    						</p>
					    						<p className="is_statu">
					    							{item.des}
					    						</p>
											</div>
										</li>
								)
							})
						}
						{
							this.state.transEq.map(function(item,index){
								if(item.deviceType=="2"){
									transSrc="../../../src/resource/images/index/television_nor.png";
									transLink="#/equipment/TV/"+item.id+"/"+item.deviceName+"/"+that.state.transShortAddress+"/"+that.state.transEndpoint+"/"+item.deviceType;
								}else if(item.deviceType=="3"){
									transLink="#/equipment/TV/"+item.id+"/"+item.deviceName+"/"+that.state.transShortAddress+"/"+that.state.transEndpoint+"/"+item.deviceType;
									transSrc="../../../src/resource/images/index/box_nor.png";
								}else{
									transLink="#/equipment/defineTrans/"+item.id+"/"+item.deviceName+"/"+that.state.transShortAddress+"/"+that.state.transEndpoint+"/"+item.deviceType;
									transSrc="../../../src/resource/images/index/infrared_nor.png";
								}
								return (
										<li>
											<a className="is_detail_a" href={transLink}>
				    							<img className="is_detail" src="../../../src/resource/images/index/more.png" />
				    						</a>
											<div className="is_wrapper">
					    						<p className="is_pic">
					    							<img className="on_other" src={transSrc} />
					    							<img className="on_this" src={transSrc} />
					    						</p>
					    						<p className="is_name">
					    							{item.deviceName}
					    						</p>
					    						<p className="is_statu">
					    							&nbsp;
					    						</p>
											</div>
										</li>
								)
							})
						}
					</ul>
				</div>
				<div className="ir_show" style={{display:"none"}}>
					<ul id="iae_ul" className="iae_ul">
						<li className="ifirst_li">
							<p className="ih_name">
								默认房间
							</p>
							<p className="ih_num">
								{this.state.YzyEqUl.length}个设备
							</p>
						</li>
						{
							this.state.YzyEqUl.map(function(item,index){
								return (
										<li>
					    					<a className="is_detail_a" href={item.toUrl}>
												<img className="is_detail" src="../../../src/resource/images/index/more.png" />
											</a>
											<div className={item.des=="开" ? "iList_wrapper on":"iList_wrapper"} onClick={item.click==0?"":that.defaultClick.bind(that,item.DeviceId,item.shortAddress,item.Endpoint,item.statu)}>
												<img className="index_eq_pic on_other" src={item.offSrc} />
												<img className="index_eq_pic on_this" src={item.onSrc} />
												<div className="ie_float">
													<p className="index_eq">
														{item.name}
													</p>
													<p className="index_eq_state">
														{item.des}
													</p>
												</div>
											</div>
										</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		</div>
        <Footer onState="1" />
        <div id="door_box" className="door_box">
        	<div className="box_bg" onClick={this.doorDisShow.bind(this)}></div>
        	<div className="sure_main door_main">
	    		<p className="sure_title">请输入密码</p>
	    		<p className="index_door">
	    			<input id="door_input" type="text" />
	    		</p>
	    		<p className="sure_button">
	    			<span id="sureCancel" className="sureCancel" onClick={this.doorDisShow.bind(this)}>取消</span>
	    			<span id="sureOk" className="sureOk" onClick={this.doorSure.bind(this)}>确定</span>
	    		</p>
	    	</div>
        </div>
      </div>
    );
  }
}
export default HomeIndex
