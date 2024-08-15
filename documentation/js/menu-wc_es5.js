'use strict';

function _typeof(o) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o;
          }),
    _typeof(o)
  );
}
function _classCallCheck(a, n) {
  if (!(a instanceof n))
    throw new TypeError('Cannot call a class as a function');
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    (o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      'value' in o && (o.writable = !0),
      Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return (
    r && _defineProperties(e.prototype, r),
    t && _defineProperties(e, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, 'string');
  return 'symbol' == _typeof(i) ? i : i + '';
}
function _toPrimitive(t, r) {
  if ('object' != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || 'default');
    if ('object' != _typeof(i)) return i;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return ('string' === r ? String : Number)(t);
}
function _callSuper(t, o, e) {
  return (
    (o = _getPrototypeOf(o)),
    _possibleConstructorReturn(
      t,
      _isNativeReflectConstruct()
        ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor)
        : o.apply(t, e),
    )
  );
}
function _possibleConstructorReturn(t, e) {
  if (e && ('object' == _typeof(e) || 'function' == typeof e)) return e;
  if (void 0 !== e)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    );
  return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return e;
}
function _inherits(t, e) {
  if ('function' != typeof e && null !== e)
    throw new TypeError('Super expression must either be null or a function');
  (t.prototype = Object.create(e && e.prototype, {
    constructor: { value: t, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(t, 'prototype', { writable: !1 }),
    e && _setPrototypeOf(t, e);
}
function _wrapNativeSuper(t) {
  var r = 'function' == typeof Map ? new Map() : void 0;
  return (
    (_wrapNativeSuper = function _wrapNativeSuper(t) {
      if (null === t || !_isNativeFunction(t)) return t;
      if ('function' != typeof t)
        throw new TypeError(
          'Super expression must either be null or a function',
        );
      if (void 0 !== r) {
        if (r.has(t)) return r.get(t);
        r.set(t, Wrapper);
      }
      function Wrapper() {
        return _construct(t, arguments, _getPrototypeOf(this).constructor);
      }
      return (
        (Wrapper.prototype = Object.create(t.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
        _setPrototypeOf(Wrapper, t)
      );
    }),
    _wrapNativeSuper(t)
  );
}
function _construct(t, e, r) {
  if (_isNativeReflectConstruct())
    return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    );
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf('[native code]');
  } catch (n) {
    return 'function' == typeof t;
  }
}
function _setPrototypeOf(t, e) {
  return (
    (_setPrototypeOf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return (t.__proto__ = e), t;
        }),
    _setPrototypeOf(t, e)
  );
}
function _getPrototypeOf(t) {
  return (
    (_getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        }),
    _getPrototypeOf(t)
  );
}
customElements.define(
  'compodoc-menu',
  /*#__PURE__*/ (function (_HTMLElement) {
    function _class() {
      var _this;
      _classCallCheck(this, _class);
      _this = _callSuper(this, _class);
      _this.isNormalMode = _this.getAttribute('mode') === 'normal';
      return _this;
    }
    _inherits(_class, _HTMLElement);
    return _createClass(_class, [
      {
        key: 'connectedCallback',
        value: function connectedCallback() {
          this.render(this.isNormalMode);
        },
      },
      {
        key: 'render',
        value: function render(isNormalMode) {
          var tp = lithtml.html(
            '\n        <nav>\n            <ul class="list">\n                <li class="title">\n                    <a href="index.html" data-type="index-link">nest-template documentation</a>\n                </li>\n\n                <li class="divider"></li>\n                '
              .concat(
                isNormalMode
                  ? '<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>'
                  : '',
                '\n                <li class="chapter">\n                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>\n                    <ul class="links">\n                        <li class="link">\n                            <a href="overview.html" data-type="chapter-link">\n                                <span class="icon ion-ios-keypad"></span>Overview\n                            </a>\n                        </li>\n                        <li class="link">\n                            <a href="index.html" data-type="chapter-link">\n                                <span class="icon ion-ios-paper"></span>README\n                            </a>\n                        </li>\n                                <li class="link">\n                                    <a href="dependencies.html" data-type="chapter-link">\n                                        <span class="icon ion-ios-list"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class="link">\n                                    <a href="properties.html" data-type="chapter-link">\n                                        <span class="icon ion-ios-apps"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class="chapter modules">\n                        <a data-type="chapter-link" href="modules.html">\n                            <div class="menu-toggler linked" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#modules-links"'
                  : 'data-bs-target="#xs-modules-links"',
                '>\n                                <span class="icon ion-ios-archive"></span>\n                                <span class="link-name">Modules</span>\n                                <span class="icon ion-ios-arrow-down"></span>\n                            </div>\n                        </a>\n                        <ul class="links collapse " ',
              )
              .concat(
                isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"',
                '>\n                            <li class="link">\n                                <a href="modules/ApiPermissionModule.html" data-type="entity-link" >ApiPermissionModule</a>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-ApiPermissionModule-10a5feea140e9c88b9b35565d48dac543efdede5c9f59cf015ecc47ff06605875fe3db9a1294302d09def02fdffadca2b2b1d1d8256e527408e420052f9e419f"'
                  : 'data-bs-target="#xs-injectables-links-module-ApiPermissionModule-10a5feea140e9c88b9b35565d48dac543efdede5c9f59cf015ecc47ff06605875fe3db9a1294302d09def02fdffadca2b2b1d1d8256e527408e420052f9e419f"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-ApiPermissionModule-10a5feea140e9c88b9b35565d48dac543efdede5c9f59cf015ecc47ff06605875fe3db9a1294302d09def02fdffadca2b2b1d1d8256e527408e420052f9e419f"'
                  : 'id="xs-injectables-links-module-ApiPermissionModule-10a5feea140e9c88b9b35565d48dac543efdede5c9f59cf015ecc47ff06605875fe3db9a1294302d09def02fdffadca2b2b1d1d8256e527408e420052f9e419f"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/ApiPermissionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiPermissionService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>\n                            </li>\n                            <li class="link">\n                                <a href="modules/IamModule.html" data-type="entity-link" >IamModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"'
                  : 'data-bs-target="#xs-controllers-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"'
                  : 'id="xs-controllers-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/IamController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IamController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"'
                  : 'data-bs-target="#xs-injectables-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"'
                  : 'id="xs-injectables-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/IamService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IamService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/PermissionModule.html" data-type="entity-link" >PermissionModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"'
                  : 'data-bs-target="#xs-controllers-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"'
                  : 'id="xs-controllers-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/PermissionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"'
                  : 'data-bs-target="#xs-injectables-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"'
                  : 'id="xs-injectables-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/PermissionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/RoleModule.html" data-type="entity-link" >RoleModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"'
                  : 'data-bs-target="#xs-controllers-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"'
                  : 'id="xs-controllers-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/RoleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"'
                  : 'data-bs-target="#xs-injectables-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"'
                  : 'id="xs-injectables-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"'
                  : 'data-bs-target="#xs-controllers-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"'
                  : 'id="xs-controllers-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"'
                  : 'data-bs-target="#xs-injectables-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"'
                  : 'id="xs-injectables-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                </ul>\n                </li>\n                        <li class="chapter">\n                            <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links"'
                  : 'data-bs-target="#xs-controllers-links"',
                '>\n                                <span class="icon ion-md-swap"></span>\n                                <span>Controllers</span>\n                                <span class="icon ion-ios-arrow-down"></span>\n                            </div>\n                            <ul class="links collapse " ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links"'
                  : 'id="xs-controllers-links"',
                '>\n                                <li class="link">\n                                    <a href="controllers/ApiPermissionController.html" data-type="entity-link" >ApiPermissionController</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class="chapter">\n                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#classes-links"'
                  : 'data-bs-target="#xs-classes-links"',
                '>\n                            <span class="icon ion-ios-paper"></span>\n                            <span>Classes</span>\n                            <span class="icon ion-ios-arrow-down"></span>\n                        </div>\n                        <ul class="links collapse " ',
              )
              .concat(
                isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"',
                '>\n                            <li class="link">\n                                <a href="classes/ApiPermission.html" data-type="entity-link" >ApiPermission</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/ApiPermission-1.html" data-type="entity-link" >ApiPermission</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/ApiPermissionGroup.html" data-type="entity-link" >ApiPermissionGroup</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/ApiPermissionGroup-1.html" data-type="entity-link" >ApiPermissionGroup</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/ApiPermissionIdExistDto.html" data-type="entity-link" >ApiPermissionIdExistDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/InitUtil.html" data-type="entity-link" >InitUtil</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/ListResult.html" data-type="entity-link" >ListResult</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/OperationLog.html" data-type="entity-link" >OperationLog</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/OperationLog-1.html" data-type="entity-link" >OperationLog</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/PaginationApiPermissionDto.html" data-type="entity-link" >PaginationApiPermissionDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/PaginationApiPermissionResponseDto.html" data-type="entity-link" >PaginationApiPermissionResponseDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/PaginationDto.html" data-type="entity-link" >PaginationDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/PaginationPermissionDto.html" data-type="entity-link" >PaginationPermissionDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/PaginationPermissionResponse.html" data-type="entity-link" >PaginationPermissionResponse</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/PaginationRoleDto.html" data-type="entity-link" >PaginationRoleDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/PaginationRoleResponse.html" data-type="entity-link" >PaginationRoleResponse</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/PaginationUserDto.html" data-type="entity-link" >PaginationUserDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/Permission-1.html" data-type="entity-link" >Permission</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/PermissionGroup.html" data-type="entity-link" >PermissionGroup</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/PermissionGroup-1.html" data-type="entity-link" >PermissionGroup</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/PermissionIdExistDto.html" data-type="entity-link" >PermissionIdExistDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/Profile.html" data-type="entity-link" >Profile</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/Profile-1.html" data-type="entity-link" >Profile</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/Role.html" data-type="entity-link" >Role</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/Role-1.html" data-type="entity-link" >Role</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/RoleIdExistDto.html" data-type="entity-link" >RoleIdExistDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/Session.html" data-type="entity-link" >Session</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/Session-1.html" data-type="entity-link" >Session</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SignUpDto.html" data-type="entity-link" >SignUpDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SuccessOperationResponse.html" data-type="entity-link" >SuccessOperationResponse</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/TestHelper.html" data-type="entity-link" >TestHelper</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/UpdateApiPermissionDto.html" data-type="entity-link" >UpdateApiPermissionDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/User.html" data-type="entity-link" >User</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/User-1.html" data-type="entity-link" >User</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/UserIdExistDto.html" data-type="entity-link" >UserIdExistDto</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class="chapter">\n                            <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links"'
                  : 'data-bs-target="#xs-injectables-links"',
                '>\n                                <span class="icon ion-md-arrow-round-down"></span>\n                                <span>Injectables</span>\n                                <span class="icon ion-ios-arrow-down"></span>\n                            </div>\n                            <ul class="links collapse " ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links"'
                  : 'id="xs-injectables-links"',
                '>\n                                <li class="link">\n                                    <a href="injectables/DBValidationPipe.html" data-type="entity-link" >DBValidationPipe</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/ValidationI18nPipe.html" data-type="entity-link" >ValidationI18nPipe</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class="chapter">\n                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#guards-links"'
                  : 'data-bs-target="#xs-guards-links"',
                '>\n                            <span class="icon ion-ios-lock"></span>\n                            <span>Guards</span>\n                            <span class="icon ion-ios-arrow-down"></span>\n                        </div>\n                        <ul class="links collapse " ',
              )
              .concat(
                isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"',
                '>\n                            <li class="link">\n                                <a href="guards/ApiPermissionGuard.html" data-type="entity-link" >ApiPermissionGuard</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class="chapter">\n                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#interfaces-links"'
                  : 'data-bs-target="#xs-interfaces-links"',
                '>\n                            <span class="icon ion-md-information-circle-outline"></span>\n                            <span>Interfaces</span>\n                            <span class="icon ion-ios-arrow-down"></span>\n                        </div>\n                        <ul class="links collapse " ',
              )
              .concat(
                isNormalMode
                  ? ' id="interfaces-links"'
                  : 'id="xs-interfaces-links"',
                '>\n                            <li class="link">\n                                <a href="interfaces/BuildWhereOptions.html" data-type="entity-link" >BuildWhereOptions</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IAppConfig.html" data-type="entity-link" >IAppConfig</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/Route.html" data-type="entity-link" >Route</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/ValidateInDBOptions.html" data-type="entity-link" >ValidateInDBOptions</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/ValidateInDBResult.html" data-type="entity-link" >ValidateInDBResult</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class="chapter">\n                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#miscellaneous-links"'
                  : 'data-bs-target="#xs-miscellaneous-links"',
                '>\n                            <span class="icon ion-ios-cube"></span>\n                            <span>Miscellaneous</span>\n                            <span class="icon ion-ios-arrow-down"></span>\n                        </div>\n                        <ul class="links collapse " ',
              )
              .concat(
                isNormalMode
                  ? 'id="miscellaneous-links"'
                  : 'id="xs-miscellaneous-links"',
                '>\n                            <li class="link">\n                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>\n                            </li>\n                            <li class="link">\n                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>\n                            </li>\n                            <li class="link">\n                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class="chapter">\n                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>\n                    </li>\n                    <li class="divider"></li>\n                    <li class="copyright">\n                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">\n                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        ',
              ),
          );
          this.innerHTML = tp.strings;
        },
      },
    ]);
  })(/*#__PURE__*/ _wrapNativeSuper(HTMLElement)),
);
