import { ref,reactive } from "vue";
import { notification } from "./msgTip";

// 封装搜索与分页功能，删除和修改状态
export function useInitTable(opt = {}) {
  const loading = ref(false);
  //表格数据
  const tableData = ref([]);
  //   当前页
  const currentPage = ref(1);
  //   总数
  const total = ref(0);
  //   搜索关键词
  let searchForm  =null
  if(opt.searchForm){
    searchForm = reactive({...opt.searchForm})
  }
  // 页码改变时
  const changePage = (page) => {
    currentPage.value = page;
    getData();
  };
  //获取数据
  const getData = () => {
    loading.value = true;
    opt
      .getList(currentPage.value, searchForm)
      .then((res) => {
        if (opt.onGetListSuccess && typeof opt.onGetListSuccess == "function") {
          opt.onGetListSuccess(res);
        } else {
          total.value = res.data.totalCount;
          tableData.value = res.data.list;
        }
      })
      .finally((res) => (loading.value = false));
  };

  // 删除
  const handleDel = (id) => {
    opt
      .del(id)
      .then((res) => {
        notification("删除成功", 3000, "success");
        getData();
      })
      .catch((err) => {
        notification("删除失败", 2000, "error");
      });
  };
  // 修改管理员状态
  const handleChange = (status, row) => {
    row.status = status;
    opt.changeStatus(row.id, status).then((res) => {
      getData();
      notification("修改成功", 2000, "success");
    });
  };

  return {
    loading,
    tableData,
    currentPage,
    total,
    searchForm,
    changePage,
    getData,
    handleDel,
    handleChange,
  };
}

// 新增和修改
export function useInitForm(opt = {}) {
  // 新增 | 编辑
  const formDrawerRef = ref(null);
  const formRef = ref(null);
  const isEdit = ref(false);
  const Form = ref({});
  const handleCreate = () => {
    Form.value = {};
    isEdit.value = false;
    formDrawerRef.value.open();
  };
  const tableId = ref(0);
  const handleEdit = (row) => {
    isEdit.value = true;
    tableId.value = row.id;
    Form.value = row;
    formDrawerRef.value.open();
  };

  const onSubmit = () => {
    let body
    if (opt.beforeSubmit && typeof opt.beforeSubmit == "function") {
      body = opt.beforeSubmit(Form.value);
    } else {
      body = Form.value;
    }
    formDrawerRef.value.startLoading();
    // 新增功能
    if (!isEdit.value) {
      opt
        .add(body)
        .then((res) => {
          notification("提交成功", 2000, "success");
          formDrawerRef.value.close();
          opt.getData();
        })
        .finally((res) => formDrawerRef.value.endLoading());
    } else {
      // 编辑功能
      opt
        .edit(tableId.value, body)
        .then((res) => {
          notification("编辑成功", 2000, "success");
          formDrawerRef.value.close();
          opt.getData();
        })
        .finally((res) => formDrawerRef.value.endLoading());
    }
  };
  return {
    formDrawerRef,
    formRef,
    isEdit,
    Form,
    handleCreate,
    tableId,
    handleEdit,
    onSubmit,
  };
}
