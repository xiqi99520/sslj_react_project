class Loading extends React.Component {
	cancel(){
		$("#loading").css("display","none");
	}
  render(){
    return (
    	<div id="loading" className="loading_box">
    		<div className="loading_bg" onClick={this.cancel.bind(this)}>
    		</div>
      		<img  className="loading" src="../../../src/resource/images/loading.gif" />
      	</div>
    );
  }
}
export default Loading