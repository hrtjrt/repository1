import router from "@/router";
import { userLoginUserStore } from "./store/useLoginUserStore";
import { message } from "ant-design-vue";


// 允许进入管理页的角色（兼容字符串 "admin" 与数字 1，避免与后端字段类型不一致）
const ADMIN_ROLES = ["admin", "1", 1];

router.beforeEach(async (to: any, from: any, next: any) => {
    const loginUserStore = userLoginUserStore();
    const loginUser = loginUserStore.loginUser;
    const toUrl: string = to.fullPath;

    if (toUrl.startsWith('/admin')) {
        const role = loginUser?.userRole;
        // 未登录（默认对象只有 username，没有 userRole）或角色非管理员 -> 拦截
        if (!role || !ADMIN_ROLES.includes(role)) {
            message.error('没有权限');
            next(`/user/login?redirect=${to.fullPath}`);
            return;
        }
    }
    next();
});

