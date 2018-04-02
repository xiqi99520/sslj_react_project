var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js";
var studyNum="";
var dt_id="";
class DefineTransEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
  }
  componentDidMount(){
  	this.getBindingKey();
  }
  getBindingKey(){
	  var that=this;
	  $.ajax({
	       type:"post",
	       url: Base+"/infrareddevicekey/getKeyList.do",
	       dataType:"json",
	       data:{
	    	   deviceId:that.props.match.params.id
			},
	       success:function(data){
	    	   if(data.isSuccess==0){
	    		   that.setState({data:data.data});
	    	   }else{
	    		   alert(data.errorMsg);
	    	   }
	       },
	       error:function(data){
	          alert("服务器返回数据错误");
	       }
	  });
  }
  showBox(){
	  $("#dt_box").css("display","block");
  }
  disShowBox(){
	  $("#dt_box").css("display","none");
  }
  dtDelete(){
	  $("#dt_delete").css("display","none");
	  $(".dt_close").css("display","inline-block");
	  $("#dt_ok").css("display","inline-block");
  }
  dtOk(){
	  $("#dt_ok").css("display","none");
  	  $(".dt_close").css("display","none");
	  $("#dt_delete").css("display","inline-block");
  }
  buttonClick(number,event){
	  if($("#dt_ok").css("display")=="none"){
		  $("#dt_input").val($("#iValue"+number).html());
		  dt_id=number;
		  this.showBox();
	  }else{
		  this.deleteLi(number);
	  }
  }
  deleteLi(number){
	  $.ajax({
	       type:"post",
	       url: Base+"/infrareddevicekey/deleteById.do",
	       dataType:"json",
	       data:{
	    	   id:number
			},
	       success:function(data){
	    	   if(data.isSuccess==0){
	    		  window.location.reload();
	    	   }else{
	    		   alert(data.errorMsg);
	    	   }
	       },
	       error:function(data){
	          alert("服务器返回数据错误");
	       }
	  });
  }
  dtSure(){
	  var that=this;
	  var name=$("#dt_input").val();
	  if(!name){
		  return false;
	  }
	  $.ajax({
	       type:"post",
	       url: Base+"/infrareddevicekey/updateSave.do",
	       dataType:"json",
	       data:{
	    	   id:dt_id,
	    	   keyName:name
			},
	       success:function(data){
	    	   if(data.isSuccess==0){
	    		  window.location.reload();
	    	   }else{
	    		   alert(data.errorMsg);
	    	   }
	       },
	       error:function(data){
	          alert("服务器返回数据错误");
	       }
	  });
  }
  dtShow(){
	  $("#dt_box").css("display","block");
  }
  dtDisShow(){
	  $("#dt_box").css("display","none");
  }
  goBack(){
	  this.props.history.goBack();
  }
  render() {
	  var myOrder;
	  var that=this;
    return (
      <div className="o_hidden">
        <div className="head_nav_none border_bottom">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      	{this.props.match.params.name}
	      	<span id="dt_delete" className="dt_right" onClick={this.dtDelete.bind(this)}>删除</span>
	      	<span id="dt_ok" className="dt_right" style={{"display":"none"}} onClick={this.dtOk.bind(this)}>完成</span>
	    </div>
	    <p className="dt_tip">
	    	提示：请点击按钮进行编辑
	    </p>
	    <div className="dt_main">
	    	{
	    		this.state.data.map(function(item,index){
	    			return (
	    					<span id={"button"+item.id} key={index} className={item.keyValue=="0"?"dt_li define_studied":"dt_li"} onClick={that.buttonClick.bind(that,item.id)}><em className="dt_close">×</em><i id={"iValue"+item.id}>{item.keyName}</i></span>
	    			)
	    		})
	    	}
	    </div>
	    <div id="dt_box" className="door_box">
	    	<div className="box_bg" onClick={this.dtDisShow.bind(this)}></div>
	    	<div className="sure_main door_main">
	    		<p className="sure_title">编辑名称</p>
	    		<p className="index_door">
	    			<input id="dt_input" type="text" />
	    		</p>
	    		<p className="sure_button">
	    			<span  className="sureCancel" onClick={this.dtDisShow.bind(this)}>取消</span>
	    			<span  className="sureOk" onClick={this.dtSure.bind(this)}>确定</span>
	    		</p>
	    	</div>
	    </div>
      </div>
    );
  }
}
export default DefineTransEdit
