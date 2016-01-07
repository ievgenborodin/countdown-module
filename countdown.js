var Countdown = function(cfg){
  var wrap, wrapId, seconds, callback,
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
    horWidth, vertWidth, horHeight, vertHeight;
  
  /*..... auto init ......*/
  initParams(cfg);
  
  wrap = document.getElementById(wrapId);
  if (wrap) {
    initHtml();
    initWrapStyles();
    evalTime();
    setSize();
    sendDigits("seconds", currSeconds+'');
    sendDigits("minutes", currMinutes+'');
    sendDigits("hours", hours+'');
    setLoop();
  } else if (!wrap){
    mes = "Error. No such element found.";
    alert(mes);
    return mes;
  } else {
    mes = "Error. Please specify the element [id] to hold the countdown.";
    alert(mes);
    return mes;
  }
  
  /*..... functions .......*/
  /* init params [wrapId, seconds]-padding */
  function initParams(cfg){
    if (arguments.length > 1 || typeof(arguments[0]) !== "object"){
     wrapId = arguments[0];
     seconds = arguments[1] || 10;
     callback = arguments[2] || undefined;
    } else {
      wrapId = cfg.wrapId; 
      seconds = cfg.seconds || 10;
      callback = cfg.callback || undefined;
    }
  };
  
  function initHtml(){
    var i, counterDigit, partHtml;
    partHtml = '<div class="counter-part"><div class="counter-part-inner"></div></div>';
    wrap.innerHTML = '<div class="countdown-wrap"><div class="countdown"><div class="counter-digits-block"><div class="counter-high-hours"><div class="counter-digit"></div></div><div class="counter-low-hours"><div class="counter-digit"></div></div></div><div class="counter-dots-block"><div class="counter-dot"><div class="counter-dot-high"></div></div><div class="counter-dot"><div class="counter-dot-low"></div></div></div><div class="counter-digits-block"><div class="counter-high-minutes"><div class="counter-digit"></div></div><div class="counter-low-minutes"><div class="counter-digit"></div></div></div><div class="counter-dots-block"><div class="counter-dot"><div class="counter-dot-high"></div></div><div class="counter-dot"><div class="counter-dot-low"></div></div></div><div class="counter-digits-block"><div class="counter-high-seconds"><div class="counter-digit"></div></div><div class="counter-low-seconds"><div class="counter-digit"></div></div></div></div></div>';
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
  
  function setSize(){
    var size = getSize();
    horWidth = size.width;
    horHeight = size.height * 0.1;
    vertWidth = size.height * 0.5;  
    vertHeight = size.height * 0.1;
  };
  
  function getSize(){
    var part = document.getElementsByClassName('counter-digit')[0],
        bb = part.getBoundingClientRect();
    return{
      width: bb.width,
      height: bb.height
    }
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
          if (arr[i]!=="x"){
            switch (arr[i]){
              case 'a':
              case 'd':
              case 'g':
                c.style.width = horWidth + 'px';
                c.style.height = horHeight + 'px';
                break;
              default:
                c.style.width = vertWidth + 'px';
                c.style.height = vertHeight + 'px';
            }
            c.classList.add("part-" + arr[i]);
          }
        }
      };
  
  function initWrapStyles(){
    wrap.style.position = "relative";
  };
  
  /*....... methods ........*/
  this.reset = function(props){
  
  };
};