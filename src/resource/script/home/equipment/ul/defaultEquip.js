var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js";
class DefaultEquip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
  }
  componentDidMount(){
	  var that=this;
	  var origin=this.props.match.params.shortAddress;
	  var shortaddress=origin.slice(2,4)+origin.slice(0,2);
	  $.ajax({
	       type:"post",
	       url: Base + "/sensorreport/grid.do",
	       dataType:"json",
	       data:{
	    	   deviceId:GetCookie("hostId"),
	    	   platformType:1,
	    	   shortaddress:shortaddress,
	    	   endpoint:this.props.match.params.Endpoint,
	    	   pageNo:1,
	    	   pageSize:20
	       },
	       success:function(data){
	    	   var MsgUl=[];
	         if(data.isSuccess== "0"){
	        	 data.data.rows.map(function(item,index){
	        		 var dataMsg=item.fbeeupdatamessage;
	        		 var cluster=dataMsg.slice(10,14);
	        		 var type=dataMsg.slice(16,20);
	        		 var value=dataMsg.slice(22,26);
	        		 var trueValue=value.slice(2,4)+value.slice(0,2);
	        		 if(type=="8000"||cluster=="0204"||cluster=="0504"){
	        			var msgLi={
	        					 time:item.dateTime,
	        					 value:trueValue,
	        					 cluster:cluster
	        			 };
	        			 MsgUl=MsgUl.concat(msgLi);
	        		 }
	        	 });
	        	 that.getMsg(MsgUl);
	         }else{
	           alert(data.errorMsg);
	         }
	       },
	       error:function (xhr,status,statusText){
	           alert("服务器维护");
	       }
	    });
  }
  getMsg(MsgUl){
	  var that=this;
	  MsgUl.map(function(item,index){
		  switch(that.props.match.params.DeviceId){
		  	case "0302":
		  	case "0303":
		  		if(item.cluster=="0204"){
		  			item.desc="温度："+parseInt(item.value,16)/100+"℃";
		  		}
				if(item.cluster=="0504"){
					item.desc="相对湿度："+parseInt(item.value,16)/100+"%";
				}
		  		break;
			case "0402":
				switch(that.props.match.params.ZoneType){
				case "0015":
					if(item.value=="0000"){
						item.desc="关门";
					}else{
						item.desc="开门";
					}
					break;
				case "000D":
					if(item.value=="0000"){
						item.desc="恢复正常";
					}else{
						item.desc="有人经过";
					}
					break;
				case "0028":
				case "8000":
					if(item.value=="0000"){
						item.desc="恢复正常";
					}else{
						item.desc="烟雾超标";
					}
					break;
				case "002B":
				case "8001":
					if(item.value=="0000"){
						item.desc="恢复正常";
					}else{
						item.desc="气体异常";
					}
					break;
				case "002D":
					if(item.value=="0000"){
						item.desc="恢复正常";
					}else{
						item.desc="有振动";
					}
					break;
				case "002A":
					if(item.value=="0000"){
						item.desc="恢复正常";
					}else{
						item.desc="有水浸入";
					}
					break;
				case "002C":
					if(item.value=="0000"){
						item.desc="恢复正常";
					}else{
						item.desc="有人按下紧急按钮";
					}
					break;
				default :
					if(item.value=="0000"){
						item.desc="关";
					}else{
						item.desc="开";
					}
					break;
				}
				break;
			default :
					break;
		  }
	  });
	  that.setState({
 		 data:MsgUl
 	 });
  }
  goBack(){
	  this.props.history.goBack();
  }
  render() {
	  var time;
	  var eq_bg=this.props.match.params.DeviceId;
	  if(this.props.match.params.DeviceId=="0402"){
		  eq_bg="0402_"+this.props.match.params.ZoneType;
	  }
	  this.state.data.map(function(item,index){
		  decodeURI(item.fbeeupdatamessage)
		})
	 
    return (
      <div>
        <p className="head_nav_none">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      {this.props.match.params.name}
	      <a href={"#/equipment/option/"+this.props.match.params.name+"/"+this.props.match.params.shortAddress+"/"+this.props.match.params.Endpoint+"/"+this.props.match.params.eqSN+"/"+this.props.match.params.DeviceId+"/"+this.props.match.params.ZoneType+"/"+this.props.match.params.IEEE}>
	      	<img className="head_eq_right" src="../../../src/resource/images/scene/setting.png" />
	      </a>
	    </p>
		<p className="de_pic">
			<img src={"../../../src/resource/images/equipment/eqbg/"+eq_bg+".jpg"} />
		</p>
		<p className="de_type">
			设备型号：{decodeURI(window.prePro(this.props.match.params.eqSN))}
		</p>
		<ul className="de_ul">
		{
			this.state.data.map(function(item,index){
				return (
						<li>
							{item.desc}&nbsp;&nbsp;&nbsp;{item.time}
						</li>
				)
			})
		}
		</ul>
      </div>
    );
  }
}
export default DefaultEquip
