import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Countdown from '../../src/Countdown'

/**
 * Sample App for dev
 *  
 */
class ExampleApp extends Component {

    constructor() {
        super();
        this.state = {
            width: window.innerWidth
        }
        this.handleResize = this.handleResize.bind(this)

        // init countdown
        this.countdown = new Countdown({
            date: '2020-02-22',
            callback: () => {
                console.log("done");
            }
        });
    }


    handleResize() {
        const currentWidth = window.innerWidth;
        if (currentWidth < 768 && this.state.width >= 768 ||
            currentWidth >= 768 && this.state.width < 768) {

            console.log('trigger resize');

            this.setState({
                width: currentWidth
            }, this.countdown.redrawAll);

        }
    }


    componentDidMount() {
        this.countdown.render({ id: 'd', type: 'days', color: '#fff', paddingRatioX: 1, paddingRatioY: 1 });
        this.countdown.render({ id: 'h', type: 'hours', color: '#fff', paddingRatioX: 1, paddingRatioY: 1 });
        this.countdown.render({ id: 'm', type: 'minutes', color: '#fff', paddingRatioX: 1, paddingRatioY: 1 });
        this.countdown.render({ id: 's', type: 'seconds', color: '#fff', paddingRatioX: 1, paddingRatioY: 1 });
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        return (
            <>
                <div id="sample">
                    <div className="column">
                        <div>
                            {/* days element */}
                            <div id="d" />
                        </div>
                        <div>
                            {/* hours element */}
                            <div id="h" />
                        </div>
                    </div>
                    <div className="column">
                        <div>
                            {/* minutes element */}
                            <div id="m" />
                        </div>
                        <div>
                            {/* seconds element */}
                            <div id="s" />
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

