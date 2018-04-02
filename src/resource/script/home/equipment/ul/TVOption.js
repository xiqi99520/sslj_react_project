var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js";
class TVOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:""};
  }
  componentDidMount(){
	  $("#eo_name_input").val(this.props.match.params.name);
  }
  deleteEq(){
	  var that=this;
	  $.ajax({
	       type:"post",
	       url: Base+"/infrareddevice/deleteById.do",
	       dataType:"json",
	       data:{
	    	   id:that.props.match.params.id
			},
	       success:function(data){
	    	   if(data.isSuccess==0){
	    		   window.location.href="#/index";
	    	   }else{
	    		   alert(data.errorMsg);
	    	   }
	       },
	       error:function(data){
	          alert("服务器返回数据错误");
	       }
	  });
  }
  saveEq(){
	  var that=this;
	  var name=$("#eo_name_input").val();
	  if(name==this.props.match.params.name){
		  this.goBack();
		  return false;
	  }
	  $.ajax({
	       type:"post",
	       url: Base+"/infrareddevice/updateSave.do",
	       dataType:"json",
	       data:{
	    	   id:that.props.match.params.id,
	    	   deviceName:name
			},
	       success:function(data){
	    	   if(data.isSuccess==0){
	    		   window.location.href="#/equipment/TV/"+that.props.match.params.id+"/"+name+"/"+that.props.match.params.shortAddress+"/"+that.props.match.params.Endpoint;
	    	   }else{
	    		   alert(data.errorMsg);
	    	   }
	       },
	       error:function(data){
	          alert("服务器返回数据错误");
	       }
	  });
  }
  focusInput(){
	  $("#eo_name_input").focus();
  }
  goBack(){
	  this.props.history.goBack();
  }
  render() {
	var myOrder;
    return (
      <div className="">
        <p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      	常用设置
	      	<span className="head_sure" onClick={this.saveEq.bind(this)}>
	      		保存
	      	</span>
	    </p>
	    <ul className="eo_ul">
	    	<li onClick={this.focusInput.bind(this)}>
	    		设备名称
	    		<img className="setting_right" src="../../../src/resource/images/myCenter/right_arrow.png" />
	    		<input id="eo_name_input" className="eo_name_input" type="text" placeholder="请输入名称" />
	    	</li>
	    	<li>
	    		所属房间
	    		<img className="setting_right" src="../../../src/resource/images/myCenter/right_arrow.png" />
	    		<span className="eo_name">默认房间</span>
	    	</li>
	    </ul>
	    <p className="eo_delete" onClick={this.deleteEq.bind(this)}>
	    	删除设备
	    </p>
      </div>
    );
  }
}
export default TVOption
