import {Helmet} from "react-helmet";
import {Link,Router,Route,history,HashRouter,BrowserRouter,Switch} from 'react-router-dom'

import "./../style/public.css";
import Public from './public.js';
import HomeIndex from './home/index.js';
import Login from './home/login/login.js';
import SceneLinkage from './home/scene/list.js';
import sceneEdit from './home/scene/sceneEdit.js';
import LinkageEdit from './home/scene/linkageEdit.js';
import LinkageTimer from './home/scene/linkageTimer.js';
import EquipmentListWrapper from './home/equipment/list.js';
import DefaultEquip from './home/equipment/ul/defaultEquip.js';
import Light from './home/equipment/ul/light.js';
import Socket from './home/equipment/ul/socket.js';
import Curtains from './home/equipment/ul/curtains.js';
import Video from './home/equipment/ul/video.js';
import Transponder from './home/equipment/ul/transponder.js';
import Template from './home/equipment/ul/template.js';
import Air from './home/equipment/ul/air.js';
import TV from './home/equipment/ul/TV.js';
import TemplateEdit from './home/equipment/ul/templateEdit.js';
import Door from './home/equipment/ul/door/door.js';
import InterimPassword from './home/equipment/ul/door/interimPassword.js';
import DoorRecord from './home/equipment/ul/door/record.js';
import DoorSet from './home/equipment/ul/door/set.js';
import Member from './home/equipment/ul/door/member.js';
import DoorTimer from './home/equipment/ul/door/doorTimer.js';
import MemberTimer from './home/equipment/ul/door/memberTimer.js';
import EqOption from './home/equipment/ul/eqOption.js';
import TVOption from './home/equipment/ul/TVOption.js';
import DefineTrans from './home/equipment/ul/defineTrans.js';
import DefineTransEdit from './home/equipment/ul/defineTransEdit.js';
import Cleaner from './home/equipment/ul/cleaner/index.js';
import CleanerMessage from './home/equipment/ul/cleaner/message.js';
import CodeLogin from './home/login/codeLogin.js';
import Register from './home/login/register.js';
import Forget from './home/login/forget.js';
import TimerList from './home/timer/list.js';
import TimerAdd from './home/timer/add.js';
import TimerEdit from './home/timer/edit.js';
import MyCenter from './home/myCenter/list.js';
import MySetting from './home/myCenter/setting.js';
import Complaint from './home/myCenter/complaint.js';
import Host from './home/myCenter/host.js';
import AboutUs from './home/myCenter/aboutUs.js';
import Message from './home/myCenter/message.js';
import Security from './home/security/index.js';
import SecuritySetting from './home/security/setting.js';
import Family from './home/myCenter/family/index.js';
import AddFamily from './home/myCenter/family/addFamily.js';
import AddFamilySure from './home/myCenter/family/addSure.js';
import FamilyDetail from './home/myCenter/family/detail.js';
import FamilyApply from './home/myCenter/family/apply.js';
import ShareEquipment from './home/myCenter/share/index.js';
import ShareAdd from './home/myCenter/share/addShare.js';
import ShareSure from './home/myCenter/share/addSure.js';
import Room from './home/myCenter/room/list.js';
import RoomAdd from './home/myCenter/room/add.js';
import RoomDetail from './home/myCenter/room/detail.js';
import addEqList from './home/addEquipment/list.js';
import addEqDetail from './home/addEquipment/detail.js';
import addEqHost from './home/addEquipment/host.js';
import addEqReset from './home/addEquipment/reset.js';
import AddRobot from './home/addEquipment/addRobot.js';
import House from './home/myCenter/house/list.js';
import HouseAdd from './home/myCenter/house/add.js';
import HouseDetail from './home/myCenter/house/detail.js';
import Qrcode from './home/addEquipment/qrcode.js';

import Question from './home/myCenter/question/list.js';
import QuestionDetail from './home/myCenter/question/detail.js';
import Download from './home/myCenter/download.js';
import Sign from './home/myCenter/sign/sign.js';
import SignRecord from './home/myCenter/sign/record.js';
import SignRule from './home/myCenter/sign/signRule.js';
import GoodList from './home/myCenter/goods/list.js';
import GoodsDetail from './home/myCenter/goods/detail.js';
import GoodsDetailDid from './home/myCenter/goods/detailDid.js';
import Draw from './home/myCenter/draw/draw.js';
import DrawGoods from './home/myCenter/draw/drawGoods.js';
import DrawGoodsButton from './home/myCenter/draw/drawGoodsButton.js';
import PointOrder from './home/myCenter/goods/order.js';
import AddressList from './home/myCenter/address/list.js';
import AddressAdd from './home/myCenter/address/add.js';
import AddressEdit from './home/myCenter/address/edit.js';
import ToRecommend from './home/myCenter/recommend/toRecommend.js';
import RecommendRule from './home/myCenter/recommend/rule.js';
import RecommendQrcode from './home/myCenter/recommend/qrcode.js';
import RecommendRecord from './home/myCenter/recommend/record.js';
import Recommended from './home/myCenter/recommend/recommended.js';
import HadRegister from './home/myCenter/recommend/hadRegister.js';
import QrcodeMsg from './home/myCenter/qrcode/setMsg.js';
import OrganizationJoin from './home/myCenter/organization/join.js';
import PhoneJoin from './home/myCenter/organization/phoneJoin.js';
import OrganizationManager from './home/myCenter/organization/manager.js';
import OrganizationDetail from './home/myCenter/organization/detail.js';
import Authentication from './home/myCenter/auth/auth.js';
import Shopping from './home/myCenter/shopping/index.js';
import HDExperience from './home/myCenter/huodong/index.js';
import MessageDetail from './home/myCenter/message/detail.js';
import goodProgress from './home/myCenter/goods/progress.js';
const Test = (location, cb) => {
  require.ensure([],function(){
    require("./home/login/login.js");
  },"login");
}
ReactDOM.render(
  (<HashRouter>
    <div>
	    <Route  path="/" component={Public}></Route>
		  <Route  exact path="/" component={HomeIndex}></Route>
		  <Route  exact path="/index" component={HomeIndex}></Route>
		  <Route  exact path="/scene/:index" component={SceneLinkage}></Route>
		  <Route  exact path="/scene/sceneEdit/:id/:name" component={sceneEdit}></Route>
		  <Route  exact path="/scene/linkageEdit/:name/:data" component={LinkageEdit}></Route>
		  <Route  exact path="/scene/linkageTimer/:id" component={LinkageTimer}></Route>
		  <Route  exact path="/equipment" component={EquipmentListWrapper}></Route>
		  <Route  exact path="/equipment/defaultEquip/:name/:shortAddress/:Endpoint/:eqSN/:DeviceId/:ZoneType/:IEEE" component={DefaultEquip}></Route>
		  <Route  exact path="/equipment/light/:name/:shortAddress/:Endpoint/:eqSN/:DeviceId/:ZoneType/:IEEE" component={Light}></Route>
		  <Route  exact path="/equipment/socket/:name/:shortAddress/:Endpoint/:eqSN/:DeviceId/:ZoneType/:IEEE" component={Socket}></Route>
		  <Route  exact path="/equipment/curtains/:name/:shortAddress/:Endpoint/:eqSN/:DeviceId/:ZoneType/:IEEE" component={Curtains}></Route>
		  <Route  exact path="/equipment/video" component={Video}></Route>
		  <Route  exact path="/equipment/transponder/:name/:shortAddress/:Endpoint/:eqSN/:DeviceId/:ZoneType/:IEEE" component={Transponder}></Route>
		  <Route  exact path="/equipment/template/:name/:shortAddress/:Endpoint/:eqSN/:DeviceId/:ZoneType/:IEEE" component={Template}></Route>
		  <Route  exact path="/equipment/templateEdit/:name/:shortAddress/:Endpoint/:eqSN/:DeviceId/:ZoneType/:IEEE" component={TemplateEdit}></Route>
		  <Route  exact path="/equipment/air" component={Air}></Route>
		  <Route  exact path="/equipment/TV/:id/:name/:shortAddress/:Endpoint/:deviceType" component={TV}></Route>
		  <Route  exact path="/equipment/defineTrans/:id/:name/:shortAddress/:Endpoint/:deviceType" component={DefineTrans}></Route>
		  <Route  exact path="/equipment/defineTransEdit/:id/:name/:shortAddress/:Endpoint/:deviceType" component={DefineTransEdit}></Route>
		  <Route  exact path="/equipment/door/:name/:shortAddress/:Endpoint/:eqSN/:DeviceId/:ZoneType/:IEEE" component={Door}></Route>
		  <Route  exact path="/equipment/interimPassword/:shortAddress/:Endpoint" component={InterimPassword}></Route>
		  <Route  exact path="/equipment/record/:deviceId" component={DoorRecord}></Route>
		  <Route  exact path="/equipment/set" component={DoorSet}></Route>
		  <Route  exact path="/equipment/member" component={Member}></Route>
		  <Route  exact path="/equipment/doorTimer" component={DoorTimer}></Route>
		  <Route  exact path="/equipment/memberTimer" component={MemberTimer}></Route>
		  <Route  exact path="/equipment/option/:name/:shortAddress/:Endpoint/:eqSN/:DeviceId/:ZoneType/:IEEE" component={EqOption}></Route>
		  <Route  exact path="/equipment/optionTv/:id/:name/:shortAddress/:Endpoint" component={TVOption}></Route>
		  <Route  exact path="/equipment/cleaner" component={Cleaner}></Route>
		  <Route  exact path="/equipment/cleanerMessage" component={CleanerMessage}></Route>
		  <Route path="/login" component={Login}></Route>
		  <Route path="/codeLogin" component={CodeLogin}></Route>
		  <Route path="/register" component={Register}></Route>
		  <Route path="/forget" component={Forget}></Route>
		  <Route path="/timerList/:num" component={TimerList}></Route>
		  <Route path="/timerAdd/:num" component={TimerAdd}></Route>
		  <Route path="/timerEdit/:index" component={TimerEdit}></Route>
		  <Route exact path="/myCenter" component={MyCenter}></Route>
		  <Route exact path="/myCenter/setting" component={MySetting}></Route>
		  <Route exact path="/myCenter/complaint" component={Complaint}></Route>
		  <Route exact path="/myCenter/host" component={Host}></Route>
		  <Route exact path="/myCenter/message" component={Message}></Route>
		  <Route exact path="/security" component={Security}></Route>
		  <Route exact path="/securitySetting" component={SecuritySetting}></Route>
		  <Route exact path="/myCenter/family" component={Family}></Route>
		  <Route exact path="/myCenter/addFamily/:index" component={AddFamily}></Route>
		  <Route exact path="/myCenter/addFamilySure" component={AddFamilySure}></Route>
		  <Route exact path="/myCenter/familyDetail" component={FamilyDetail}></Route>
		  <Route exact path="/myCenter/familyApply" component={FamilyApply}></Route>
		  <Route exact path="/myCenter/shareEquipment" component={ShareEquipment}></Route>
		  <Route exact path="/myCenter/shareAdd" component={ShareAdd}></Route>
		  <Route exact path="/myCenter/shareSure" component={ShareSure}></Route>
		  <Route exact path="/myCenter/room" component={Room}></Route>
		  <Route exact path="/myCenter/roomAdd" component={RoomAdd}></Route>
		  <Route exact path="/myCenter/roomDetail" component={RoomDetail}></Route>
		  <Route exact path="/addEquipment/list" component={addEqList}></Route>
		  <Route exact path="/addEquipment/detail/:index" component={addEqDetail}></Route>
		  <Route exact path="/addEquipment/host/:index" component={addEqHost}></Route>
		  <Route exact path="/addEquipment/reset/:index" component={addEqReset}></Route>
		  <Route exact path="/addEquipment/addRobot" component={AddRobot}></Route>
		  <Route exact path="/myCenter/house" component={House}></Route>
		  <Route exact path="/myCenter/houseAdd" component={HouseAdd}></Route>
		  <Route exact path="/myCenter/houseDetail/:index" component={HouseDetail}></Route>
		  <Route exact path="/addEquipment/qrcode" component={Qrcode}></Route>
		  
		  <Route exact path="/myCenter/aboutUs" component={AboutUs}></Route>
	      <Route exact path="/myCenter/question" component={Question}></Route>
	      <Route exact path="/myCenter/questionDetail/:id" component={QuestionDetail}></Route>
	      <Route exact path="/download" component={Download}></Route>
	      <Route exact path="/sign/:userId" component={Sign}></Route>
	      <Route exact path="/signRecord/:userId/" component={SignRecord}></Route>
	      <Route exact path="/signRecord/:userId/:nav" component={SignRecord}></Route>
	      <Route exact path="/signRule" component={SignRule}></Route>
	      <Route exact path="/goodList/:userId" component={GoodList}></Route>
	      <Route exact path="/goodsDetail/:userId/:sgId" component={GoodsDetail}></Route>
	      <Route exact path="/goodsDetailDid/:userId/:sgId" component={GoodsDetailDid}></Route>
	      <Route exact path="/draw/:userId" component={Draw}></Route>
	      <Route exact path="/drawGoods/:userId/:dgId" component={DrawGoods}></Route>
	      <Route exact path="/drawGoodsButton/:userId/:dgId/:orderId" component={DrawGoodsButton}></Route>
	      <Route exact path="/order/:userId/:sgId/:dgId/:addressId/:orderId" component={PointOrder}></Route>
	      <Route exact path="/addressList/:userId/:sgId/:dgId/:addressId/:orderId" component={AddressList}></Route>
	      <Route exact path="/addressAdd/:userId/:sgId/:dgId/:addressId/:orderId" component={AddressAdd}></Route>
	      <Route exact path="/addressEdit/:userId/:sgId/:dgId/:addressId/:orderId" component={AddressEdit}></Route>
	      <Route exact path="/toRecommend/:id/:phone" component={ToRecommend}></Route>
	      <Route exact path="/recommended/:id/:phone" component={Recommended}></Route>
	      <Route exact path="/recommendRule/:id/:phone" component={RecommendRule}></Route>
	      <Route exact path="/recommendQrcode/:id/:phone" component={RecommendQrcode}></Route>
	      <Route exact path="/recommendRecord/:id/:phone" component={RecommendRecord}></Route>
	      <Route exact path="/hadRegister/:id/:phone" component={HadRegister}></Route>
	      <Route exact path="/qrcodeMsg/:id" component={QrcodeMsg}></Route>
	      <Route exact path="/organization/join/:id" component={OrganizationJoin}></Route>
	      <Route exact path="/organization/phoneJoin" component={PhoneJoin}></Route>
	      <Route exact path="/organization/detail/:id" component={OrganizationDetail}></Route>
	      <Route exact path="/organization/manager/:id/:company/:power" component={OrganizationManager}></Route>
	      <Route exact path="/auth/:id" component={Authentication}></Route>
	      <Route exact path="/shopping/:id" component={Shopping}></Route>
	      <Route exact path="/shopping" component={Shopping}></Route>
	      <Route exact path="/HDExperience" component={HDExperience}></Route>
	      <Route exact path="/message/:id" component={MessageDetail}></Route>
	      <Route exact path="/progress" component={goodProgress}></Route>
    </div>
  </HashRouter>)
, document.getElementById('app'));

