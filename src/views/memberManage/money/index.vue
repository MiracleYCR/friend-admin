<template>
  <div class="app-container">
    <h4>费用设置</h4>

    <el-table border style="width: 100%" :data="tableData">
      <el-table-column label="会员期限" prop="field1" align="center" />
      <el-table-column label="会员标识" prop="field2" align="center" />
      <el-table-column
        label="会员费用设置（元）"
        prop="field3"
        align="center"
      />
      <el-table-column label="操作" align="center" :width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table border style="width: 100%; margin-top: 20px" :data="tableData2">
      <el-table-column label="邀请人数（人）" prop="field1" align="center" />
      <el-table-column
        label="赠送福利比例（返现）"
        prop="field2"
        align="center"
      />
      <el-table-column label="操作" align="center" :width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "MemberMoney",

  dicts: ["sys_yes_no"],

  data() {
    return {
      formData: {},

      tableData: [
        { field1: "30天（一个月）", field2: "灰色标", field3: "100" },
        { field1: "90天（三个月）", field2: "蓝色标", field3: "200" },
        { field1: "180天（六个月）", field2: "红色标", field3: "260" },
        { field1: "365天（一年）", field2: "金色表", field3: "500" },
        { field1: "1095天（三年）", field2: "黑色标", field3: "1000" },
      ],

      tableData2: [
        { field1: "1", field2: "10%" },
        { field1: "2", field2: "20%" },
        { field1: "3", field2: "30%" },
      ],
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
