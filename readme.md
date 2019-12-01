## Countdown module

### features
* animated time transition
* isolated blocks
* supports days,hours,minutes,seconds
* inititialize with date string or number of seconds
* react/es6 friends

### Install

```shell
npm install anim-countdown
```

### Usage
```javascript
import Countdown from 'anim-countdown';

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


### Methods
  - `.stop()` - stop countdown
  - `.start()` - resume countdown
  - `.start()` - resume countdown
  - `.render(...args)` - generate digits block

Argument    | Type    | Status    | Description
----------- | ------- | --------- | -------------
id          | string  | required  | id of the element to hold digits block
type        | string  | required  | [days|hours|minutes|seconds]
color       | string  | optional  | css color will apply to inner parts of digits
ratio       | number  | optional  | set auto height based on width of the container
paddingRatioX | number | optional | horizontal padding to digit parts
paddingRatioY | number | optional | vertical padding to digit parts
reduceHeightGap | boolean | optional | balance vertical gab between digit's parts

  - `.redrawBlock(...args)` - re draw digits block (ex. use after resize)

Argument    | Type    | Status    | Description
----------- | ------- | --------- | -------------
id          | string  | required  | id of the element

  - `.redrawAll()` - re draw every digits block (ex. use after resize)

  - `.updateTime(...args)` - reset time 

Argument    | Type    | Status    | Description
----------- | ------- | --------- | -------------
value       | string or number  | required  | number of seconds or date string [YYYY-MM-DD]

  
### Preview
![Preview image](/prev.jpg)
