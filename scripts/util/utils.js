
/**
 * Returns a random integer from start (inclusive) to end (exclusive). If start is omitted, it is
 * treated as zero.
 *  
 * @param {Number} start the starting integer
 * @param {Number} end the ending integer
 * 
 * @return {Number} a random integer
 */
Math.randomInt = function (start, end) {
    if (end == null) {
        end = start;
        start = 0;
    }
    
    return Math.floor(Math.random() * (end - start)) + start;
};

String.prototype.pad = function(length, character)
{
    if (!character)
        character = " ";
    
    var str = this; // This performs a deep copy.
    
    while (str.length < length)
        str += character;
    
    return str;
};

String.prototype.prepad = function(length, character)
{
    if (!character)
        character = " ";
    
    var str = this; // This performs a deep copy.
    
    while (str.length < length)
        str = character + str;
    
    return str;
};

var rgbToHash = function (rgb) {
    rgb = rgb.replace(/[^0-9,]/g, "").split(',');
    
    return '#' + parseInt(rgb[0]).toString(16).prepad(2, '0') + 
                 parseInt(rgb[1]).toString(16).prepad(2, '0') + 
                 parseInt(rgb[2]).toString(16).prepad(2, '0');
    
    return {
        r: parseInt(rgb[0]),
        g: parseInt(rgb[1]),
        b: parseInt(rgb[2])
    };
};

/**
 * A "hack" helper function used to get the width of the SVG represented by the html code given.
 * 
 * @param {String} html the code defining the SVG element
 * 
 * @return {Number} the width
 */
var svgElementWidth = function (html) {
    var code = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="font-family:trek;font-size:'+ Generator.options.magic +'pt;">' + html + '</svg>';
    
    var $elem = $(code).appendTo('body');
    
    var width = $elem.find('text')[0].getBBox().width;
    $elem.remove();
    
    // what used to be a magic number fix for an inexplicable phenomena (now explained) where this function returns a width 2.104x 
    //   the actual width of the element

    // the reason why this was happening is because the 'font-family' tag wasn't defined,
    //   so it just used a default font to get the width of the element. this also caused some strange side effects
    //   where the text area wouldn't be scaled properly depending on which characters were used, e.g. a lot of 1s would
    //   cause it to be smaller than needed whereas a lot of Ws would cause it to be larger than needed.

    // UPDATED FIX
    // moving css to the 'code' variable because it doesn't work properly in utils.js' 'text' variable
    return width // * 0.4752; 
};
