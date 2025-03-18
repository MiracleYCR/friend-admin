<template>
  <div class="app-container">
    <h4>用户列表</h4>

    <div class="search_form">
      <el-form inline label-width="100px">
        <el-form-item label="时间：">
          <el-date-picker
            style="width: 255px"
            v-model="formData.field1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="消息编号：">
          <el-input
            style="width: 255px"
            placeholder="请输入消息编号"
            v-model="formData.field2"
          ></el-input>
        </el-form-item>
        <el-form-item label="标题/内容：">
          <el-input
            style="width: 255px"
            placeholder="请输入标题/内容"
            v-model="formData.field3"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: 20px" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="margin: 10px 0">
      <el-button size="small" type="primary" @click="handleCheck('multiple')">
        新建
      </el-button>
      <el-button size="small" style="margin-left: 20px" type="primary">
        导出
      </el-button>
    </div>

    <el-table border style="width: 100%" height="600px" :data="tableData">
      <el-table-column label="消息编号" prop="field1" align="center" />
      <el-table-column label="时间" prop="field2" align="center" />
      <el-table-column label="标题" prop="field3" align="center" />
      <el-table-column label="内容" prop="field4" align="center" />
      <el-table-column label="配图" prop="field5" align="center" />
      <el-table-column label="操作" align="center" :width="150" fixed="right">
        <template slot-scope="scope"> </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" />
  </div>
</template>

<script>
export default {
  name: "UserList",

  dicts: ["sys_yes_no"],

  data() {
    return {
      formData: {
        type: 1,
        status: 1,
        content: "",
      },

      total: 0,
      pageNum: 1,
      pageSize: 10,
      tableData: [],
    };
  },

  methods: {
    handleCheckPage(row, type) {
      this.$router.push(`/userManage/userList/ta/${type}/123`);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;

  .search_form {
    margin-bottom: 20px;
  }
}
</style>
