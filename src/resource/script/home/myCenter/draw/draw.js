var my$;
import {Base} from './../../../connect.js';
import {SetCookie,GetCookie} from "./../../../cookie.js"
import "./../../../plugs/jQueryRotate.2.2.js"
require("./../../../../style/myCenter.css");
class Draw extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data:{"goodsTakeList":[]}
	    };
	  }
  componentWillMount(){
	  try 
	  { 
		  var userAgent=navigator.userAgent;
		  var thisTitle='积分抽奖'
		  document.title =thisTitle;
		  if(userAgent.indexOf('Android')>=0){
		      NAVIGATION.titleChange(thisTitle);
		  }
	  } 
	  catch(err) 
	  { 
	  } 
  }
  componentDidMount(){
	  var that=this;
	  $.ajax({
			type : "GET",
			url : Base + "/goodstake/getLuckDrawInfo.do",
			dataType : "json",
			data:{
				memberId:that.props.match.params.userId,
			},
			success : function (data) {
				if(data.isSuccess==0){
					that.setState({
						data:data
					});
					$("#ruleMsg").html(data.goodsTakeRule.content);
					 $("#cost_num").html(data.goodsTakeRule.integral);
					 $("#cost_num2").html(data.goodsTakeRule.integral);
				  	 $("#all_num").html(data.countPoint);
				}else{
					alert(data.errorMsg)
				}
				
			}
		});
	  var $btn = $('.rotate_part');// 旋转的div
	  var isture = 0;//是否正在抽奖
	  $(".plate_pointer").click(function() {
	    if(isture) return; // 如果在执行就退出
	    isture = true; // 标志为 在执行
	    if(Number($("#all_num").html())>=Number($("#cost_num").html())){
	    	$("#all_num").html($("#all_num").html()-$("#cost_num").html());
	    	rotateFunc(10000,36000,null,0);
	    	$.ajax({
				type : "GET",
				url : Base + "/goodstake/luckDraw.do",
				dataType : "json",
				data:{
					memberId:that.props.match.params.userId,
				},
				beforeSend:function(){
					$("#loading").css("display","none");
				},
				success : function (data) {
					if(data.isSuccess==0){
						var index;
						$(".thisId").each(function(){
							if($(this).html()==data.entity.id){
								index=$(this).parent().index()-1;
							}
						});
						var dom;
						switch(data.entity.goodsType){
							case "1" :
								dom=$("#success_box");
								$("#entity_pic").attr("src",data.entity.littleImageUrl);
								$("#entity").html(data.entity.goodsName);
								$(".success_detail").html("<a href='#/drawGoodsButton/"+that.props.match.params.userId+"/"+data.entity.id+"/"+data.orderId+"'>查看礼品详情 &gt;</a>");
								$(".success_pic").css("display","block");
								$(".success_detail").css("display","block");
								break;
							case "2" :
								dom=$("#success_box");
								$(".success_pic").css("display","none");
								$("#entity").html(data.entity.goodsName);
								$(".success_detail").css("display","none");
								break;
							case "3" :
								dom=$("#not_success");
								break;
						}
						rotateFunc(7000,60*index,dom,data.countPoint);
					}else{
						alert(data.errorMsg);
					}
				}
			});
		  }else{
			  $("#not_enough").css("display","block");
			  isture = false;
		  }
	    
	  });
	  var rotateFunc = function(time,angle,chooseDom,num) {
	    isture = true;
	    $btn.stopRotate();
	    $btn.rotate({
	      angle: 0,//旋转的角度数
	      duration: time, //旋转时间
	      animateTo: angle + 5040, //给定的角度,让它根据得出来的结果加上1440度旋转
	      callback: function() {
	        isture = false; // 标志为 执行完毕
	        if(chooseDom==null){
	        	return false;
	        }
	        chooseDom.css("display","block");
	        $("#all_num").html(num);
	      }
	    });
	  };
  }
  ruleClose(){
	  $("#rule").css("display","none");
  }
  ruleShow(){
	  $("#rule").css("display","block");
  }
  enoughClose(){
	  $("#not_enough").css("display","none");
  }
  successClose(){
	  $("#success_box").css("display","none");
  }
  notSuccessClose(){
	  $("#not_success").css("display","none");
  }
  clickAgain(){
	  $("#success_box").css("display","none");
	  $("#not_success").css("display","none");
	  $(".plate_pointer").click();
	  
  }
  render(){
    return (
    		<div className="draw_wrapper">
    			<img className="draw_bg" src="../../../src/resource/images/commen/draw/bg.jpg" />
    			<p className="draw_title">
    				<img src="../../../src/resource/images/commen/draw/title.png" />
    			</p>
    			<p className="draw_point">
    				我的积分<span id="all_num"></span>
				</p>
				<div className="draw_main">
					<img className="plate_border" src="../../../src/resource/images/commen/draw/wrapper.png" />
					<img className="plate_pointer" src="../../../src/resource/images/commen/draw/pointer.png" />
					<div className="rotate_part">
						<img className="plate_bg" src="../../../src/resource/images/commen/draw/center_bg.png" />
						{
							this.state.data.goodsTakeList.map(function(item,index){
								var goodImg="<img src='"+item.littleImageUrl+"' />";
								if(!item.littleImageUrl){
									goodImg="";
								}
								return (
										<div key={index} className={"draw_li rotate"+index}>
											<p className="dg_word">
												<span>{item.goodsName}</span>
											</p>
											<p className="dg_pic" dangerouslySetInnerHTML={{__html:goodImg}}>
											</p>
											<p className="thisId" style={{display:"none"}}>{item.id}</p>
										</div>
								)
							})
						}
					</div>
				</div>
				<p className="draw_tips">
					每抽取一次  将消耗<span id="cost_num"></span>积分
				</p>
				<p className="draw_button">
					<span onClick={this.ruleShow.bind(this)}>游戏规则</span>
					<a className="draw_right" href={"#/signRecord/"+this.props.match.params.userId+"/1"}>我的奖品</a>
				</p>
				<div id="rule" style={{display:"none"}}>
					<div className="box_bg hight_z" onClick={this.ruleClose.bind(this)}></div>
			    	<div className="draw_box">
			    		<img className="draw_close" onClick={this.ruleClose.bind(this)} src="../../../src/resource/images/commen/draw/close.png" />
			    		<p className="dr_title">
			    			游戏规则
			    		</p>
			    		<div id="ruleMsg" className="dr_tips dr_tips_span">
			    		</div>
			    	</div>
			    </div>
			    <div id="not_enough" style={{display:"none"}}>
					<div className="box_bg hight_z" onClick={this.enoughClose.bind(this)}></div>
			    	<div className="draw_box">
			    		<img className="draw_close" onClick={this.enoughClose.bind(this)} src="../../../src/resource/images/commen/draw/close.png" />
			    		<div className="dr_tips">
			    			<p className="pity_pic">
			    				<img src="../../../src/resource/images/commen/draw/pity.png" />
			    			</p>
			    			<p className="pity_word">
			    				当前积分不足
			    			</p>
			    			<p className="pity_word">
			    				继续加油哦~
			    			</p>
			    		</div>
			    	</div>
			    </div>
			    <div id="not_success" style={{display:"none"}}>
					<div className="box_bg hight_z" onClick={this.notSuccessClose.bind(this)}></div>
			    	<div className="draw_box">
			    		<img className="draw_close" onClick={this.notSuccessClose.bind(this)} src="../../../src/resource/images/commen/draw/close.png" />
			    		<div className="dr_tips">
			    			<p className="pity_pic">
			    				<img src="../../../src/resource/images/commen/draw/pity.png" />
			    			</p>
			    			<p className="pity_word">
			    				谢谢参与
			    			</p>
			    			<p className="success_again">
			    				<span onClick={this.clickAgain.bind(this)}>再抽一次</span>
			    			</p>
			    		</div>
			    	</div>
			    </div>
			    <div id="success_box" style={{display:"none"}}>
					<div className="box_bg hight_z" onClick={this.successClose.bind(this)}></div>
			    	<div className="draw_box">
			    		<img className="draw_close" onClick={this.successClose.bind(this)} src="../../../src/resource/images/commen/draw/close.png" />
			    		<p className="success_title">
			    			恭喜您！
			    		</p>
			    		<div className="success_main">
			    			<img className="success_bg" src="../../../src/resource/images/commen/draw/success_bg.png" />
			    			<p className="success_pic">
			    				<img id="entity_pic" src="../../../src/resource/images/commen/draw/close.png" />
			    			</p>
			    			<p className="success_type">
			    				您抽中了<span id="entity"></span>
			    			</p>
			    			<p className="success_detail">
			    				<a href="">查看礼品详情 &gt;</a>
			    			</p>
			    			<p className="success_again">
			    				<span onClick={this.clickAgain.bind(this)}>再抽一次</span>
			    			</p>
			    		</div>
			    	</div>
			    </div>
    		</div>
    )
  }
}
export default Draw
