var my$;
require("./../../../style/scene.css");
import Header from './../../component/headFoot/Header.js';
import Footer from './../../component/headFoot/Footer.js';
import Scene from './scene.js';
import Linkage from './linkage.js';
class SceneLinkage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data:""
    };
  }
  componentDidMount(){
	  if(this.props.match.params.index==1){
		  this.showLinkage();
	  }
  }
  showScene(othis,event){
    $(".nav_scene").addClass("on");
    $(".nav_linkage").removeClass("on");
    $(".linkage_main").css("display","none");
    $(".scene_ul").css("display","block");
  }
  showLinkage(){
    $(".nav_scene").removeClass("on");
    $(".nav_linkage").addClass("on");
    $(".scene_ul").css("display","none");
    $(".linkage_main").css("display","block");
  }
  render(){
    return (
      <div style={{"height":"100%"}}>
        <Header />
        <div className="scene">
          <p className="top_nav">
            <span className="nav_scene on" onClick={this.showScene.bind(this)}>场景</span>
            <span className="nav_linkage" onClick={this.showLinkage.bind(this)}>联动</span>
          </p>
          <Scene />
          <Linkage />
        </div>
        <Footer onState="2" />
      </div>
    )
  }
}
export default SceneLinkage
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
