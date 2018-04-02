require("./../../../style/addEq.css");
import {SetCookie,GetCookie} from "./../../cookie.js"
import {Base} from './../../connect.js';

class AddEqReset extends React.Component {
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
  render(){
    return (
      <div>
	    <p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      添加{this.state.data.name}
	    </p>
	    <div className="reset_msg" dangerouslySetInnerHTML={{__html: this.state.data.reset}}>
	    </div>
	    <p className="aed_pic">
	      <img  src={this.state.data.src} />
	    </p>
	    <p className="aed_sure" onClick={this.chooseSure.bind(this)}>
	    	<img className="aed_sure_icon on_other" src="../../../src/resource/images/scene/be_cancel.png" />
	    	<img className="aed_sure_icon on_this" src="../../../src/resource/images/scene/be_add.png" />
	    	已确认上述操作
	    </p>
	    <p className="aed_submit">
	    	添加设备
	    </p>
      </div>
    );
  }
}
export default AddEqReset
