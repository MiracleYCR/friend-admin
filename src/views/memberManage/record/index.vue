<template>
  <div class="app-container">
    <h4>开通记录</h4>

    <div class="header">
      <div class="headerItem">
        <div style="font-weight: bold">今日开通用户数</div>
        <div>20人</div>
      </div>
      <div class="headerItem">
        <div style="font-weight: bold">昨天开通用户数</div>
        <div>20人</div>
      </div>
    </div>

    <div class="search_form">
      <el-form inline>
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
            v-model="formData.field2"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: 20px" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table border style="width: 100%" height="600px" :data="tableData">
      <el-table-column
        label="开通时间"
        prop="field1"
        align="center"
        :width="150"
      />
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
        :width="150"
      />
      <el-table-column
        label="会员等级"
        prop="field7"
        align="center"
        :width="150"
      />
      <el-table-column
        label="费用/元"
        prop="field8"
        align="center"
        :width="150"
      />
      <el-table-column
        label="会员到期时间"
        prop="field9"
        align="center"
        :width="150"
      />
    </el-table>

    <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" />
  </div>
</template>

<script>
export default {
  name: "MemberRecord",

  dicts: ["sys_yes_no"],

  data() {
    return {
      formData: {},

      total: 0,
      pageNum: 1,
      pageSize: 10,
      tableData: [],
    };
  },

  methods: {},
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

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    box-sizing: border-box;

    .headerItem {
      width: calc(50% - 20px);
      height: 70px;
      padding: 10px 0;
      font-size: 14px;
      color: #606266;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      background-color: #f2f6fc;
    }
  }

  .search_form {
    margin-top: 20px;
  }
}
</style>
