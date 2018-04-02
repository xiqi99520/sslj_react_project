var my$;
class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:""};
  }
  componentDidMount(){
  }
  render() {
	 var nthis=this;
    return (
      <div className="curtains_wrapper"> 
      	<p className="head_nav">
      		<img className="url_back" src="../../../src/resource/images/url_back.png" />
      		成员编辑
      	</p>
      	<ul className="ds_ul member_ul">
      		<li>
      			成员姓名
      			<img className="member_arrow" src="../../../src/resource/images/myCenter/edit.png" />
      		</li>
      		<li>
	  			用户编号
	  			<span className="member_right">1461</span>
	  		</li>
	  		<li>
	  			用户类型
	  			<span className="member_right">普通用户</span>
	  		</li>
	  		<li>
	  			验证方式
	  			<span className="member_right">指纹开锁</span>
	  		</li>
	  		<li>
	  			<a href="">
		  			开锁消息提醒
		  			<img className="ds_arrow" src="../../../src/resource/images/myCenter/right_arrow.png" />
	  			</a>
	  		</li>
      	</ul>
      	<ul className="ds_ul member_ul">
	  		<li>
	  			成员姓名
	  			<img className="member_arrow" src="../../../src/resource/images/myCenter/edit.png" />
	  		</li>
	  		<li>
	  			用户编号
	  			<span className="member_right">1461</span>
	  		</li>
	  		<li>
	  			用户类型
	  			<span className="member_right">普通用户</span>
	  		</li>
	  		<li>
	  			验证方式
	  			<span className="member_right">指纹开锁</span>
	  		</li>
	  		<li>
	  			<a href="">
		  			开锁消息提醒
		  			<img className="ds_arrow" src="../../../src/resource/images/myCenter/right_arrow.png" />
	  			</a>
	  		</li>
	  	</ul>
      </div>
    );
  }
}
export default Member
