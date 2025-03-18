<template>
  <div class="app-container">
    <h4>用户列表</h4>

    <div class="search_form">
      <el-form inline label-width="115px">
        <el-form-item label="时间：">
          <el-date-picker
            v-model="formData.field1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="关键信息：">
          <el-input
            style="width: 255px"
            placeholder="用户昵称/姓名/身份证号/绑定手机号"
            v-model="formData.content"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: 20px" type="primary">查询</el-button>
          <el-button type="primary">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table border style="width: 100%" height="600px" :data="tableData">
      <el-table-column label="时间" prop="field1" align="center" :width="150" />
      <el-table-column
        label="用户昵称"
        prop="field2"
        align="center"
        :width="150"
      />
      <el-table-column label="姓名" prop="field3" align="center" :width="150" />
      <el-table-column label="性别" prop="field4" align="center" :width="150" />
      <el-table-column
        label="身份证号"
        prop="field5"
        align="center"
        :width="150"
      />
      <el-table-column
        label="绑定手机号"
        prop="field6"
        align="center"
        :width="200"
      />
      <el-table-column label="内容" prop="field7" align="center" />
      <el-table-column label="操作" align="center" :width="150" fixed="right">
        <template slot-scope="scope"> </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" />
  </div>
</template>

<script>
import {
  listConfig,
  getConfig,
  delConfig,
  addConfig,
  updateConfig,
  refreshCache,
} from "@/api/system/config";

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
      tableData: [
        {
          field1: "204-11-27 12:33:12",
          field2: "11111111",
          field3: "Bella",
          field4: "阿凉",
          field5: "女",
          field6: "342423199910010000",
          field7: "17621111913",
          field8: "是",
          field9: "2025.12.16",
          field10: "¥50,000",
          field11: "50",
          field12: "100",
          field13: "200",
          field14: "200",
          field15: false,
          field16: "否",
          field17: "xxxxxx",
        },
      ],
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
