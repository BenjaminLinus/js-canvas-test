function KineticJsTable(containerId, rowsCount, colsCount, cellPadding, cellWidth) {

    var that = this;
    this.containerId = containerId;
    this.rowsCount = rowsCount;
    this.colsCount = colsCount;
    this.cellPadding = cellPadding;
    this.cellWidth = cellWidth;
    this.CELL_HEIGHT = 20;
    this.PADDING_TOP = 20;
    this.JS_TABLE_HEADER_CAPTION = 'Test kineticjs table';
    var layer;
    var rWidth;
    var rHeight;
    var fullWidth;
    var fullHeight;
    var values;

    CustomTable.call(this);
    var getRandomValue = this.getRandomValue;

    this.createCell = function(i, j) {
        var rect = new Kinetic.Rect({
            x: ( j * 2 + (i % 2) ) * rWidth,
            y: rHeight * ( i + 1 ) + that.PADDING_TOP,
            width: rWidth,
            height: rHeight,
            //offset: {x:100, y:10},
            //fill: 'green',
            stroke: 'black',
            strokeWidth: 1,
            shadowEnabled: false,
            lineJoin: 'bevel',
            lineCap: 'square'
        });

        var val = getRandomValue();

        for (var c = 0; c < 2; ++c) {
            var text = new Kinetic.Text({
                x: ( j * 2 + c ) * rWidth,
                y: rHeight * ( i + 1 ) + that.PADDING_TOP + 13,
                text: '' + val,
                fontSize: 14,
                fontFamily: 'Arial',
                fill: '#000000',
                width: rWidth,
                height: rHeight,
                align: 'center',
                drawBorder: true
            });
            values.push(text);
            layer.add(text);
        }

        // add the shape to the layer
        layer.add(rect);
    }

    this.createRow = function(i) {
        for (var j = 0; j < that.colsCount / 2; ++j) {
            that.createCell(i, j);
        }

    }

    this.fillTable = function() {
        for (var i in values) {
            values[i].text(getRandomValue());
        }
        layer.draw();
    }

    this.createKineticJsTable = function() {
        values = new Array();
        testTable = document.getElementById(that.containerId);
        testTable.innerHTML = '';
        rWidth = (that.cellPadding * 2 + that.cellWidth);
        rHeight = (that.cellPadding * 2 + that.CELL_HEIGHT);
        fullWidth = rWidth * that.colsCount;
        fullHeight = rHeight * (that.rowsCount + 1) + that.PADDING_TOP;
        var stage = new Kinetic.Stage({
            container: that.containerId,
            width: fullWidth,
            height: fullHeight
        });

        layer = new Kinetic.FastLayer();

        var rect = new Kinetic.Rect({
            x: 0,
            y: that.PADDING_TOP,
            width: fullWidth,
            height: fullHeight,
            stroke: 'black',
            strokeWidth: 1
        });
        // add the shape to the layer
        layer.add(rect);

        rect = new Kinetic.Rect({
            x: 0,
            y: fullHeight-1,
            width: fullWidth,
            height: 0,
            stroke: 'black',
            strokeWidth: 1,
            shadowEnabled: false,
            lineJoin: 'bevel',
            lineCap: 'square'
        });
        layer.add(rect);
        rect = new Kinetic.Rect({
            x: 0,
            y: rHeight + that.PADDING_TOP,
            width: fullWidth,
            height: 0,
            stroke: 'black',
            strokeWidth: 1,
            shadowEnabled: false,
            lineJoin: 'bevel',
            lineCap: 'square'
        });
        layer.add(rect);

        rect = new Kinetic.Rect({
            x: 0,
            y: that.PADDING_TOP,
            width: fullWidth,
            height: 0,
            stroke: 'black',
            strokeWidth: 1,
            shadowEnabled: false,
            lineJoin: 'bevel',
            lineCap: 'square'
        });
        layer.add(rect);

        rect = new Kinetic.Rect({
            x: 1,
            y: that.PADDING_TOP,
            width: 0,
            height: fullHeight,
            stroke: 'black',
            strokeWidth: 1,
            shadowEnabled: false,
            lineJoin: 'bevel',
            lineCap: 'square'
        });
        layer.add(rect);

        rect = new Kinetic.Rect({
            x: fullWidth - 1,
            y: that.PADDING_TOP,
            width: 0,
            height: fullHeight,
            stroke: 'black',
            strokeWidth: 1,
            shadowEnabled: false,
            lineJoin: 'bevel',
            lineCap: 'square'
        });
        layer.add(rect);

        var text = new Kinetic.Text({
            x: 0,
            y: that.PADDING_TOP + 12,
            text: that.JS_TABLE_HEADER_CAPTION,
            fontSize: 16,
            fontStyle: 'bold',
            fontFamily: 'Arial',
            fill: '#000000',
            width: fullWidth,
            height: fullHeight,
            align: 'center'
        });
        layer.add(text);

        for (var i = 0; i < that.rowsCount; ++i) {
            that.createRow(i);
        }

        // add the layer to the stage
        stage.add(layer);

    }

}