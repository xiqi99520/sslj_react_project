var my$;
require("./../../../style/myCenter.css");
import {Base,Yzy} from './../../connect.js';
import {SetCookie,GetCookie} from "./../../cookie.js"
var devices = []; // 设备列表
class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		devices:[],
    	mic:""
    };
  }
  componentWillMount(){
	  var that=this;
	  if(!GetCookie("access_token")){
		  var params = {
			      email: GetCookie("account"),
			      corp_id:  "100fa4b41cb5c000",
			      password: GetCookie("yPassword")
			    };
		  $.ajax({
			  type:"post",
			  url:Yzy+"/v2/user_auth",
			  beforeSend: function(xhr) {
		            xhr.setRequestHeader('Access-Token', GetCookie("access_token"))
		        },
			  data:JSON.stringify(params),
			  success:function(data){
				  SetCookie("access_token",data.access_token,1);
				  SetCookie("refresh_token",data.refresh_token,1);
				  SetCookie("user_id",data.user_id,1);
				  SetCookie("authorize",data.authorize,1);
				  that.getYzyHost();
			  }
		  });
	  }else{
		  this.getYzyHost();
	  }
  }
  getYzyHost(){
	  var that=this;
	  $.ajax({
		  type:"get",
		  url:Yzy+"/v2/user/"+GetCookie("user_id")+"/subscribe/devices",
		  beforeSend: function(xhr) {
	            xhr.setRequestHeader('Access-Token', GetCookie("access_token"));
	      },
	      dataType:"json",
		  success:function(data){
			 var  devices = data.map(item => {
			        return {
			            device_id: item.id.toString(),
			            device_name: item.name,
			            device_mac: item.mac,
			            device_pid: item.product_id
			        }
			    });
			 if(!devices[0]){
				 $(".delete_host").addClass("opacity_4");
			 }
			  that.setState({
				  devices:devices,
				  mic:devices[0].device_mac
			  })
		  }
	  });
  }
  deleteHost(){
	  var that=this;
	  if(!this.state.devices[0]){
		  alert("还没有绑定主机");
		  return false;
	  }
	  var params ={"device_id":this.state.devices[0].device_id};
		$.ajax({
			  type:"post",
			  url:Yzy+"/v2/user/"+GetCookie("user_id")+"/unsubscribe",
			  beforeSend: function(xhr) {
		          xhr.setRequestHeader('Access-Token', GetCookie("access_token"));
		      },
		      data:JSON.stringify(params),
			  success:function(data){
				  if(!data){
					  alert("成功删除主机");
					  window.location.href="#/index";
				  }
			  }
		  });
  }
  render(){
    return (
      <div className="host_wrapper">
      	<div className="host_top">
      		<p className="host_pic">
      			<img src="../../../src/resource/images/myCenter/host.jpg" />
      		</p>
      		<p className="host_title">
      			智能主机
      		</p>
      	</div>
      	<ul className="host_ul">
      		<li>
      			<span className="host_left">设备数</span>
      			<span className="host_right">{GetCookie("eqLength")}</span>
      		</li>
      		<li>
	  			<span className="host_left">MAC地址</span>
	  			<span className="host_right">{this.state.mic}</span>
	  		</li>
      	</ul>
      	<p className="delete_host" onClick={this.deleteHost.bind(this)}>
      		删除主机
      	</p>
      </div>
    )
  }
}
export default Host
// ReactDOM.render(<Complaint />, document.getElementById('app'));
