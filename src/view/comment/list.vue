<template>
    <div>
        <el-card shadow="always">
            <!-- 搜索 | 重置 -->
            <div class="search">
                <el-input prefix-icon="Search" v-model="searchForm.keyword" placeholder="商品名称" clearable @change="getData" />
            </div>
            <!-- 表格部分 -->
            <el-table max-height="450px" :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column label="商品" width="320">
                    <template #default="{ row }">
                        <div class="avatarItem">
                            <div class="l-content">
                                <el-avatar :size="40"
                                    :src="row.goods_item.cover ? row.goods_item.cover : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
                            </div>
                            <div class="r-content">
                                <span>{{ row.goods_item?.title ?? '商品名称' }}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="评级信息" width="300">
                    <template #default="{ row }">
                        <div>
                            <p>用户: {{ row.user.username }}</p>
                            <el-rate v-model="row.rating" disabled />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="评价时间" />
                <el-table-column label="状态" width="120">
                    <template #default="{ row }">
                        <el-switch :disabled="row.super == 1" @change="handleChange($event, row)" :model-value="row.status"
                            :active-value="1" :inactive-value="0" active-color="#4339ca">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column type="expand">
                    <template #default="{ row }">
                        <div class="commnet-item">
                            <!-- <el-avatar :size="45" :src="row.user.avatar" /> -->
                            <div class="lr">
                                <h3>{{ row.user.username }}</h3>
                                <small>{{ row.create_time }}</small>
                            </div>
                            <div style="padding: 5px 0;">{{ row.review.data }}</div>
                            <el-image style="width: 100px; height: 100px;padding: 5px 0 8px;"
                                v-for="item in row.review.image" :src="item" fit="cover" />
                            <div class="comment-show" v-if="!isChange">
                                <div class="show-header">
                                    <h4>客服</h4>
                                    <el-button @click="handleChangeComment" size="small" type="info">修改</el-button>
                                </div>
                                <span style="padding: 10px;" v-for="item in row.extra">{{ item.data }}</span>
                            </div>
                            <div class="change-comment" v-else>
                                <el-input autofocus style="margin-bottom: 10px;" v-model="message" :row="4"
                                    type="textarea" />
                                <div class="btn">
                                    <el-button type="primary" size="small" @click="onSubmit(row.id)">确认</el-button>
                                    <el-button size="small" @click="isChange = false">取消</el-button>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination small background layout="prev, pager, next" :total="total" @current-change="changePage" />
        </el-card>
    </div>
</template>

<script setup>
import { getComment, changeCommentStatus, reviewwComment } from '@/api/comment'
import { onMounted, ref } from 'vue-demi';
import { useInitTable, useInitForm } from '@/util/useCommon'
import {notification} from '@/util/msgTip'

// 搜索与分页,删除与修改状态
const {
    loading,
    tableData,
    total,
    searchForm,
    changePage,
    getData,
    handleChange,
} = useInitTable({
    getList: getComment,
    searchForm:{
        keyword:''
    },
    changeStatus: changeCommentStatus,
    onGetListSuccess: (res) => {
        total.value = res.data.totalCount;
        tableData.value = res.data.list;
    },
})
// 新增与删除
const {
    Form,
} = useInitForm({
    getData,
})
// 点击修改
const message = ref('')
const isChange = ref(false)
const handleChangeComment = (id) => {
    isChange.value = !isChange.value
}
// 提交事件
const onSubmit = (id) => {
    loading.value = true
    reviewwComment(id, message.value).then(res => {
        notification('修改成功',2000,'success')
        getData()
    }).finally(() => {
        loading.value = false
    })
}

onMounted(() => {
    getData()
})
</script>

<style lang="less" scoped>
.el-card {
    position: relative;
    padding-bottom: 30px;

    .search {
        .el-input {
            width: 200px;
            margin-bottom: 20px;
        }
    }


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

.change-comment {
    width: 90%;
    display: flex;
    flex-direction: column;
}

.commnet-item {
    position: relative;
    padding: 4px 0 20px 130px;
    display: flex;
    flex-direction: column;

    .lr {
        display: flex;
        align-items: center;

        h3 {
            padding-right: 5px;
        }
    }

    .comment-show {
        border-radius: 15px;
        padding: 5px 5px 10px;
        background-color: #f3f4f6;
        width: 90%;

        .show-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 9px;
        }
    }

    .el-avatar {
        position: absolute;
        top: 8px;
        left: 78px;
    }
}
</style>