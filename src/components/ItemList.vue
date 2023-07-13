<template>
    <div style="width: 80%; margin: 0 auto;">
        <!-- title, welcome message -->
        <div class="header">
            <h1 class="page-header">Welcome Back, <br>There are {{ item_list.length }} Production Lines.</h1>
            <el-tooltip placement="bottom">
                <template #content><span>Click to Refresh</span></template>
                <img src="@/assets/logo.png" alt="" @click="updateList">
            </el-tooltip>
        </div>

        <!-- search bar -->
        <el-input v-model.lazy="query" placeholder="Please input" class="input-with-select" clearable>
            <template #prepend>
                <el-select v-model="select" placeholder="Select" style="width: 115px">
                    <el-option label="PO" value="1" />
                    <el-option label="SKU" value="2" />
                </el-select>
            </template>
            <template #append>
                <el-button :icon="Search" />
            </template>
        </el-input>

        <!-- show description for each production line -->
        <template v-for="item of filteredList" :key="item.po">
            <!-- :title="'Production Line ' + (index + 1)" -->
            <el-descriptions :column="2" size="default" border class="desc-item">
                <el-descriptions-item label="Prod. Line" label-align="left" align="left">
                    {{ item.pd }} <el-tag size="small">{{ item.status }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="PO" label-align="left" align="left">
                    {{ item.po }}
                </el-descriptions-item>
                <el-descriptions-item label="SKU" label-align="left" align="left">
                    {{ item.sku }}
                </el-descriptions-item>
                <el-descriptions-item label="Quantity" label-align="left" align="left">
                    {{ item.quantity }}
                </el-descriptions-item>

                <!-- PDF preview -->
                <el-descriptions-item label="PDF Files" label-align="left" align="left">
                    <el-button-group>
                        <el-button type="" @click="viewPDF(item, 'po')" plain size="small">PO</el-button>
                        <el-button type="" @click="viewPDF(item, 'sku1')" plain size="small">SKU1</el-button>
                        <el-button type="" @click="viewPDF(item, 'sku2')" plain size="small">SKU2</el-button>
                    </el-button-group>
                </el-descriptions-item>
            </el-descriptions>
        </template>

        <el-drawer v-model="showPDF" :with-header="false" size="100%" :close-on-click-modal="false" :show-close="false">
            <div class="pdf-bottom-container">
                <div style="flex-grow: 1;">
                    <embed :src="currentPdfSrc" type="application/pdf" width="100%" height="100%">
                </div>
                <div class="pdf-bottom">
                    <el-button type="primary" @click="showPDF = false" plain size="default">Close</el-button>
                </div>
            </div>

        </el-drawer>

        <!-- That's the end of the list -->
        <el-empty v-show="!filteredList.length"></el-empty>
        <el-divider v-show="filteredList.length"><span style="color: #0088A5;">That's all.</span></el-divider>
    </div>
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { getList, getPDF } from '@/api';

let item_list = ref([]);
let select = ref('1');
let query = ref('');
let showPDF = ref(false);
let currentPdfSrc = ref("");

function viewPDF(item, mode) {
    let filename = '';
    switch (mode) {
        case 'po':
            filename = item.po + '.pdf'
            break;
        case 'sku1':
            filename = `Packing Spec ${item.sku} .pdf`
            break;
        case 'sku2':
            filename = `Shopping Layout ${item.sku} .pdf`
            break;
    }
    openPDF(filename);
}

function updateList() {
    getList().then(res => {
        item_list.value = res.data.results;
        ElMessage({
            message: 'The production lines are up to date.',
            type: 'success',
        });
    }).catch(err => {
        console.log(err);
        ElMessage.error('Oops, it looks like something went wrong.');
    })
}

function openPDF(filename) {
    getPDF(filename).then(res => {
        let file = new Blob([res.data], { type: 'application/pdf' })
        let fileURL = URL.createObjectURL(file);
        currentPdfSrc.value = fileURL;
        showPDF.value = true;
    }).catch(err => {
        console.log(err);
        showPDF.value = false;
        if (err.response.status == 404)
            ElMessage.error('File not found.');
        else
            ElMessage.error('Oops, it looks like something went wrong.');
    })
}

onMounted(() => {
    updateList();
})

const filteredList = computed(() => {
    return (select.value == 1 ?
        item_list.value.filter((i) => i.po.toString().indexOf(query.value) !== -1) :
        item_list.value.filter((i) => i.sku.toString().indexOf(query.value) !== -1));
})
</script>

<style scoped>
@font-face {
    font-family: "brushup";
    src: local("brushup"), url("~@/assets/fonts/Brushup/Brush Up.woff") format("woff");
}

@font-face {
    font-family: "bariol";
    src: local("bariol"), url("~@/assets/fonts/Bariol/bariol_regular-webfont.woff") format("woff");
}

html * {
    font-family: bariol;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 130px;
    margin-top: 10px;
}

.header img {
    height: 100px;
    padding-top: 5px;
    cursor: pointer;
}

.page-header {
    font-size: 30px;
    font-family: brushup;
    color: #005EB8;
}

.desc-item {
    box-shadow: var(--el-box-shadow-lighter);
    margin-top: 15px;
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
}

.pdf-bottom-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.pdf-bottom {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 10px;
}

:deep(.el-drawer__body) {
    padding: 0;
}

:deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label) {
    color: #002677;
}
</style>
