var my$;
require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
class ShareEquipment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data:[]
    };
  }
  goBack(){
	  this.props.history.goBack();
  }
  componentDidMount(){
	  var that=this;
	  $.ajax({
			type : "get",
			url : Base + "/yzydeviceshare/findAllShare.do",
			dataType : "json",
			data:{
				memberId:GetCookie("id"),
				houseId:GetCookie("houseId")
			},
			success : function (data) {
				debugger;
				if(data.isSuccess==0){
//					that.setState({
//						data:data.accountList
//					});
				}else{
					alert(data.errorMsg)
				}
				
			}
		});  
  }
  showShare(){
	  $("#showAccept").removeClass("on");
	  $("#showShare").addClass("on");
	  $("#accept").css("display","none");
	  $("#share").css("display","block");
  }
  showAccept(){
	  $("#showShare").removeClass("on");
	  $("#showAccept").addClass("on");
	  $("#share").css("display","none");
	  $("#accept").css("display","block");
  }
  render(){
    return (
      <div>
      	<p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      共享设备
	    </p>
	    <p className="share_nav">
	    	<span id="showShare" className="on" onClick={this.showShare.bind(this)}>共享</span>
	    	<span id="showAccept" onClick={this.showAccept.bind(this)}>接受</span>
	    </p>
	    <div id="share">
		    <ul className="family_apply_ul">
		    	<li>
		    		<img className="family_uPic" src="../../../src/resource/images/myCenter/user.png" />
		    		<p className="family_apply_uName">共享至小李</p>
		    		<p className="family_apply_relation">2017年11月15日共享  已接受</p>
		    		<span className="f_apply_statu f_apply_agree">删除</span>
		    	</li>
		    	<li>
		    		<img className="family_uPic" src="../../../src/resource/images/myCenter/user.png" />
		    		<p className="family_apply_uName">共享至吴洋</p>
		    		<p className="family_apply_relation">2017年11月15日共享  等待接收</p>
		    		<span className="f_apply_statu f_apply_agree">删除</span>
		    	</li>
		    	<li>
		    		<img className="family_uPic" src="../../../src/resource/images/myCenter/user.png" />
		    		<p className="family_apply_uName">共享至吴洋</p>
		    		<p className="family_apply_relation">2017年11月15日共享  等待接收</p>
		    		<span className="f_apply_statu f_apply_agree">删除</span>
		    	</li>
		    </ul>
		    <p className="share_button">
		    	<a href="#/myCenter/shareAdd">
			    	<img className="share_Pic" src="../../../src/resource/images/myCenter/share/add.png" />
			    	新增共享设备
		    	</a>
		    </p>
	    </div>
        <div id="accept" style={{"display":"none"}}>
	        <ul className="family_apply_ul">
		    	<li>
		    		<img className="family_uPic" src="../../../src/resource/images/myCenter/user.png" />
		    		<p className="family_apply_uName">小李的共享设备  </p>
		    		<p className="family_apply_relation">2017年11月15日共享</p>
		    		<span className="f_apply_statu f_apply_agree">删除</span>
		    	</li>
		    	<li>
		    		<img className="family_uPic" src="../../../src/resource/images/myCenter/user.png" />
		    		<p className="family_apply_uName">吴洋对你发起设备共享</p>
		    		<p className="family_apply_relation">2017年11月15日共享</p>
		    		<span className="f_apply_statu f_apply_agree">删除</span>
		    	</li>
		    	<li>
		    		<img className="family_uPic" src="../../../src/resource/images/myCenter/user.png" />
		    		<p className="family_apply_uName">吴洋对你发起设备共享</p>
		    		<p className="family_apply_relation">2017年11月15日共享</p>
		    		<span className="f_apply_statu f_apply_agree">删除</span>
		    	</li>
		    </ul>
        </div>
      </div>
    )
  }
}
export default ShareEquipment