/** ARCHIVED
 * @file scan.js
 * @description Scans a directory for new files and logs the event and filename to the console.
 * This is my first attempt at a node.js script to scan a directory for new files.
 * Purely hardcoded, but gets the job done. And it doesn't tell me what assets file belongs to.
 * If you want to run this, you'll may use `node scan.js` in the terminal.
 *
 */

/* eslint-disable */
fs = require('fs');
os = require('child_process');

const exec = os.exec;

// var assetsList = [];

// // Read the assets list
// fs.readFile('assets.md', 'utf8', function(err, data) {
//     if (err) {
//         return console.log(err);
//     }
//     assetsList = data.split('\n');
// });

// Process the assets list
// for (var i = 0; i < assetsList.length; i++) {
//     var asset = assetsList[i];
//     console.log('asset:', asset);
// }

// Clear folders with clear.bat
exec('clear.bat', (err, stdout, stderr) => {
    if (err) {
        if (err.code === 1) {
            console.log('Folder is empty');
            return;
        }
        console.error(err);
        return;
    }
    console.log(stdout);
});

const dir = './DXGI_FORMAT_R8G8B8A8_UNORM_SRGB'

// Listen for new files in the directory
fs.watch(dir, function(event, filename) {
    console.log('event is: ' + event);
    if (filename) {
        console.log('filename provided: ' + filename);
    } else {
        console.log('filename not provided');
    }
});
