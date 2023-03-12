<template>
    <el-card>
        <tableHeader @create="handleCreate" @refresh="getData" />
        <el-tree :data="tableData" node-key="id" :props="{ label: 'name', children: 'child' }" v-loading="loading"
            :default-expanded-keys="defaultExpandedKeys">
            <template #default="{ node, data }">
                <div class="tree-node">
                    <div class="l-content">
                        <el-tag size="small" :type="data.menu != 1 ? 'info' : ''">{{ data.menu == 1 ? '菜单' : '权限'
                        }}</el-tag>
                        <component v-if="data.icon" class="icon" :is="data.icon"></component>
                        <span class="label-name">{{ data.name }}</span>
                    </div>
                    <div class="r-content">
                        <el-switch @change="handleChange($event, data)" :modelValue="data.status" :active-value="1" :inactive-value="0" active-color="#4339ca" />
                        <el-button link type="primary" size="small" @click.stop="handleEdit(data)">编辑</el-button>
                        <el-button link type="primary" size="small" @click.stop="handleCreate(data.id)">新增</el-button>
                        <span @click.stop="() => {}">
                            <el-popconfirm title="确认删除吗?" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDel(data.id)">
                            <template #reference>
                                <el-button link type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                        </span>
                    </div>
                </div>
            </template>
        </el-tree>
        <form-drawer ref="formDrawerRef" :title="isEdit ? '编辑' : '新增'" confirm-text="提交" destroyOnClose
            @submit="onSubmit">
            <el-form ref="formRef" :model="Form" status-icon label-width="auto">
                <el-form-item label="上级菜单">
                    <el-cascader v-model="Form.rule_id" :options="rules" 
                        :props="{value:'id', label: 'name', children: 'child', checkStrictly: true, emitPath: false }" placeholder="请选择上级菜单" />
                </el-form-item>
                <!-- 单选框 -->
                <el-form-item label="菜单/规则">
                    <el-radio-group v-model="Form.menu">
                        <el-radio style="margin-right: 10px;" :label="1" border>菜单</el-radio>
                        <el-radio :label="0" border>规则</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" style="width: 30%;">
                    <el-input v-model="Form.name" placeholder="名称" />
                </el-form-item>
                <!-- 菜单图标 -->
                <selectImg v-model="Form.icon" v-if="Form.menu == 1"/>
                <!-- 前端路由 -->
                <el-form-item label="前端路由" v-if="Form.menu == 1 && Form.rule_id > 0">
                    <el-input v-model="Form.frontpath" placeholder="请输入前端路由路径"></el-input>
                </el-form-item>
                <el-form-item label="后端规则" v-if="Form.menu == 0">
                    <el-input v-model="Form.condition" placeholder="后端规则" />
                </el-form-item>
                <el-form-item label="请求方式" v-if="Form.menu == 0">
                    <el-select v-model="Form.method" placeholder="请选择请求方式">
                        <el-option v-for="item in ['GET','POST','PUT','DELETE']" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="Form.order" :min="0" :max="500"/>
                </el-form-item>
            </el-form>
        </form-drawer>
    </el-card>
</template>

<script setup>
import tableHeader from '@/components/common/tableHeader.vue';
import { getRules, addRules, editRules,delRules,changeRulesStatus} from '@/api/access'
import { useInitTable, useInitForm } from '@/util/useCommon'
import { onMounted, ref } from 'vue';
import selectImg from '@/components/access/selectImg2.vue'

const defaultExpandedKeys = ref([])
const rules = ref([])
// 获取,删除
const {
    loading,
    tableData,
    getData,
    handleDel,
    handleChange,
} = useInitTable({
    getList: getRules,
    del:delRules,
    changeStatus:changeRulesStatus,
    onGetListSuccess: (res) => {
        rules.value = res.data.rules
        tableData.value = res.data.list;
        defaultExpandedKeys.value = res.data.list.map(item => item.id)
    },
})
// 新增 | 编辑
const {
    formDrawerRef,
    formRef,
    isEdit,
    handleCreate,
    handleEdit,
    Form,
    onSubmit
} = useInitForm({
    Form: {
        rule_id: 0,
        menu: 0,
        name: '',
        condition: '',
        method: 'GET',
        status: 1,
        order: 0,
        icon: '',
        frontpath: ''
    },
    rules: {},
    getData,
    add: addRules,
    edit: editRules
})

onMounted(() => {
    getData()
})

</script>

<style lang="less" scoped>
.el-card {
    .el-tree {
        .tree-node {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .l-content {
                display: flex;
                align-items: center;

                .icon {
                    margin: 0 8px;
                    width: 15px;
                    height: 15px;
                }

                .label-name {
                    color: #666;
                }
            }

            .r-content {
                .el-switch {
                    margin-right: 15px;
                }

                .el-button {
                    margin-right: 10px;
                }
            }
        }

    }
}
</style>