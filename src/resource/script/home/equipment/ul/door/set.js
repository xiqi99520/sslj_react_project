var my$;
let startX,startY,endX,endY;
class Set extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:""};
  }
  componentDidMount(){
  }
  onTouchStart(event){
    var event = event || window.event;
    startX=event.touches[0].clientX;
    startY=event.touches[0].clientY;
  }
  onTouchEnd(event){
    var event = event || window.event;
    endX=event.changedTouches[0].clientX;
    endY=event.changedTouches[0].clientY;
    if(endX-startX>10){
      $(event.target).closest(".eq_state").removeClass("eq_off").addClass("eq_on");
    }
    if(startX-endX>10){
      $(event.target).closest(".eq_state").addClass("eq_off").removeClass("eq_on");
    }else{

    }
  }
  stateClick(event){
    var event = event || window.event;
    var dom=$(event.target).parent();
    if(dom.hasClass("eq_on")){
      dom.removeClass("eq_on").addClass("eq_off");
    }else{
      dom.removeClass("eq_off").addClass("eq_on");
    }
  }
  render() {
	 var nthis=this;
    return (
      <div className="curtains_wrapper"> 
      	<p className="head_nav">
      		<img className="url_back" src="../../../src/resource/images/url_back.png" />
      		开锁设置
      	</p>
      	<ul className="ds_ul">
      		<li>
      			<a href="#/equipment/member">
      				成员设置
      				<img className="ds_arrow" src="../../../src/resource/images/myCenter/right_arrow.png" />
      			</a>
      		</li>
      		<li>
	  			<a href="">
	  				定时反锁提醒
	  				<img className="ds_arrow" src="../../../src/resource/images/myCenter/right_arrow.png" />
	  			</a>
	  		</li>
	  		<li>
	  			钥匙开锁提醒
	  			<span className="eq_state eq_off" onTouchStart={nthis.onTouchStart.bind(this)} onTouchEnd={nthis.onTouchEnd.bind(this)}>
	                <em className="bottom_state" onClick={nthis.stateClick.bind(this)}></em>
	                <em className="on_pointer"></em>
	             </span>
	  		</li>
	  		<li>
	  			MAC地址：156156161691596
	  		</li>
      	</ul>
      	<p className="ds_delete">
      		删除设备
      	</p>
      </div>
    );
  }
}
export default Set
