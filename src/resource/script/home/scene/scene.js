var my$;
import {Base} from './../../connect.js';
import {SetCookie,GetCookie} from "./../../cookie.js";
class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
  }
  componentDidMount(){
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
          	case "0D":
          		$("#loading").css("display","none");
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
  editScene(id,name,event){
	  window.location.href="#/scene/sceneEdit/"+id+"/"+name;
  }
  addScene(){
	  var name="我的场景";
	  var that=this;
	  var Newname="";
	  for(var i=0;i<100;i++){
		  Newname=name+i;
		  var same=false;
		  for(var i=0;i<that.state.data.length;i++){
			  if(Newname==that.state.data[i].name){
				  same=true;
				  break;
			  }
		  }
		  if(same==false){
			  break;
		  }
	  }
	  var byte=window.stringToByte(Newname);
	  var result="";
	  for(var i=0;i<byte.length;i++){
		  result=(result+byte[i].toString(16)).toUpperCase();
	  }
	  var length=result.length/2;
	  var length16=length.toString(16).toUpperCase();
	  var lengthValue=length16.length<2?"0"+length16:length16;
	  var opValue="2100"+GetCookie("SN")+"FE911902FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"+lengthValue+result+"0000";
	  window.changeSdkMsg(opValue);
	  $("#loading").css("display","block");
  }
  optionScene(id,event){
	  var opValue="0B00"+GetCookie("SN")+"FE9202"+id;
	  window.changeSdkMsg(opValue);
	  $("#"+id).addClass("on");
  }
  render(){
	var that=this;
    return (
      <ul className="scene_ul">
      	{
      		this.state.data.map(function(item,index){
      			if(item.name=="回家场景" || item.name=="起床场景" || item.name=="睡眠场景" || item.name=="离家场景"){
      				return (
          					<li id={item.id}>
    	      			      <div className="li_wrapper" onClick={that.optionScene.bind(that,item.id)}>
    	      			      	<img className="on_other" src="../../../src/resource/images/scene/ic_scene_all_open.png" />
    	      			        <img className="on_this" src="../../../src/resource/images/scene/ic_scene_all_close_open.png" />
    	      			      </div>
    	      			      <p className="scene_li_title" onClick={that.optionScene.bind(that,item.id)}>{item.name}</p>
    	      			      <p className="scene_word" >
    	      			        <span onClick={that.editScene.bind(that,item.id,item.name)}>点击编辑</span>
    	      			      </p>
    	      			    </li>
          			)
      			}
      		})
      	}
      	{
      		this.state.data.map(function(item,index){
      			if(item.name=="回家场景" || item.name=="起床场景" || item.name=="睡眠场景" || item.name=="离家场景"){
      			}else{
      				return (
          					<li id={item.id}>
    	      			      <div className="li_wrapper" onClick={that.optionScene.bind(that,item.id)}>
    	      			      	<img className="on_other" src="../../../src/resource/images/scene/ic_scene_all_open.png" />
    	      			        <img className="on_this" src="../../../src/resource/images/scene/ic_scene_all_close_open.png" />
    	      			      </div>
    	      			      <p className="scene_li_title" onClick={that.optionScene.bind(that,item.id)}>{item.name==""?" ":item.name}</p>
    	      			      <p className="scene_word">
    	      			        <span onClick={that.editScene.bind(that,item.id,item.name)}>点击编辑</span>
    	      			      </p>
    	      			    </li>
          			)
      			}
      		})
      	}
        <li id="add_scene">
          <div className="li_wrapper">
            <img onClick={this.addScene.bind(this)} src="../../../src/resource/images/scene/add_scene.png" />
          </div>
        </li>
      </ul>
    )
  }
}
export default Scene
// ReactDOM.render(<Scene />, document.getElementById('app'));
