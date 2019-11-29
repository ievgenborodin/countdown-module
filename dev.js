import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Countdown, { Days, Hours, Minutes, Seconds } from './src/Countdown'

/**
 * Sample App for dev
 *  
 */
class ExampleApp extends Component {

    constructor() {
        super();
        // init countdown
        this.countdown = new Countdown({
            date: '2020-03-02',
            callback: () => {
                console.log("done");
            }
        });
    }


    render() {
        console.log(this.countdown);
        return (
            <>
                {/* blocks could be separated */}
                <div className="days-wrap frame">
                    
                    {/* days element */}
                    <Days c={this.countdown} styles="background:#fff"/>
                
                </div>

                <div id="countdown">
                    <div className="h-wrap frame">
                        
                        <Hours c={this.countdown} styles="background:#1370a0"/>

                    </div>
                    <div className="ms-wrap">
                        <div className="m-wrap frame">
                            
                            <Minutes c={this.countdown} styles="background:#9e489e" />
        
                        </div>
                        <div className="s-wrap frame">
                            
                            <Seconds c={this.countdown} styles="background:#2dc378" />
                        
                        </div>    
                    </div>
                </div>
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

