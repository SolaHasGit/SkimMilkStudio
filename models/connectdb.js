const sqlite = require("better-sqlite3");
const path = require("path");
const db = new sqlite(path.join(__dirname, "../skimmilkDB", "skimmilk.db"));

function run(sql, ...params) {
    return db.prepare(sql).run(params[0]);
}

function get(sql, ...params) {
    return db.prepare(sql).get(params);
}

function all(sql, ...params) {
    return db.prepare(sql).all(params);
}

module.exports = {
  all,
  get,
  run,
};