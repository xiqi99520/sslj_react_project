require("./../../../style/addEq.css");
import {SetCookie,GetCookie} from "./../../cookie.js"
import {Base} from './../../connect.js';

class AddHost extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {data:""};
	}
	goBack(){
		  this.props.history.goBack();
	}
	componentWillMount(){
		var that=this;
		  $.ajax({
		       type:"post",
		       url: "../../../src/resource/script/home/addEquipment/eqMsg.js",
		       dataType:"json",
		       success:function(data){
		    	   that.setState({
		    		   data:data[that.props.match.params.index]
		    	   })
		       },
		       error:function(data){
		  	          alert("连接服务器出错，请刷新网络重试！");
		  	   }
		   });
	}
	chooseSure(){
		if($(".aed_sure").hasClass("on")){
			$(".aed_sure").removeClass("on");
			$(".aed_submit").removeClass("aed_true");
		}else{
			$(".aed_sure").addClass("on");
			$(".aed_submit").addClass("aed_true");
		}
	}
	addEqNext(){
		if($(".aed_submit").hasClass("aed_true")){
			window.location.href="#/addEquipment/qrcode";
		}else{
			return false;
		}
	}
  render(){
    return (
      <div>
	    <p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      添加{this.state.data.name}
	    </p>
	    <p className="aed_pic">
	      <img  src={this.state.data.src} />
	    </p>
	    <div className="aed_msg" dangerouslySetInnerHTML={{__html: this.state.data.tips}}>
	    </div>
	    <p className={this.state.data.reset==""?"aed_other dis_show":"aed_other"}>
	    	<a href={"#/addEquipment/reset/"+this.props.match.params.index}>
	    		添加设备遇到问题<em>&gt;</em>
	    	</a>
	    </p>
	    <p className="aed_sure" onClick={this.chooseSure.bind(this)}>
	    	<img className="aed_sure_icon on_other" src="../../../src/resource/images/scene/be_cancel.png" />
	    	<img className="aed_sure_icon on_this" src="../../../src/resource/images/scene/be_add.png" />
	    	已确认上述操作
	    </p>
	    <p className="aed_submit" onClick={this.addEqNext.bind(this)}>
	    		添加设备
	    </p>
      </div>
    );
  }
}
export default AddHost
