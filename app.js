/*

video : 모든 동영상 파일들
captured : png, aae 타입의 파일들
duplicated : IMG_E0712 > E가 붙은 것들은 냅두고 그 원본사진들



*/
const testFolder = process.argv[2];
const fs = require('fs');
const fsExt = require('fs-extra');
const path = require('path');

function move(dirName, data) {
    const src = `./${testFolder}/${data}`;
    const dest = `./${testFolder}/${dirName}/${data}`

    fsExt.move(src, dest, (err) => {
        if (err) return console.log(err);
    })
}

fs.readdir(testFolder, (err, files) => {
    if (err) {
        console.log('error', err)
    } else {
        const eFile = files.filter(data => data.includes('E'))

        files.forEach(data => {
            const ext = path.extname(data);

            if (ext === '.png' || ext === '.aae') {
                move('captured', data)
            } else if (ext === '.mp4' || ext === '.mov') {
                move('video', data)
            } else {
                eFile.forEach(eData => {
                    if (eData.replace('E', '') === data) {
                        move('duplicated', data)
                    }
                })
            }
        })
    }
})



