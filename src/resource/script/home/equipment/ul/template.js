var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js";
class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
  }
  componentWillMount(){
  }
  goBack(){
	  this.props.history.goBack();
  }
  render() {
	  var myOrder;
    return (
      <div className="light_wrapper">
        <p className="head_nav_light">
	      <img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/equipment/light_arrow.png" />
	      {this.props.match.params.name}
	      	<a href={"#/equipment/option/"+this.props.match.params.name+"/"+this.props.match.params.shortAddress+"/"+this.props.match.params.Endpoint+"/"+this.props.match.params.eqSN+"/"+this.props.match.params.DeviceId+"/"+this.props.match.params.ZoneType+"/"+this.props.match.params.IEEE}>
      			<img className="head_eq_right" src="../../../src/resource/images/equipment/door_option.png" />
      		</a>
	    </p>
		<ul className="template_ul">
			<li>
				<a href={"#/equipment/templateEdit/"+this.props.match.params.name+"/"+this.props.match.params.shortAddress+"/"+this.props.match.params.Endpoint+"/"+this.props.match.params.eqSN+"/"+this.props.match.params.DeviceId+"/"+this.props.match.params.ZoneType+"/"+this.props.match.params.IEEE}>
					<div className="template_border">
						<div className="template_wrapper">
							<div className="template_position">
								<p className="tp_title">
									14
								</p>
							</div>
						</div>
					</div>
				</a>
			</li>
			<li>
				<a href={"#/equipment/templateEdit/"+this.props.match.params.name+"/"+this.props.match.params.shortAddress+"/"+this.props.match.params.Endpoint+"/"+this.props.match.params.eqSN+"/"+this.props.match.params.DeviceId+"/"+this.props.match.params.ZoneType+"/"+this.props.match.params.IEEE}>
					<div className="template_border">
						<div className="template_wrapper">
							<div className="template_position">
								<p className="tp_title">
								14
								</p>
							</div>
						</div>
					</div>
				</a>
			</li>
			<li>
				<a href={"#/equipment/templateEdit/"+this.props.match.params.name+"/"+this.props.match.params.shortAddress+"/"+this.props.match.params.Endpoint+"/"+this.props.match.params.eqSN+"/"+this.props.match.params.DeviceId+"/"+this.props.match.params.ZoneType+"/"+this.props.match.params.IEEE}>
					<div className="template_border">
						<div className="template_wrapper">
							<div className="template_position">
								<p className="tp_title">
								14
								</p>
							</div>
						</div>
					</div>
				</a>
			</li>
			<li>
				<a href={"#/equipment/templateEdit/"+this.props.match.params.name+"/"+this.props.match.params.shortAddress+"/"+this.props.match.params.Endpoint+"/"+this.props.match.params.eqSN+"/"+this.props.match.params.DeviceId+"/"+this.props.match.params.ZoneType+"/"+this.props.match.params.IEEE}>
					<div className="template_border">
						<div className="template_wrapper">
							<div className="template_position">
								<p className="tp_title">
									14
								</p>
							</div>
						</div>
					</div>
				</a>
			</li>
		</ul>
		<p className="template_type">
			设备类型：{decodeURI(window.prePro(this.props.match.params.eqSN))}
		</p>
		<div className="template_bg">
			<img src="../../../src/resource/images/equipment/template_bg.jpg" />
		</div>
      </div>
    );
  }
}
export default Template
