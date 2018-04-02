let SetCookie= function(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = encodeURI(cname) + "=" + encodeURI(cvalue) + ";" + expires+"; path=/";
}
let GetCookie=function (cname)
{
  var name = encodeURI(cname) + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++)
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return decodeURI(c.substring(name.length,c.length));
  }
  return "";
}
export {SetCookie,GetCookie}
