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
            date: '2020-02-22',
            callback: () => {
                console.log("done");
            }
        });
    }

    componentDidMount() {
        countdown.render({ id: 'd', type: 'days',    color: '#fff', paddingRatioX: 1, paddingRatioY: 1 });
        countdown.render({ id: 'h', type: 'hours',   color: '#fff', paddingRatioX: 1, paddingRatioY: 1 });
        countdown.render({ id: 'm', type: 'minutes', color: '#fff', paddingRatioX: 1, paddingRatioY: 1 });
        countdown.render({ id: 's', type: 'seconds', color: '#fff', paddingRatioX: 1, paddingRatioY: 1 });
    }


    render() {
        return (
            <>
                <div id="sample">
                    <div>
                        {/* days element */}
                        <div id="d"/>
                    </div>
                    <div>
                        {/* hours element */}
                        <div id="h"/>
                    </div>
                    <div>
                        {/* minutes element */}
                        <div id="m"/>
                    </div>
                    <div>
                        {/* seconds element */}
                        <div id="s"/>
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

