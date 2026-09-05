/**
 * json-server 自定义中间件
 *
 * 项目前端（src/api/user.ts）期望的是 RPC 风格接口，返回固定信封：
 *   { code: 0, data: ..., message: "..." }
 * 而 json-server 默认把 db.json 顶层 key 当作 REST 资源，
 * POST 到非集合资源会报错，且响应结构不符合前端判断。
 *
 * 这里直接按路径拦截已知的 RPC 路由，原样返回 db.json 里的信封，
 * 让前端 `res.data.code === 0` 的判断全部成立，无需改动任何业务代码。
 *
 * 注意：vue.config.js 的 proxy 已把 /api 去掉再转发，
 * 所以 json-server 实际收到的路径是 /login、/register ...（不带 /api）。
 */
const db = require('../db.json');

// 路径 -> db.json 中的 key
const ROUTE_MAP = {
  '/register': 'register',
  '/login': 'login',
  '/logout': 'logout',
  '/current': 'current',
  '/search': 'search',
  '/delete': 'delete',
};

module.exports = (req, res, next) => {
  const key = ROUTE_MAP[req.path];
  if (key && db[key]) {
    // 可选：模拟真实网络延迟
    // return setTimeout(() => res.json(db[key]), 200);
    return res.json(db[key]);
  }
  next();
};
