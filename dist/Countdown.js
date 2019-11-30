import _objectSpread from "/home/ievgen/Documents/www/countdown-module/node_modules/@babel/runtime/helpers/esm/objectSpread";
import { addDefaultStyles, dateToSeconds } from './helpers';
import { addDigitsBlock } from './htmlHelpers';

var Countdown = function Countdown(cfg) {
  var digits = [["a", "b", "c", "d", "e", "f", "x", "x"], ["b", "c", "x", "x", "x", "x", "x", "x"], ["a", "b", "g", "e", "d", "x", "x", "x"], ["a", "b", "c", "d", "g", "x", "x", "x"], ["f", "b", "g", "c", "x", "x", "x", "x"], ["a", "f", "g", "c", "d", "x", "x", "x"], ["a", "f", "c", "d", "e", "g", "x", "x"], ["a", "b", "c", "x", "x", "x", "x", "x"], ["a", "b", "c", "d", "e", "f", "g", "x"], ["a", "b", "g", "f", "c", "d", "x", "x"]],
      loop,
      time,
      tmpSeconds,
      days,
      hours,
      minutes,
      currSeconds,
      currMinutes,
      currHours,
      autosize,
      moreStyles,
      ids = [],
      styles = {};
  var config = {};
  var seconds = 0;
  var callback = null;
  addDefaultStyles();
  var moreStyles = document.createElement('style');
  moreStyles.type = 'text/css';
  document.querySelector('head').appendChild(moreStyles);
  /**
   * Set Params
   * param cfg: { element, seconds, callback, ratio }
   */

  var setParams = function setParams(cfg) {
    seconds = cfg.seconds || 10;
    callback = cfg.callback || undefined;
    if (!callback) callback = function callback() {
      return;
    };
    if (cfg.date) seconds = dateToSeconds(cfg.date);
  };

  var altArrStyleProp = function altArrStyleProp(arr, prop, value) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].style[prop] = value;
    }
  };

  var sendAll = function sendAll() {
    sendDigits("seconds", currSeconds + '');
    sendDigits("minutes", currMinutes + '');
    sendDigits("hours", currHours + '');
    sendDigits("days", days + '');
  };

  var startTime = function startTime() {
    // evaluate 
    days = ~~(seconds / (3600 * 24));
    hours = ~~(seconds / 3600);
    minutes = ~~(seconds / 60);
    currSeconds = seconds % 60;
    currMinutes = minutes % 60;
    currHours = hours % 24;
    time = new Date();
    tmpSeconds = time.getSeconds(); // push to render

    sendAll(); // start loop

    setLoop();
  };

  var setLoop = function setLoop() {
    loop = setInterval(function () {
      /* update time */
      time = new Date();
      /* trigger if seconds change */

      if (time.getSeconds() === tmpSeconds) return;
      tmpSeconds = time.getSeconds();

      if (currSeconds == 0) {
        if (days + currHours + currMinutes) {
          currSeconds = 59;
          sendDigits("seconds", currSeconds + '');

          if (currMinutes > 0) {
            currMinutes--;
            sendDigits("minutes", currMinutes + '');
          } else if (currHours > 0) {
            currHours--;
            sendDigits("hours", currHours + '');
            currMinutes = 59;
            sendDigits("minutes", currMinutes + '');
          } else {
            days--;
            sendDigits("days", days + '');
            currHours = 23;
            sendDigits("hours", currHours + '');
            currMinutes = 59;
            sendDigits("minutes", currMinutes + '');
          }
        } else {
          clearInterval(loop);
          if (callback) callback();
        }
      } else {
        currSeconds--;
        sendDigits("seconds", currSeconds + '');
      }
    }, 500);
  };

  var sendDigits = function sendDigits(variable, arr) {
    if (arr.length === 1) {
      evalDigit(variable, "high", digits[0]);
      evalDigit(variable, "low", digits[arr]);
    } else {
      evalDigit(variable, "high", digits[arr[0]]);
      evalDigit(variable, "low", digits[arr[1]]);
    }
  };

  var evalDigit = function evalDigit(v, add, arr) {
    var i,
        wClass = 'counter-' + add + '-' + v,
        wrap = document.getElementsByClassName(wClass);
    if (!wrap) return;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = wrap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var w = _step.value;
        var children = w.children[0].children,
            c;
        if (!children) return;

        for (i = 0; i < 7; i++) {
          c = children[i];
          if (c.classList[1]) c.classList.remove(c.classList[1]);
          if (arr && arr[i] !== "x") c.classList.add("part-" + arr[i]);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  var setDynamicStyles = function setDynamicStyles() {
    var text = '';
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = ids[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var i = _step2.value;
        if (styles[i]) text += styles[i];
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    moreStyles.innerHTML = text;
  };

  var updateBlock = function updateBlock(_ref) {
    var wrapId = _ref.wrapId,
        color = _ref.color,
        ratio = _ref.ratio,
        paddingX = _ref.paddingX,
        paddingY = _ref.paddingY,
        reduceHeightGap = _ref.reduceHeightGap;
    if (!wrapId) return; //

    var wrapBB, w, h, digitsBlock, digitWrap, wpart, wleftover, hpart, hleftover, wlength, hlength, hpartial, wpadding, hpadding;
    var wrap = document.getElementById(wrapId);
    if (!wrap) return;
    styles[wrapId] = '';
    wrapBB = wrap.getBoundingClientRect();
    w = wrapBB.width;
    h = wrapBB.height;
    /* w */

    wleftover = w % 9;
    wpart = (w - wleftover) / 9; //wrap.style.paddingLeft = ~~(wleftover/2) + 'px';

    if (wleftover && wrap.children && wrap.children[0]) wrap.children[0].style.paddingLeft = wleftover / 2 + 'px';
    digitsBlock = document.querySelectorAll('#' + wrapId + ' .counter-digits-block');
    digitWrap = document.querySelectorAll('#' + wrapId + ' .counter-digit-wrap');
    altArrStyleProp(digitsBlock, 'width', wpart * 9 + 'px');
    altArrStyleProp(digitWrap, 'width', wpart * 4 + 'px');
    wlength = wpart * 4;
    /* h */

    autosize = ratio || !wrapBB.height ? false : true;

    if (autosize) {
      hleftover = h % 13;
      hpart = (h - hleftover) / 13;
      hlength = hpart * 6;
      if (hleftover) styles[wrapId] += '#' + wrapId + ' .counter-part { top:' + hleftover / 2 + 'px; }';
    } else {
      if (!ratio) {
        hpart = wpart;
        h = hpart * 9;
        hlength = hpart * 4;
      } else {
        h = wlength * ratio;
        h += h % 13;
        hpart = h / 13;
        hlength = hpart * 6;
      }

      wrap.style.height = h + 'px';
    }

    hpartial = hlength / 2 - wpart / 2;
    wpadding = ~~(wlength * 0.1 * paddingX);
    hpadding = ~~(hlength * 0.1 * paddingY);
    var adj = reduceHeightGap ? wpart / 4 : 0;
    /* update classes */

    styles[wrapId] += '#' + wrapId + ' .counter-part.part-b' + ', #' + wrapId + ' .counter-part.part-c' + ', #' + wrapId + ' .counter-part.part-e' + ', #' + wrapId + ' .counter-part.part-f { height: ' + wpart + 'px;  width:' + (hlength + (reduceHeightGap ? wpart / 2 : 0)) + 'px; }' + '#' + wrapId + ' .counter-part.part-a' + ', #' + wrapId + ' .counter-part.part-d' + ', #' + wrapId + ' .counter-part.part-g  { height: ' + hpart + 'px;  width:' + wlength + 'px; padding-left:' + wpadding + 'px; padding-right:' + wpadding + 'px; }' + '#' + wrapId + ' .counter-part.part-a {  transform: translate(' + adj + 'px, ' + -adj + 'px) rotate(0deg); }' + '#' + wrapId + ' .counter-part.part-b {  transform: translate(' + (wlength / 2 + wpart - hpartial) + 'px, ' + hpartial + 'px) rotate(90deg); padding-left:' + hpadding + 'px; }' + '#' + wrapId + ' .counter-part.part-c {  transform: translate(' + (wlength / 2 + wpart - hpartial) + 'px, ' + (hpartial + hlength + hpart) + 'px) rotate(90deg); padding-right:' + hpadding + 'px; }' + '#' + wrapId + ' .counter-part.part-d {  transform: translate(' + adj + 'px, ' + (hlength * 2 + adj) + 'px) rotate(0deg); }' + '#' + wrapId + ' .counter-part.part-e {  transform: translate(-' + hpartial + 'px, ' + (hpartial + hlength + hpart) + 'px) rotate(90deg); padding-right:' + hpadding + 'px; }' + '#' + wrapId + ' .counter-part.part-f {  transform: translate(-' + hpartial + 'px, ' + hpartial + 'px) rotate(90deg); padding-left:' + hpadding + 'px; }' + '#' + wrapId + ' .counter-part.part-g {  transform: translate(' + adj + 'px, ' + hlength + 'px) rotate(0deg); }';

    if (color) {
      styles[wrapId] += '#' + wrapId + ' .counter-part-inner { background: ' + color + '; }';
    }

    setDynamicStyles();
  }; // init params


  config = _objectSpread({}, config, cfg);
  setParams(config);
  startTime();

  var updateRatio = function updateRatio(r) {
    ratio = r;
    setDynamicStyles();
  };

  var updateTime = function updateTime(value) {
    if (typeof value === 'number') {
      clearInterval(loop);
      seconds = value;
      startTime();
    } else if (typeof value === 'string' && /\d{4}-\d{2}-\d{2}/.test(value)) {
      config = _objectSpread({}, config, {
        date: value
      });
      clearInterval(loop);
      setParams(config);
      startTime();
    } else console.error('Wrong parameter');
  };

  var stop = function stop() {
    clearInterval(loop);
  };

  var start = function start() {
    clearInterval(loop);
    setParams(config);
    startTime();
  };

  var render = function render(_ref2) {
    var id = _ref2.id,
        type = _ref2.type,
        color = _ref2.color,
        ratio = _ref2.ratio,
        paddingRatioX = _ref2.paddingRatioX,
        paddingRatioY = _ref2.paddingRatioY,
        reduceHeightGap = _ref2.reduceHeightGap;
    if (!id || !type) return; //const elementId = 'e-' + ~~(Math.random() * 10000);
    //const element = document.createElement('div');
    //element.id = elementId;

    var element = document.getElementById(id);
    ids.push(id);
    addDigitsBlock(element, type);
    updateBlock({
      wrapId: id,
      color: color || '',
      ratio: ratio || null,
      paddingX: paddingRatioX || 0,
      paddingY: paddingRatioY || 0,
      reduceHeightGap: reduceHeightGap || false
    });
    sendAll();
  }; // return methods


  return {
    render: render,
    start: start,
    stop: stop,
    updateTime: updateTime,
    updateRatio: updateRatio
  };
};

export default Countdown;