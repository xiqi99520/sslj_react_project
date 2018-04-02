class Alert extends React.Component {
  Show(){
	  $("#Alert").css("display","block");
  }
  DisShow(){
	$("#Alert").css("display","none");
  }
  render(){
    return (
    	<div id="Alert" style={{display:"none"}}>
    		<div className="box_bg" onClick={this.DisShow.bind(this)}></div>
        	<div className="alert_main">
        		<p id="alertMsg" className="alert_word">出现错误</p>
        		<p className="alert_button">
        			<span id="alert_sure" onClick={this.DisShow.bind(this)}>确定</span>
        		</p>
        	</div>
        </div>
    );
  }
}
export default Alert
