//samples
//AbandonBaby
// var input = {
//   open: [30.10,27.18,29.87],
//   high: [32.40,28.32,30.70],
//   close:[29.30,27.00,30.62],
//   low:  [28.50,24.67,29.30],
// }

//BullishEngulfing
// var input = {
//   open: [23.25,15.36],
//   high: [25.10,30.87],
//   close: [21.44,27.89],
//   low: [20.82,14.93],
// }

//Bearish Engulfing
// var input = {
//   open: [21.44,27.89],
//   high: [25.10,30.87],
//   low: [20.82,14.93],
//   close: [23.25,15.36]
// }

//Dragonflydoji
// var input = {
//   open: [30.10],
//   high: [30.10],
//   close: [30.13],
//   low: [28.10],
// }
    


module.exports = function drawCandleStick(input) {
    var width  = 400;
    var height  = 400;

    var Canvas = require('canvas').Canvas
        , Image = Canvas.Image
        , canvas = new Canvas(width, height)
        , ctx = canvas.getContext('2d');

        console.log(Canvas);

    var d3 = require('d3');
    var d3Scale = require("d3-scale")

    var ctx = canvas.getContext('2d');
    ctx.strokeRect(0,0, width, height);
    ctx.translate(0, height);
    ctx.scale(1,-1);

    
    var y = d3Scale.scaleLinear()
      .domain([d3.min(input.low), d3.max(input.high)])
      .range([50, height-50]);
   
    
    let barsCount   = input.close.length;
    let widthofBars = 20;
    let gapBetweenBars = 12;
    let leftOffset = 30;
    for(let i=0; i< barsCount ; i++) {
        let open = input.open[i];
        let high = input.high[i];
        let low  = input.low[i];
        let close= input.close[i];
        let height = Math.abs(y(open) - y(close));
        height = height > 0 ? height : 2;
        let xValue = leftOffset + ((widthofBars + gapBetweenBars)  * i);
        let colo;
        let start;
        if(open > close) {
            colo = '#e86c57';
            start = y(close);
        } else {
            colo = '#005700';
            start = y(open);
        }
        ctx.strokeStyle = colo;
        ctx.fillStyle = colo;
        ctx.beginPath();
        ctx.moveTo(xValue, y(high));
        ctx.lineTo(xValue, y(low));
        ctx.fillRect(xValue - (widthofBars/2), start, widthofBars, height);
        ctx.fill();
        ctx.stroke();
    }    
    return canvas.toBuffer()
}


