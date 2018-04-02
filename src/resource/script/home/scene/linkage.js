var my$;
let startX,startY,endX,endY;
import {Base} from './../../connect.js';
import {SetCookie,GetCookie} from "./../../cookie.js";
class Linkage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data:[]
    };
  }
  componentDidMount(){//再页面渲染前被调用
	  if(!socketObj){
		  window.getToten(this);
	  }else{
		  this.getListen();
		  this.getSend();
	  }
  }
  getListen(){
	  var that=this;
	  var eqUl=[];
	  socketObj.on('data', function(data) {
		  if (data.type === 'datapoint') {
          	var ableData=data.data[0].value;
          	var type=ableData.substring(0,2);
          	switch(type){
          	case "25":
          		var taskType=ableData.substring(4,6);
          		var id=ableData.substring(6,10);
          		var nameLength=parseInt(ableData.substring(10,12),16);
          		var name=ableData.substring(12,nameLength*2+12);
          		var m=window.prePro(name);
	      		var czName=decodeURI(m);
          		var eqLi=[{
          			'id':id,
          			'name':czName,
          			'on':"",
          			'data':""
	      		}];
	      		eqUl.map(function(item,index){
	      			if(item.id==id){
	      				item.name=czName;
	      				eqLi=null;
	      			}
	      		});
	      		if(eqLi==null){
	      		}else{
	      			that.getLinkDetail(nameLength,name);
	      			eqUl=eqUl.concat(eqLi);
	      		}
	      		that.setState({
	      			"data":eqUl
	      		});
	      		break;
          	case "24":
          		var on=ableData.substring(86,88);
          		var id=ableData.slice(-4);
          		var data=ableData;
	      		eqUl.map(function(item,index){
	      			if(item.id==id){
	      				item.on=on;
	      				item.data=data;
	      			}
	      		});
	      		that.setState({
	      			"data":eqUl
	      		});
	      		break;
          	default:
          		break;
          	}
          }
      });
  }
  getSend(){
	  var opValue="0800"+GetCookie("SN")+"FEA6";
	  window.changeSdkMsg(opValue);
  }
  getLinkDetail(length,name){
	  var allLength=(length+10).toString(16).toUpperCase();
	  var allLength1=(length+1).toString(16).toUpperCase();
	  var allLength2=length.toString(16).toUpperCase();
	  if(allLength.length<2){
		  allLength="0"+allLength;
	  }
	  if(allLength1.length<2){
		  allLength1="0"+allLength1;
	  }
	  if(allLength2.length<2){
		  allLength2="0"+allLength2;
	  }
	  var opValue=allLength+"00"+GetCookie("SN")+"FEA5"+allLength1+allLength2+name;
	  window.changeSdkMsg(opValue);
  }
  onTouchStart(id,event){
    var event = event || window.event;
    startX=event.touches[0].clientX;
    startY=event.touches[0].clientY;
  }
  onTouchEnd(id,event){
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
  stateClick(linkageId,event){
    var event = event || window.event;
    var dom=$(event.target).parent();
    var isArm;
    if(dom.hasClass("eq_on")){
      dom.removeClass("eq_on").addClass("eq_off");
      isArm=1;
    }else{
      dom.removeClass("eq_off").addClass("eq_on");
      isArm=0;
    }
  }
  offStatu(){
	  
  }
  render(){
	var that=this;
    return (
      <div className="linkage_main" style={{display:"none"}}>
        <ul className="linkage_ul">
        {
        	this.state.data.map(function(item,index){
        		return (
        				<li>
	        	            <a href={"#/scene/linkageEdit/"+item.name+"/"+item.data}>
	        	              <span className="scene_pic">{item.name}</span>
	        	            </a>
	        	            <span className={item.on=="00"?"eq_state eq_off":"eq_state eq_on"} onTouchStart={that.onTouchStart.bind(that,item.id)} onTouchEnd={that.onTouchEnd.bind(that,item.id)}>
	        	              <em className="bottom_state" onClick={that.stateClick.bind(that,item.id)}></em>
	        	              <em className="on_pointer"></em>
	        	            </span>
	        	        </li>
        		)
        	})
        }
        </ul>
        <p className="linkage_add">
        	<a href={"#/scene/linkageEdit/1/add"}>
        		<img src="../../../src/resource/images/equipment/linkage_add.png" />
        	</a>
        </p>
      </div>
    )
  }
}
export default Linkage
// ReactDOM.render(<Scene />, document.getElementById('app'));
