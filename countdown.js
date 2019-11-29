var Countdown = function(cfg){

    var digits = [
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
        currSeconds, currMinutes, currHours,
        autosize, moreStyles,
        ids = [],
        styles = {};
        
    var config = {};

    var element = null;
    
    var seconds = 0;
    
    var callback = function(){ return; };
    
    var ratio = 2;

    var moreStyles = document.createElement('style');
    moreStyles.type = 'text/css';
    document.querySelector('head').appendChild(moreStyles);
    
    /**
     * Add Part [of the digit]
     * param parent: document.Element
     */
    var addPart = function(parent) {
        if (!parent) return null;
        //
        var part = document.createElement('div');
        part.classList.add('counter-part');
        //
        var innerPart = document.createElement('div');
        innerPart.classList.add('counter-part-inner');
        //
        part.appendChild(innerPart);
        parent.appendChild(part);
    }


    /**
     * Add Digit
     * param parent: document.Element
     * param type: string [seconds|minutes|hours|days|months|years]
     * param isHigh: boolean [>=10|<10]
     */
    var addDigit = function(parent, type, isHigh) {
        if (!parent || !type) return null;
        //
        var digit = document.createElement('div');
        digit.classList.add('counter-digit');
        //
        var i = 0;
        while (i<7) {
            addPart(digit)
            i++;
        }
        // 
        var wrap = document.createElement('div');
        wrap.classList.add('counter-digit-wrap', 'counter-' + (isHigh ? 'high-' : 'low-') + type);
        wrap.appendChild(digit);
        parent.appendChild(wrap);
    }


    /**
     * Add Digits Block
     * param parent: document.Element
     * param type: string [seconds|minutes|hours|days|months|years]
     */
    var addDigitsBlock = function(parent, type) {
        if (!parent || !type) return null;
        //
        var block = document.createElement('div');
        block.classList.add('counter-digits-block');
        //
        addDigit(block, type, true);
        addDigit(block, type, false);
        //
        parent.appendChild(block);
    }


    /**
     * Add Column Block
     * param parent: document.Element
     */
    var addColumnBlock = function(parent) {
        if (!parent) return null;
        //
        var block = document.createElement('div');
        block.classList.add('counter-dots-block');
        //
        addDot(block, true);
        addDot(block, false);
        //
        parent.appendChild(block);
    }


    /**
     * Add Dot
     * param parent: document.Element
     * param isTop: boolean
     */
    var addDot = function(parent, isTop) {            
        if (!parent) return null;
        //
        var inner = document.createElement('div');
        inner.classList.add('counter-dot-' + (isTop ? 'high' : 'low'));
        //
        var wrap = document.createElement('div');
        wrap.classList.add('counter-dot');
        wrap.appendChild(inner);
        //
        parent.appendChild(wrap);
    }


    /**
     * Date to Seconds
     * param date: string [YYYY-MM-DD]
     */
    var dateToSeconds = function(date) {
        var now, till, 
            d = date.split('-');

        now = new Date();
        till = new Date(d[0], d[1] - 1, d[2], 0, 0, 0);

        return ~~((till.getTime() - now.getTime()) * .001);
    }


    /**
     * Set Params
     * param cfg: { element, seconds, callback, ratio }
     */
    var setParams = function(cfg) {
        if (arguments.length > 1 || typeof(arguments[0]) !== "object"){
            element = arguments[0];
            seconds = arguments[1] || 10;
            callback = arguments[2] || undefined;
        } else {
            element = cfg.element; 
            seconds = cfg.seconds || 10;
            callback = cfg.callback || undefined;
            ratio = cfg.ratio;
        }

        if (cfg.date)
            seconds = dateToSeconds(cfg.date);
    };


    function altArrStyleProp(arr, prop, value){
        for (var i=0; i<arr.length; i++) 
        arr[i].style[prop] = value;
    };

    function sendAll() {
        sendDigits("seconds", currSeconds+'');
        sendDigits("minutes", currMinutes+'');
        sendDigits("hours", currHours+'');
        sendDigits("days", days+'');
    }

    function startTime(){
        evalTime();
        sendAll();
        setLoop();
    };

    function evalTime(){  
        days = ~~(seconds / (3600 * 24));
        hours = ~~(seconds / 3600);
        minutes = ~~(seconds / 60);
        currSeconds = seconds % 60;
        currMinutes = minutes % 60;
        currHours = hours % 24; 
        time = new Date();
        tmpSeconds = time.getSeconds();
    };

    function setLoop(){
        loop = setInterval(function(){
        /* update time */
        time = new Date();
        
        /* trigger if seconds change */
        if(time.getSeconds() === tmpSeconds)
            return;
        tmpSeconds = time.getSeconds();
        if (currSeconds == 0){
            if (days + currHours + currMinutes){
            currSeconds = 59;
            sendDigits("seconds", currSeconds+'');
            if (currMinutes > 0) {  
                currMinutes--; 
                sendDigits("minutes", currMinutes+'');
            } else if (currHours > 0) {
                currHours--;
                sendDigits("hours", currHours+'');
                currMinutes = 59;
                sendDigits("minutes", currMinutes+'');
            } else {
                days--;
                sendDigits("days", days+'');
                currHours = 23;
                sendDigits("hours", currHours+'');
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
    }, 500); 
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
        wrap = document.getElementsByClassName(wClass);
        if (!wrap) return; 

        for (var w of wrap) {
            var children = w.children[0].children, c;
            if (!children) return;
                
            for(i=0; i<7; i++){
                c = children[i];
                if (c.classList[1])
                    c.classList.remove(c.classList[1]);
                if (arr && arr[i]!=="x")
                    c.classList.add("part-" + arr[i]);
            }
        }
    };
  
    var setDynamicStyles = function() {
        var text = '';
        for (var i of ids)
            if (styles[i]) text += styles[i];
        moreStyles.innerHTML = text;
    }

    var updateBlock = function(wrapId, style) {
        if (!wrapId) return;
        //
        var wrapBB, w, h, countdownBlock, digitsBlock, dotsBlock, digitWrap, wpart, wleftover, hpart, hleftover,
            wlength, hlength, wpartial, hpartial, wpadding, hpadding;
        
        var wrap = document.getElementById(wrapId);

        styles[wrapId] = '';
      
        wrapBB = wrap.getBoundingClientRect();
        w = wrapBB.width;
        h = wrapBB.height;

        /* w */
        wleftover = w % 9;
        wpart = (w - wleftover) / 9;
        //wrap.style.paddingLeft = ~~(wleftover/2) + 'px';
        if (wleftover && wrap.children && wrap.children[0])
          wrap.children[0].style.paddingLeft = wleftover/2 +'px';
        digitsBlock = document.querySelectorAll('#' + wrapId + ' .counter-digits-block');
        digitWrap = document.querySelectorAll('#' + wrapId + ' .counter-digit-wrap');
        altArrStyleProp(digitsBlock, 'width', (wpart*9) + 'px');
        altArrStyleProp(digitWrap, 'width', (wpart*4) + 'px');

        wlength = (wpart*4);

        /* h */
        autosize = (ratio || !wrapBB.height) ? false : true;
        if (autosize){
          hleftover = h % 13;
          hpart = (h - hleftover) / 13; 
          hlength = (hpart*6);
          if (hleftover)
            styles[wrapId] += '#' + wrapId + ' .counter-part { top:'+ hleftover/2 +'px; }';
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
        wpadding = 0;//~~(wlength*.1);
        hpadding = 0;//~~(hlength*.1);
        
        /* update classes */
        styles[wrapId] += 
        '#' + wrapId + ' .counter-part.part-b' + 
        ', #' + wrapId + ' .counter-part.part-c' + 
        ', #' + wrapId + ' .counter-part.part-e' +  
        ', #' + wrapId + ' .counter-part.part-f { height: '+ wpart +'px;  width:'+ hlength +'px; }' +
        '#' + wrapId + ' .counter-part.part-a' + 
        ', #' + wrapId + ' .counter-part.part-d' + 
        ', #' + wrapId + ' .counter-part.part-g  { height: '+ hpart +'px;  width:'+ wlength +'px; padding-left:'+ wpadding +'px; padding-right:'+ wpadding +'px; }' +
        '#' + wrapId + ' .counter-part.part-b {  transform: translate(' + (wlength/2 + wpart - hpartial)  + 'px, '+ hpartial +'px) rotate(90deg); padding-left:'+ hpadding +'px; }' + 
        '#' + wrapId + ' .counter-part.part-c {  transform: translate(' + (wlength/2 + wpart - hpartial) + 'px, '+ (hpartial + hlength + hpart) +'px) rotate(90deg); padding-right:'+ hpadding+'px; }' +
        '#' + wrapId + ' .counter-part.part-d {  transform: translate(0px, ' + (hlength*2) + 'px) rotate(0deg); }' +
        '#' + wrapId + ' .counter-part.part-e {  transform: translate(-' + hpartial + 'px, '+ (hpartial + hlength + hpart) +'px) rotate(90deg); padding-right:'+ hpadding +'px; }' +
        '#' + wrapId + ' .counter-part.part-f {  transform: translate(-' + hpartial + 'px, '+ hpartial +'px) rotate(90deg); padding-left:'+ hpadding +'px; }' +
        '#' + wrapId + ' .counter-part.part-g {  transform: translate(0px, '+ (hlength) +'px) rotate(0deg); }';
        if (style)
            styles[wrapId] += '#' + wrapId + ' .counter-part-inner {' + style + '}';
        setDynamicStyles();
    }

    // init params
    config = Object.assign(config, cfg);
    setParams(config);
    startTime();      

    this.updateSize = updateBlock;

    this.updateRatio = function(r){
        ratio = r;
        setDynamicStyles();
    };

    this.updateTime = function(value){
        if (typeof value === 'number') {
          clearInterval(loop);
          seconds = value;
          startTime();
        } else if (typeof value === 'string' && /\d{4}-\d{2}-\d{2}/.test(value)) {
          config = Object.assign(config, {date: value});
          clearInterval(loop);            
          setParams(config);
          startTime();
        } else 
          console.error('Wrong parameter');
    };

    this.stop = function() {
      clearInterval(loop);            
    }

    this.start = function() {
      clearInterval(loop);            
      setParams(config);
      startTime();
    };

    var render = function(elementId, type, style='') {
        element = document.getElementById(elementId);
        ids.push(elementId);
        addDigitsBlock(element, type);
        // fix size
        updateBlock(elementId, style);   
        sendAll(); 
    }
    this.render = render;
}