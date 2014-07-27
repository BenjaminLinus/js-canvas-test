These javascript tests desgned to compare UI perfomance of
javascript DOM model, kineticjs library, pixijs library
and zebra js library. To compare perfomance test methods
calculate time of filling a small sample table.
The project uses Gradle as build system.
To run application type command:
gradle jettyRun

Than, open the URL http://localhost:8080/js-canvas-test/index.html in browser.

Tipical results of the test using Google Chrome (Windows, Intel Core I3):

DOM model: 210 ops/sec.
Kineticjs: 8.22 ops/sec.
Pixijs: 9.73 ops/sec.
Zebrajs: 132.9 ops/sec.