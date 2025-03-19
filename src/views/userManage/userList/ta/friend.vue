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
            style="width: 220px"
            v-model="formData.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="关键信息：">
          <el-input
            clearable
            style="width: 255px"
            placeholder="用户昵称/姓名/身份证号/绑定手机号"
            v-model="formData.searchkeyWord"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select clearable v-model="formData.status">
            <el-option label="正常" :value="0"></el-option>
            <el-option label="停用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为会员：">
          <el-select clearable v-model="formData.vipOpean">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否在黑名单：">
          <el-select clearable v-model="formData.hasBlack">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            style="margin-left: 20px"
            type="primary"
            @click="queryFansDetail"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table border style="width: 100%" height="600px" :data="tableData">
      <el-table-column
        label="时间"
        prop="createTime"
        align="center"
        :width="150"
      />
      <el-table-column label="ID" prop="appId" align="center" :width="150" />
      <el-table-column
        label="用户昵称"
        prop="nickName"
        align="center"
        :width="150"
      />
      <el-table-column
        label="姓名"
        prop="realName"
        align="center"
        :width="150"
      />
      <el-table-column label="性别" prop="sex" align="center" :width="150">
        <template slot-scope="scope">
          {{ dataMap.sex[scope.row.sex] }}
        </template>
      </el-table-column>
      <el-table-column
        label="身份证号"
        prop="idNumber"
        align="center"
        :width="150"
      />
      <el-table-column
        label="绑定手机号"
        prop="phonenumber"
        align="center"
        :width="150"
      />
      <el-table-column
        label="是否为会员"
        prop="vipOpean"
        align="center"
        :width="150"
      >
        <template slot-scope="scope">
          {{ dataMap.vipOpean[scope.row.vipOpean] }}
        </template>
      </el-table-column>
      <el-table-column
        label="会员到期时间"
        prop="vipExpireTime"
        align="center"
        :width="150"
      />
      <el-table-column
        label="账号状态"
        prop="status"
        align="center"
        :width="150"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="(val) => handleChangeUserStatus(val, scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="是否在黑名单"
        prop="hasBlack"
        align="center"
        :width="150"
      >
        <template slot-scope="scope">
          {{ dataMap.hasBlack[scope.row.hasBlack] }}
        </template>
      </el-table-column>
      <el-table-column
        label="拉黑理由"
        prop="blackReason"
        align="center"
        :width="150"
      ></el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" />
  </div>
</template>

<script>
import dayjs from "dayjs";
import {
  getUserDetail,
  getFansDetail,
  updateUserStatus,
} from "@/api/userManage/userList";

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

      dataMap: {
        sex: { 0: "女", 1: "男" },
        vipOpean: { 0: "否", 1: "是" },
        hasBlack: { 0: "否", 1: "是" },
        status: { 0: "正常", 1: "停用" },
      },
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
        uid: this.$route.params.id,
      };

      Object.entries(this.formData).forEach(([k, v]) => {
        if (k === "time") {
          postData.beginTime = dayjs(v[0]).format("YYYY-MM-DD");
          postData.endTime = dayjs(v[1]).format("YYYY-MM-DD");
        } else {
          postData[k] = v;
        }
      });

      const { rows, total } = await getFansDetail(postData);

      this.tableData = rows;
      this.total = total;
      this.loading = false;
    },

    async handleChangeUserStatus(val, rowData) {
      await updateUserStatus({ ...rowData, status: val });
      this.queryFansDetail();
      this.$message.success(val === "0" ? "账号启用成功！" : "账号禁用成功！");
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
