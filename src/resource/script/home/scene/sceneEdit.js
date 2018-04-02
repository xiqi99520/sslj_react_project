var my$;
require("./../../../style/scene.css");
import {Base} from './../../connect.js';
import {SetCookie,GetCookie} from "./../../cookie.js";
import BottomEquip from "./../../component/bottomEquip/bottomEquip.js"
var MobileSelect=require('./../../plugs/mobileSelect.min.js');
require('./../../plugs/mobileSelect.css');
let startX,startY,endX,endY;
let selectDom;
var thisLi;
var alldone=false;
var sceneEditLi=[];
var addUl,editUl,deleteUl,existUl;
class SceneEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	    data:['dList':[]],
	    timer:"",
	    oldUl:[],
	    newUl:[],
	    wScene:[]
    };
  }
  componentDidMount(){
	  if(!socketObj){
		  window.getToten(this);
	  }else{
		  this.getListen();
		  this.getSend();
	  }
	  var that=this;
	  var name=this.props.match.params.name;
	  $("#se_input").val(name);
	  if(name=="离家模式"||name=="回家模式"||name=="睡眠模式"||name=="起床模式"){
		  $('#se_input').attr("disabled",true);
	  }
    var selectTimer=["立即","1秒","2秒","3秒","4秒","5秒","6秒","7秒","8秒","9秒","10秒","11秒","12秒","13秒","14秒","15秒","16秒","17秒","18秒","19秒","20秒",
  "21秒","22秒","23秒","24秒","25秒","26秒","27秒","28秒","29秒","30秒","31秒","32秒","33秒","34秒","35秒","36秒","37秒","38秒","39秒","40秒",
"41秒","42秒","43秒","44秒","45秒","46秒","47秒","48秒","49秒","50秒","51秒","52秒","53秒","54秒","55秒","56秒","57秒","58秒","59秒","60秒"]
    var option=["打开","关闭"];
    var twoSelect=[{data:selectTimer},{data:option}];
    var oneSelect = new MobileSelect({
        trigger: '#selectPlug1',
        title: '',
        wheels: [{data:selectTimer}],
        callback:function(indexArr, data){
            selectDom.html(data[0]);
        }
    });
    var twoSelect = new MobileSelect({
        trigger: '#selectPlug2',
        title: '',
        wheels: twoSelect,
        callback:function(indexArr, data){
            var index=selectDom.index();
            var arrData=parseInt(data[0]);
            var dTime=arrData;
            var dOrder=data[1];
            if(isNaN(dTime)){
            	that.state.newUl[index].delay=0;
            }else{
            	that.state.newUl[index].delay=dTime;
            }
           if(dOrder=="打开"){
        	   dOrder="01";
           }
           if(dOrder=="关闭"){
        	   dOrder="00";
           }
            that.state.newUl[index].value1=dOrder;
            that.setState({newUl: that.state.newUl});
        }
    });
  }
  successTip(){
	$("#loading").css("display","none");
	window.location.href="#/scene/0";
  }
  getListen(){
	  var that=this;
	  wScene=[];
	  socketObj.on('data', function(data) {
		  if (data.type === 'datapoint') {
          	var ableData=data.data[0].value;
          	var type=ableData.substring(0,2);
          	switch(type){
          	case "21":
          	case "0D":
          		that.successTip();
          		break;
          	case "20":
          		var eqUl=[];
          		var id=ableData.substring(4,8);
          		var count=ableData.substring(8,10).toString();
          		var countData=ableData.substring(10);
          		var dataUl=[];
          		for(var i=0;i<count;i++){
          			dataUl[i]=countData.substring(i*22,i*22+22);
          		}
          		dataUl.map(function(item,index){
          			var eqLi=[{
          				'name':"",
              			'shortAddress':item.substring(0,4),
              			'Endpoint':item.substring(4,6),
              			'DeviceId':item.substring(6,10),
              			'value1':item.substring(10,12),
              			'value2':item.substring(12,14),
              			'value3':item.substring(14,16),
              			'value4':item.substring(16,18),
              			'value5':item.substring(18,20),
              			'delay':parseInt(item.substring(20,22),16),
              			'offSrc':""
    	      		}];
          			eqUl=eqUl.concat(eqLi);
          		});
          		for(var i=0;i<wYzyEq.length;i++){
	          		  for(var j=0;j<eqUl.length;j++){
	          			  if(wYzyEq[i].shortAddress==eqUl[j].shortAddress && wYzyEq[i].Endpoint==eqUl[j].Endpoint){
	          				eqUl[j].name=wYzyEq[i].name;
	          				eqUl[j].offSrc=wYzyEq[i].offSrc;
	          			  }
	          		  }
	          	  }
	      		that.setState({
	      			"newUl":eqUl,
	      			"oldUl":$.extend(true,[],eqUl)
	      		});
	      		break;
          	case "0e":
          	case "0E":
          		var id=ableData.substring(4,8);
          		var nameLength=parseInt(ableData.substring(8,10),16);
          		var name=ableData.substring(10,nameLength*2+10);
          		var m=window.prePro(name);
	      		var czName=decodeURI(m);
          		var eqLi=[{
          			'id':id,
          			'name':czName
	      		}];
          		wScene.map(function(item,index){
	      			if(item.id==id){
	      				item.name=czName;
	      				eqLi=null;
	      			}
	      		});
	      		if(eqLi==null){
	      		}else{
	      			wScene=wScene.concat(eqLi);
	      		}
	      		wScene=wScene;
	      		break;
          	default:
          		break;
          	}
          }
      });
  }
  getSend(){
	  if(wScene.length==0 || !wScene){
		  this.getAllScene();
	  }
	  var byte=window.stringToByte(this.props.match.params.name);
	  var result="";
	  for(var i=0;i<byte.length;i++){
		  result=(result+byte[i].toString(16)).toUpperCase();
	  }
	  var length=result.length/2;
	  var length16=length.toString(16);
	  var lengthValue=length16.length<2?"0"+length16:length16;
	  var allLength1=(12+length).toString(16);
	  var allLengthValue1=allLength1.length<2?"0"+allLength1:allLength1;
	  var allLength2=(3+length).toString(16);
	  var allLengthValue2=allLength2.length<2?"0"+allLength2:allLength2;
	  var opValue=allLengthValue1+"00"+GetCookie("SN")+"FE8A"+allLengthValue2+this.props.match.params.id+lengthValue+result;
	  window.changeSdkMsg(opValue);
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
      $(event.target).closest(".se_li").removeClass("se_delete_on");
    }
    if(startX-endX>10){
      $(event.target).closest(".se_li").addClass("se_delete_on");
    }else{

    }
  }
  addEquip(){
	  var that=this;
	  $(".eq_ul .eq_name").each(function(){
		  for(var i=0;i<that.state.newUl.length;i++){
			  if(that.state.newUl[i].deviceName==$(this).html()){
				  $(this).parent().addClass("be_on");
			  }
		  }
	  });
    $(".se_option").css("display","none");
    $(".bottom_equip").css("display","block");
  }
  deleteScene(){
	  var name=this.props.match.params.name;
	  if(name=="回家场景" || name=="起床场景" || name=="睡眠场景" || name=="离家场景"){
		  alert("系统场景不可删除");
		  return false;
	  }
	  $("#sureMsg").html("确定删除本场景？");
	  $("#Sure").css("display","block");
	  var that=this;
	  $("#sureOk").bind("click",function(){
		  $("#sureOk").unbind();
		  var byte=window.stringToByte(name);
		  var result="";
		  for(var i=0;i<byte.length;i++){
			  result=(result+byte[i].toString(16)).toUpperCase();
		  }
		  var length=result.length/2;
		  var length16=length.toString(16);
		  var lengthValue=length16.length<2?"0"+length16:length16;
		  var allLength1=(22+length).toString(16);
		  var allLengthValue1=allLength1.length<2?"0"+allLength1:allLength1;
		  var allLength2=(13+length).toString(16);
		  var allLengthValue2=allLength2.length<2?"0"+allLength2:allLength2;
		  var opValue=allLengthValue1+"00"+GetCookie("SN")+"FE8B"+allLengthValue2+"02"+"FFFF"+"FFFFFFFFFFFF"+"FF"+"FFFF"+lengthValue+result;
		  window.changeSdkMsg(opValue);
		  $("#loading").css("display","block");
	  });
  }
  deleteEquip(index,event){
	  var newUl=this.state.newUl;
	  newUl.splice(index,1);
	  $(".se_li").removeClass("se_delete_on");
	  this.setState({newUl:this.state.newUl});
  }
  shutOption(){
    $(".se_option").css("display","none");
  }
  setTwo(event){
    var event = event || window.event;
	  selectDom=$(event.target).closest(".se_li");
	  if(selectDom.hasClass("se_delete_on")){
	  }else{
		  $("#selectPlug2").click();
	  }
  }
  setOne(event){
    var event = event || window.event;
    $("#selectPlug1").click();
    selectDom=$(event.target).closest(".se_delay");
  }
  goBack(){
	  this.props.history.goBack();
  }
  getAllUl(){
	  var oldUl=this.state.oldUl;
	  var newUl=this.state.newUl;
	  addUl=[];
	  editUl=[];
	  deleteUl=[];
	  existUl=[];
	  var falg = 0;
	  //根据原有数据和最后数据，算出共有数据（共有数据有修改，就是最终修改数据），原数据跟共有数据对比，获得删除数据，最后数据跟共有数据对比，获得添加数据。
	  for(var i=0;i<oldUl.length;i++){
		  for(var j=0;j<newUl.length;j++){
			  if(oldUl[i].shortAddress==newUl[j].shortAddress && oldUl[i].Endpoint==newUl[j].Endpoint){
				  existUl.push(newUl[j]);
				  if(oldUl[i].value1!=newUl[j].value1 || oldUl[i].delay!=newUl[j].delay){
					  editUl.push(newUl[j]);
				  }
				  falg = 1;
			  }
		  }
		  if(falg == 0){
			  var arr=oldUl[i];
			  deleteUl.push(arr);
		  }else{
			  falg = 0;
		  }
	  }
	  falg = 0;
	  for(var i=0;i<newUl.length;i++){
		  for(var j=0;j<existUl.length;j++){
			  if(newUl[i].shortAddress==existUl[j].shortAddress && newUl[i].Endpoint==existUl[j].Endpoint){
				  falg = 1;
			  }
		  }
		  if(falg == 0){
			  addUl.push(newUl[i]);
		  }else{
			  falg = 0;
		  }
	  }
	  
  }
  saveSubmit(){
	  this.getAllUl();
	  var name=$("#se_input").val();
	  if(name=="灯光全开模式"||name=="灯光全关模式"||name=="离家模式"||name=="回家模式"||name=="睡眠模式"||name=="起床模式"){
		  alert("情景名称已存在");
		  return false;
	  }
	  if(name==this.props.match.params.name){
		  if(addUl.length==0 && editUl.length==0 && deleteUl.length==0){
			  this.successTip();
		  }
	  }else{
		  for(var i=0;i<wScene.length;i++){
			  if(wScene[i].name==name){
				  alert("情景名称已存在");
				  return false;
			  }
		  }
	  }
	  var that=this;
	  if(addUl.length!=0){
		  var byte=window.stringToByte(name);
		  var result="";
		  for(var i=0;i<byte.length;i++){
			  result=(result+byte[i].toString(16)).toUpperCase();
		  }
		  var length=result.length/2;
		  var length16=length.toString(16);
		  var lengthValue=length16.length<2?"0"+length16:length16;
		  var allLength1=(30+length).toString(16);
		  var allLengthValue1=allLength1.length<2?"0"+allLength1:allLength1;
		  var allLength2=(22+length).toString(16);
		  var allLengthValue2=allLength2.length<2?"0"+allLength2:allLength2;
		  addUl.map(function(item,index){
			  var DeviceId=item.DeviceId.substring(2,4)+item.DeviceId.substring(0,2);
			  var opValue=allLength1+"00"+GetCookie("SN")+"FE91"+allLength2+"02"+item.shortAddress+"FFFFFFFFFFFF"+item.Endpoint+"FFFF"			  
			  +DeviceId+item.value1+item.value2+item.value3+item.value4+lengthValue+result+item.value5+item.delay;
			  window.changeSdkMsg(opValue);
		  });
		  $("#loading").css("display","block");
	  }
	  if(editUl.length!=0){
		  var byte=window.stringToByte(name);
		  var result="";
		  for(var i=0;i<byte.length;i++){
			  result=(result+byte[i].toString(16)).toUpperCase();
		  }
		  var length=result.length/2;
		  var length16=length.toString(16);
		  var lengthValue=length16.length<2?"0"+length16:length16;
		  var allLength1=(30+length).toString(16);
		  var allLengthValue1=allLength1.length<2?"0"+allLength1:allLength1;
		  var allLength2=(22+length).toString(16);
		  var allLengthValue2=allLength2.length<2?"0"+allLength2:allLength2;
		  editUl.map(function(item,index){
			  var DeviceId=item.DeviceId.substring(2,4)+item.DeviceId.substring(0,2);
			  var opValue=allLength1+"00"+GetCookie("SN")+"FE91"+allLength2+"02"+item.shortAddress+"FFFFFFFFFFFF"+item.Endpoint+"FFFF"
			  +DeviceId+item.value1+item.value2+item.value3+item.value4+lengthValue+result+item.value5+item.delay;
			  window.changeSdkMsg(opValue);
		  });
		  $("#loading").css("display","block");
	  }
	  if(deleteUl.length!=0){
		  var byte=window.stringToByte(name);
		  var result="";
		  for(var i=0;i<byte.length;i++){
			  result=(result+byte[i].toString(16)).toUpperCase();
		  }
		  var length=result.length/2;
		  var length16=length.toString(16);
		  var lengthValue=length16.length<2?"0"+length16:length16;
		  var allLength1=(22+length).toString(16);
		  var allLengthValue1=allLength1.length<2?"0"+allLength1:allLength1;
		  var allLength2=(13+length).toString(16);
		  var allLengthValue2=allLength2.length<2?"0"+allLength2:allLength2;
		  deleteUl.map(function(item,index){
			  var opValue=allLengthValue1+"00"+GetCookie("SN")+"FE8B"+allLengthValue2+"02"+item.shortAddress+"FFFFFFFFFFFF"+item.Endpoint+"FFFF"+lengthValue+result;
			  window.changeSdkMsg(opValue);
		  });
		  $("#loading").css("display","block");
	  }
	  if($("#se_input").val()!=this.props.match.params.name){
		  this.changeName();
	  }else if(addUl.length==0 && editUl.length==0 && deleteUl.length==0){
		  window.location.href="#/scene/0";
	  }
  }
  getAllScene(){
	  if(wScene.length==0 || !wScene){
		  var opValue="0800"+GetCookie("SN")+"FE90";
		  window.changeSdkMsg(opValue);
	  }
  }
  changeName(){
	  var oldName=this.props.match.params.name;
	  if(oldName=="回家场景" || oldName=="起床场景" || oldName=="睡眠场景" || oldName=="离家场景"){
		  alert("系统场景不可修改名称");
		  return false;
	  }
	  var name=$("#se_input").val();
	  if(name==this.props.match.params.name){
		  return false;
	  }
	  for(var i=0;i<wScene.length;i++){
		  if(wScene[i].name==name){
			  return false;
		  }
	  }
	  var byte=window.stringToByte(name);
	  var result="";
	  for(var i=0;i<byte.length;i++){
		  result=(result+byte[i].toString(16)).toUpperCase();
	  }
	  var length=result.length/2;
	  var length16=length.toString(16);
	  var lengthValue=length16.length<2?"0"+length16:length16;
	  var allLength1=(12+length).toString(16);
	  var allLengthValue1=allLength1.length<2?"0"+allLength1:allLength1;
	  var allLength2=(3+length).toString(16);
	  var allLengthValue2=allLength2.length<2?"0"+allLength2:allLength2;
	  var opValue=allLengthValue1+"00"+GetCookie("SN")+"FE8C"+allLengthValue2+this.props.match.params.id+lengthValue+result;
	  window.changeSdkMsg(opValue);
  }
  selectEq(selectUl){
	  var newUl=this.state.newUl;
	  for(var i=0;i<selectUl.length;i++){
		  selectUl[i].value1="00";
		  selectUl[i].value2="00";
		  selectUl[i].value3="00";
		  selectUl[i].value4="00";
		  selectUl[i].value5="00";
		  selectUl[i].delay="0";
		  for(var j=0;j<newUl.length;j++){
			  if(selectUl[i].shortAddress==newUl[j].shortAddress && selectUl[i].Endpoint==newUl[j].Endpoint){
				  selectUl[i]=newUl[j];
			  }
		  }
	  }
	  this.setState({newUl: selectUl});
  }
  render(){
	var that = this;
	var eqOrder;
    return (
      <div className="scene_edit">
	    <p className="head_nav">
	    	<img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	    	设备组合
	    	<span className="head_sure" onClick={this.saveSubmit.bind(this)} >保存</span>
	    </p>
        <div className="se_head">
          <span className="se_name">场景名称：</span>
          <input id="se_input" className="se_input" />
        </div>
        <ul className="se_ul">
	        {
	        	that.state.newUl.map(function(item,index){
	        		if(item.value1=="00"){
	        			eqOrder="关闭";
	        		}else{
	        			eqOrder="打开";
	        		}
		              return (
		            		<li className="se_li" onTouchStart={that.onTouchStart.bind(that)} onTouchEnd={that.onTouchEnd.bind(that)}>
			            		<p onClick={that.setTwo.bind(that)}>
			            		  <img className="se_icon" src={item.offSrc} />
			                      <span className="se_eq">{item.name}</span>
			                      <span className="se_delay">{item.delay}秒</span>
			                      <span className="se_action">{eqOrder}</span>
			            		</p>
			            		<span className="se-delete" onClick={that.deleteEquip.bind(that,index)}>删除</span>
		                    </li>
		              )
		        })
	        }
        </ul>
        <p className="se_remove" onClick={this.deleteScene.bind(this)}>
	       删除场景
	    </p>
        <p className="se_add_eq" onClick={this.addEquip.bind(this)}>
	       添加设备
	    </p>
        <BottomEquip sceneId={this.props.match.params.id} selectEq={this.selectEq.bind(this)} />
        <div id="selectPlug1" className="dis_show"></div>
        <div id="selectPlug2" className="dis_show"></div>
        <div id="show_select">
        </div>
      </div>
    )
  }
}
export default SceneEdit
// ReactDOM.render(<Scene />, document.getElementById('app'));
