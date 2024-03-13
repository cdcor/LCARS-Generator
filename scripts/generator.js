
function Generator() {}

Generator.init = function () {
    
};

Generator.options = null;
Generator.offsets = null;
Generator.theme = null;

Generator.generate = function () {
    
    Generator.options = Control.getOptions();
    
    // Setup
    var code = '<svg id="svgFrame" xmlns="http://www.w3.org/2000/svg" version="1.1"';
    
    var top = Generator.options.border.top.height, 
        right = Generator.options.border.right.width, 
        bottom = Generator.options.border.bottom.height, 
        left = Generator.options.border.left.width;
    
    // Add dims into total with and height, doubling for padding in between frame and contents
    var width = Generator.options.dims.width/* + left * 2 + right * 2*/, 
        height = Generator.options.dims.height/* + top * 2 + bottom * 2*/;
        
    code += ' width="' + width + '" height="' + height + '">';
        
    var path, padding = Generator.options.border.padding;
    
    Generator.offsets = {
        top: { right: null, left: null },
        right: { top: null, bottom: null },
        bottom: { right: null, left: null },
        left: { top: null, bottom: null }  
    };
    
    var themes = Generator.options.colors.themes;
    Generator.theme = themes[Math.randomInt(0, themes.length)];
    
    if (top) {
        
        if (left) { // Top with left side
            // Connect top with left side
            path = 'M 0 ' + (top * 2) +
                   ' q 0 ' + (-top * 2) + ' ' + (left * 0.75) + ' ' + (-top * 2) + 
                   ' l ' + (left * 0.75) + ' 0' +
                   ' l 0 ' + (top) +
                   ' l ' + (-left * 0.25) + ' 0' +
                   ' q ' + (-left * 0.25) + ' 0 ' + (-left * 0.25) + ' ' + (top) +
                   ' l ' + (-left) + ' 0' +
                   ' Z'; 
            
            Generator.offsets.top.left = left * 1.5 + padding;
            Generator.offsets.left.top = top * 2 + padding;
            
        } else { // Top with no left side
            // Terminate top left
            path = 'M ' + (top) + ' 0' +
                   ' c ' + (-top) + ' 0 ' + (-top) + ' ' + (top) + ' 0 ' + (top) +
                   ' v ' + (-top) +
                   ' Z';
                   
            Generator.offsets.top.left = top + padding;
        }
        
        code += '<path d="' + path + '" fill="' + Generator.randomColor() + '" />';
        
        if (right) { // Top with right side
            // Connect top with right side
            path = 'M ' + width + ' ' + (top * 2) +
                   ' q 0 ' + (-top * 2) + ' ' + (-right * 0.75) + ' ' + (-top * 2) +
                   ' h ' + (-right * 0.75) +
                   ' v ' + (top) +
                   ' h ' + (right * 0.25) +
                   ' q ' + (right * 0.25) + ' 0 ' + (right * 0.25) + ' ' + (top) + 
                   ' h ' + (right) +
                   ' Z';
            
            Generator.offsets.top.right = right * 1.5 + padding;
            Generator.offsets.right.top = top * 2 + padding;
            
        } else { // Top with no right side
            // Terminate top right
            path = 'M ' + (width - top) + ' 0 ' +
                   ' c ' + (top) + ' 0 ' + (top) + ' ' + (top) + ' 0 ' + (top) +
                   ' v ' + (-top) +
                   ' Z';
            
            Generator.offsets.top.right = top + padding;
        }
        
        code += '<path d="' + path + '" fill="' + Generator.randomColor() + '" />';
        
        // Generate top border
        Generator.options.border.top.x = Generator.offsets.top.left;
        Generator.options.border.top.y = 0;
        Generator.options.border.top.width = width - Generator.offsets.top.left - Generator.offsets.top.right;
        
        code += Generator.generateHorizontalBorder('top', Generator.options.border.title);
    }
    
    if (bottom) {
        
        if (left) { // Bottom with left side
            // Connect bottom with left side
            path = 'M 0 ' + (height - bottom * 2) +
                   ' q 0 ' + (bottom * 2) + ' ' + (left * 0.75) + ' ' + (bottom * 2) +
                   ' h ' + (left * 0.75) +
                   ' v ' + (-bottom) +
                   ' h ' + (-left * 0.25) + 
                   ' q ' + (-left * 0.25) + ' 0 ' + (-left * 0.25) + ' ' + (-bottom) + 
                   ' h ' + (-left) +
                   ' Z';
            
            Generator.offsets.bottom.left = left * 1.5 + padding;
            Generator.offsets.left.bottom = bottom * 2 + padding;
            
        } else { // Bottom with no left side
            // Terminate bottom left
            path = 'M ' + (bottom) + ' ' + (height - bottom) +
                   ' c ' + (-bottom) + ' 0 ' + (-bottom) + ' ' + (bottom) + ' 0 ' + (bottom) +
                   ' v ' + (-bottom) +
                   ' Z';
            
            Generator.offsets.bottom.left = bottom + padding;
        }
        
        code += '<path d="' + path + '" fill="' + Generator.randomColor() + '" />';
        
        if (right) { // Bottom with right side
            // Connect bottom with right side
            path = 'M ' + (width) + ' ' + (height - bottom * 2) +
                   ' q 0 ' + (bottom * 2) + ' ' + (-right * 0.75) + ' ' + (bottom * 2) +
                   ' h ' + (-right * 0.75) + 
                   ' v ' + (-bottom) +
                   ' h ' + (right * 0.25) + 
                   ' q ' + (right * 0.25) + ' 0 ' + (right * 0.25) + ' ' + (-bottom) +
                   ' h ' + (right) + 
                   ' Z';
            
            
            
            Generator.offsets.bottom.right = right * 1.5 + padding;
            Generator.offsets.right.bottom = bottom * 2 + padding;
            
        } else { // Bottom with no right side
            // Terminate bottom right
            
            path = 'M ' + (width - bottom) + ' ' + (height) +
                   ' c ' + (bottom) + ' 0 ' + (bottom) + ' ' + (-bottom) + ' 0 ' + (-bottom) +
                   ' v ' + (bottom) +
                   ' Z';
                   
            Generator.offsets.bottom.right = bottom + padding;
        }
        
        code += '<path d="' + path + '" fill="' + Generator.randomColor() + '" />';
        
        // Generate top border
        Generator.options.border.bottom.x = Generator.offsets.top.left;
        Generator.options.border.bottom.y = height - bottom;
        Generator.options.border.bottom.width = width - Generator.offsets.top.left - Generator.offsets.top.right;
        
        code += Generator.generateHorizontalBorder('bottom');
    }
    
    if (left) {
        // Generate left border
        Generator.options.border.left.x = 0;
        Generator.options.border.left.y = Generator.offsets.left.top;
        Generator.options.border.left.height = height - Generator.offsets.left.bottom - Generator.offsets.left.top;
        
        code += Generator.generateVerticalBorder('left');
    }
    
    if (right) {
        // Generate right border
        Generator.options.border.right.x = width - right;
        Generator.options.border.right.y = Generator.offsets.right.top;
        Generator.options.border.right.height = height - Generator.offsets.right.bottom - Generator.offsets.right.top;
        
        code += Generator.generateVerticalBorder('right');
    }
    
    // Terminate tags
    code += '</svg>';
    
    Control.setFrame(code, width, height, Generator.options.colors.background);
}

/**
 * 
 *  
 * @param {String} borderId 'top' or 'bottom'
 * @param {String} title (optional) the title
 * 
 * @return {String} the SVG code representing the border
 */
Generator.generateHorizontalBorder = function (borderId, title) {
    var options = Generator.options.border[borderId];
    var padding = Generator.options.border.padding;
    Generator.options.magic = (options.height * 1.36); // make the magic text size accessible to other files
    
    // The only two options that will change in generating the blocks
    var x = options.x, remainingWidth = options.width;
    
    var code = "";
    
    // Handle title first in order to subtract text width from full width
    if (title) {
        // Yes, 1.36 is a magic number found by guess-and-check
        var text = '<text>' + title + '</text>';
        var textWidth = svgElementWidth(text);
        
        text = '<text x="' + (options.width - textWidth + x) + '" y="' + 
                (options.y + options.height) + '" font-size="' + (options.height * 1.36) + 
                '" fill="' + Generator.options.colors.text + '">' + title + '</text>';
                
        remainingWidth -= textWidth + padding;
        
        code += text;
    }
    
    while (remainingWidth > (options.blockWidth + options.blockVariance) * 1.5) {
        var thisBlockWidth = options.blockWidth + Math.randomInt(-options.blockVariance, options.blockVariance);
        
        code += '<rect x="' + x + '" y="' + options.y + '" width="' + thisBlockWidth + '" height="' + options.height + '" fill="' + Generator.randomColor() + '" />';
        
        x += thisBlockWidth + padding;
        remainingWidth -= thisBlockWidth + padding;
    }
    
    code += '<rect x="' + x + '" y="' + options.y + '" width="' + remainingWidth + '" height="' + options.height + '" fill="' + Generator.randomColor() + '" "/>';
    
    return code;
};

Generator.generateVerticalBorder = function (borderId) {
    var options = Generator.options.border[borderId];
    var padding = Generator.options.border.padding;
    
    // The only two options that will change in generating the blocks
    var y = options.y, remainingHeight = options.height;
    
    var code = "";
    
    while (remainingHeight > (options.blockHeight + options.blockVariance) * 1.5) {
        var thisBlockHeight = options.blockHeight + Math.randomInt(-options.blockVariance, options.blockVariance);
        
        code += '<rect x="' + options.x + '" y="' + y + '" width="' + options.width + '" height="' + thisBlockHeight + '" fill="' + Generator.randomColor() + '" />';
        
        y += thisBlockHeight + padding;
        remainingHeight -= thisBlockHeight + padding;
    }
    
    code += '<rect x="' + options.x + '" y="' + y + '" width="' + options.width + '" height="' + remainingHeight + '" fill="' + Generator.randomColor() + '" />';
    
    return code;
};

Generator.randomColor = function () {
    return Generator.theme[Math.randomInt(0, Generator.theme.length)];
}
