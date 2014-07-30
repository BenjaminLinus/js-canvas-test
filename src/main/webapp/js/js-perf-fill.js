var PIXI_TABLE_CONTAINER_ID1 = 'pixi-canvas-test-table';
var PIXI_TABLE_CONTAINER_ID2 = 'pixi-webgl-test-table';
var ROWS_COUNT = 30;
var COLS_COUNT = 10;
var CELL_PADDING = 10;
var CELL_WIDTH = 50;

function initPixi2(callBack) {
    if (cPixijsTable == null)
        cPixijsTable= new PixijsTable(PIXI_TABLE_CONTAINER_ID2, ROWS_COUNT,
            COLS_COUNT, CELL_PADDING, CELL_WIDTH, false);
    if (!cPixijsTable.fontsLoaded) {
        cPixijsTable.setUpFontsGlobal(fontsPath, true, callBack);
    }
}

function initPixi(callBack) {
    if (pixijsTable == null)
        pixijsTable= new PixijsTable(PIXI_TABLE_CONTAINER_ID1, ROWS_COUNT,
            COLS_COUNT, CELL_PADDING, CELL_WIDTH, true);
    if (!pixijsTable.fontsLoaded) {
        pixijsTable.setUpFontsGlobal(fontsPath, true, function() {
            initPixi2(callBack);
        });
    }
}

document.getElementById('controls-area').innerHTML = '<strong>Test does not ready yet.</strong>';

initPixi(function() {
    document.getElementById('controls-area').innerHTML = '<strong>Test ready to start now!</strong>';
});
