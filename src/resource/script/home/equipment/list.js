var my$;
import "./../../../style/equipment.css";
import Footer from './../../component/headFoot/footer.js';
import Header from './../../component/headFoot/header.js';
import EquipmentList from './equipList.js';
import RoomEq from './room.js';
import Camera from './camera.js';
class EquipmentListWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:""};
  }
  componentDidMount(){
  }
  showEquipment(){
    $(".top_nav span").removeClass("on");
    $(".nav_equip").addClass("on");
    $("#camera_part").css("display","none");
    $("#room_part").css("display","none");
    $("#eq_part").css("display","block");
  }
  showRoom(){
    $(".top_nav span").removeClass("on");
    $(".nav_room").addClass("on");
    $("#camera_part").css("display","none");
    $("#eq_part").css("display","none");
    $("#room_part").css("display","block");

  }
  showCamera(){
    $(".top_nav span").removeClass("on");
    $(".nav_camera").addClass("on");
    $("#eq_part").css("display","none");
    $("#room_part").css("display","none");
    $("#camera_part").css("display","block");
  }
  render() {
    return (
      <div className="bottom_blank">
        <Header />
        <div className="equipment">
          <p className="top_nav">
            <span className="nav_equip on" onClick={this.showEquipment.bind(this)}>设备</span>
            <span className="nav_room" onClick={this.showRoom.bind(this)}>房间</span>
            <span className="nav_camera" onClick={this.showCamera.bind(this)}>摄像头</span>
          </p>
          <div className="equip_wrapper">
            <EquipmentList />
            <RoomEq />
            <Camera />
          </div>
        </div>
        <Footer onState="3" />
      </div>
    );
  }
}
export default EquipmentListWrapper
// ReactDOM.render(<EquipmentListWrapper />, document.getElementById('app'));
