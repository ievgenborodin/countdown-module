## Countdown module

### features
* isolated blocks
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

// render 
<Seconds c={countdown} />
```

### Preview
![Preview image](/preview.jpg)
 
### Live preview
http://ievgenborodin.com/
* in module section
