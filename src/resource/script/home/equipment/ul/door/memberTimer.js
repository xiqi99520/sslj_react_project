var my$;
require("./../../../../../style/timer.css");
var MobileSelect=require('./../../../../plugs/mobileSelect.min.js');
require('./../../../../plugs/mobileSelect.css');
let startX,startY,endX,endY;
let selectDom;
class MemberTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:""
    };
  }
  componentDidMount(){
    var selectTimer=["0","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20",
  "21","22","23"];
    var option=["0","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20",
  "21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40",
"41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"];
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
            selectDom.html(data[0]+":"+data[1]);
        }
    });
  }
  startTime(event){
    var event = event || window.event;
    selectDom=$(event.target).closest(".set_time").find(".during_time");
    $("#show_time").click();
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
    var num=$(".ta_on").length;
    var week=["周日","周一","周二","周三","周四","周五","周六"];
    for(var i=0;i<num;i++){
      days=days+week[$(".ta_on").eq(i).parent().index()]+" ";
    }
    if(days==""){
      days="单次";
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
    $(".ta_days_msg").html(days);
  }
  submit(){
    let select=taSelect.getValue();
    let hour=select[0];
    let minute=select[1];
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
    return (
      <div>
	    <p className="head_nav">
			<img className="url_back" src="../../../src/resource/images/url_back.png" />
			开锁消息提醒
		</p> 
		<div className="remind_timer">
          <span className="ta_action_word">开锁消息提醒</span>
          <span className="eq_state eq_on" onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}>
            <em className="bottom_state" onClick={this.stateClick.bind(this)}></em>
            <em className="on_pointer"></em>
          </span>
        </div>
        <div id="show_time" className="dis_show">
        </div>
        <div id="show_select">
        </div>
        <div className="during">
          <p className="during_title">
            提醒时间段：
          </p>
          <div className="during_main">
            <div className="set_time during_left" onClick={this.startTime.bind(this)}>
              <p className="during_time">
                15:33
              </p>
              <p className="during_tip">
                开始时间
              </p>
            </div>
            <div className="set_time during_right" onClick={this.startTime.bind(this)}>
              <p className="during_time">
                15:33
              </p>
              <p className="during_tip">
                结束时间
              </p>
            </div>
          </div>
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
export default MemberTimer
