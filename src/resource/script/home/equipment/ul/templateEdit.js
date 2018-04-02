var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js";
require('./../../../plugs/mobileSelect.css');
var MobileSelect=require('./../../../plugs/mobileSelect.min.js');
let leSelect;
var selectDom;
var selectNum;
var addNew=true;
var isCurtains=false;
var deviceId,cIndex,sceneId,deviceType,order="",value1=0,value2=0,value3=0,value4=0;
var sceneIdUl=[],teScene=[],sceneEq=[],teSelect=[],teOption=["打开","关闭","自动翻转"],teOption1=["打开","关闭","停"];
class TemplateEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:""};
  }
  componentDidMount(){
	  var that=this;
    var selectTimer=['打开'];
    // var twoSelect=[{data:selectTimer},{data:option}];
    leSelect = new MobileSelect({
        trigger: '#trigger_select',
        title: '',
        position:[2],
        wheels: [{data:selectTimer}],
        callback:function(indexArr,data){
        	if(selectNum==1){
        		sceneId=sceneIdUl[indexArr];
        		$("#scene").html(data[0]);
        	}
        	if(selectNum==2&&indexArr[0]==cIndex){
        		isCurtains=true;
        		if($("#option").html()=="自动翻转"){
        			$("#option").html("停");
        		}
        	}else{
        		isCurtains=false;
        		if($("#option").html()=="停"){
        			$("#option").html("自动翻转");
        		}
        	}
        	if(selectNum==2){
        		deviceType=sceneEq[indexArr];
        		deviceId=sceneEq[indexArr].deviceId;
        		value1=sceneEq[indexArr].value1;
        		value2=sceneEq[indexArr].value2;
        		value3=sceneEq[indexArr].value3;
        		value4=sceneEq[indexArr].value4;
        	}
            selectDom.html(data[0]);
        }
    });
    $.ajax({
	       type:"post",
	       url: Base+"/smart/sdk.do",
	       dataType:"json",
	       data: {
	    	   uri:"/api/getDeviceListNoScene",
	    	   userName:GetCookie("znjjUsername"),
	    	   password:GetCookie("znjjPassword")
	       },
	       success:function(dataa){
	         var data=dataa.dList;
	         var i=0;
	         data.map(function(item,index){
	        	 if(item.deviceType==34||item.deviceType==1||item.deviceType==2||item.deviceType==6||item.deviceType==32){
	        		 if(item.deviceType==34){
	        			 cIndex=i;
       				}
       				var addMsg={
       					  deviceType:item.deviceType,
       					  deviceName:item.deviceName,
       					  deviceId:item.deviceId,
       					  order:item.order,
       					  value1:item.value1,
       					  value2:item.value2,
       					  value3:item.value3,
       					  value4:item.value4
       			  };
       				teSelect.push(item.deviceName);
           			sceneEq.push(addMsg);
           			i++;
	        	 }
	         })
	       },
	       error:function(data){
	          alert("服务器返回数据错误");
	       }
	  });
    $.ajax({
	       type:"post",
	       url: Base+"/smart/sdk.do",
	       dataType:"json",
	       data: {"uri":"/api/getSceneList","userName":GetCookie("znjjUsername"),"password":GetCookie("znjjPassword")},
	       success:function(data){
	    	   data.sceneList.map(function(item,index){
	    		   teScene.push(item.sceneName);
	    		   sceneIdUl.push(item.sceneId);
	    	   })
	       }, 
	       error:function(data){
	          alert("服务器返回数据错误");
	       }
	  });
    if(this.props.match.params.index=="empty"){
    	addNew=true;
    }else{
    	addNew=false;
  	  $.ajax({
  	       type:"post",
  	       url: Base+"/smart/sdk.do",
  	       dataType:"json",
  	       async:false,
  	       data: {
  	    	   "uri":"/api/getRemoteBindList",
  	    	   "userName":GetCookie("znjjUsername"),
  	    	   "password":GetCookie("znjjPassword"),
  	    	   deviceId:that.props.match.params.deviceId
  	    	},
  	       success:function(data){
  	    	   if(data.status==0){
  	    		   var ul=data.remoteBindList[that.props.match.params.index];
  	    		   if(ul.order=="scene control"){
  	    			 $(".check_li").removeClass("checked").eq(0).addClass("checked");
  	    			 $("#scene").html(ul.sceneName);
  	    			 sceneId=ul.sceneId;
  	    		   }else{
  	    			 deviceId=ul.deviceId;
  	    			 order=ul.order;
  	    			 value1=ul.value1;
  	    			 value2=ul.value2;
  	    			 value3=ul.value3;
  	    			 value4=ul.value4;
  	    			 $("#equip").html(ul.deviceName);
  	    			if(order=="open"){
  	    				$("#option").html("打开");
  	    				isCurtains=true;
  	    			 }else if(order=="on"){
  	    				isCurtains=false;
  	    				$("#option").html("打开");
  	    			 }else if(order=="close"){
  	    				$("#option").html("关闭");
  	    				isCurtains=true;
  	    			 }else if(order=="off"){
  	    				isCurtains=false;
  	    				$("#option").html("关闭");
  	    			 }else if(order=="stop"){
  	    				$("#option").html("停");
  	    				isCurtains=true;
  	    			 }else if(order=="toggle"){
  	    				$("#option").html("自动转换");
  	    				isCurtains=false;
  	    			 }
  	    		   }
  	    	   }else{
  	    		   alert(data.msg);
  	    	   }
  	       },
  	       error:function(data){
  	  	          alert("连接服务器出错，请刷新网络重试！");
  	  	   }
  	   });
    }
  }
  modelType(){
	  if($(".checked").parent().index()!=1){
		  alert("当前不是添加情景模式！");
		  return false;
	  }
	  selectNum=1;
	  selectDom=$("#scene");
	  leSelect.updateWheel(0,teScene);
	  $("#trigger_select").click();
  }
  eqSelect(){
	  if($(".checked").parent().index()==1){
		  alert("当前不是添加设备模式！");
		  return false;
	  }
	  selectNum=2;
	  selectDom=$("#equip");
	  leSelect.updateWheel(0,teSelect);
	  leSelect.locatePostion(0,1);
	  $("#trigger_select").click();
  }
  eqOption(){
	  if($(".checked").parent().index()==1){
		  alert("当前不是添加设备模式！");
		  return false;
	  }
	  selectNum=3;
	  selectDom=$("#option");
	  if(isCurtains==true){
		  leSelect.updateWheel(0,teOption1);
		  leSelect.locatePostion(0,1);
	  }else{
		  leSelect.updateWheel(0,teOption);
		  leSelect.locatePostion(0,1);
	  }
	  $("#trigger_select").click();
  }
  tempSubmit(){
	  if($(".checked").parent().index()==1){
		  if(!sceneId){
			  alert("请选择绑定场景！");
			  return false;
		  }
		  deviceId="";
		  order = "scene control";
		  value1 = sceneId;
		  this.ajaxPart();
	  }else{
		  var orderWord=$("#option").html();
		  if(orderWord=="打开"){
			  if(deviceType==32){
				  order="open";
			  }else{
				  order="on";
			  }
		  }
		  if(orderWord=="关闭"){
			  if(deviceType==32){
				  order="close";
			  }else{
				  order="off";
			  }
		  }
		  if(orderWord=="自动翻转"){
			  order="toggle";
		  }
		  if(orderWord=="停"){
			  order="stop";
		  }
		  if(!deviceId){
			  alert("请选择要绑定的设备！");
			  return false;
		  }
		  if(!order){
			  alert("请选择要绑定的动作！");
			  return false;
		  }
		  this.ajaxPart();
	  }
  }
  ajaxPart(){
	  var that=this;
	  if(addNew==true){
		  var str={
					  itemId:0,
					  deviceId:this.props.match.params.deviceId,
					  keyNo:Number(this.props.match.params.index)+1,
					  keyAction:0,
					  bindedDeviceId:deviceId,
					  order:order,
					  value1:value1,
					  value2:value1,
					  value3:value1,
					  value4:value1
				  };
		  var strArr=JSON.stringify(str);
		  $.ajax({
		       type:"post",
		       url: Base+"/smart/sdk/cmdRequest.do",
		       dataType:"json",
		       data: {
		    	   uri:"/api/cmdRequest",
		    	   userName:GetCookie("znjjUsername"),
		    	   password:GetCookie("znjjPassword"),
		    	   data:"{\"cmd\":28,\"uid\":\""+GetCookie("uid")+"\",\"remoteBindList\":"+ strArr +"}",
		    	   queryCmd:"40"
		       },
		       success:function(data){
		    	   if(data.status==0){
		    		   alert("操作成功，该操作可能需要等待一段时间才会体现在页面中。");
		    		   that.goBack();
		    	   }else{
		    		   alert(data.msg);
		    	   }
		       },
		       error:function(data){
		          alert("服务器返回数据错误");
		       }
		  });
	  }else{
		  var str={
					  remoteBindId:this.props.match.params.remoteBindId,
					  bindedDeviceId:deviceId,
					  order:order,
					  value1:value1,
					  value2:value1,
					  value3:value1,
					  value4:value1
				  };
		  var strArr=JSON.stringify(str);
		  $.ajax({
		       type:"post",
		       url: Base+"/smart/sdk/cmdRequest.do",
		       dataType:"json",
		       data: {
		    	   uri:"/api/cmdRequest",
		    	   userName:GetCookie("znjjUsername"),
		    	   password:GetCookie("znjjPassword"),
		    	   data:"{\"cmd\":29,\"uid\":\""+GetCookie("uid")+"\",\"remoteBindList\":"+ strArr +"}",
		    	   queryCmd:"40"
		       },
		       success:function(data){
		    	   if(data.status==0){
		    		   alert("操作成功，该操作可能需要等待一段时间才会体现在页面中。");
		    		   that.goBack();
		    	   }else{
		    		   alert(data.msg);
		    	   }
		       },
		       error:function(data){
		          alert("服务器返回数据错误");
		       }
		  });
	  }
	  
  }
  goBack(){
	  this.props.history.goBack();
  }
  checkLi(event){
	  var event=event || window.event;
	  var thisDom=$(event.target).closest(".check_li")
	  if(thisDom.hasClass("checked")){
	  }else{
		  $(".check_li").removeClass("checked");
		  thisDom.addClass("checked");
	  }
  }
  render() {
    return (
      <div className="">
        <p className="head_nav_none">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      	按键设置
	    </p>
	    <ul className="te_ul">
	    	<li className="check_li" onClick={this.checkLi.bind(this)}>
	    		<span className="te_radio">
	    			<em></em>
	    		</span>
	    		<span className="te_add_scene">添加场景模式</span>
	    	</li>
	    	<li onClick={this.modelType.bind(this)}>
	    		<span id="scene" className="te_model">未选择</span>
	    		<img className="te_arrow" src="../../../src/resource/images/equipment/arrow.png" />
	    	</li>
	    </ul>
	    <ul className="te_ul">
	    	<li className="check_li checked" onClick={this.checkLi.bind(this)}>
		    	<span className="te_radio">
					<em></em>
				</span>
	    		<span className="te_add_equipment">添加设备模式</span>
	    	</li>
	    	<li onClick={this.eqSelect.bind(this)}>
	    		<span className="te_model">设备</span>
	    		<span id="equip" className="te_right_eq">未选择</span>
	    	</li>
	    	<li onClick={this.eqOption.bind(this)}>
	    		<span className="te_model">动作</span>
	    		<span id="option" className="te_right_eq">未选择</span>
	    	</li>
	    </ul>
	    <p className="te_submit" onClick={this.tempSubmit.bind(this)}>
	    	保存
	    </p>
    	<div id="trigger_select"  className="dis_show"></div>
        <div id="show_select"></div>
      </div>
    );
  }
}
export default TemplateEdit
