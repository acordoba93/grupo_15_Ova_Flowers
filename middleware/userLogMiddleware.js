const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "../userLog.txt");
const log = fs.readFileSync(logPath, "utf-8");

function userLogMiddleware(req, res, next) {
	fs.appendFileSync(logPath, "el usuario ingreso en:" + req.url + '\n');
	next();
}

module.exports = userLogMiddleware;