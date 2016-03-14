var Countdown = function(cfg){
  var wrap, wrapId, seconds, callback, ratio,
      mes, digits = [
      ["a", "b", "c", "d", "e", "f", "x", "x"],
      ["b", "c", "x", "x", "x", "x", "x", "x"],
      ["a", "b", "g", "e", "d", "x", "x", "x"],
      ["a", "b", "c", "d", "g", "x", "x", "x"],
      ["f", "b", "g", "c", "x", "x", "x", "x"],
      ["a", "f", "g", "c", "d", "x", "x", "x"],
      ["a", "f", "c", "d", "e", "g", "x", "x"],
      ["a", "b", "c", "x", "x", "x", "x", "x"],
      ["a", "b", "c", "d", "e", "f", "g", "x"],
      ["a", "b", "g", "f", "c", "d", "x", "x"]
    ],
    loop, time, tmpSeconds, hours, minutes, 
    currSeconds, currMinutes,
    horWidth, vertWidth, horHeight, vertHeight,
    autosize, stylesHtml, moreStyles;
  
  this.updateSize = setModuleSize;

  this.updateRatio = function(r){
    ratio = r;
    setModuleSize();
  };

  /*..... auto init ......*/
  initParams(cfg);
  moreStyles = document.createElement('style');
  moreStyles.type = 'text/css';
  document.getElementsByTagName('head')[0].appendChild(moreStyles);
  
  wrap = document.getElementById(wrapId);
  if (wrap) {
    wrap.style.position = "relative";
    initHtml();
    setModuleSize();
    startTime();
  } else if (!wrap){
    mes = "Error. No such element found.";
    alert(mes);
    return mes;
  } else {
    mes = "Error. Please specify the element [id] to hold the countdown.";
    alert(mes);
    return mes;
  }

  /* init params [wrapId, seconds, callback, ratio] */
  function initParams(cfg){
    if (arguments.length > 1 || typeof(arguments[0]) !== "object"){
     wrapId = arguments[0];
     seconds = arguments[1] || 10;
     callback = arguments[2] || undefined;
    } else {
      wrapId = cfg.wrapId; 
      seconds = cfg.seconds || 10;
      callback = cfg.callback || undefined;
      ratio = cfg.ratio;
    }
  };
  
  function startTime(){
    evalTime();
    sendDigits("seconds", currSeconds+'');
    sendDigits("minutes", currMinutes+'');
    sendDigits("hours", hours+'');
    setLoop();
  };
  
  function initHtml(){
    var i, counterDigit, partHtml;
    partHtml = '<div class="counter-part"><div class="counter-part-inner"></div></div>';
    wrap.innerHTML = '<div class="countdown"><div class="counter-digits-block"><div class="counter-digit-wrap counter-high-hours"><div class="counter-digit"></div></div><div class="counter-digit-wrap counter-low-hours"><div class="counter-digit"></div></div></div><div class="counter-dots-block"><div class="counter-dot"><div class="counter-dot-high"></div></div><div class="counter-dot"><div class="counter-dot-low"></div></div></div><div class="counter-digits-block"><div class="counter-digit-wrap counter-high-minutes"><div class="counter-digit"></div></div><div class="counter-digit-wrap counter-low-minutes"><div class="counter-digit"></div></div></div><div class="counter-dots-block"><div class="counter-dot"><div class="counter-dot-high"></div></div><div class="counter-dot"><div class="counter-dot-low"></div></div></div><div class="counter-digits-block"><div class="counter-digit-wrap counter-high-seconds"><div class="counter-digit"></div></div><div class="counter-digit-wrap counter-low-seconds"><div class="counter-digit"></div></div></div></div>';
    counterDigit = document.getElementsByClassName('counter-digit');  
    for(i=0; i<7; i++) 
      partHtml += partHtml;
    for(i=0; i<6; i++) 
      counterDigit[i].innerHTML = partHtml;
  };
  
  function evalTime(){  
    hours = parseInt(seconds / 3600);
    minutes = parseInt(seconds / 60);
    currSeconds = seconds % 60;
    currMinutes = minutes % 60; 
    time = new Date();
    tmpSeconds = time.getSeconds();
  };

  function setModuleSize(){
    var wrapBB, w, h, countdownBlock, digitsBlock, dotsBlock, digitWrap, wpart, wleftover, hpart, hleftover,
        wlength, hlength, wpartial, hpartial, wpadding, hpadding;

    wrapBB = wrap.getBoundingClientRect();
    w = wrapBB.width;
    h = wrapBB.height;

    /* w */
    wleftover = w % 33;
    wpart = (w - wleftover) / 33;
    wrap.style.paddingLeft = parseInt(wleftover/2) + 'px';

    digitsBlock = document.getElementsByClassName('counter-digits-block');
    dotsBlock = document.getElementsByClassName('counter-dots-block');
    digitWrap = document.getElementsByClassName('counter-digit-wrap');
    altArrStyleProp(digitsBlock, 'width', (wpart*9) + 'px');
    altArrStyleProp(dotsBlock, 'width', (wpart*3) + 'px');
    altArrStyleProp(digitWrap, 'width', (wpart*4) + 'px');

    countdownBlock = document.getElementsByClassName('countdown')[0];
    countdownBlock.style.width = (w - wleftover) + 'px';

    wlength = (wpart*4);

    /* h */
    autosize = (ratio || !wrapBB.height) ? false : true;
    if (autosize){
      hleftover = h % 13;
      hpart = (h - hleftover) / 13; 
      wrap.style.paddingTop = parseInt(hleftover/2) + 'px';
      hlength = (hpart*6);
    } else {
      if (!ratio) {
        hpart = wpart;
        h = hpart * 9;
        hlength = (hpart*4);
      } else {
        h = wlength * ratio;
        h += h % 13;
        hpart = h / 13;
        hlength = (hpart*6);
      }
      wrap.style.height = h + 'px';
    }

    hpartial = (hlength/2 - wpart/2);
    wpartial = (wlength/2 - hpart/2);
    wpadding = parseInt(wlength*.1);
    hpadding = parseInt(hlength*.1);
    
    /* update classes */
    stylesHtml = '.part-b, .part-c, .part-e, .part-f { height: '+ wpart +'px;  width:'+ hlength +'px; }' +
    '.part-a, .part-d, .part-g  { height: '+ hpart +'px;  width:'+ wlength +'px; padding-left:'+ wpadding +'px; padding-right:'+ wpadding +'px; }' +
    '.part-b {  transform: translate(' + (wlength/2 + wpart - hpartial)  + 'px, '+ hpartial +'px) rotate(90deg); padding-left:'+ hpadding +'px; }' + 
    '.part-c {  transform: translate(' + (wlength/2 + wpart - hpartial) + 'px, '+ (hpartial + hlength + hpart) +'px) rotate(90deg); padding-right:'+ hpadding+'px; }' +
    '.part-d {  transform: translate(0px, ' + (hlength*2) + 'px) rotate(0deg); }' +
    '.part-e {  transform: translate(-' + hpartial + 'px, '+ (hpartial + hlength + hpart) +'px) rotate(90deg); padding-right:'+ hpadding +'px; }' +
    '.part-f {  transform: translate(-' + hpartial + 'px, '+ hpartial +'px) rotate(90deg); padding-left:'+ hpadding +'px; }' +
    '.part-g {  transform: translate(0px, '+ (hlength) +'px) rotate(0deg); }';
    moreStyles.innerHTML = stylesHtml;

  };
  
  function altArrStyleProp(arr, prop, value){
    for (var i=0; i<arr.length; i++) 
      arr[i].style[prop] = value;
  };

  function setLoop(){
    loop = setInterval(function(){
    /* update time */
    time = new Date();
    
    /* trigger if seconds change */
    if(time.getSeconds() !== tmpSeconds){
      if (currSeconds === 0){
        if (hours + currMinutes){
          currSeconds = 59;
          sendDigits("seconds", currSeconds+'');
          if (currMinutes > 0) { 
            currMinutes--; 
            sendDigits("minutes", currMinutes+'');
          } else {
            hours--;
            sendDigits("hours", hours+'');
            currMinutes = 59;
            sendDigits("minutes", currMinutes+'');
          }
        } else {
          clearInterval(loop);
          if (callback) callback();
        }
      } else {
        currSeconds--;
        sendDigits("seconds", currSeconds+'');
      } 
    } 
  }, 1000); 
  };
  
  function sendDigits(variable, arr){
        if (arr.length===1){
          evalDigit(variable, "high", digits[0]);
          evalDigit(variable, "low", digits[arr]);
        } else {
          evalDigit(variable, "high", digits[arr[0]]);
          evalDigit(variable, "low", digits[arr[1]]);
        }
      };        
        
  function evalDigit(v, add, arr){
        var i, wClass = 'counter-' + add + '-' + v,
          wrap = document.getElementsByClassName(wClass)[0],
          children = wrap.children[0].children, c;
        
        for(i=0; i<7; i++){
          c = children[i];
          if (c.classList[1])
            c.classList.remove(c.classList[1]);
          if (arr[i]!=="x")
            c.classList.add("part-" + arr[i]);
        }
      };
  
  /*....... methods ........*/
  this.reset = function(secs){
    clearInterval(loop);
    seconds = secs;
    startTime();
  };
};