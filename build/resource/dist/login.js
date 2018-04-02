webpackJsonp([1],{

/***/ 18:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cookie = __webpack_require__(0);

var _connect = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(22);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var my$;
__webpack_require__(18);

var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    _this.state = { msg: "" };
    return _this;
  }

  _createClass(Login, [{
    key: 'Login',
    value: function Login() {
      var phone = $("#phone").val();
      var password = $("#password").val();
      if (phone == "") {
        alert("手机号码不能为空");
        return false;
      }
      if (!/^1[3-9]\d{9}$/.test(phone)) {
        alert("手机号码格式不正确");
        return false;
      }
      if (password == "") {
        alert("请输入密码");
        return false;
      }
      $.ajax({
        type: "post",
        url: _connect.Base + "/login/passwordlogin.do",
        dataType: "json",
        data: {
          phone: phone,
          password: password
        },
        success: function success(Message) {
          var id = Message.isSuccess;
          if (id === "0") {
            (0, _cookie.SetCookie)("account", Message.account.account, 1);
            (0, _cookie.SetCookie)("otherId", Message.account.otherId, 1);
            (0, _cookie.SetCookie)("yPassword", Message.account.password, 1);
            (0, _cookie.SetCookie)("id", Message.data.id, 1);
            (0, _cookie.SetCookie)("telephone", Message.data.telephone, 1);
            (0, _cookie.SetCookie)("username", Message.data.username, 1);
            window.location.href = "App.html#/index";
          } else {
            alert(Message.errorMsg);
          }
        },
        error: function error(xhr, status, statusText) {
          alert("服务器维护");
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'login' },
        React.createElement(
          'div',
          { className: 'login_wrapper' },
          React.createElement(
            'p',
            { className: 'login_name' },
            React.createElement('img', { className: 'login_icon', src: '../../../src/resource/images/login/phone.png' }),
            React.createElement('input', { id: 'phone', className: 'login_input', type: 'text', placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7' })
          ),
          React.createElement(
            'p',
            { className: 'login_name' },
            React.createElement('img', { className: 'login_icon', src: '../../../src/resource/images/login/password.png' }),
            React.createElement('input', { id: 'password', className: 'login_input', type: 'password', placeholder: '\u8F93\u5165\u5BC6\u7801' })
          ),
          React.createElement(
            'p',
            { className: 'login_submit', onClick: this.Login.bind(this) },
            '\u767B\u5165'
          ),
          React.createElement(
            'p',
            { className: 'login_other' },
            React.createElement(
              'a',
              { className: 'to_register', href: 'App.html#/register' },
              '\u6CE8\u518C'
            ),
            React.createElement(
              'span',
              { className: 'login_separate' },
              '|'
            ),
            React.createElement(
              'a',
              { className: 'to_forget', href: 'App.html#/forget' },
              '\u5FD8\u8BB0\u5BC6\u7801'
            ),
            React.createElement(
              'a',
              { className: 'to_codeLogin', href: 'App.html#/codeLogin' },
              '\u9A8C\u8BC1\u7801\u767B\u5165'
            )
          )
        )
      );
    }
  }]);

  return Login;
}(React.Component);

exports.default = Login;
// ReactDOM.render(<Login />, document.getElementById('app'));

/***/ })

});