<template>
    <div style="width: 80%; margin: 0 auto;">
        <!-- title, welcome message -->
        <div class="header">
            <h1 class="page-header">Welcome Back, <br>There are {{ item_list.length }} Production Lines.</h1>
            <el-tooltip placement="bottom">
                <template #content><span>Click to Refresh</span></template>
                <img src="@/assets/logo.png" alt="">
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
        <template v-for="(item, index) of filteredList" :key="item.PO">
            <!-- :title="'Production Line ' + (index + 1)" -->
            <el-descriptions :column="2" size="default" border class="desc-item">
                <el-descriptions-item label="Prod. Line" label-align="left" align="left">
                    {{ index + 1 }} <el-tag size="small">{{ item.Status }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="PO" label-align="left" align="left">
                    {{ item.PO }}
                </el-descriptions-item>
                <el-descriptions-item label="SKU" label-align="left" align="left">
                    {{ item.SKU }}
                </el-descriptions-item>
                <el-descriptions-item label="Quantity" label-align="left" align="left">
                    {{ item.Quantity }}
                </el-descriptions-item>
                <!-- <el-descriptions-item label="Status" label-align="left" align="left">
                    <el-tag size="small">
                        {{ item.Status }}
                    </el-tag>
                </el-descriptions-item> -->
                <!-- PDF preview -->
                <el-descriptions-item label="PDF Files" label-align="left" align="left">
                    <!-- <div class="pdf-buttons"> -->
                    <el-button-group>
                        <el-button type="" @click="viewPDF" plain size="default">PO</el-button>
                        <el-button type="" @click="viewPDF" plain size="default">SKU1</el-button>
                        <el-button type="" @click="viewPDF" plain size="default">SKU2</el-button>
                    </el-button-group>
                    <!-- <el-button type="primary" plain small>Open File</el-button> -->
                    <!-- </div> -->
                </el-descriptions-item>
            </el-descriptions>
        </template>

        <el-drawer v-model="showPDF" :with-header="false" size="100%" :close-on-click-modal="false" :show-close="false">
            <!-- append-to-body -->
            <!-- el-drawer__body -->
            <div class="pdf-bottom-container">
                <div style="flex-grow: 1;">
                    <embed src="https://arxiv.org/pdf/2306.17459.pdf" type="application/pdf" width="100%" height="100%">
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

    <!-- empty pic -->
    <!-- <el-empty v-if="!item_list.length">
        <el-button type="primary">Refresh</el-button>
    </el-empty> -->
</template>
  
<script setup>
import { ref, computed } from 'vue';
import { Search } from '@element-plus/icons-vue';
// import axios from 'axios';

const item_list = ref([
    { PO: 101320077, SKU: 164549, Quantity: 18900.000, Status: 'REL' },
    { PO: 101320078, SKU: 164550, Quantity: 18900.000, Status: 'REL' },
    { PO: 101320079, SKU: 164551, Quantity: 18900.000, Status: 'REL' },
    { PO: 101320080, SKU: 164552, Quantity: 18900.000, Status: 'REL' },
    { PO: 101320081, SKU: 164553, Quantity: 18900.000, Status: 'REL' },
    { PO: 101320082, SKU: 164554, Quantity: 18900.000, Status: 'REL' },
    { PO: 101320083, SKU: 164555, Quantity: 18900.000, Status: 'REL' },
]);

let select = ref('1');
let query = ref('');
let showPDF = ref(false);

function viewPDF() {
    showPDF.value = true;
}

const filteredList = computed(() => {
    return (select.value == 1 ?
        item_list.value.filter((i) => i.PO.toString().indexOf(query.value) !== -1) :
        item_list.value.filter((i) => i.SKU.toString().indexOf(query.value) !== -1))
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
