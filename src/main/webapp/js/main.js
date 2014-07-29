(function () {

	var TABLE_CONTAINER_ID = 'test-table';
	var MIN_BENCHMARK_REPEATS = 20;
	var CONTROLS_AREA_ID = 'controls-area';
	this.ROWS_COUNT = 100;
    this.COLS_COUNT = 10;
    this.CELL_PADDING = 10;
    this.CELL_WIDTH = 50;

    var testSuite;
    var jsTable = null;
    var kineticJsTable = null;
    var pixijsTable = null;
    var zebrajsTable = null;

	function log(msg) {
		document.getElementById('test-results').innerHTML += msg + '<br />';
	}

	var tests = new Array();
	var testI = 0;

	tests[0] = function(){
        jsTable = new JsTable(ROWS_COUNT, COLS_COUNT, CELL_PADDING, CELL_WIDTH);
		jsTable.createJsTable(TABLE_CONTAINER_ID);
    }
    tests[0].title = 'Create javascript table test';
    tests[0].setUp = null;

    tests[1] = function(){
    	jsTable.fillJsTable();
    }
    tests[1].title = 'Fill javascript table test';
    tests[1].setUp = function() {
        if (jsTable == null)
            tests[0]();
    };

    tests[2] = function(){
    	kineticJsTable = new KineticJsTable(TABLE_CONTAINER_ID, ROWS_COUNT,
    	    COLS_COUNT, CELL_PADDING, CELL_WIDTH);
    	kineticJsTable.createKineticJsTable();
    }
    tests[2].title = 'Create kineticJs table test';
    tests[2].setUp = null;

    tests[3] = function(){
        kineticJsTable.fillTable();
    }
    tests[3].title = 'Fill kineticJs table test';
    tests[3].setUp = function() {
        if (kineticJsTable == null)
            tests[2]();
    };

    tests[4] = function(){
        if (pixijsTable == null)
            pixijsTable= new PixijsTable(TABLE_CONTAINER_ID, ROWS_COUNT,
                COLS_COUNT, CELL_PADDING, CELL_WIDTH);
        pixijsTable.createTable();
    }
    tests[4].title = 'Create pixiJs table test';
    tests[4].setUp = null;

    tests[5] = function(){
        pixijsTable.fillTable();
    }
    tests[5].title = 'Fill pixiJs table test';
    tests[5].setUp = function() {
        tests[4]();
    };

    tests[6] = function(){
        if (zebrajsTable == null)
            zebrajsTable = new ZebrajsTable(TABLE_CONTAINER_ID, ROWS_COUNT,
            COLS_COUNT, CELL_PADDING, CELL_WIDTH);
        zebrajsTable.createTable();
    }
    tests[6].title = 'Create zebraJs table test';
    tests[6].setUp = null;

    tests[7] = function(){
        zebrajsTable.fillTable();
    }
    tests[7].title = 'Fill zebraJs table test';
    tests[7].setUp = function() {
        if (zebrajsTable == null)
            tests[6]();
    };

    var setupTest = function() {
        log('Create javascript table test started...');
    }

    var runAllTests = function() {
        var onComplete = function() {
            testI++;
            tryRunTest(testI, onComplete);
        }
        tryRunTest(testI, onComplete);
    }

    var runTest = function(i, onComplete) {
        //console.log('Test started... i = '+i);
        log(tests[i].title + ' started...');
        var testSuite = new Benchmark.Suite;
        //testSuite.options.minSamples = MIN_BENCHMARK_REPEATS;
        //testSuite.options.initCount = 100;
        if (tests[i].setUp != null) {
            tests[i].setUp();
        }
        testSuite.add(tests[i].title, tests[i]
            //, { minSamples: MIN_BENCHMARK_REPEATS, initCount: MIN_BENCHMARK_REPEATS }
        )
        .on('cycle', function(event) {
            console.log(String(event.target));
        })
        .on('complete', function() {
            log(tests[i].title + ' results: ' + this.pluck('hz') + ' ops/sec;' +
                ' repeats: '+this.pluck('stats')[0].sample.length + ';');
            //console.log(JSON.stringify(this));
            //console.log('testI='+testI);
            if (onComplete != null) {
                onComplete();
            }
        })
        // run async
        .run({ 'async': true });
    }

    var tryRunTest = function(i, onComplete) {
        if (i < tests.length)
            runTest(i, onComplete);
    }

    var createControls = function() {
        var controlsArea = document.getElementById(CONTROLS_AREA_ID);
        controlsArea.innerHTML += '<br /><a href="javascript: void(0)" id="testsRun">All tests run</a><br />';
        for (var i in tests) {
            controlsArea.innerHTML += '<br /><a href="javascript: void(0)" id="test'
                + i + 'run">' + tests[i].title + ' run</a><br />';
        }
        for (var i in tests) {
            var el = document.getElementById('test' + i + 'run');
            el.testNo = i;

            if (el.addEventListener) {
                el.addEventListener("click", function(i) {
                    tryRunTest(this.testNo, null);
                }, false);
            } else {
                el.attachEvent('onclick', function(i) {
                    tryRunTest(this.testNo, null);
                });
            }
        }
        var elAll = document.getElementById('testsRun');
        if (elAll.addEventListener) {
            elAll.addEventListener("click", function(i) {
                runAllTests();
            }, false);
        } else {
            elAll.attachEvent('onclick', function(i) {
                runAllTests();
            });
        }
    }

	function main(){
        //log('Main method started...');
        createControls();
        //runTest();
        tests[4]();
        //setInterval(tests[4], 1111);
    }

    if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', main, false);
    } else {
        window.attachEvent('onload', main);
    }

} ());