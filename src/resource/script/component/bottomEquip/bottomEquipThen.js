require("./bottomEquip.css");
import {Base} from './../../connect.js';
import {SetCookie,GetCookie} from "./../../cookie.js";
var eqUl=[];
var sceneUl=[];
var sceneId;
class BottomEquip extends React.Component {
 constructor(props) {
	    super(props);
	    this.state = {
		    data:[],
		    sceneList:[]
	    };
	  }
 checkThis(event){
    var event = event || window.event;
    var dom=$(event.target).closest(".be_li");
    if(dom.hasClass("be_on")){
    }else{
    	$("#then .be_li").removeClass("be_on");
      dom.addClass("be_on");
    }
  }
  beSubmit(){
	  var chooseeqUlUl=[];
	  var allUl=this.state.data;
	  $("#then .be_on").each(function(){
		 var index= $(this).index();
		 var chooseeqUl=allUl.slice(index,index+1);
		 chooseeqUlUl.push(chooseeqUl[0]);
	  });
	  this.props.toShowThen(chooseeqUlUl);
	  this.shutOff();
  }
  shutOff(){
    $(".bottom_equip,.link_bottom").css("display","none");
  }
  componentDidMount(){
	  if(!socketObj){
		  window.getToten(this);
	  }else{
		  if(wScene.length==0){
			  this.getListen();
			  this.getSend();
		  }else{
			  this.setState({
	      			"data":wScene
	      		});
		  }
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
	      		eqUl.map(function(item,index){
	      			if(item.id==id){
	      				item.name=czName;
	      				eqLi=null;
	      			}
	      		});
	      		if(eqLi==null){
	      		}else{
	      			eqUl=eqUl.concat(eqLi);
	      		}
	      		that.setState({
	      			"data":eqUl
	      		});
	      		wScene=eqUl;
	      		break;
          	default:
          		break;
          	}
          }
      });
  }
  getSend(){
	  var opValue="0800"+GetCookie("SN")+"FE90";
	  window.changeSdkMsg(opValue);
  }
  render(){
	var Cthis=this;
	var num=0;
	eqUl=[];
	sceneUl=[];
    return (
      <div className="bottom_equip">
        <div className="fixed_bg" onClick={this.shutOff.bind(this)}></div>
        <div className="be_wrapper">
          <ul className="eq_ul">
          	{
          		this.state.data.map(function(item,index){
          			return (
              				<li key={"then"+index} className="be_li" onClick={Cthis.checkThis.bind(Cthis)}>
              	              <img className="eq_icon" src="../../../src/resource/images/home.png" />
              	              <span className="eq_name">{item.name}</span>
              	              <img className="be_add" src="../../../src/resource/images/scene/be_add.png" />
              	              <img className="be_cancel" src="../../../src/resource/images/scene/be_cancel.png" />
              	              <div className="dis_show">
              	                <span className="eq_action">打开</span>
              	              </div>
              	            </li>
              			)
          		})
          	}
          </ul>
          <p className="be_submit" onClick={this.beSubmit.bind(this)}>
            完成操作
          </p>
        </div>
      </div>
    );
  }
}
export default BottomEquip
