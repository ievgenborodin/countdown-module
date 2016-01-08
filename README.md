## Countdown module

*Easy to use, uses css animation (doesn't require jquery)*

Use:

* include: **countdown.js**, **countdown.css**
* initialize with: 
```javascript
var countdown = new Countdown({
    wrapId: 'myDiv', // element[id] to hold the module
    seconds: 71,
    callback: callback
  });
  
  function callback(){
    console.log("done");
  };
```

### Preview
![Preview image](/preview.jpg)
 
### Live preview
http://ievgenborodin.com/
* in module section
