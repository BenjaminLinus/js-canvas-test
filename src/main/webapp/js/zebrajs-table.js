function ZebrajsTable(containerId, rowsCount, colsCount, cellPadding, cellWidth) {

    var that = this;
    this.containerId = containerId;
    this.rowsCount = rowsCount;
    this.colsCount = colsCount;
    this.cellPadding = cellPadding;
    this.cellWidth = cellWidth;
    this.CELL_HEIGHT = 20;
    this.PADDING_TOP = 20;
    var NEWLY_CANVAS_ID = "tcanvas";
    this.JS_TABLE_HEADER_CAPTION = 'Test zebrajs table';
    CustomTable.call(this);
    var getRandomValue = this.getRandomValue;
    var celllFont;

    var mainPanel;
    var labels;

    var createCell = function(i, j) {
        var cell = new zebra.ui.Panel();
        cell.setBounds(j * rWidth, ( i + 1 ) * rHeight, rWidth + 1, rHeight + 1);
        cell.setBorder(new zebra.ui.Border("black", 1));
        var label = new zebra.ui.Label('' + getRandomValue());
        label.setFont(celllFont);
        label.properties({
            color: "Black",      // setColor setter will be called
            padding: 3        // setPadding method will be called
        });
        labels.push(label);
        cell.setLayout(new zebra.layout.FlowLayout(
            zebra.layout.CENTER,
            zebra.layout.CENTER,
            zebra.layout.HORIZONTAL, 2)
        );
        cell.add(label);
        mainPanel.add(cell);
    }

    var createRow = function(i) {
        for (var j = 0; j < that.colsCount; ++j) {
            createCell(i, j);
        }
    }

    var createTableRows = function() {
        for (var i = 0; i < that.rowsCount; ++i) {
            createRow(i);
        }
    }

    this.fillTable = function() {
        for (var i in labels) {
            labels[i].setValue('' + getRandomValue());
            //console.log('isValid1 = ' + labels[i].isValid);
            //labels[i].validate();
            //console.log('isValid2 = ' + labels[i].isValid);
        }
        mainPanel.validate();
    }

    this.createTable = function() {
        labels = new Array();
        testTable = document.getElementById(that.containerId);
        testTable.innerHTML = '';
        rWidth = (that.cellPadding * 2 + that.cellWidth);
        rHeight = (that.cellPadding * 2 + that.CELL_HEIGHT);
        fullWidth = rWidth * that.colsCount;
        fullHeight = rHeight * (that.rowsCount + 1) + that.PADDING_TOP;
        var canvas = document.createElement('canvas');
        canvas.id = NEWLY_CANVAS_ID;
        testTable.appendChild(canvas);
        canvas.width  = fullWidth;
        canvas.height = fullHeight;
        canvas.style.display = "inline-block";
        zebra.ready(function() {
            celllFont = new zebra.ui.Font("Arial", 14);
            // create Canvas
            var r = (new zebra.ui.zCanvas(NEWLY_CANVAS_ID)).root,
                ctr = new zebra.layout.Constraints();
             //new zebra.ui.Border("orange", 2)
            //r.setBorder(new zebra.ui.Border("black", 1));
            mainPanel = new zebra.ui.Panel();
            mainPanel.setBounds(0, that.PADDING_TOP, fullWidth, fullHeight - that.PADDING_TOP);
            mainPanel.setBorder(new zebra.ui.Border("black", 1));

            var headerPanel = new zebra.ui.Panel();
            headerPanel.setBounds(0, 0, fullWidth, rHeight + 1);
            headerPanel.setBorder(new zebra.ui.Border("black", 1));
            headerPanel.setLayout(new zebra.layout.FlowLayout(
                               zebra.layout.CENTER,
                               zebra.layout.CENTER,
                               zebra.layout.HORIZONTAL, 2));
            var headerLabel = new zebra.ui.Label(that.JS_TABLE_HEADER_CAPTION);
            var f = new zebra.ui.Font("Arial", "bold", 16);
            headerLabel.setFont(f);
            //headerLabel.setBounds(0, 0, fullWidth, rHeight + 1);
            //headerLabel.setLayout(zebra.layout.CENTER);
            headerLabel.properties({
                color: "Black",      // setColor setter will be called
                padding: 3        // setPadding method will be called
                //background: "gray"
            });

            // add children components
            headerPanel.add(headerLabel);
            mainPanel.add(headerPanel);
            createTableRows(mainPanel);
            r.add(mainPanel);

        });
    }

}