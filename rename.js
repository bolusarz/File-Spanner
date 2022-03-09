const path = require('path');
const fs = require('fs');


const directory = process.argv[2]
console.log(directory)


const listDir = (dir, fileList = [], regExp = '', callback) => {

    let files = fs.readdirSync(dir);

    files.forEach(file => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            fileList = listDir(path.join(dir, file), fileList);
        } else {
            if(regExp === '' || regExp.test(file)) {
                let src = path.join(dir, file);
                let newSrc = path.join(dir, callback(file));
                fileList.push({
                    oldSrc: src,
                    newSrc: newSrc
                });
            }
        }
    });

    return fileList;
};

let foundFiles = listDir( directory, [], /\.pdf$/, (file) => {
    return file.split('-')[1].trim() + '.pdf';
});
foundFiles.forEach(f => {
    fs.renameSync(f.oldSrc, f.newSrc);
});
