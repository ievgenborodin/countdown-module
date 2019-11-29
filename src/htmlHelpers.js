

    /**
     * Add Part [of the digit]
     * param parent: document.Element
     */
    export const addPart = (parent) => {
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
    export const addDigit = (parent, type, isHigh) => {
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
    export const addDigitsBlock = (parent, type) => {
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
    export const addColumnBlock = (parent) => {
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
    export const addDot = (parent, isTop) => {            
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