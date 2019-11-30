/**
 * Attach default styles to <head>
 */
export var addDefaultStyles = function addDefaultStyles() {
  if (!document) return;
  var id = 'countdown-default-styles'; // skip if already exists

  if (document.querySelector('#' + id)) return;
  var element = document.createElement('style');
  element.id = id;
  element.type = 'text/css';
  element.innerHTML = "\n    .countdown-wrap{\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        margin-top: 2em;\n      }\n      .counter-digits-block{\n        position: relative;\n        height: 100%;\n        float: left;\n      }\n      .counter-digit-wrap{\n        position: relative;\n        height: 100%;\n      }\n      .counter-high-days,\n      .counter-high-hours,\n      .counter-high-minutes,\n      .counter-high-seconds {\n        float: left;\n      }\n      .counter-low-days,\n      .counter-low-hours,\n      .counter-low-minutes,  \n      .counter-low-seconds{\n        float: right;\n      }\n      .counter-dots-block{\n        position: relative;\n        height: 100%;\n        float: left;\n      }\n      .counter-dot{\n        position: relative;\n        width: 100%;\n        height: 50%;\n      }\n      .counter-digit{\n        width: 100%;\n        height: 100%;\n        position: relative;\n      }\n      .counter-dot-high,\n      .counter-dot-low{\n        border-radius: 50%;\n        position: absolute;\n        width: 1rem;\n        height: 1rem;\n        left: 45%;\n        background-color: #2c612d;\n      }\n      .counter-dot-low{\n        border-radius: 50%;\n        top: 20%;\n      }\n      .counter-dot-high{\n        border-radius: 50%;\n        bottom: 20%;\n      }\n      .counter-part{\n        box-sizing: border-box;\n        opacity: 0;\n        position: absolute;\n        transform: rotate(0deg) translate(0px, 0px);\n        transition: transform .3s ease-out;\n      }\n      .part-a, .part-b, .part-c, .part-d, .part-e, .part-f, .part-g{ opacity: 1; }\n      \n      .counter-part-inner{\n        width: 100%;\n        height: 100%;\n        border-radius: 4px;\n        background: #c1c1c1;\n      }\n    ";
  document.querySelector('head').appendChild(element);
};
/**
 * Date to Seconds
 * param date: string [YYYY-MM-DD]
 */

export var dateToSeconds = function dateToSeconds(date) {
  var d = date.split('-');
  var now = new Date();
  var till = new Date(d[0], d[1] - 1, d[2], 0, 0, 0);
  return ~~((till.getTime() - now.getTime()) * .001);
};