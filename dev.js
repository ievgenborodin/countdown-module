import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Countdown from './src/Countdown'

/**
 * Sample App for dev
 *  
 */
class ExampleApp extends Component {

    constructor() {
        super();
        // init countdown
        window.countdown = new Countdown({
            date: '2020-03-02',
            callback: () => {
                console.log("done");
            }
        });
    }

    componentDidMount() {
        countdown.render({id: 'countdown-days', type: 'days', css: 'background:#fff' });
        countdown.render({id: 'countdown-hours', type: 'hours', css: 'background:#1370a0' });
        countdown.render({id: 'countdown-minutes', type: 'minutes', css: 'background:#9e489e' });
        countdown.render({id: 'countdown-seconds', type: 'seconds', css: 'background:#2dc378' });
        countdown.render({id: 'another-seconds', type: 'seconds', ratio: 2 });
    }


    render() {
        return (
            <>
                {/* blocks could be separated */}
                <div className="days-wrap frame">
                    
                    {/* days element */}
                    <div id="countdown-days" />
                
                </div>

                <div id="countdown">
                    <div className="h-wrap frame">
                        
                        {/* hours element */}
                        <div id="countdown-hours" />
                    
                    </div>
                    <div className="ms-wrap">
                        <div className="m-wrap frame">
                            
                            {/* minutes element */}
                            <div id="countdown-minutes" />
        
                        </div>
                        <div className="s-wrap frame">
                            
                            {/* seconds element */}
                            <div id="countdown-seconds" />
                        
                        </div>    
                    </div>
                </div>

                <div id="another-seconds" style={{width: '100px', height: '100px', marginTop: '20px' }}/>
            </>
        )
    }
}


/**
 * Render  
 *  
 */
ReactDOM.render(
    <ExampleApp />, 
    document.getElementById('root')
)

