var my$;
require("./../../../../../style/timer.css");
var MobileSelect=require('./../../../../plugs/mobileSelect.min.js');
require('./../../../../plugs/mobileSelect.css');
let startX,startY,endX,endY;
class DoorTimer extends React.Component {
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
  render(){
    return (
      <div>
	    <p className="head_nav">
			<img className="url_back" src="../../../src/resource/images/url_back.png" />
			定时反锁提醒
		</p>
		<div className="remind_timer">
          <span className="ta_action_word">定时反锁提醒</span>
          <span className="eq_state eq_on" onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}>
            <em className="bottom_state" onClick={this.stateClick.bind(this)}></em>
            <em className="on_pointer"></em>
          </span>
        </div>
        <div id="show_time">
        </div>
        <div id="show_select" className="dr_time">
        </div>
        <div className="dt_days">
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
        <div className="lock_no">
	        <span className="ta_action_word">已反锁时不提醒</span>
	        <span className="eq_state eq_on" onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}>
	          <em className="bottom_state" onClick={this.stateClick.bind(this)}></em>
	          <em className="on_pointer"></em>
	        </span>
	    </div>
	    <div className="dt_tips">
	    	<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在设定的时间如果门锁已处于反锁状态不发送提醒消息,停用后，在设定时间均会发送提醒报告当前反锁状态。</p>
	    </div>
      </div>
    )
  }
}
export default DoorTimer
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
