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
    var JS_TABLE_CELL_SPAN_ID_TEMPLATE = 'js-table-cell-span';
    this.JS_TABLE_HEADER_CAPTION = 'Test javascript table';

    CustomTable.call(this);
    var getRandomValue = this.getRandomValue;

    this.createJsTableCell = function(i, j) {
    	var innerHTML = '<div id="'+that.JS_TABLE_CELL_ID_TEMPLATE+'-'+i+'-'+j+'"'+
    	' style="width: '+that.CELL_WIDTH+'px; padding: '+that.CELL_PADDING+'px; '+
    	'display: inline-block; border-left: #000000 solid 1px;'+
    	' border-bottom: #000000 solid 1px;"'+
    	' ><span id ="'+JS_TABLE_CELL_SPAN_ID_TEMPLATE+'-'+i+'-'+j+'">';
    	innerHTML += '' + that.getRandomValue();
    	innerHTML += '</span></div>';
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
    	var innerHTML = '<div style="border-left: #000000 solid 1px; '+
    	    'border-bottom: #000000 solid 1px; padding: 0px;">';
    	innerHTML += '<h4 style="margin: 0px; padding: 14px;">'+that.JS_TABLE_HEADER_CAPTION+'</h4>';
    	innerHTML += '</div>';
    	return innerHTML;
    }

    this.createJsTable = function(elId) {
    	testTable = document.getElementById(elId);
    	testTable.innerHTML = '';
    	var t = '';
    	t += '<div id="'+that.JS_TABLE_ID+'" style="border-top: #000000 solid 1px; '+
    	    'border-right: #000000 solid 1px; display: inline-block;" >';
    	t += that.createJsTableHeaderRow();
    	for (var i = 0; i < that.ROWS_COUNT; ++i) {
    		t += that.createJsTableRow(i);
    	}
    	t += '</div>';
    	testTable.innerHTML += t;
    }

    var tval;

    this.fillJsTableCell = function(i, j) {
    	document.getElementById(JS_TABLE_CELL_SPAN_ID_TEMPLATE+'-'+i+'-'+j).innerHTML = that.getRandomValue();
        //console.log('fillJsTableCell!');
        //console.log(i+'-'+j+' width = ' + document.getElementById(JS_TABLE_CELL_SPAN_ID_TEMPLATE+'-'+i+'-'+j).clientWidth );
        tval = document.getElementById(JS_TABLE_CELL_SPAN_ID_TEMPLATE+'-'+i+'-'+j).clientWidth;
        //
    }

    this.fillJsTable = function(msg) {
    	for (var i = 0; i < that.ROWS_COUNT; ++i) {
    		for (var j = 0; j < that.COLS_COUNT; ++j) {
    			that.fillJsTableCell(i, j);
    		}
    	}
    }

}