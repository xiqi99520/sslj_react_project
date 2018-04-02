var my$;
require("./../../../style/timer.css");
import {SetCookie,GetCookie} from "./../../cookie.js";
import {Base} from './../../connect.js';
var MobileSelect=require('./../../plugs/mobileSelect.min.js');
require('./../../plugs/mobileSelect.css');
let startX,startY,endX,endY;
var weekMsg=new Number("00000000");
class TimerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data:""
    };
  }
  componentDidMount(){
    var selectTimer=["0 时","1 时","2 时","3 时","4 时","5 时","6 时","7 时","8 时","9 时","10 时","11 时","12 时","13 时","14 时",
  "15 时","16 时","17 时","18 时","19 时","20 时","21 时","22 时","23 时"]
    var option=["0 分","1 分","2 分","3 分","4 分","5 分","6 分","7 分","8 分","9 分","10 分","11 分","12 分","13 分","14 分","15 分","16 分","17 分","18 分","19 分","20 分",
  "21 分","22 分","23 分","24 分","25 分","26 分","27 分","28 分","29 分","30 分","31 分","32 分","33 分","34 分","35 分","36 分","37 分","38 分","39 分","40 分",
"41 分","42 分","43 分","44 分","45 分","46 分","47 分","48 分","49 分","50 分","51 分","52 分","53 分","54 分","55 分","56 分","57 分","58 分","59 分"];
    var twoSelect=[{data:selectTimer},{data:option}];
    var date = new Date();
    var hh=date.getHours();
    var mm=date.getMinutes();
    window.taSelect = new MobileSelect({
        trigger: '#show_time',
        title: '',
        position:[hh,mm],
        wheels: twoSelect,
        callback:function(indexArr, data){
            selectDom.html(data[0]);
        }
    });
    $(".mobileSelect").addClass("ta_time  mobileSelect-show");
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
  routerWillLeave(nextLocation){
      console.log(nextLocation.location.pathname)    // path/to/abc
  }
  chooseDay(event){
    var event=event ||window.event;
    var oDom=event.target;
    if($(oDom).hasClass("ta_on")){
      $(oDom).removeClass("ta_on");
    }else{
      $(oDom).addClass("ta_on");
    }
    this.getDays();
  }
  getDays(){
	  var days="";
	  	weekMsg="1";
	    var num=$(".ta_on").length;
	    var week=["周日","周一","周二","周三","周四","周五","周六"];
	    for(var i=0;i<num;i++){
	    	var index=$(".ta_on").eq(i).parent().index();
	      days=days+week[index]+" ";
	      $(".ta_days_msg").html(days);
	    }
	    if($(".ta_ul li").eq(0).find("span").hasClass("ta_on")){
  		weekMsg+="1";
  	}else{
  		weekMsg+="0";
  	}
	    for(var i=6;i>=1;i--){
	    	if($(".ta_ul li").eq(i).find("span").hasClass("ta_on")){
	    		weekMsg+="1";
	    	}else{
	    		weekMsg+="0";
	    	}
	    }
	    if(days==""){
	      days="单次";
	      weekMsg=Number("00000000");
	    }
	    if(days=="周日 周六 "){
	      days="休息日";
	    }
	    if(days=="周一 周二 周三 周四 周五 "){
	      days="工作日";
	    }
	    if(days=="周日 周一 周二 周三 周四 周五 周六 "){
	      days="每天";
	    }
  }
  goBack(){
	  this.props.history.goBack();
  }
  submit(){
    let select=taSelect.getValue();
    let hour=parseInt(select[0]);
    let minute=parseInt(select[1]);
    var that=this;
    var num=this.props.match.params.num;
    var order;
    if($(".eq_state").hasClass("eq_on")){
    	order="on";
    }else{
    	order="off";
    }
    if(!GetCookie("uid")){
    	alert("没有检测到主机信息，请刷新页面或者绑定主机！");
    }else{
    	var DataJson={
    	 		   cmd:55,
    			   uid:GetCookie("uid"),
    			   deviceId:num,
    			   order:order,
    			   value1:1,
    			   value2:0,
    			   value3:0,
    			   value4:0,
    			   hour:hour,
    			   minute:minute,
    			   second:0,
    			   week:weekMsg,
    			   timingType:0,
    			   startDate:"",
    			   endDate:""
    		   };
    	    var DataStr=JSON.stringify(DataJson);
    	    $.ajax({
    		       type:"post",
    		       url: Base+"/smart/sdk/cmdRequest.do",
    		       dataType:"json",
    		       data: {
    		    	   uri:"/api/cmdRequest",
    		    	   userName:GetCookie("znjjUsername"),
    		    	   password:GetCookie("znjjPassword"),
    		    	   data:DataStr,
    		    	   queryCmd:"40"
    		       },
    		       success:function(data){
    		    	   if(data.status==0){
    		    		   alert("操作成功，该操作可能需要等待一段时间才会体现在页面中。");
    		    		   that.props.history.goBack();
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
  render(){
    return (
      <div>
        <p className="timer_title">
        	<img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
          添加定时
          <span className="ta_save" onClick={this.submit.bind(this)}>
            保存
          </span>
        </p>
        <div id="show_time">
        </div>
        <div id="show_select">
        </div>
        <div className="ta_action">
          <span className="ta_action_word">动作</span>
          <span className="eq_state eq_on" onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}>
            <em className="bottom_state" onClick={this.stateClick.bind(this)}></em>
            <em className="on_pointer"></em>
          </span>
        </div>
        <div className="ta_days">
          <p className="ta_repeat">
            重复：<span className="ta_days_msg">单次</span>
          </p>
          <ul className="ta_ul">
            <li>
              <span onClick={this.chooseDay.bind(this)}>日</span>
            </li>
            <li>
              <span onClick={this.chooseDay.bind(this)}>一</span>
            </li>
            <li>
              <span onClick={this.chooseDay.bind(this)}>二</span>
            </li>
            <li>
              <span onClick={this.chooseDay.bind(this)}>三</span>
            </li>
            <li>
              <span onClick={this.chooseDay.bind(this)}>四</span>
            </li>
            <li>
              <span onClick={this.chooseDay.bind(this)}>五</span>
            </li>
            <li>
              <span onClick={this.chooseDay.bind(this)}>六</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default TimerAdd
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
