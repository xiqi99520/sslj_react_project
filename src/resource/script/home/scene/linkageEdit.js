var my$;
import {Base} from './../../connect.js';
import {SetCookie,GetCookie} from "./../../cookie.js";
import BottomEquipIf from "./../../component/bottomEquip/bottomEquipIf.js"
import BottomEquipThen from "./../../component/bottomEquip/bottomEquipThen.js"
var MobileSelect=require('./../../plugs/mobileSelect.min.js');
require('./../../plugs/mobileSelect.css');
let selectDom;
let leSelect;
let ifThen;
let data1=new Array();
var ifIndex;
var editIf=[];
var addIf=[];
var deleteIf=[];
var existIf=[];
var editThen=[];
var addThen=[];
var deleteThen=[];
var existThen=[];
var temArr=[];
var humArr=[];
var oldIf=[];
var oldThenUl=[];
for(var i=-100;i<=100;i++){
	temArr.push(i+"℃");
}
for(var i=0;i<=100;i++){
	humArr.push(i+"%");
}
class LinkageEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	data:["linkageName":""],
	    oldIf:[],
	    oldThen:[],
	    linkageConditionList:[],
	    linkageOutputList:[]
    };
  }
  componentDidMount(){
	if(this.props.match.params.data=="add"){
		if(linkHour){
			this.getTime();
		}
	}else{
		var name=this.props.match.params.name;
		var data=this.props.match.params.data;
		var sceneId=data.substring(46,50);
		$("#name").val(name);
		var ifLi=[{
			name:name,
			shortAddress:data.substring(6,10),
			DeviceId:data.substring(10,14),
			Endpoint:data.substring(14,16),
			ifValue:Number(data.substring(18,20))
		}];
		var thenLi=[{
			id:sceneId,
			name:""
		}]
		wYzyEq.map(function(item,index){
			if(item.shortAddress==data.substring(6,10) && item.Endpoint==data.substring(14,16)){
				ifLi[0].offSrc=item.offSrc;
				ifLi[0].ZoneType=item.ZoneType;
			}
		});
		wScene.map(function(item,index){
			if(item.id==sceneId){
				thenLi[0].name=item.name;
			}
		})
		if(linkHour){
			this.getTime();
		}else{
			this.setState({linkageConditionList:ifLi});
		}
		this.setState({linkageOutputList:thenLi});
	}
	var that=this;
    var selectTimer=['打开'];
    // var twoSelect=[{data:selectTimer},{data:option}];
    var selectTimer=["立即","1秒","2秒","3秒","4秒","5秒","6秒","7秒","8秒","9秒","10秒","11秒","12秒","13秒","14秒","15秒","16秒","17秒","18秒","19秒","20秒",
                     "21秒","22秒","23秒","24秒","25秒","26秒","27秒","28秒","29秒","30秒","31秒","32秒","33秒","34秒","35秒","36秒","37秒","38秒","39秒","40秒",
                   "41秒","42秒","43秒","44秒","45秒","46秒","47秒","48秒","49秒","50秒","51秒","52秒","53秒","54秒","55秒","56秒","57秒","58秒","59秒","60秒"]
   var option=["打开","关闭","自动翻转"];
   var twoSelects=[{data:selectTimer},{data:option}];
    var chooseSelect = new MobileSelect({
        trigger: '#selectPlug1',
        title: '',
        wheels: [{data:["按时间触发","按传感类设备触发"]}],
        callback:function(indexArr, data){
            if(indexArr[0]==0){
            	window.location.href="#/scene/linkageTimer/"+that.props.match.params.id;
            }else{
            	$(".bottom_equip").css("display","block");
          	  	$("#if").css("display","block");
            }
        }
    });
    leSelect = new MobileSelect({
        trigger: '#selectPlug2',
        title: '',
        wheels: [{data:["按时间触发","按传感类设备触发"]}],
        callback:function(indexArr, data){
        	if(indexArr[0]==0){
        		that.state.linkageConditionList[0].ifValue=0;
        	}else{
        		that.state.linkageConditionList[0].ifValue=1;
        	}
            that.setState({linkageConditionList: that.state.linkageConditionList});
        }
    });
  }
  getTime(){
	  linkHour;
	  linkMinute;
	  linkWeek=linkWeek.substring(1,7);
	  this.getWeek(linkWeek);
	  debugger;
  }
  getWeek(num){
	  
  }
  ifEquip(){
	  $("#selectPlug1").click();
  }
  ifEquipShow(){
	  $(".bottom_equip").css("display","block");
	  $("#if").css("display","block");
  }
  thenEquip(){
	  var that=this;
	  $(".eq_ul .eq_name").each(function(){
		  for(var i=0;i<that.state.linkageOutputList.length;i++){
			  if(that.state.linkageOutputList[i].deviceName==$(this).html()){
				  $(this).parent().addClass("be_on");
			  }
		  }
	  });
    $(".bottom_equip").css("display","block");
    $("#then").css("display","block");
    ifThen=$("#then_ul");
  }
  showIf(ifUl){
	  ifUl[0].ifValue=0;
	  this.setState({linkageConditionList: ifUl});
  }
  showThen(ifUl){
	  this.setState({linkageOutputList: ifUl});
  }
  ifSelect(event){
	    ifIndex=$(event.target).closest(".le_li").index();
	    var event = event || window.event;
	    var ifWord=[];
	    var item=this.state.linkageConditionList[ifIndex];
	    switch(item.ZoneType){
		  case "0015":
			  ifWord=["开锁","关锁"];
			  break;
		  case "0028":
		  case "8000":
			  ifWord=["恢复正常","烟雾浓度超标"];
			  break;
		  case "002B":
		  case "8001":
			  ifWord=["恢复正常","可燃气体浓度超标"];
			  break;
		  case "002D":
			  ifWord=["恢复正常","有振动"];
			  break;
		  case "002A":
			  ifWord=["恢复正常","有水浸入"];
			  break;
		  case "002C":
			  ifWord=["恢复正常","有人按下紧急按钮"];
			  break;
		  }
	    if(item.deviceType==22){
	    	leSelect.updateWheel(0,ifWord);
	    	leSelect.locatePostion(0,110);
	    }else{
	    	leSelect.locatePostion(0,1);
	    	leSelect.updateWheel(0,ifWord);
	    }
	    $("#selectPlug2").click();

	  }
  linkSubmit(){
    if($("#name").val()==""){
    	alert("联动名不能为空！");
    	return false;
    }
    var condition=this.state.linkageConditionList[0];
    var outPut=this.state.linkageOutputList[0];
    var value="";
    var byte=window.stringToByte($("#name").val());
	  var result="";
	  for(var i=0;i<byte.length;i++){
		  result=(result+byte[i].toString(16)).toUpperCase();
	  }
	  value="0"+condition.ifValue+"000000";
	  var length=result.length/2;
	  var length16=length.toString(16);
	  var lengthValue=length16.length<2?"0"+length16:length16;
	  var allLength1=(57+length).toString(16);
	  var allLengthValue1=allLength1.length<2?"0"+allLength1:allLength1;
	  var allLength2=(48+length).toString(16);
	  var allLengthValue2=allLength2.length<2?"0"+allLength2:allLength2;
	  var opValue=allLengthValue1+"00"+GetCookie("SN")+"FEA3"+allLengthValue2+"0203"+condition.shortAddress
	  +condition.DeviceId.substring(2,4)+condition.DeviceId.substring(0,2)+condition.Endpoint+"02"+value+"00000000000000000002"
	  +outPut.id+"0000000000000000000000000000000000010100000000"+lengthValue+result;
	  window.changeSdkMsg(opValue);
  }
  setTimer(){
	  if(this.props.match.params.index=="add"){
		  alert("请先完成联动设置，再设置时间");
	  }else{
		  window.location.href="#/scene/linkageTimer/"+this.props.match.params.index;
	  }
  }
  goBack(){
	  window.location.href="#/scene/1";
  }
  render(){
	var that = this;
	var eqOrder;
	var ifWord;
    return (
      <div>
        <p className="head_nav">
          <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
          	联动编辑
          <span className="head_sure" onClick={this.linkSubmit.bind(this)} >
            保存
          </span>
        </p>
        <p className="le_title">
          <span className="name_word">联动名称：</span>
          <input id="name" className="name_area" type="text" />
        </p>
        <div className="le_if">
          <p className="if_title">
            如果:
            <img className="if_img" onClick={this.ifEquip.bind(this)} src="../../../src/resource/images/scene/le_add.jpg" />
          </p>
          <ul id="if_ul" className="if_ul">
          {
        	  this.state.linkageConditionList.map(function(item,index){
        		  switch(item.ZoneType){
        		  case "0015":
        			  if(item.ifValue==0){
            			  ifWord="开锁";
            		  }else{
            			  ifWord="关锁";
            		  }
        			  break;
        		  case "0028":
  					case "8000":
        			  if(item.ifValue==0){
            			  ifWord="恢复正常";
            		  }else{
            			  ifWord="烟雾传感器";
            		  }
        			  break;
        		  case "002B":
        		  case "8001":
        			  if(item.ifValue==0){
            			  ifWord="恢复正常";
            		  }else{
            			  ifWord="可燃气体浓度超标";
            		  }
        			  break;
        		  case "002D":
        			  if(item.ifValue==0){
            			  ifWord="恢复正常";
            		  }else{
            			  ifWord="有振动";
            		  }
        			  break;
        		  case "002A":
        			  if(item.ifValue==0){
            			  ifWord="恢复正常";
            		  }else{
            			  ifWord="有水浸入";
            		  }
						break;
        		  case "002C":
						if(item.ifValue==0){
	            			  ifWord="恢复正常";
	            		  }else{
	            			  ifWord="有人按下紧急按钮";
	            		  }
						break;
        		  }
        		  return (
        				  <li className="le_li" onClick={that.ifSelect.bind(that)}>
	        	              <img className="le_icon" src={item.offSrc} />
	        	              <span className="le_eq">{item.name}</span>
	        	              <span className="le_to">{ifWord}</span>
	        	              <span className="thisType" style={{display:"none"}}></span>
	        	          </li>
        		  )
        	  })
          }
	          <li className={this.state.linkageConditionList.length==0?"":"dis_show"}>
	    		<p className="ul_tips">暂未联动设备</p>
	    	</li>
          </ul>
        </div>
        <div className="le_then">
          <p className="if_title">
            就:
            <img className="if_img" onClick={this.thenEquip.bind(this)} src="../../../src/resource/images/scene/le_add.jpg" />
          </p>
          <ul id="then_ul" className="if_ul">
          {
          		this.state.linkageOutputList.map(function(item,index){
          			return (
      					<li className="le_li">
          	              <img className="le_icon" src="../../../src/resource/images/home.png" />
          	              <span className="le_eq">启动场景：{item.name}</span>
          	            </li>
          			)
          		})
          	}
	          <li className={this.state.linkageOutputList.length==0?"":"dis_show"}>
		  		<p className="ul_tips">暂未联动设备</p>
		  	</li>
          </ul>
        </div>
        <p className="add_timer" onClick={this.setTimer.bind(this)}>
          添加定时
        </p>
        <div id="if" className="link_bottom">
        	<BottomEquipIf type="if" toShowIf={this.showIf.bind(this)} />
        </div>
        <div id="then" className="link_bottom">
        	<BottomEquipThen type="if" toShowThen={this.showThen.bind(this)} />
        </div>
        <div id="selectPlug1" className="dis_show"></div>
        <div id="selectPlug2" className="dis_show"></div>
        <div id="selectPlug3" className="dis_show"></div>
        <div id="show_select">
        </div>
      </div>
    )
  }
}
export default LinkageEdit
// ReactDOM.render(<Scene />, document.getElementById('app'));
