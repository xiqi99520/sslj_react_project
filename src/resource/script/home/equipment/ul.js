var my$;
let startX,startY,endX,endY;
class EquipmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:""};
  }
  componentWillMount(){
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
    return (
      <div id="eq_part">
        <ul className="eq_ul">
          <li>
            <a href="App.html#/equipment/temperature">
              <img className="eq_icon" src="../../../src/resource/images/equipment/music.png" />
              <span className="eq_name">温度传感器</span>
              <span className="eq_msg">
                温度：24.54℃
                <img className="eq_to" src="../../../src/resource/images/equipment/arrow.png" />
              </span>
            </a>
          </li>
          <li>
            <a href="">
              <img className="eq_icon" src="../../../src/resource/images/equipment/music.png" />
              <span className="eq_name">一楼大厅窗帘</span>
            </a>
            <span className="eq_state eq_off" onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}>
              <em className="bottom_state" onClick={this.stateClick.bind(this)}></em>
              <em className="on_pointer"></em>
            </span>
          </li>
          <li>
            <a href="">
              <img className="eq_icon" src="../../../src/resource/images/equipment/music.png" />
              <span className="eq_name">一楼大厅窗帘</span>
              <span className="eq_msg">
                有人
                <img className="eq_to" src="../../../src/resource/images/equipment/arrow.png" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
export default EquipmentList
