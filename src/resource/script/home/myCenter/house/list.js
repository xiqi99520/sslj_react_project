var my$;
import {Base} from './../../../connect.js';
require("./../../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../../cookie.js"
class House extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		data:[]
    };
  }
  componentDidMount(){
	  var that=this;
	  $.ajax({
			type : "post",
			url : Base + "/account/getMemberAllAccount.do",
			dataType : "json",
			data:{
				memberId:GetCookie("id")
			},
			success : function (data) {
				if(data.isSuccess==0){
					that.setState({
						data:data.accountList
					});
				}else{
					alert(data.errorMsg)
				}
				
			}
		});  
  }
  goBack(){
	  this.props.history.goBack();
  }
  render(){
	  var imgUrl;
	  var defaultHouse;
    return (
      <div>
      	<p className="head_nav">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
	      选择房屋
	      <a className="room_top_a" href="#/myCenter/houseAdd">创建</a>
	    </p>
	    <div >
		    <ul className="room_index_ul">
		    {
		    	this.state.data.map(function(item,index){
		    		if(!item.imgUrl){
		    			imgUrl="../../../src/resource/images/myCenter/house/picture_default.png";
		    		}else{
		    			imgUrl=item.imgUrl;
		    		}
		    		if(item.isDefault==0){
		    			defaultHouse=" (默认)";
		    		}else{
		    			defaultHouse="";
		    		}
		    		return (
		    				<li>
					    		<a href={"#/myCenter/houseDetail/"+index}>
						    		<img className="room_uPic" src={imgUrl} />
						    		<p className="house_name">{item.name+defaultHouse}</p>
						    		<img className="room_to" src="../../../src/resource/images/myCenter/family/more.png" />
					    		</a>
					    	</li>
		    		)
		    	})
		    }
		    </ul>
	    </div>
	    <div style={{display:"none"}}>
	    	<p className="room_null_pic">
	    		<img  src="../../../src/resource/images/myCenter/room/illustrations.png" />
	    	</p>
	    	<p className="room_null_word">
	    		还未添加任何设备，不能进行相应操作
	    	</p>
	    </div>
      </div>
    )
  }
}
export default House