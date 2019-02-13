'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var noop = function noop() {};

function clickDrag(Component) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var touch = opts.touch || false;
  var resetOnSpecialKeys = opts.resetOnSpecialKeys || false;
  var getSpecificEventData =
    opts.getSpecificEventData ||
    function() {
      return {};
    };

  var onDragStart = opts.onDragStart || noop;
  var onDragStop = opts.onDragStop || noop;
  var onDragMove = opts.onDragMove || noop;

  var ClickDrag = (function(_React$Component) {
    _inherits(ClickDrag, _React$Component);

    function ClickDrag(props) {
      _classCallCheck(this, ClickDrag);

      var _this = _possibleConstructorReturn(
        this,
        (ClickDrag.__proto__ || Object.getPrototypeOf(ClickDrag)).call(this, props)
      );

      _this.onMouseDown = _this.onMouseDown.bind(_this);
      _this.onMouseUp = _this.onMouseUp.bind(_this);
      _this.onMouseMove = _this.onMouseMove.bind(_this);

      _this.state = {
        isMouseDown: false,
        isMoving: false,
        mouseDownPositionX: 0,
        mouseDownPositionY: 0,
        moveDeltaX: 0,
        moveDeltaY: 0,
      };

      _this.wasUsingSpecialKeys = false;
      return _this;
    }

    _createClass(ClickDrag, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var node = (0, _reactDom.findDOMNode)(this);

          node && node.addEventListener('mousedown', this.onMouseDown);
          document.addEventListener('mousemove', this.onMouseMove);
          document.addEventListener('mouseup', this.onMouseUp);

          if (touch) {
            node && node.addEventListener('touchstart', this.onMouseDown, { passive: true });
            document.addEventListener('touchmove', this.onMouseMove);
            document.addEventListener('touchend', this.onMouseUp);
          }
        },
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var node = (0, _reactDom.findDOMNode)(this);

          node && node.removeEventListener('mousedown', this.onMouseDown);
          document.removeEventListener('mousemove', this.onMouseMove);
          document.removeEventListener('mouseup', this.onMouseUp);

          if (touch) {
            node && node.removeEventListener('touchstart', this.onMouseDown, { passive: true });
            document.removeEventListener('touchmove', this.onMouseMove);
            document.removeEventListener('touchend', this.onMouseUp);
          }
        },
      },
      {
        key: 'onMouseDown',
        value: function onMouseDown(e) {
          e.preventDefault();
          // only left mouse button
          if (touch || e.button === 0) {
            var pt = (e.changedTouches && e.changedTouches[0]) || e;

            this.setMousePosition(pt.clientX, pt.clientY);

            onDragStart(e, this.props);
          }
        },
      },
      {
        key: 'onMouseUp',
        value: function onMouseUp(e) {
          e.preventDefault();
          if (this.state.isMouseDown) {
            this.setState({
              isMouseDown: false,
              isMoving: false,
            });

            onDragStop(e, this.props);
          }
        },
      },
      {
        key: 'onMouseMove',
        value: function onMouseMove(e) {
          e.preventDefault();
          if (this.state.isMouseDown) {
            var pt = (e.changedTouches && e.changedTouches[0]) || e;

            var isUsingSpecialKeys = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
            if (resetOnSpecialKeys && this.wasUsingSpecialKeys !== isUsingSpecialKeys) {
              this.wasUsingSpecialKeys = isUsingSpecialKeys;
              this.setMousePosition(pt.clientX, pt.clientY);
            } else {
              this.setState(
                _extends(
                  {
                    isMoving: true,
                    moveDeltaX: pt.clientX - this.state.mouseDownPositionX,
                    moveDeltaY: pt.clientY - this.state.mouseDownPositionY,
                  },
                  getSpecificEventData(e)
                )
              );
            }

            onDragMove(e, this.props);
          }
        },
      },
      {
        key: 'setMousePosition',
        value: function setMousePosition(x, y) {
          this.setState({
            isMouseDown: true,
            isMoving: false,
            mouseDownPositionX: x,
            mouseDownPositionY: y,
            moveDeltaX: 0,
            moveDeltaY: 0,
          });
        },
      },
      {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(
            Component,
            _extends({}, this.props, { dataDrag: this.state })
          );
        },
      },
    ]);

    return ClickDrag;
  })(_react2.default.Component);

  return ClickDrag;
}

exports.default = clickDrag;
