<template>
  <div class="app-container">
    <h4>Ta的粉丝</h4>

    <div class="header">
      <div class="headerItem">ID: {{ userInfo.appId || "--" }}</div>
      <div class="headerItem">昵称：{{ userInfo.nickName || "--" }}</div>
      <div class="headerItem">姓名：{{ userInfo.realName || "--" }}</div>
      <div class="headerItem">手机号：{{ userInfo.phonenumber || "--" }}</div>
      <div class="headerItem">身份证号：{{ userInfo.idNumber || "--" }}</div>
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
        <el-form-item label="状态：">
          <el-select v-model="formData.field3">
            <el-option label="启用" :value="0"></el-option>
            <el-option label="禁用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为会员：">
          <el-select v-model="formData.status">
            <el-option label="是" :value="0"></el-option>
            <el-option label="否" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否在黑名单：">
          <el-select v-model="formData.status">
            <el-option label="启用" :value="0"></el-option>
            <el-option label="禁用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: 20px" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table border style="width: 100%" height="600px" :data="tableData">
      <el-table-column label="时间" prop="field1" align="center" :width="150" />
      <el-table-column label="ID" prop="field2" align="center" :width="150" />
      <el-table-column
        label="用户昵称"
        prop="field3"
        align="center"
        :width="150"
      />
      <el-table-column label="姓名" prop="field4" align="center" :width="150" />
      <el-table-column label="性别" prop="field5" align="center" :width="150" />
      <el-table-column
        label="身份证号"
        prop="field6"
        align="center"
        :width="150"
      />
      <el-table-column
        label="绑定手机号"
        prop="field7"
        align="center"
        :width="150"
      />
      <el-table-column
        label="是否为会员"
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
      <el-table-column
        label="账号状态"
        prop="field10"
        align="center"
        :width="150"
      />
      <el-table-column
        label="是否在黑名单"
        prop="field11"
        align="center"
        :width="150"
      />
      <el-table-column
        label="拉黑理由"
        prop="field12"
        align="center"
        :width="150"
      />
      <el-table-column label="操作" align="center" :width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small">
            {{ scope.row.field7 ? "隐藏" : "展示" }}
          </el-button>
          <el-button type="text" size="small">查看评论</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" />
  </div>
</template>

<script>
import { getUserDetail, getFansDetail } from "@/api/userManage/userList";

export default {
  name: "TaFriend",

  dicts: ["sys_yes_no"],

  data() {
    return {
      loading: false,

      userInfo: {},
      formData: {},

      total: 0,
      pageNum: 1,
      pageSize: 10,
      tableData: [],
    };
  },

  created() {
    this.queryUserDetail();
    this.queryFansDetail();
  },

  methods: {
    async queryUserDetail() {
      const { data } = await getUserDetail(this.$route.params.id);
      this.userInfo = data;
    },

    async queryFansDetail() {
      this.loading = true;

      const postData = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        userId: this.$route.params.id,
      };

      const { rows, total } = await getFansDetail(postData);

      this.tableData = rows;
      this.total = total;
      this.loading = false;
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

  .header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;
    background-color: #f2f6fc;

    .headerItem {
      padding: 10px;
      font-size: 14px;
      color: #606266;
      margin-right: 20px;
      box-sizing: border-box;
    }
  }

  .search_form {
    margin-top: 20px;
  }
}
</style>
