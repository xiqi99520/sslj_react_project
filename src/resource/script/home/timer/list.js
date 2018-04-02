var my$;
require("./../../../style/timer.css");
import {SetCookie,GetCookie} from "./../../cookie.js";
import {Base} from './../../connect.js';
let startX,startY,endX,endY;
class TimerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	data:[]
    };
  }
  componentWillMount(){
	  var Cthis=this;
	  $.ajax({
 	       type:"post",
 	       url: Base+"/smart/sdk.do",
 	       dataType:"json",
 	       async:false,
 	       data: {
 	    	   "uri":"/api/getTimingList",
 	    	   "userName": GetCookie("znjjUsername"),
 	    	   "password":GetCookie("znjjPassword"),
 	    	   "deviceId":this.props.match.params.num
 	    	   },
 	       success:function(data){
 	    	   debugger;
 	    	  window.timerMsg=data.timingList;
 	         Cthis.setState({data: data.timingList});
 	       },
 	       error:function(data){
 	          alert("服务器返回数据错误");
 	       }
 	  });
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
  goBack(){
	  this.props.history.goBack();
  }
  render(){
	  var that=this;
	  var opt,times,state;
    return (
      <div>
        <p className="timer_title">
        	<img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
          定时
          <a href={"App.html#/timerAdd/"+this.props.match.params.num}>
            <img className="timer_pic" src="../../../src/resource/images/timer_add.png" />
          </a>
        </p>
        <ul className="timer_ul">
        {
        	that.state.data.map(function(item,index){
        		if(item.order=="on"){
        			opt="打开";
        		}else{
        			opt="关闭";
        		}
        		if(item.week=="00000000"){
        			times="单次";
    		    }
        		if(item.week=="10000011"){
        			times="休息日";
    		    }
        		if(item.week=="11111100"){
        			times="工作日";
    		    }
        		if(item.week=="11111111"){
        			times="每天";
    		    }
        		if(item.value1==""||item.value1==1){
        			state="每天";
    		    }
        		return (
        				<li>
	        	            <a href="App.html#/timerEdit/1">
	        	              <div className="timer_left">
	        	                <p className="timer_time">
	        	                  {item.hour}:{item.minute}
	        	                </p>
	        	                <p className="timer_msg">
	        	                  <span className="timer_opt">{opt}</span>,&nbsp;
	        	                  <span className="timer_times">{times}</span>
	        	                </p>
	        	              </div>
	        	            </a>
	        	            <span className="eq_state eq_on" onTouchStart={that.onTouchStart.bind(that)} onTouchEnd={that.onTouchEnd.bind(that)}>
	        	              <em className="bottom_state" onClick={that.stateClick.bind(that)}></em>
	        	              <em className="on_pointer"></em>
	        	            </span>
	        	         </li>
        		)
        	})
        }
        </ul>
      </div>
    )
  }
}
export default TimerList
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
