var my$;
require("./../../../style/myCenter.css");
class Download extends React.Component {
  goBack(){
	  this.props.history.goBack();
  }
  download(){
	  var browser = {
			    versions: function () {
			        var u = navigator.userAgent, app = navigator.appVersion;
			        return {         //移动终端浏览器版本信息
			            trident: u.indexOf('Trident') > -1, //IE内核
			            presto: u.indexOf('Presto') > -1, //opera内核
			            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			            iPad: u.indexOf('iPad') > -1, //是否iPad
			            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			        };
			    }(),
			    language: (navigator.browserLanguage || navigator.language).toLowerCase()
			}

			if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
			        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
			        if (ua.match(/MicroMessenger/i) == "micromessenger") {
						$("#tip").show();
			                //在微信中打开
							//alert("请点击右上角选择[复制链接]用浏览器打开");
							//location.href = "http://fusion.qq.com/app_download?appid=1105381812&platform=qzone&via=QZ.MOBILEDETAIL.QRCODE&u=3046917960";
							//window.open("http://fusion.qq.com/app_download?appid=1481959275&platform=qzone&via=QZ.MOBILEDETAIL.QRCODE&u=3046917960");
							//location.href ="http://fusion.qq.com/app_download?appid=1105253405&platform=qzone&via=QZ.MOBILEDETAIL.QRCODE&u=3046917960";
			        }
			        else if (browser.versions.ios) {
					//if (browser.versions.ios) {
			                //是否在IOS浏览器打开
							//下载 iosApp
							//alert("IOS");
							//window.open ('https://itunes.apple.com/cn/app/sheng-shi-le-ju/id1000293279?mt=8&uo=4');
							/* location.href = "https://itunes.apple.com/cn/app/id1276056635?mt=8"; */
			        		location.href = "https://itunes.apple.com/cn/app/%E4%B9%90%E5%B1%85%E6%99%BA%E5%AE%B6/id1276056635?mt=8";
							
							
			        } 
			        //else if(browser.versions.android){
					else{
			                //是否在安卓浏览器打开
							//下载 安卓App
							//alert("Android");
							//window.open ('http://www.sslj.com/huodong/H5/AndroidAPP/app_sslj.apk');
							location.href = "http://www.lejuzhineng.com/huodong/AndroidAPP/app-release.apk";
							
			        }
					
			} else {
				alert("暂未开放");
			}
  }
  render(){
    return (
      <div>
	    <div className="down_main">
	    	<img className="down_bg" src="../../../src/resource/images/commen/down_bg.png" />
	    	<div className="down_button">
	    		<p className="down_icon">
	    			<img src="../../../src/resource/images/commen/down_logo.png" />
	    		</p>
	    		<p className="down_submit" onClick={this.download.bind(this)}>
	    			下载乐居智家App
	    		</p>
	    	</div>
	    </div>
	    <div id="tip" className="tip">
		    <img className="arrow" src="../../../src/resource/images/commen/arrow.png" />
		    <p className="tip_first">
		      <span className="tip_index">1</span>
		      点击右上角的
		      <img className="tip_menu" src="../../../src/resource/images/commen/menu.png" />
		      按钮
		    </p>
		    <p className="tip_two">
		      <span className="tip_index">2</span>
		      选择
		      <img className="with_browser" src="../../../src/resource/images/commen/browser.png" />
		    </p>
		  </div>
      </div>
    )
  }
}
export default Download
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
