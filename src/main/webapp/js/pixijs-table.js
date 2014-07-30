function PixijsTable(containerId, rowsCount, colsCount, cellPadding, cellWidth) {

    var that = this;
    this.containerId = containerId;
    this.rowsCount = rowsCount;
    this.colsCount = colsCount;
    this.cellPadding = cellPadding;
    this.cellWidth = cellWidth;
    this.CELL_HEIGHT = 20;
    this.PADDING_TOP = 20;
    this.JS_TABLE_HEADER_CAPTION = 'Test pixijs table';
    var rWidth = (that.cellPadding * 2 + that.cellWidth);
    var rHeight = (that.cellPadding * 2 + that.CELL_HEIGHT);
    var fullWidth = rWidth * that.colsCount;
    var fullHeight = rHeight * (that.rowsCount + 1) + that.PADDING_TOP;
    var graphics = null;
    var stage = null;
    var textValues = new Array();
    var renderer = PIXI.autoDetectRenderer(fullWidth, fullHeight);
    //renderer = new PIXI.CanvasRenderer(fullWidth, fullHeight);
    var b = false;
    var invertFilter = new PIXI.InvertFilter();

    CustomTable.call(this);
    var getRandomValue = this.getRandomValue;

    this.fontsLoaded = false;

    this.createCell = function(i, j) {

        var val = getRandomValue();

        graphics.lineStyle(1, 0x000000, 1);
        graphics.drawRect(( j ) * rWidth, rHeight * ( i + 1 ) + that.PADDING_TOP,
            rWidth, rHeight );
        var style = {font:"normal 16px ArialBitmap11", fill: "black", align:"center",
        strokeThickness: 0};
        var textVal = new PIXI.BitmapText('' + val, style);

        // move the sprite t the center of the screen
        textVal.position.x = ( j + 0.5 ) * rWidth - textVal.textWidth / 2;
        textVal.position.y = rHeight * ( i + 1 + 0.5 ) + that.PADDING_TOP - textVal.textHeight / 2;
        textValues.push(textVal);
        stage.addChild(textVal);
    }


    this.createRow = function(i) {
        for (var j = 0; j < that.colsCount; ++j) {
            that.createCell(i, j);
        }

    }

    this.fillTable = function() {
        for (var i in textValues) {
            textValues[i].setText('' + getRandomValue());
        }
        renderer.render(stage);
    }

    this.createTable = function() {
        textValues = [];
        testTable = document.getElementById(that.containerId);
        testTable.innerHTML = '';
        stage = new PIXI.Stage(0xFFFFFF, true);
        stage.setInteractive(true);

        renderer.clearBeforeRender = true;

        renderer.view.style.display = "inline-block";
        testTable.appendChild(renderer.view);

        graphics = new PIXI.Graphics();
        stage.addChild(graphics);

        graphics.lineStyle(1, 0x000000, 1);
        graphics.drawRect(0, that.PADDING_TOP, fullWidth-1, fullHeight - that.PADDING_TOP - 1);

        var style = {font:"bold 20px ArialBitmap11", fill: "white", align:"center",
            strokeThickness: 0
            //, tint: 0x0000FF
            };
        //var headText = new PIXI.Text(that.JS_TABLE_HEADER_CAPTION, style);
        var headText = new PIXI.BitmapText(that.JS_TABLE_HEADER_CAPTION, style);
        //headText.filters = [invertFilter];
        //headText.tint = 0xFFFFFF;
        // center the sprites anchor point
        //headText.anchor.x = 0.5;
        //headText.anchor.y = 0.5;
        // move the sprite t the center of the screen
        headText.position.x = ( 0.5 ) * fullWidth - headText.textWidth / 2;
        headText.position.y = rHeight * ( 0.5 ) + that.PADDING_TOP - headText.textHeight / 2;
        stage.addChild(headText);

        for (var i = 0; i < that.rowsCount; ++i) {
            that.createRow(i);
        }
        renderer.render(stage);
    }

    function fonsLoadCallback(callBack) {
        that.fontsLoaded = true;
        if (callBack != null) {
            callBack();
        }
    }

    this.setUpFonts = function(callBack) {
        that.setUpFontsGlobal('', false, callBack);
    }

    this.setUpFontsGlobal = function(globalPath, crossOrigin, callBack) {
        var fontsToLoad = [globalPath + "fonts/arial11.xml"];
        // create a new loader
        var fontsLoader = new PIXI.AssetLoader(fontsToLoad, crossOrigin);

        fontsLoader.onComplete = function() {
            fonsLoadCallback(callBack);
        };
        fontsLoader.load();

    }

}