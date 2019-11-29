
/**
 * Attach default styles to <head>
 */
export const addDefaultStyles = () => {
    if (!document) return; 

    const id = 'countdown-default-styles';

    // skip if already exists
    if (document.querySelector('#' + id))
      return;

    const element = document.createElement('style');
    element.id = id;
    element.type = 'text/css';

    element.innerHTML = `
    .countdown-wrap{
        position: absolute;
        width: 100%;
        height: 100%;
        margin-top: 2em;
      }
      .counter-digits-block{
        position: relative;
        height: 100%;
        float: left;
      }
      .counter-digit-wrap{
        position: relative;
        height: 100%;
      }
      .counter-high-days,
      .counter-high-hours,
      .counter-high-minutes,
      .counter-high-seconds {
        float: left;
      }
      .counter-low-days,
      .counter-low-hours,
      .counter-low-minutes,  
      .counter-low-seconds{
        float: right;
      }
      .counter-dots-block{
        position: relative;
        height: 100%;
        float: left;
      }
      .counter-dot{
        position: relative;
        width: 100%;
        height: 50%;
      }
      .counter-digit{
        width: 100%;
        height: 100%;
        position: relative;
      }
      .counter-dot-high,
      .counter-dot-low{
        border-radius: 50%;
        position: absolute;
        width: 1rem;
        height: 1rem;
        left: 45%;
        background-color: #2c612d;
      }
      .counter-dot-low{
        border-radius: 50%;
        top: 20%;
      }
      .counter-dot-high{
        border-radius: 50%;
        bottom: 20%;
      }
      .counter-part{
        box-sizing: border-box;
        opacity: 0;
        position: absolute;
        transform: rotate(0deg) translate(0px, 0px);
        transition: transform .3s ease-out;
      }
      .part-a, .part-b, .part-c, .part-d, .part-e, .part-f, .part-g{ opacity: 1; }
      
      .counter-part-inner{
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    `;

    document.querySelector('head').appendChild(element);
}


/**
 * Date to Seconds
 * param date: string [YYYY-MM-DD]
 */
export const dateToSeconds = (date) => {
  const d = date.split('-');
  const now = new Date();
  const till = new Date(d[0], d[1] - 1, d[2], 0, 0, 0);

  return ~~((till.getTime() - now.getTime()) * .001);
}

