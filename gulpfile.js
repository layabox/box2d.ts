const gulp = require('gulp');
const child_process = require("child_process");
const fs = require("fs");
const path = require("path");

function genBox2dJS(cb) {
    changeCon(true);
    genSpawn("rollup", ["-c"], cb);
}

function genBox2dDTS(cb) {
    changeCon(false);
    genSpawn("rollup", ["-c"], cb);
}

function genSpawn(command, args, cb) {
    const cs = child_process.spawn(command, args, {
        shell: true
    });
    cs.stdout.on('data', (data) => {
        console.log(`${data}`);
    });
    cs.stderr.on('data', (err) => {
        console.log(`${err}`);
    });
    cs.on('close', (code) => {
        console.log(`子进程退出码：${code}`);
        cb();
    });
}

function changeCon(flag) {
    let searchStr = flag ? "const gendts = true;" : "const gendts = false;";
    let replaceStr = flag ? "const gendts = false;" : "const gendts = true;";
    let con = fs.readFileSync("./rollup.config.js", "utf-8");
    con = con.replace(searchStr, replaceStr);
    fs.writeFileSync("./rollup.config.js", con, "utf-8");
}

exports.default = gulp.series(genBox2dJS, genBox2dDTS)