var my$;
require("./../../../style/timer.css");
import {Base} from './../../connect.js';
import {SetCookie,GetCookie} from "./../../cookie.js";
var MobileSelect=require('./../../plugs/mobileSelect.min.js');
require('./../../plugs/mobileSelect.css');
let startX,startY,endX,endY;
let selectDom;
var weekMsg="11111111";
var oldWeek="";
var startLi=[];
var endLi=[];
var weekLi=[];
var addIf=[];
var editIf=[];
window.linkHour="";
window.linkMinute="";
window.linkWeek="";
class LinkageTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	"linkageId":[],
    	"linkageName":[],
		"startT":[],
	  	"endT":[],
	  	"weekT":[]
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
        trigger: '#start',
        title: '',
        position:[hh,mm],
        wheels: twoSelect,
        callback:function(indexArr, data){
            $("#start").html(data[0]+":"+data[1]);
        }
    });
  }
  getTimer(dataUl){
	  var trueUl=[];
	  for(var i=0;i<dataUl.length;i++){
		   if(!dataUl[i].deviceId){
			   if(dataUl[i].linkageType==1){
				   if(dataUl[i].condition==3){
					   startLi=dataUl[i];
				   }else if(dataUl[i].condition==4){
					   endLi=dataUl[i];
				   }
			   }else if(dataUl[i].linkageType==2){
				   weekLi=dataUl[i];
			   }
		   }else{
		   }
	  }
	  if(startLi.length==0){
		  return false;
	  }
	  var startV=startLi.value;
	  var endV=endLi.value;
	  oldWeek=weekLi.value;
	  var shh=Math.floor(startV/(60*60));
	  var smm=Math.floor((startV-shh*60*60)/60);
	  var ehh=Math.floor(endV/(60*60));
	  var emm=Math.floor((endV-ehh*60*60)/60);
	  var eNum=oldWeek.toString();
	  var arrNum=eNum.split("");
	  (Array(2).join(0)+shh).slice(-2);
	  $("#start").html((Array(2).join(0)+shh).slice(-2)+":"+(Array(2).join(0)+smm).slice(-2));
	  $("#end").html((Array(2).join(0)+ehh).slice(-2)+":"+(Array(2).join(0)+emm).slice(-2));
	  if(arrNum[0]=="0"){
		  $(".ta_ul li span").removeClass("ta_on");
	  }
	  if(arrNum[1]=="0"){
		  $(".ta_ul li").eq(0).find("span").removeClass("ta_on");
	  }
	  if(arrNum[2]=="0"){
		  $(".ta_ul li").eq(6).find("span").removeClass("ta_on");
	  }
	  if(arrNum[3]=="0"){
		  $(".ta_ul li").eq(5).find("span").removeClass("ta_on");
	  }
	  if(arrNum[4]=="0"){
		  $(".ta_ul li").eq(4).find("span").removeClass("ta_on");
	  }
	  if(arrNum[5]=="0"){
		  $(".ta_ul li").eq(3).find("span").removeClass("ta_on");
	  }
	  if(arrNum[6]=="0"){
		  $(".ta_ul li").eq(2).find("span").removeClass("ta_on");
	  }
	  if(arrNum[7]=="0"){
		  $(".ta_ul li").eq(1).find("span").removeClass("ta_on");
	  }
	  this.getDays();
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
	    $(".ta_days_msg").html(days);
  }
  submit(){
	  var that=this;
	  var newStart=$("#start").html().split(":");
	  linkHour=newStart[0];
	  linkMinute=newStart[1];
	  linkWeek=weekMsg;
	  this.goBack();
  }
  goBack(){
	  this.props.history.goBack();
  }
  render(){
    return (
      <div>
        <p className="timer_title">
        	<img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
          联动定时设置
          <span className="ta_save" onClick={this.submit.bind(this)}>
            保存
          </span>
        </p>
        <div id="show_time" className="dis_show">
        </div>
        <div id="show_select">
        </div>
        <div className="during">
          <p className="during_title">
            提醒时间段：
          </p>
          <div className="during_main">
	        <p id="start" className="newLink_time">
	          00:00
	        </p>
          </div>
        </div>
        <div className="ta_days">
          <p className="ta_repeat">
            重复：<span className="ta_days_msg">每天</span>
          </p>
          <ul className="ta_ul">
            <li>
              <span className="ta_on" onClick={this.chooseDay.bind(this)}>日</span>
            </li>
            <li>
              <span className="ta_on" onClick={this.chooseDay.bind(this)}>一</span>
            </li>
            <li>
              <span className="ta_on" onClick={this.chooseDay.bind(this)}>二</span>
            </li>
            <li>
              <span className="ta_on" onClick={this.chooseDay.bind(this)}>三</span>
            </li>
            <li>
              <span className="ta_on" onClick={this.chooseDay.bind(this)}>四</span>
            </li>
            <li>
              <span className="ta_on" onClick={this.chooseDay.bind(this)}>五</span>
            </li>
            <li>
              <span className="ta_on" onClick={this.chooseDay.bind(this)}>六</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default LinkageTimer
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
