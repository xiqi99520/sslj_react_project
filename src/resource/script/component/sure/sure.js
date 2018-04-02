class Sure extends React.Component {
  DisShow(){
	$("#Sure").css("display","none");
  }
  render(){
    return (
    	<div id="Sure" style={{display:"none"}}>
    		<div className="box_bg" onClick={this.DisShow.bind(this)}></div>
        	<div className="sure_main">
        		<p className="sure_title">提示</p>
        		<p id="sureMsg" className="sure_word">出现错误</p>
        		<p className="sure_button">
        			<span id="sureCancel" className="sureCancel" onClick={this.DisShow.bind(this)}>取消</span>
        			<span id="sureOk" className="sureOk" onClick={this.DisShow.bind(this)}>确定</span>
        		</p>
        	</div>
        </div>
    );
  }
}
export default Sure
