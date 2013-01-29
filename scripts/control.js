$(document).ready(function () {
    // The color picker needs the extra 20 ms to initialize... not sure why
    setTimeout(Control.init, 20);
});

function Control() {}

Control.init = function () {
    Control.initColorPicker($('#inputColorBackground'), '#000');
    Control.initColorPicker($('#inputColorText'), '#9293D3');
    
    Control.addColorTheme();
    
    $('#newThemeButton').click(Control.addColorTheme);
    $('#submitButton').click(Generator.generate);
    
    Control.loadOptions();
    
    Generator.init();
};

Control.initColorPicker = function ($picker, startColor) {
    if (!startColor) {
        startColor = '#FFF';
    }
    
    $picker.css('background-color', startColor);
    
    $picker.ColorPicker({
        color: startColor,
        onBeforeShow: function () {
            $(this).ColorPickerSetColor(rgbToHash($(this).css('background-color')));
        },
        onShow: function (picker) {
            $(picker).show()
            return false;
        },
        onHide: function (picker) {
            $(picker).hide();
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $picker.css('background-color', '#' + hex);
        },
        onSubmit: function (hsb, hex, rgb) {
            $picker.css('background-color', '#' + hex);
        }
    });
};

Control.addColorTheme = function () {
    var $themesTable = $('#borderThemesTable');
    
    var html = '<tr>' +
                   '<td><div class="themeClose" onclick="Control.removeColorTheme(this)"></div></td>' +
                   '<td><div class="colorClose" onclick="Control.removeColor(this)"></div><div class="colorSelector"></div></td>' +
                   '<td><div class="newColorButton" onclick="Control.addColor(this)"></div></td>' +
               '</tr>';
    
    $themesTable.append(html);
    
    $selectors = $('.colorSelector');
    Control.initColorPicker($($selectors[$selectors.length - 1]));
};

Control.removeColorTheme = function (removeColorThemeButton) {
    if ($('#borderThemesTable tr').length === 1) {
        Control.showErrorMessage("Must have at least one theme.");
        return;
    }
    
    $(removeColorThemeButton).parent().parent().remove();
}

Control.addColor = function (newColorButton) {
    var html = '<div class="colorClose" onclick="Control.removeColor(this)"></div><div id="tempColorSelector" class="colorSelector"></div>';
    
    var $td = $(newColorButton).parent();
    
    $td.html(html);
    Control.initColorPicker($('#tempColorSelector'));
    $('#tempColorSelector').removeAttr('id');
    
    $td.parent().append('<td><div class="newColorButton" onclick="Control.addColor(this)"></div></td>');
    
};

Control.removeColor = function (removeColorButton) {
    if ($(removeColorButton).parent().parent().children().length === 3) {
        Control.showErrorMessage("Must have at least one color in a theme.")
        return;
    }
    
    $(removeColorButton).parent().remove();
}

Control.errorMessageTimeout = null;

Control.showErrorMessage = function (message) {
    if (Control.errorMessageTimeout) {
        clearTimeout(Control.errorMessageTimeout);
        Control.errorMessageTimeout = null;
    }
    
    $('#errorMessage').html(message);
    $('#errorMessage').show();
    
    Control.errorMessageTimeout = setTimeout(function() {
        $('#errorMessage').fadeOut(2000);
        Control.errorMessageTimeout = null;
    }, 1500);
};

Control.loadOptions = function (lcarsOptions) {
    if (!lcarsOptions) {
        lcarsOptions = new LcarsOptions();
    }
    
    // Dims
    $('#inputWidth').attr('value', lcarsOptions.dims.width);
    $('#inputHeight').attr('value', lcarsOptions.dims.height);
    
    // Border padding and title
    $('#inputBorderPadding').attr('value', lcarsOptions.border.padding);
    $('#inputBorderTitle').attr('value', lcarsOptions.border.title);
    
    // Top
    $('#inputBorderTopHeight').attr('value', lcarsOptions.border.top.height);
    $('#inputBorderTopBlockWidth').attr('value', lcarsOptions.border.top.blockWidth);
    $('#inputBorderTopBlockVariance').attr('value', lcarsOptions.border.top.blockVariance);
    
    // Right
    $('#inputBorderRightWidth').attr('value', lcarsOptions.border.right.width);
    $('#inputBorderRightBlockHeight').attr('value', lcarsOptions.border.right.blockHeight);
    $('#inputBorderRightBlockVariance').attr('value', lcarsOptions.border.right.blockVariance);
    
    // Bottom
    $('#inputBorderBottomHeight').attr('value', lcarsOptions.border.bottom.height);
    $('#inputBorderBottomBlockWidth').attr('value', lcarsOptions.border.bottom.blockWidth);
    $('#inputBorderBottomBlockVariance').attr('value', lcarsOptions.border.bottom.blockVariance);
    
    // Left
    $('#inputBorderLeftWidth').attr('value', lcarsOptions.border.left.width);
    $('#inputBorderLeftBlockHeight').attr('value', lcarsOptions.border.left.blockHeight);
    $('#inputBorderLeftBlockVariance').attr('value', lcarsOptions.border.left.blockVariance);
    
    // Colors
    $('#inputColorBackground').css('background-color', lcarsOptions.colors.background);
    $('#inputColorText').css('background-color', lcarsOptions.colors.text);
    
    // TODO Reset all pickers
    
    var themes = lcarsOptions.colors.themes;
    
    for (var i = 0; i < themes.length; i++) {
        if (i !== 0) {
            Control.addColorTheme();
        }
        
        for (var j = 0; j < themes[i].length; j++) {
            if (j !== 0) {
                var button = $('.newColorButton')[$('.newColorButton').length - 1];
                Control.addColor(button);
            }
            
            var colorSelector = $('.colorSelector')[$('.colorSelector').length - 1];
            $(colorSelector).css('background-color', themes[i][j]);
        }
    }
};

Control.getOptions = function () {
    var lcarsOptions = new LcarsOptions();
    
    lcarsOptions.dims.width = parseInt($('#inputWidth').attr('value'));
    lcarsOptions.dims.height = parseInt($('#inputHeight').attr('value'));
    
    // Border padding and title
    lcarsOptions.border.padding = parseInt($('#inputBorderPadding').attr('value'));
    lcarsOptions.border.title = $('#inputBorderTitle').attr('value');
    
    // Top
    lcarsOptions.border.top.height = parseInt($('#inputBorderTopHeight').attr('value'));
    lcarsOptions.border.top.blockWidth = parseInt($('#inputBorderTopBlockWidth').attr('value'));
    lcarsOptions.border.top.blockVariance = parseInt($('#inputBorderTopBlockVariance').attr('value'));
    
    // Right
    lcarsOptions.border.right.width = parseInt($('#inputBorderRightWidth').attr('value'));
    lcarsOptions.border.right.blockHeight = parseInt($('#inputBorderRightBlockHeight').attr('value'));
    lcarsOptions.border.right.blockVariance = parseInt($('#inputBorderRightBlockVariance').attr('value'));
    
    // Bottom
    lcarsOptions.border.bottom.height = parseInt($('#inputBorderBottomHeight').attr('value'));
    lcarsOptions.border.bottom.blockWidth = parseInt($('#inputBorderBottomBlockWidth').attr('value'));
    lcarsOptions.border.bottom.blockVariance = parseInt($('#inputBorderBottomBlockVariance').attr('value'));
    
    // Left
    lcarsOptions.border.left.width = parseInt($('#inputBorderLeftWidth').attr('value'));
    lcarsOptions.border.left.blockHeight = parseInt($('#inputBorderLeftBlockHeight').attr('value'));
    lcarsOptions.border.left.blockVariance = parseInt($('#inputBorderLeftBlockVariance').attr('value'));
    
    // Colors
    lcarsOptions.colors.background = rgbToHash($('#inputColorBackground').css('background-color'));
    lcarsOptions.colors.text = rgbToHash($('#inputColorText').css('background-color'));
    
    lcarsOptions.colors.themes = [];
    
    var $themes = $('#borderThemesTable tr');
    
    for (var i = 0; i < $themes.length; i++) {
        var colors = [];
        
        var $colorSelectors = $('.colorSelector', $themes[i]);
        
        for (var j = 0; j < $colorSelectors.length; j++) {
            colors.push(rgbToHash($($colorSelectors[j]).css('background-color')));
        }
        
        lcarsOptions.colors.themes.push(colors);
    }
    
    return lcarsOptions;
};

Control.setFrame = function (code, width, height, background) {
    
    $('#mainContainer').fadeOut(500, function () {
        $('#testFrame').width(width);
        $('#testFrame').html(code);
        $('#testFrameContainer').css('background-color', background);
        
        $('#mainContainer').fadeIn(500);
    });
}
