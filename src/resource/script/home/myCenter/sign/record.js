var my$;
require("./../../../../style/myCenter.css");
import {Base} from './../../../connect.js';
import {Format} from './../../../time.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
var page_g=1;/*当前页*/
var able_g=true;
var end_g=false;/*当前页*/
var pageSize=10;//默认查询10条
var msgUl_g=[];
var page_s=1;/*当前页*/
var able_s=true;
var end_s=false;/*当前页*/
var msgUl_s=[];
var page_c=1;/*当前页*/
var able_c=true;
var end_c=false;/*当前页*/
var msgUl_c=[];
class SignRecord extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	msgUl_g:[],
	    	msgUl_s:[],
	    	msgUl_c:[]
	    };
	  }
  goBack(){
	  this.props.history.goBack();
  }
  componentDidMount(){
	  try 
	  { 
		  var userAgent=navigator.userAgent;
		  var thisTitle='积分及礼品记录'
		  document.title =thisTitle;
		  if(userAgent.indexOf('Android')>=0){
		      NAVIGATION.titleChange(thisTitle);
		  }
	  } 
	  catch(err) 
	  { 
	  }
	  var that=this;
	  msgUl_s=[];
	  this.getPageSign(1);
	  page_s=1;
	  able_s=false;
	  end_s=false;
	  
	  msgUl_g=[];
	  this.getPageGoods(1);
	  page_g=1;
	  able_g=false;
	  end_g=false;
	  
	  msgUl_c=[];
	  this.getPageCash(1);
	  page_c=1;
	  able_c=false;
	  end_c=false;
	  if(that.props.match.params.nav==1){
		  $("#nav_goods").click();
	  }
	  if(that.props.match.params.nav==2){
		  $("#nav_cash").click();
	  }
	  $(window).scroll(function () {
		  var thisHref=window.location.href;
		  var path=thisHref.split("#/")[1].split("/")[0];
		  if(path!="signRecord"){
			  return false;
		  }
		  if($("#nav_sign").hasClass("sr_on")){
			  if(end_s==0 && able_s==true){
					if (($(window).height() + $(window).scrollTop()+30) >= $("body").height()) {
						that.getPageSign(page_s);
						able_s=false;
					}
				}
		  }else if($("#nav_goods").hasClass("sr_on")){
				if(end_g==0 && able_g==true){
					if (($(window).height() + $(window).scrollTop()+30) >= $("body").height()) {
						that.getPageGoods(page_g);
						able_g=false;
					}
				}
		  }else{
			  if(end_c==0 && able_c==true){
					if (($(window).height() + $(window).scrollTop()+30) >= $("body").height()) {
						that.getPageCash(page_c);
						able_c=false;
					}
				}
		  }
	  });
  }
  getPageSign(num){
	  var that=this;
	  $.ajax({
			type : "GET",
			url : Base + "/memberintegrallog/grid.do",
			dataType : "json",
			data:{
				memberId:that.props.match.params.userId,
				pageSize:10,
				pageNo:num
			},
			success : function (data) {
				able_s=true;
				if(data.isSuccess==0){
					if(data.data.pageCount == page_s){//判断是否为最后一页
						end_s=true;
					}
					page_s++;
					msgUl_s=msgUl_s.concat($.extend(true,[],data.data.rows));
					$("#addUlSign").click();
				}else{
					alert(data.errorMsg)
				}
				
			}
		});  
  }
  getPageGoods(num){
	  var that=this;
	  $.ajax({
			type : "GET",
			url : Base + "/orderform/grid.do",
			dataType : "json",
			data:{
				memberId:that.props.match.params.userId,
				pageSize:10,
				pageNo:num
			},
			success : function (data) {
				able_g=true;
				if(data.isSuccess==0){
					if(data.data.pageCount == page_g){//判断是否为最后一页
						end_g=true;
					}
					page_g++;
					msgUl_g=msgUl_g.concat($.extend(true,[],data.data.rows));
					$("#addUlGoods").click();
				}else{
					alert(data.errorMsg)
				}
			}
		});  
  }
  getPageCash(num){
	  var that=this;
	  $.ajax({
			type : "GET",
			url : Base + "/withdrawapplication/grid.do",
			dataType : "json",
			data:{
				memberId:that.props.match.params.userId,
				pageSize:10,
				pageNo:num
			},
			success : function (data) {
				able_c=true;
				if(data.isSuccess==0){
					if(data.data.pageCount == page_c){//判断是否为最后一页
						end_c=true;
					}
					page_c++;
					msgUl_c=msgUl_c.concat($.extend(true,[],data.data.rows));
					$("#addUlCash").click();
				}else{
					alert(data.errorMsg);
				}
			}
		});  
  }
  newSetSign(){
	  this.setState({
		  msgUl_s:msgUl_s
		});
	  if(msgUl_s.length>0){
		  $("#none1").css("display","none");
	  }else{
		  $("#none1").css("display","block");
	  }
  }
  newSetGoods(){
	  this.setState({
		  msgUl_g:msgUl_g
		});
	  if(msgUl_g.length>0){
		  $("#none2").css("display","none");
	  }else{
		  $("#none2").css("display","block");
	  }
  }
  newSetCash(){
	  this.setState({
		  msgUl_c:msgUl_c
		});
	  if(msgUl_c.length>0){
		  $("#none3").css("display","none");
	  }else{
		  $("#none3").css("display","block");
	  }
  }
  showSign(){
	  $("#nav_sign").addClass("sr_on");
	  $("#nav_goods").removeClass("sr_on");
	  $("#nav_cash").removeClass("sr_on");
	  $("#Wgood").css("display","none");
	  $("#Wcash").css("display","none");
	  $("#Wsign").css("display","block");
  }
  showGoods(){
	  $("#nav_sign").removeClass("sr_on");
	  $("#nav_goods").addClass("sr_on");
	  $("#nav_cash").removeClass("sr_on");
	  $("#Wsign").css("display","none");
	  $("#Wcash").css("display","none");
	  $("#Wgood").css("display","block");
	  
  }
  showCash(){
	  $("#nav_sign").removeClass("sr_on");
	  $("#nav_goods").removeClass("sr_on");
	  $("#nav_cash").addClass("sr_on");
	  $("#Wsign").css("display","none");
	  $("#Wgood").css("display","none");
	  $("#Wcash").css("display","block");
  }
  render(){
	 var that=this;
    return (
      <div>
	    <div className="sr_nav">
	    	<p className="sr_menu">
	    		<span id="nav_sign" className="sr_on" onClick={this.showSign.bind(this)}>积分记录</span>
	    		<span id="nav_goods" onClick={this.showGoods.bind(this)}>兑换记录</span>
	    		<span id="nav_cash" onClick={this.showCash.bind(this)}>提现记录</span>
	    	</p>
	    </div>
	    <div id="Wsign" className="sr_main">
	    	<ul className="sr_ul">
	    		{
	    			this.state.msgUl_s.map(function(item,index){
	    				var time=new Date(item.createDate);
	    				time=time.Format("yyyy-MM-dd hh:mm");
	    				return (
	    						<li key={"sr"+index}>
		    		    			<span className="sr_point"></span>
		    		    			<p className="sr_num">{item.typeId==1?"-":"+"}{item.integral}</p>
		    		    			<p className="sr_sign">{item.mark}</p>
		    		    			<p className="sr_date">{time}</p>
		    		    		</li>
	    				)
	    			})
	    		}
	    	</ul>
	    	<div id="none1" className="none_show">
		  		<p className="none_pic">
		  			<img src="../../../src/resource/images/commen/null.png" />
		  		</p>
		  		<p className="none_word">
		  			暂无记录~
		  		</p>
		  	</div>
	    </div>
	    <div id="Wgood" className="goods_record" style={{display:"none"}}>
		    <ul className="goods_ul">
				{
		    		this.state.msgUl_g.map(function(item,index){
		    			var buttonMsg,gr_type,toUrl,drawIcon;
		    			if(item.goodsType==1){
		    				drawIcon="<span class='draw_icon'>兑换</span>";
		    				gr_type=item.integral+"积分";
		    				toUrl="#/goodsDetailDid/"+that.props.match.params.userId+"/"+item.goodsId;
		    				if(item.status==2){
		    					buttonMsg='<p class="had_word">已兑换</p>';
		    				}else{
		    					buttonMsg='<p class="had_word">已兑换</p>';
		    				}
		    			}else{
		    				drawIcon="<span class='draw_icon'>抽奖</span>";
		    				gr_type="&nbsp;";
		    				toUrl="#/drawGoods/"+that.props.match.params.userId+"/"+item.goodsId;
		    				if(item.status==1){
		    					toUrl="#/order/"+that.props.match.params.userId+"/null/"+item.goodsId+"/null/"+item.id;
		    					buttonMsg='<p class="goods_exchange">去领取</p>';
		    				}else if(item.status==2){
		    					buttonMsg='<p class="had_word">已领取</p>';
		    				}else{
		    					buttonMsg='<p class="had_word">已领取</p>';
		    				}
		    			}
		    			return (
		    					<li key={"gr"+index}>
		    						<div dangerouslySetInnerHTML={{__html:drawIcon}}>
			    	    			</div>
		    						<a href={toUrl}>
				    	    			<p className="goods_pic">
				    	    				<img src={item.goodsImg} />
				    	    			</p>
				    	    			<p className="goods_name">
				    	    			{item.goodsName}
				    	    			</p>
			    	    				<p id="gr_type" className="goods_points" dangerouslySetInnerHTML={{__html:gr_type}}>
				    	    			</p>
				    	    			<div className="gr_statu"  dangerouslySetInnerHTML={{__html:buttonMsg}}>
				    	    			</div>
			    	    			</a>
			    	    		</li>
		    			)
		    		})
		    	}
			</ul>
			<div id="none2" className="none_show">
		  		<p className="none_pic">
		  			<img src="../../../src/resource/images/commen/null.png" />
		  		</p>
		  		<p className="none_word">
		  			暂无记录~
		  		</p>
		  	</div>
	    </div>
	    <div id="Wcash" className="sr_main" style={{display:"none"}}>
	    	<ul className="sr_ul">
	    		{
	    			this.state.msgUl_c.map(function(item,index){
	    				var time=new Date(item.createDate);
	    				time=time.Format("yyyy-MM-dd hh:mm");
	    				return (
	    						<li key={"sr"+index}>
		    		    			<span className="sr_point"></span>
		    		    			<p className="sr_num">+{item.money}</p>
		    		    			<p className="sr_sign">提现</p>
		    		    			<p className="sr_date">{item.createDate}</p>
		    		    		</li>
	    				)
	    			})
	    		}
	    	</ul>
	    	<div id="none3" className="none_show">
		  		<p className="none_pic">
		  			<img src="../../../src/resource/images/commen/null.png" />
		  		</p>
		  		<p className="none_word">
		  			暂无记录~
		  		</p>
		  	</div>
	    </div>
	    <span id="addUlSign" style={{display:"none"}} onClick={this.newSetSign.bind(this)}>点击</span>
	    <span id="addUlGoods" style={{display:"none"}} onClick={this.newSetGoods.bind(this)}>点击</span>
	    <span id="addUlCash" style={{display:"none"}} onClick={this.newSetCash.bind(this)}>点击</span>
      </div>
    )
  }
}
export default SignRecord
// ReactDOM.render(<SceneLinkage />, document.getElementById('app'));
