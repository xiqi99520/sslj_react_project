class Error extends React.Component {
  DisShow(){
	$("#Error").css("display","none");
  }
  render(){
    return (
    	<div id="Error" style={{display:"none"}}>
    		<div className="error_bg" onClick={this.DisShow.bind(this)}></div>
        	<div className="error_main">
        		<p className="error_icon">
        			<img src="../../../src/resource/images/myCenter/room/guan.png" />
        		</p>
        		<p id="error_msg" className="error_msg">
        			错误信息
        		</p>
        	</div>
        </div>
    );
  }
}
export default Error
