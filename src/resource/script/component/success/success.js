class Success extends React.Component {
  DisShow(){
	$("#Success").css("display","none");
  }
  render(){
    return (
    	<div id="Success" style={{display:"none"}}>
    		<div className="error_bg" onClick={this.DisShow.bind(this)}></div>
        	<div className="error_main">
        		<p className="error_icon">
        			<img src="../../../src/resource/images/myCenter/room/success.png" />
        		</p>
        		<p id="success_msg" className="success_msg">
        			成功信息
        		</p>
        	</div>
        </div>
    );
  }
}
export default Success
