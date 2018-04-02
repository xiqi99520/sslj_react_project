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
class Manager extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	msgUl_g:[],
	    	msgUl_s:[],
	    	msgUl_c:[],
	    	msgUl_new:[]
	    };
	  }
  goBack(){
	  this.props.history.goBack();
  }
  componentDidMount(){
	  try 
	  { 
		  var userAgent=navigator.userAgent;
		  var thisTitle='部门员工列表'
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
	  $(window).scroll(function () {
		  var thisHref=window.location.href;
		  var path=thisHref.split("#/")[1].split("/")[1];
		  if(path!="manager"){
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
			url : Base + "/companystaff/grid.do",
			dataType : "json",
			data:{
				companyId:that.props.match.params.company,
				pageSize:20,
				pageNo:num
			},
			success : function (data) {
				able_s=true;
				if(data.isSuccess==0){
					if(data.data.pageCount == page_s){//判断是否为最后一页
						end_s=true;
					}
					page_s++;
					$("#manager_password").html("部门加入编码："+data.bcm.password);
					msgUl_s=msgUl_s.concat($.extend(true,[],data.data.rows));
					$("#addUlSign").click();
				}else{
					alert(data.errorMsg);
				}
				
			}
		});  
  }
  getPageGoods(num){
	  var that=this;
	  $.ajax({
			type : "GET",
			url : Base + "/companystaff/gridExamine.do",
			dataType : "json",
			data:{
				companyId:that.props.match.params.company,
				pageSize:20,
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
  deleteMember(id,event){
	  $("#sureMsg").html("确定把此成员从部门中删除？");
	  $("#Sure").css("display","block");
	  $("#sureOk").bind("click",function(){
		  $("#sureOk").unbind();
		  $.ajax({
		       type:"post",
		       url: Base + "/companystaff/deleteById.do",
		       dataType:"json",
		       data:{
		    	   id:id
		       },
		       success:function(Message){
		         if(Message.isSuccess === "0"){
		        	 $("#success_msg").html("操作成功");
		        	 $("#Success").css("display","block");
		        	 setTimeout(function(){
		        		 $("#Success").css("display","none");
		        	 },1000);
		        	 window.location.reload();
		         }else{
		           alert(Message.errorMsg);
		         }
		       },
		       error:function (xhr,status,statusText){
		           alert("服务器维护");
		       }
		    });
	  });
  }
  toPower(id,event){
	  $("#sureMsg").html("确定给此成员管理权限？");
	  $("#Sure").css("display","block");
	  $("#sureOk").bind("click",function(){
		  $("#sureOk").unbind();
		  $.ajax({
		       type:"post",
		       url: Base + "/companystaff/updateSave.do",
		       dataType:"json",
		       data:{
		    	   id:id,
		    	   isAuthorize:1
		       },
		       success:function(Message){
		         if(Message.isSuccess === "0"){
		        	 $("#success_msg").html("操作成功");
		        	 $("#Success").css("display","block");
		        	 setTimeout(function(){
		        		 $("#Success").css("display","none");
		        	 },1000);
		        	 window.location.reload();
		         }else{
		           alert(Message.errorMsg);
		         }
		       },
		       error:function (xhr,status,statusText){
		           alert("服务器维护");
		       }
		    });
	  });
  }
  cancelPower(id,event){
	  $("#sureMsg").html("确定取消此成员的管理权限？");
	  $("#Sure").css("display","block");
	  $("#sureOk").bind("click",function(){
		  $("#sureOk").unbind();
		  $.ajax({
		       type:"post",
		       url: Base + "/companystaff/updateSave.do",
		       dataType:"json",
		       data:{
		    	   id:id,
		    	   isAuthorize:0
		       },
		       success:function(Message){
		         if(Message.isSuccess === "0"){
		        	 $("#success_msg").html("操作成功");
		        	 $("#Success").css("display","block");
		        	 setTimeout(function(){
		        		 $("#Success").css("display","none");
		        	 },1000);
		        	 window.location.reload();
		         }else{
		           alert(Message.errorMsg);
		         }
		       },
		       error:function (xhr,status,statusText){
		           alert("服务器维护");
		       }
		    });
	  });
  }
  refuse(id,event){
	  $("#sureMsg").html("拒绝此成员的加入部门？");
	  $("#Sure").css("display","block");
	  $("#sureOk").bind("click",function(){
		  $("#sureOk").unbind();
		  $.ajax({
		       type:"post",
		       url: Base + "/companystaff/deleteById.do",
		       dataType:"json",
		       data:{
		    	   id:id
		       },
		       success:function(Message){
		         if(Message.isSuccess === "0"){
		        	 $("#success_msg").html("操作成功");
		        	 $("#Success").css("display","block");
		        	 setTimeout(function(){
		        		 $("#Success").css("display","none");
		        	 },1000);
		        	 window.location.reload();
		         }else{
		           alert(Message.errorMsg);
		         }
		       },
		       error:function (xhr,status,statusText){
		           alert("服务器维护");
		       }
		    });
	  });
  }
  pass(id,event){
	  $("#sureMsg").html("允许此成员的加入部门？");
	  $("#Sure").css("display","block");
	  $("#sureOk").bind("click",function(){
		  $("#sureOk").unbind();
		  $.ajax({
		       type:"post",
		       url: Base + "/companystaff/updateSave.do",
		       dataType:"json",
		       data:{
		    	   id:id,
		    	   status:2
		       },
		       success:function(Message){
		         if(Message.isSuccess === "0"){
		        	 $("#success_msg").html("操作成功");
		        	 $("#Success").css("display","block");
		        	 setTimeout(function(){
		        		 $("#Success").css("display","none");
		        	 },1000);
		        	 window.location.reload();
		         }else{
		           alert(Message.errorMsg);
		         }
		       },
		       error:function (xhr,status,statusText){
		           alert("服务器维护");
		       }
		    });
	  });
  }
  render(){
	 var that=this;
	 var power=this.props.match.params.power;
    return (
      <div>
	    <div className="sr_nav">
	    	<p className="sr_menu manager_nav">
	    		<span id="nav_sign" className="sr_on" onClick={this.showSign.bind(this,1)}>部门人员列表</span>
	    		<span id="nav_goods" onClick={this.showGoods.bind(this)}>待审核</span>
	    	</p>
	    </div>
	    <p id="manager_password" className="manager_password">
	    </p>
	    <div id="Wsign" className="sr_main">
	    	<ul className="manager_ul">
	    		<li className="manager_th">
	    			<span className="m_left">姓名</span><span className="m_right">操作</span>
	    		</li>
	    		{
	    			this.state.msgUl_s.map(function(item,index){
	    				if(item.isManager==0){
	    					return (
		    						<li className="manager_td">
			    		    			<span className="m_left">{item.phone}</span>
			    		    			<span className="m_right">
			    		    				<em className={power==1?(item.isAuthorize==0?"manager_out":"manager_out dis_show"):"manager_out"} onClick={that.deleteMember.bind(that,item.id)}>删除</em>
			    		    				<em className={power==0?(item.isAuthorize==0?"manager_power":"manager_power manager_cancel_power"):"manager_power dis_show"} onClick={item.isAuthorize==0?that.toPower.bind(that,item.id):that.cancelPower.bind(that,item.id)}>{item.isAuthorize==0?"添加管理权限":"撤销管理权限"}</em>
			    		    			</span>
			    		    		</li>
		    				)
	    				}
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
		    <ul className="manager_ul">
				<li className="manager_th">
					<span className="mw_left">姓名</span>
					<span className="mw_center">时间</span>
					<span className="mw_right">操作</span>
				</li>
				{
	    			this.state.msgUl_g.map(function(item,index){
	    				var time=new Date(item.createDate);
	    				time=time.Format("yyyy-MM-dd hh:mm");
	    				if(item.isManager==0){
	    					return (
		    						<li className="manager_td">
			    						<span className="mw_left">{item.phone}</span>
			    						<span className="mw_center">{item.createDate}</span>
			    						<span className="mw_right">
			    							<em className={item.status=="1"?"manager_out":"manager_out dis_show"} onClick={that.refuse.bind(that,item.id)}>拒绝</em>
			    							<em className={item.status=="1"?"manager_power":"manager_power dis_show"} onClick={that.pass.bind(that,item.id)}>通过</em>
			    							<em className={item.status=="2"?"manager_did":"dis_show"}>已拒绝</em>
			    							<em className={item.status=="3"?"manager_did":"dis_show"}>未通过</em>
			    						</span>
			    					</li>
		    				)
	    				}
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
	    <span id="addUlSign" style={{display:"none"}} onClick={this.newSetSign.bind(this)}>点击</span>
	    <span id="addUlGoods" style={{display:"none"}} onClick={this.newSetGoods.bind(this)}>点击</span>
      </div>
    )
  }
}
export default Manager
