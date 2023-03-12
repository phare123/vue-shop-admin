<template>
    <div>
        <!-- 标签页 -->
        <el-tabs v-model="searchForm.tab" @tab-change="getData">
            <el-tab-pane :label="item.name" :name="item.key" v-for="(item, index) in tabs" :key="index" />
        </el-tabs>
        <el-card shadow="always">
            <!-- 搜索 -->
            <div class="search-item">
                <div class="search-input">
                    <el-input size="small" prefix-icon="Search" v-model="searchForm.title" placeholder="商品名称" clearable
                        @change="getData" />
                    <el-select @change="getData" v-model="searchForm.category_id" placeholder="请选择商品分类" size="small"
                        v-show="!showType">
                        <el-option v-for="item in category_list" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </div>
                <div>
                    <el-button size="small" @click="handleReset" plain>清空</el-button>
                    <el-button class="type-btn" link type="primary" @click="showType = !showType">
                        <p>{{ showType ? '展开' : '收起' }}</p>
                        <el-icon v-show="showType">
                            <ArrowDownBold />
                        </el-icon>
                        <el-icon v-show="!showType">
                            <ArrowUpBold />
                        </el-icon>
                    </el-button>
                </div>
            </div>
            <!-- 表头 -->
            <tableHeader 
            :layout="searchForm.tab != 'delete' ? 'create,delete,refresh,put,down' : 'callback,destroy'" 
            @delete="handleDel(ids)" 
            @create="handleCreate"
            @refresh="getData" 
            @put="handelGoodsPut" 
            @down="handleGoodsDown" 
            @callback="handleRestore(ids)"
            @destroy="handleDestroy(ids)"
            />
            <!-- 表格部分 -->
            <el-table max-height="480px" :data="tableData" stripe style="width: 100%" v-loading="loading"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" />
                <el-table-column prop="title" label="商品" width="240">
                    <template #default="{ row }">
                        <div class="goods-info">
                            <el-image style="width: 50px; height: 50px" :src="row.cover" fit="cover" />
                            <div class="text-info">
                                <h4>{{ row.title }}</h4>
                                <div>
                                    <span>￥ {{ row.min_price }}</span> | <small>￥ {{ row.min_oprice }}</small>
                                </div>
                                <p>分类: {{ row.category.name }}</p>
                                <p>创建时间: {{ row.create_time }}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="sale_count" label="实际销量" width="100" align="center" />
                <el-table-column prop="review_count" label="商品状态" width="150" align="center">
                    <template #default="{ row }">
                        <el-tag size="small" :type="row.status == 1 ? '' : 'danger'">{{ row.status == 1 ? '上架' : '仓库'
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="review_count" label="审核状态" width="180" align="center">
                    <template #default="{ row }">
                        <div style="display: flex; align-items: center; flex-direction: column;" v-if="row.ischeck == 0">
                            <el-button size="small" type="success" plain>审核通过</el-button>
                            <el-button size="small" style="margin:8px 0 0;" type="danger" plain>审核拒绝</el-button>
                        </div>
                        <div v-else>{{ row.ischeck == 1 ? '通过' : '拒绝' }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="stock" label="总库存" width="100" align="center" />
                <el-table-column fixed="right" label="操作" width="auto" align="center">
                    <template #default="{ row }">
                        <div v-if="searchForm.tab != 'delete'">
                            <el-button link type="primary" size="small" @click.stop="handleEdit(row)">修改</el-button>
                            <el-button link type="primary" size="small"
                                :style="{ color: row.goods_skus.length > 0 ? '' : 'red' }">商品规格</el-button>
                            <el-button link type="primary" size="small" 
                            @click="handleSetBanner(row)"
                            :style="{ color: row.goods_banner.length > 0 ? '' : 'red' }"
                            >设置轮播图</el-button>
                            <el-button link type="primary" size="small"
                            :style="{ color: row.content == null ? 'red' : '' }"
                            @click="handleSetDetail(row)"
                            >商品详情</el-button>
                            <el-button link type="primary" size="small">删除</el-button>
                        </div>
                        <div v-else>暂无操作</div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination small background layout="prev, pager, next" :total="total" @current-change="changePage" />
        </el-card>
        <!-- 新增与编辑 -->
        <form-drawer ref="formDrawerRef" :title="isEdit ? '编辑' : '新增'" confirm-text="提交" destroyOnClose @submit="onSubmit">
            <el-form ref="formRef" :model="Form" status-icon label-width="auto">
                <el-form-item label="规格名称" prop="name">
                    <el-input v-model="Form.title" placeholder="请输入商品名称" />
                </el-form-item>
                <el-form-item label="封面">
                    <SelectImg @choose="handleChoose" />
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-select v-model="Form.category_id" placeholder="请选择商品分类">
                        <el-option v-for="item in category_list" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input v-model="Form.desc" type="textarea" :rows="3" placeholder="请输入商品描述(选填)"></el-input>
                </el-form-item>
                <el-form-item label="商品单位">
                    <el-input v-model="Form.unit" placeholder="请输入商品单位"></el-input>
                </el-form-item>
                <el-form-item label="总库存">
                    <el-input v-model="Form.stock" style="width: 200px;">
                        <template #append>件</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="库存预警">
                    <el-input v-model="Form.min_stock" style="width: 200px;">
                        <template #append>件</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="最低销售价">
                    <el-input v-model="Form.min_price" style="width: 200px;">
                        <template #append>元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="最低原价">
                    <el-input v-model="Form.min_oprice" style="width: 200px;">
                        <template #append>元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="库存显示">
                    <el-radio-group v-model="Form.stock_display">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="0" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="库存显示">
                    <el-radio-group v-model="Form.status">
                        <el-radio :label="0" border>放入仓库</el-radio>
                        <el-radio :label="1" border>立即上架</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </form-drawer>
        <!-- 商品轮播图 -->
        <form-drawer ref="bannerDrawerRef" title="设置轮播图" confirm-text="提交" destroyOnClose @submit="bannerSubmit">
            <el-form :model="Form" status-icon label-width="auto">
                <el-form-item label="轮播图" class="goods_banner">
                <div class="close-btn" v-for="item in Form.goods_banner" v-show="Form.goods_banner.length > 0">
                    <el-image lazy :src="item" fit="cover" />
                    <el-icon @click="handleCloseImg(item)">
                        <CircleCloseFilled />
                    </el-icon>
                </div>
                <SelectImg :limit="5" @choose="handleChoose" />
            </el-form-item>
            </el-form>
        </form-drawer>
        <!-- 设置商品详情 -->
        <form-drawer ref="goodsDetailRef" title="设置商品详情" confirm-text="提交" destroyOnClose @submit="detailSubmit">
            <el-form :model="Form" status-icon label-width="auto">
                <Editor v-model="Form.content"/>
            </el-form>
        </form-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SelectImg from '@/components/manager/selectImg.vue'
import tableHeader from '@/components/common/tableHeader.vue';
import { getGoods, getCategory, addGoods, editGoods, changeStatus, checkGoods, setBanner,delGoods,destroyGoods,restoreGoods } from '@/api/goods'
import { notification } from '@/util/msgTip'
import { useInitForm, useInitTable } from '@/util/useCommon'
import { onMounted } from 'vue-demi';
import Editor from '@/components/Editor.vue'

// 获取表格数据与分页
const {
    searchForm,
    loading,
    tableData,
    total,
    changePage,
    getData,
    handleDel,
} = useInitTable({
    searchForm: {
        title: '',
        tab: "all",
        category_id: null
    },
    getList: getGoods,
    del:delGoods
})
// 新增 | 编辑
const {
    formDrawerRef,
    formRef,
    isEdit,
    Form,
    handleCreate,
    handleEdit,
    onSubmit
} = useInitForm({
    Form: {
        title: '',
        category_id: 0,
        cover: '',
        desc: '',
        unit: '件',
        stock: 0,
        min_stock: 0,
        status: 1,
        stock_display: 1,
        min_price: 1,
        min_oprice: 1,
        goods_banner: [],
        content:null
    },
    getData,
    add: addGoods,
    edit: editGoods
})
// 标签页数据
const tabs = ([
    {
        key: 'all',
        name: '全部'
    },
    {
        key: 'checking',
        name: '审核中'
    },
    {
        key: 'saling',
        name: '销售中'
    },
    {
        key: 'off',
        name: '已下架'
    },
    {
        key: 'min_stock',
        name: '库存预警'
    },
    {
        key: 'delete',
        name: '回收站'
    },

])
// 获取商品分类
const category_list = ref([])
const getCategoryData = () => {
    getCategory().then(res => {
        category_list.value = res.data
    })
}
// 收起和展开
const showType = ref(true)
// 清空
const handleReset = () => {
    searchForm.title = ''
    searchForm.category_id = null
    getData()
}
// 选择封面
const bannerArr = ref([])
const handleChoose = (e) => {
    if (e.value.length > 1) {
        bannerArr.value = e.value.map(item => item.url)
    } else {
        Form.value.cover = e.value[0].url;
    }
    Form.value.goods_banner = [...bannerArr.value]
};
// 批量上架 | 下架
const ids = ref([])
const handleSelectionChange = (val) => {
    ids.value = val.map(o => o.id)
}
const handelGoodsPut = () => {
    changeStatus(ids.value, 1)
}
const handleGoodsDown = () => {
    changeStatus(ids.value, 0)
}
// 设置轮播图
const bannerDrawerRef = ref(null)
const goodsId = ref(0)
const handleSetBanner = (row) => {
    Form.value.goods_banner = row.goods_banner.map(o => o.url)
    goodsId.value = row.id
    bannerDrawerRef.value.open()
}
const handleCloseImg = (item) => {
    Form.value.goods_banner = Form.value.goods_banner.filter(u => u != item)
}
const bannerSubmit = () => {
    setBanner(goodsId.value, Form.value.goods_banner).then(res => {
        notification('设置成功', 2000, 'success')
        bannerDrawerRef.value.close()
        getData()
    })
}
// 设置商品详情
const goodsDetailRef = ref(null)
const handleSetDetail = (row) => {
    Form.value.content = row.content
    goodsId.value = row.id
    goodsDetailRef.value.open()
}
const detailSubmit = () => {
    editGoods(goodsId.value,Form.value).then(res => {
        notification('设置成功', 2000, 'success')
        goodsDetailRef.value.close()
        getData()
    })
}
// 批量恢复商品
const handleRestore  =(ids) => {
    restoreGoods(ids).then(res => {
        getData()
    })
}
// 彻底删除商品
const handleDestroy = (ids) => {
    destroyGoods(ids).then(res => {
        console.log(res);
        getData()
    })
}

onMounted(() => {
    getData()
    getCategoryData()
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