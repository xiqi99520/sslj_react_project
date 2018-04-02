require("./select.css");
var MobileSelect=require('./../../plugs/mobileSelect.min.js');
require('./../../plugs/mobileSelect.css');
$(function(){
  var selectTimer=["立即","1秒","2秒","3秒","4秒","5秒","6秒","7秒","8秒","9秒","10秒","11秒","12秒","13秒","14秒","15秒","16秒","17秒"]
  var option=["打开","关闭","自动翻转"];
  var twoSelect=[{data:selectTimer},{data:option}];
  var oneSelect = new MobileSelect({
      trigger: '#selectPlug1',
      title: '',
      wheels: [{data:selectTimer}],
      callback:function(indexArr, data){
          selectDom.html(data);
      }
  });
  var twoSelect = new MobileSelect({
      trigger: '#selectPlug2',
      title: '',
      wheels: twoSelect,
      callback:function(indexArr, data){
          selectDom.finds(".se_delay").html(data[0]);
          selectDom.finds(".se_action").html(data[0]);
      }
  });
});
