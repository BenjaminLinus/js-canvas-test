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
    var rWidth;
    var rHeight;
    var fullWidth;
    var fullHeight;
    var graphics = null;
    var stage = null;
    var textValues = new Array();
    var renderer = null;
    var b = false;

    CustomTable.call(this);
    var getRandomValue = this.getRandomValue;

    this.createCell = function(i, j) {

        var val = getRandomValue();

        graphics.lineStyle(1, 0x000000, 1);
        graphics.drawRect(( j ) * rWidth, rHeight * ( i + 1 ) + that.PADDING_TOP,
            rWidth, rHeight );
        var style = {font:"normal 14px Arial", fill: "black", align:"center",
        strokeThickness: 0};
        var textVal = new PIXI.Text('' + val, style);

        // center the sprites anchor point
        textVal.anchor.x = 0.5;
        textVal.anchor.y = 0.5;

        // move the sprite t the center of the screen
        textVal.position.x = ( j + 0.5 ) * rWidth;
        textVal.position.y = rHeight * ( i + 1 + 0.5 ) + that.PADDING_TOP;
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
        //console.log('createTable!');
        textValues = [];
        testTable = document.getElementById(that.containerId);
        testTable.innerHTML = '';
        rWidth = (that.cellPadding * 2 + that.cellWidth);
        rHeight = (that.cellPadding * 2 + that.CELL_HEIGHT);
        fullWidth = rWidth * that.colsCount;
        fullHeight = rHeight * (that.rowsCount + 1) + that.PADDING_TOP;
        stage = new PIXI.Stage(0xFFFFFF, true);
        stage.setInteractive(true);

        if (renderer == null)
            renderer = PIXI.autoDetectRenderer(fullWidth, fullHeight);
        renderer.clearBeforeRender = true;

        renderer.view.style.display = "inline-block";
        testTable.appendChild(renderer.view);

        graphics = new PIXI.Graphics();
        stage.addChild(graphics);

        graphics.lineStyle(1, 0x000000, 1);
        graphics.drawRect(0, that.PADDING_TOP, fullWidth-1, fullHeight - that.PADDING_TOP - 1);

        var style = {font:"bold 16px Arial", fill: "black", align:"center",
                strokeThickness: 0};
        var headText = new PIXI.Text(that.JS_TABLE_HEADER_CAPTION, style);
        // center the sprites anchor point
        headText.anchor.x = 0.5;
        headText.anchor.y = 0.5;
        // move the sprite t the center of the screen
        headText.position.x = ( 0.5 ) * fullWidth;
        headText.position.y = rHeight * ( 0.5 ) + that.PADDING_TOP;
        stage.addChild(headText);

        for (var i = 0; i < that.rowsCount; ++i) {
            that.createRow(i);
        }
        renderer.render(stage);

    }

}