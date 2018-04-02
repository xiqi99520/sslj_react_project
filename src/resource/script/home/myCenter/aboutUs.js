var my$;
require("./../../../style/myCenter.css");
import {SetCookie,GetCookie} from "./../../cookie.js"
class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data:[]
    };
  }
  componentWillMount(){
	  try 
	  { 
		  var userAgent=navigator.userAgent;
		  var thisTitle='关于我们';
		  document.title =thisTitle;
		  if(userAgent.indexOf('Android')>=0){
		      NAVIGATION.titleChange(thisTitle);
		  }
	  } 
	  catch(err) 
	  { 
	  }
  }
  goBack(){
	  this.props.history.goBack();
  }
  render(){
    return (
    	<div>
	    	<p className="head_nav">
		    	<img className="url_back" onClick={this.goBack.bind(this)} src="../../../src/resource/images/url_back.png" />
		    	关于我们
		    </p>
	    	<div className="mycenter">
	    		<p className="us_head">
	            	盛世乐居（纳斯达克股票代码：SSLJ）
	            </p>
	            <p className="us_word">
	            	中国智能家装赴美上市第一股，中国互联网智能家装领军企业，首提互联网智能家装理念，旗下业务包含：一站式整体智能家装（硬软装+智能家居）服务、智能家居科技产品服务，基于互联网技术，以家装为入口，安装全房智能家居，建立用户大数据云平台，打造智能家居闭环生态圈，提前布局未来中国智慧家庭核心入口。
	            </p>
	            <p className="us_pic">
	            	<img src="../../../src/resource/images/myCenter/aboutUs/1.jpg" />
	            </p>
	            <p className="us_head">
	            	乐居智能
	            </p>
	            <p className="us_word">
	            	盛世乐居（亚东）智能科技有限公司（简称乐居智能）是盛世乐居旗下全资子公司，是家装智能硬件的重要战略布局，致力于用科技创新产品，用智能提升品质，让家更有温度。
	            </p>
	            <p className="us_pic">
	            	<img src="../../../src/resource/images/myCenter/aboutUs/2.png" />
	            </p>
	            <p className="us_word">
	            	人性化APP操作页面，简单，直观，易操作
	            </p>
	            <p className="us_word">
	            	多设备联动，一键操控多个设备产品
	            </p>
	            <p className="us_word">
	            	安防、场景个性化设置，随时关注家里动态
	            </p>
	            <p className="us_word">
	            	人机互动，语音控制所有智能设备，家人共享设备模式
	            </p>
	            <p className="us_word">
	            	积分商城，欢乐转盘抽奖奖品兑换
	            </p>
	            <p className="us_pic">
	            	<img src="../../../src/resource/images/myCenter/aboutUs/3.png" />
	            </p>
	            <p className="us_head">
	            	乐居智能 让你的家更懂你
	            </p>
	            <p className="us_word">
	            	国防安全级别云平台系统：
	            </p>
	            <p className="us_word">
	            	自主搭建乐云IoT，密钥由公司内部核心技术生成，周期性更换，依据军工级别规则进行加密处理。
	            </p>
	            <p className="us_word">
	            	采用美国国家技术研究所加密规范AES技术算法，确保用户信息安全性，隐私保障机制达高等级。
	            </p>
	            <p className="us_pic">
	            	<img src="../../../src/resource/images/myCenter/aboutUs/4.png" />
	            </p>
	            <p className="us_word">
	            	乐居智能产品及功能直接面对终端用户，以此辐射酒店、房地产商、装饰公司及设计师等，为这类客户提供智能家居服务。对辐射客户所处行业领域需求痛点，及每个直面用户不同的体验感，提供贴合用户体验的个性化方案。
	            </p>
	            <p className="us_pic">
	            	<img src="../../../src/resource/images/myCenter/aboutUs/5.jpg" />
	            </p>
	            <p className="us_head">
	            	智能家装系统方案
	            </p>
	            <p className="us_pic">
	            	<img src="../../../src/resource/images/myCenter/aboutUs/6.png" />
	            </p>
	            <p className="us_head">
	            	八大智能家居功能
	            </p>
	            <p className="us_pic">
	            	<img src="../../../src/resource/images/myCenter/aboutUs/7.png" />
	            </p>
	            <p className="us_head">
	            	七大产品特点
	            </p>
	            <p className="us_pic">
	            	<img src="../../../src/resource/images/myCenter/aboutUs/8.png" />
	            </p>
	            <p className="us_head">
	            	八大功能
	            </p>
	            <p className="us_pic">
	            	<img src="../../../src/resource/images/myCenter/aboutUs/9.png" />
	            </p>
	            <p className="us_head">
	            	十大智能生活场景模式
	            </p>
	            <p className="us_pic">
	            	<img src="../../../src/resource/images/myCenter/aboutUs/10.png" />
	            </p>
	            <p className="us_pic">
	            	<img src="../../../src/resource/images/myCenter/aboutUs/11.png" />
	            </p>
	            <p className="us_head">
	            	盛世乐居智能家居生态圈
	            </p>
	            <p className="us_word">
	            	乐居智能立足原创设计与创新技术驱动，将智能家居产品全方位植入家庭生活，实现先进科技跟便捷生活的无缝连接，同时借助家庭用户的高频次使用，形成精准匹配的用户数据、家居家电数据、楼宇房型数据等，从而触发产品的二次及多次开发，并通过整合先进人才与布局金融资本，使得“用户数据+智能家居+消费金融+人才资源”四大系统形成完美闭环，打造盛世乐居智能家居生态圈，实现智能家庭生活的舒适便捷。
	            </p>
	            <p className="us_pic">
	            	<img style={{"margin-left":"2rem"}} src="../../../src/resource/images/myCenter/aboutUs/12.png" />
	            </p>
	            <p className="us_word">
	            	未来的乐居智能，除了在居住空间不断完善安防监控系统，环境调节系统、家庭娱乐系统、厨房语音系统等，重点研发人工智能、健康检测系统等智能科技，建立分享交流平台，搭建社区服务，以人为轴心，构建成盛世乐居智能家居人文大生态。
	            </p>
	            <p className="us_pic">
	            	<img style={{"width":"75%"}} src="../../../src/resource/images/myCenter/aboutUs/13.jpg" />
	            </p>
	        </div>
        </div>
    )
  }
}
export default AboutUs
// ReactDOM.render(<Complaint />, document.getElementById('app'));
