## Countdown module

### features
* animated time transition
* isolated blocks
* supports days,hours,minutes,seconds
* inititialize with date or number of seconds
* react/es6 friends

Use:

* initialize with: 
```javascript
import Countdown, { Seconds } from 'count-down';

// init 
var countdown = new Countdown({
  seconds: 71,
  callback: callback
});
  
function callback(){
  console.log("done");
};

// element holder
<div id="seconds-holder-id" />

// add seconds handler
countdown.render('seconds-holder-id', 'seconds');
```
 
### Initialize Options
  - `date` - string, YYYY-MM-DD
  - `seconds` - integer, number of seconds
  - `callback` - callback function to trigger when finished

### Render Options
  - `id` - string, id of the element to hold digits block
  - `type` - string, represends the type of the value needed to render (days|hours|minutes|seconds) 
  - `color` - string, css color will apply to inner parts of digits
  - `ratio` - number, use to set auth height based on with of the container 
  - `paddingRatioX` - number, horizontal padding to digit parts 
  - `paddingRatioY` - number, vertical padding to digit parts 
  - `reduceHeightGap` - boolean, balance vertical gab between digit's parts 

### Preview
![Preview image](/prev.jpg)
