<template>
  <div>
    <el-dialog v-model="dialogVisible" title="商品推荐" width="85%" top="2vh">
      <el-card shadow="always">
        <!-- 搜索 -->
        <div class="search-item">
          <div class="search-input">
            <el-input size="small" prefix-icon="Search" v-model="searchForm.title" placeholder="商品名称" clearable
              @change="getData" />
          </div>
        </div>
        <!-- 表格部分 -->
        <el-table max-height="480px" :data="tableData" stripe style="width: 100%" v-loading="loading"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" />
          <el-table-column prop="title" label="商品" width="auto">
            <template #default="{ row }">
              <div class="goods-info">
                <el-image style="width: 50px; height: 50px" :src="row.cover" fit="cover" />
                <div class="text-info">
                  <h4>{{ row.title }}</h4>
                  <p>分类: {{ row.category.name }}</p>
                  <p>创建时间: {{ row.create_time }}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="总库存" width="300" align="center" />
          <el-table-column label="价格(元)" width="300" align="center">
            <template #default="{ row }">
              <div>
                <span style="color: red;">￥ {{ row.min_price }}</span> | <small>￥ {{ row.min_oprice }}</small>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination small background layout="prev, pager, next" :total="total" @current-change="changePage" />
      </el-card>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="onSubmit" color="#4339ca">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getGoods } from '@/api/goods'
import { releCategoryItem } from '@/api/category'
import { useInitTable } from '@/util/useCommon'
import { onMounted } from 'vue-demi'
import {notification} from '@/util/msgTip'

const dialogVisible = ref(false)
// 获取表格数据与分页
const {
  searchForm,
  loading,
  tableData,
  total,
  changePage,
  getData,
} = useInitTable({
  searchForm: {
    title: '',
  },
  getList: getGoods,
})

const category_id = ref(0)
const goodsIds = ref([])
const onSubmit = () => {
  releCategoryItem(category_id.value,goodsIds.value).then(res => {
    notification('关联成功',2000,'success')
    dialogVisible.value = false
  }) 
}
const open = () => {
  dialogVisible.value = true
}
defineExpose({
  open
})
const handleSelectionChange = (row) => {
  console.log(row);
  category_id.value = row[0].category_id
  goodsIds.value = row.map(o => o.id)
}

onMounted(() => {
  getData()
})
</script>

<style lang="less" scoped>
.el-card {
  .search-item {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-input {
      margin-right: 20px;
      width: 200px;
    }

    .type-btn {
      background-color: #f3f4f6;
      font-size: .7rem;
      padding: 5px 8px;

      p {
        margin-right: 3px;
      }
    }
  }

  position: relative;
  padding-bottom: 30px;




  .el-pagination {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translate(-50%, 0);
  }

  .el-table {
    .avatarItem {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .r-content {
        margin-left: 10px;
        display: flex;
        flex-direction: column;

        span {
          color: #666;

          &:nth-of-type(2) {
            font-size: .7rem;
          }
        }
      }
    }
  }
}

.goods-info {
  display: flex;
  align-items: center;

  .text-info {
    margin-left: 9px;

    h4 {
      font-weight: normal;
    }

    div {
      color: #999;

      span {
        color: red;
      }
    }

    p {
      font-size: .7rem;
      color: #999;
    }
  }
}

.goods_banner {
  display: flex;
  align-items: center;

  .el-image {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }

  .close-btn {
    width: 100px;
    height: 100px;
    position: relative;
    margin-right: 10px;
    background-color: #333;

    .el-icon {
      font-size: 1.1rem;
      color: #fff;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;

      &:hover {
        color: rgb(196, 196, 196);
      }
    }
  }
}
</style>