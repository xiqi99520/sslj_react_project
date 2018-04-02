var my$;
class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg:""};
  }
  componentWillMount(){
  }
  addOn(event){
	  var event=event||window.event;
	  var dom=$(event.target).closest(".video_ul li");
	  if(dom.hasClass("video_on")){
		  dom.removeClass("video_on");
	  }else{
		  dom.addClass("video_on");
	  }
  }
  render() {
    return (
      <div>
        <p className="head_nav_none">
	      <img className="url_back" src="../../../src/resource/images/url_back.png" />
	      	监控
	    </p>
	    <div className="video_player">
	    	<img  src="../../../src/resource/images/equipment/camera.png" />
	    </div>
	    <p className="de_type">
			设备型号：NIONITIG14654
		</p>
		<ul className="video_ul">
			<li className="video_on" onClick={this.addOn.bind(this)}>
				<p className="video_icon">
					<img src="../../../src/resource/images/equipment/video/icon_01.png" />
					<img className="on" src="../../../src/resource/images/equipment/video/icon_02.png" />
				</p>
				<p className="video_word">
					录像
				</p>
			</li>
			<li onClick={this.addOn.bind(this)}>
				<p className="video_icon">
					<img src="../../../src/resource/images/equipment/video/icon_03.png" />
					<img className="on" src="../../../src/resource/images/equipment/video/icon_04.png" />
				</p>
				<p className="video_word">
					静音
				</p>
			</li>
			<li onClick={this.addOn.bind(this)}>
				<p className="video_icon">
					<img src="../../../src/resource/images/equipment/video/icon_05.png" />
					<img className="on" src="../../../src/resource/images/equipment/video/icon_06.png" />
				</p>
				<p className="video_word">
					对讲
				</p>
			</li>
			<li onClick={this.addOn.bind(this)}>
				<p className="video_icon">
					<img src="../../../src/resource/images/equipment/video/icon_07.png" />
					<img className="on" src="../../../src/resource/images/equipment/video/icon_08.png" />
				</p>
				<p className="video_word">
					翻转
				</p>
			</li>
			<li onClick={this.addOn.bind(this)}>
				<p className="video_icon">
					<img src="../../../src/resource/images/equipment/video/icon_09.png" />
					<img className="on" src="../../../src/resource/images/equipment/video/icon_10.png" />
				</p>
				<p className="video_word">
					亮度
				</p>
			</li>
			<li onClick={this.addOn.bind(this)}>
				<p className="video_icon">
					<img src="../../../src/resource/images/equipment/video/icon_11.png" />
					<img className="on" src="../../../src/resource/images/equipment/video/icon_12.png" />
				</p>
				<p className="video_word">
					对比度
				</p>
			</li>
			<li onClick={this.addOn.bind(this)}>
				<p className="video_icon">
					<img src="../../../src/resource/images/equipment/video/icon_13.png" />
					<img className="on" src="../../../src/resource/images/equipment/video/icon_14.png" />
				</p>
				<p className="video_word">
					巡航
				</p>
			</li>
			<li onClick={this.addOn.bind(this)}>
				<p className="video_icon">
					<img src="../../../src/resource/images/equipment/video/icon_15.png" />
					<img className="on" src="../../../src/resource/images/equipment/video/icon_16.png" />
				</p>
				<p className="video_word">
					红外
				</p>
			</li>
		</ul>
		<div className="video_direction">
			<p className="vd_main">
				<img className="vd_pic" src="../../../src/resource/images/equipment/video/direction.png" />
				<span className="vd_top"></span>
				<span className="vd_bottom"></span>
				<span className="vd_left"></span>
				<span className="vd_right"></span>
			</p>
		</div>
      </div>
    );
  }
}
export default Video
