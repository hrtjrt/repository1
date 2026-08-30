import router from "@/router";
import { userLoginUserStore } from "./store/useLoginUserStore";
import { message } from "ant-design-vue";


router.beforeEach(async(to:any,from:any,next:any) => {
    const loginUserStore = userLoginUserStore();
    const loginUser = loginUserStore.loginUser;
    const toUrl:string = to.fullPath;
    if(toUrl.startsWith('/admin')) {
        if(!loginUser || loginUser.userRole !== 1){
            message.error('没有权限');
            next(`/user/login?redirect=${to.fullPath}`);
            return;
        }
    }
    next();
});

