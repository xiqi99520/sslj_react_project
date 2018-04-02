/*window.base="http://10.1.6.241:8080/zzjj-app";*/
let Base = "/zzjj-app";
let Yzy = "http://118.190.121.138";
$.ajaxSetup({
	beforeSend:function(){
        $("#loading").css("display","block"); 
	},
	 complete: function(){
		 $("#loading").css("display","none");
	 }
});
/*var loader='<img style="display: none;" id="loading" class="loader_icon" src="/appWeb/resource/images/loading.gif" />';
$('body').append(loader);
*/
export {Base,Yzy}