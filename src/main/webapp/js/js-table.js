function JsTable(rowsCount, colsCount, cellPadding, cellWidth) {
    var that= this;

    this.ROWS_COUNT = rowsCount;
    this.COLS_COUNT = colsCount;
    this.CELL_PADDING = cellPadding;
    this.CELL_WIDTH = cellWidth;
    this.MAX_RANDOM = 1000;
    this.JS_TABLE_ID = 'js-table';
    this.testTable;
    this.JS_TABLE_ROW_STYLENAME = 'js-table-row';
    this.JS_TABLE_CELL_ID_TEMPLATE = 'js-table-cell';
    this.JS_TABLE_CELL_STYLENAME = that.JS_TABLE_CELL_ID_TEMPLATE;
    this.JS_TABLE_HEADER_ROW_STYLENAME = 'js-table-header-row';
    this.JS_TABLE_HEADER_CAPTION = 'Test javascript table';

    CustomTable.call(this);
    var getRandomValue = this.getRandomValue;

    this.createJsTableCell = function(i, j) {
    	var innerHTML = '<div id="'+that.JS_TABLE_CELL_ID_TEMPLATE+'-'+i+'-'+j+'"'+
    	' style="width: '+that.CELL_WIDTH+'px; padding: '+that.CELL_PADDING+'px;"'+
    	' class="'+ that.JS_TABLE_CELL_STYLENAME+'">';
    	innerHTML += '' + that.getRandomValue();
    	innerHTML += '</div>';
    	return innerHTML;
    }

    this.createJsTableRow = function(i) {
    	var innerHTML = '<div id="js-table-row-'+i+'" class="'+ that.JS_TABLE_ROW_STYLENAME+'">';
    	for (var j = 0; j < that.COLS_COUNT; ++j) {
    		innerHTML += that.createJsTableCell(i, j);
    	}
    	innerHTML += '</div>';
    	return innerHTML;
    }

    this.createJsTableHeaderRow = function() {
    	var innerHTML = '<div class="' + that.JS_TABLE_HEADER_ROW_STYLENAME+'">';
    	innerHTML += '<h4>'+that.JS_TABLE_HEADER_CAPTION+'</h4>';
    	innerHTML += '</div>';
    	return innerHTML;
    }

    this.createJsTable = function(elId) {
    	testTable = document.getElementById(elId);
    	testTable.innerHTML = '';
    	var t = '';
    	t += '<div id="'+that.JS_TABLE_ID+'">';
    	t += that.createJsTableHeaderRow();
    	for (var i = 0; i < that.ROWS_COUNT; ++i) {
    		t += that.createJsTableRow(i);
    	}
    	t += '</div>';
    	testTable.innerHTML += t;
    }

    this.fillJsTableCell = function(i, j) {
    	document.getElementById(that.JS_TABLE_CELL_ID_TEMPLATE+'-'+i+'-'+j).innerHTML = that.getRandomValue();
    }

    this.fillJsTable = function(msg) {
    	for (var i = 0; i < that.ROWS_COUNT; ++i) {
    		for (var j = 0; j < that.COLS_COUNT; ++j) {
    			that.fillJsTableCell(i, j);
    		}
    	}
    }

}