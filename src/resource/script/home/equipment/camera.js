var my$;
class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:""};
  }
  componentWillMount(){
  }
  render() {
    return (
      <div id="camera_part" style={{display:'none'}}>
        <ul className="camera_ul" >
          <li>
            <a href="">
              <div className="camera_pic">
                <img src="../../../src/resource/images/equipment/camera.png" />
              </div>
              <p className="camera_title">
                1楼主卧
              </p>
            </a>
          </li>
          <li>
            <a href="">
              <div className="camera_pic">
                <img src="../../../src/resource/images/equipment/camera.png" />
              </div>
              <p className="camera_title">
                1楼主卧
              </p>
            </a>
          </li>
          <li>
            <a href="">
              <div className="camera_pic">
                <img src="../../../src/resource/images/equipment/camera.png" />
              </div>
              <p className="camera_title">
                1楼主卧
              </p>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
export default Camera
