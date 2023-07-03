<template>
    <div v-if="item_list.length" style="width: 80%; margin: 0 auto;">
        <!-- title, welcome message -->
        <div class="header">
            <h1 class="page-header">Welcome Back, <br>There are {{ item_list.length }} Production Lines.</h1>
            <img src="@/assets/logo.png" alt="">
        </div>
        

        <!-- search bar -->
        <el-input v-model="query" placeholder="Please input" class="input-with-select" clearable>
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
        <template v-for="(item, index) of item_list" :key="item.PO">
            <!-- :title="'Production Line ' + (index + 1)" -->
            <el-descriptions :column="2" size="small" border class="desc-item">
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
                        <el-button type="" @click="viewPDF" plain>PO</el-button>
                        <el-button type="" @click="viewPDF" plain>SKU1</el-button>
                        <el-button type="" @click="viewPDF" plain>SKU2</el-button>
                    </el-button-group>
                    <!-- <el-button type="primary" plain small>Open File</el-button> -->
                    <!-- </div> -->
                </el-descriptions-item>
            </el-descriptions>
        </template>
        
        <!-- That's the end of the list -->
        <el-divider>That's all.</el-divider>
    </div>

    <!-- empty pic -->
    <el-empty v-else>
        <el-button type="primary">Refresh</el-button>
    </el-empty>

</template>
  
<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

const item_list = ref([
    { PO: 101320077, SKU: 164549, Quantity: 18900.000, Status: 'REL' },
    { PO: 101320078, SKU: 164549, Quantity: 18900.000, Status: 'REL' },
    { PO: 101320079, SKU: 164549, Quantity: 18900.000, Status: 'REL' },
    { PO: 101320080, SKU: 164549, Quantity: 18900.000, Status: 'REL' },
    { PO: 101320081, SKU: 164549, Quantity: 18900.000, Status: 'REL' },
    { PO: 101320082, SKU: 164549, Quantity: 18900.000, Status: 'REL' },
    { PO: 101320083, SKU: 164549, Quantity: 18900.000, Status: 'REL' },
]);

let select = ref('1');
let query = ref('')

function viewPDF() {
    console.log('show pdf');
}

</script>

<style scoped>
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 130px;
    margin-top: 10px;
}

.header img {
    height: 80px;
    padding-top: 20px;
}

.desc-item {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin-top: 15px;
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
}

.page-header {
    font-size: 30px;
}
</style>
