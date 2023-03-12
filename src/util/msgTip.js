// 封装消息提示功能
import { ElNotification,ElMessageBox } from "element-plus";

// 消息提示
export const notification = (message, duration, type) => {
  return ElNotification({
    message,
    duration,
    type,
  });
};

// 确认消息
export const confirm = (message='消息',title="Warning",type) => {
  return ElMessageBox.confirm(
    message,
    title,
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type,
    }
  );
};

// 消息盒子
export const msgBox = (msg,value = '') => {
  return ElMessageBox.prompt(msg, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue:value
  })
}
