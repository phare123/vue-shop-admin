// 封装重置密码与退出登录功能
import { useStore } from "vuex";
import { reactive, ref } from "vue-demi";
import { notification } from "@/util/msgTip";
import { confirm } from "@/util/msgTip";

export function userRePassword() {
  const store = useStore();
  const formDrawerRef = ref(null);
  // 确认修改密码
  const formRef = ref(null);
  const onSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) {
        return false;
      }
      formDrawerRef.value.startLoading();

      store
        .dispatch("updatepassword", pwdForm)
        .then((res) => {
          notification("修改成功，请重新登录", 3000, "success");
          store.dispatch("logout");
        })
        .finally(() => {
          formDrawerRef.value.endLoading();
        });
    });
  };
  // 验证规则
  const rules = {
    oldpassword: [
      { required: true, message: "密码不能为空", trigger: "blur" },
      { min: 5, max: 10, message: "密码长度应为5到10个字符", trigger: "blur" },
    ],
    password: [
      { required: true, message: "密码不能为空", trigger: "blur" },
      { min: 5, max: 10, message: "密码长度应为5到10个字符", trigger: "blur" },
    ],
    repassword: [
      { required: true, message: "密码不能为空", trigger: "blur" },
      { min: 5, max: 10, message: "密码长度应为5到10个字符", trigger: "blur" },
    ],
  };
  const pwdForm = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
  });
  // 侧边的展开与折叠
  const handleCollapse = () => {
    store.commit('changeCollapse');
  };

  return {
    formDrawerRef,
    formRef,
    onSubmit,
    pwdForm,
    rules,
    handleCollapse
  };
}

// 退出登录
export function Logout() {
  const store = useStore();
  // 退出登录
  const logout = () => {
    // 调用退出登录接口
    confirm("确定退出登录吗?", "提示", "warning").then((res) => {
      store.dispatch("logout");
    });
  };
  return {
    logout,
  };
}
