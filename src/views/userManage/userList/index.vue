<template>
  <div class="app-container">
    <h4>用户列表</h4>

    <div class="search_form">
      <el-form inline label-width="115px">
        <el-form-item label="时间：">
          <el-date-picker
            clearable
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
            v-model="formData.keyWord"
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
            @click="queryUserList"
          >
            查询
          </el-button>
          <el-button type="primary">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      border
      style="width: 100%"
      height="600px"
      v-loading="loading"
      :data="tableData"
    >
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
        :width="200"
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
        label="钱包余额"
        prop="field10"
        align="center"
        :width="150"
      />
      <el-table-column
        label="Ta的帖子"
        prop="postCount"
        align="center"
        :width="150"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="handleCheckPage(scope.row, 'post')">
            {{ scope.row.postCount || 0 }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="Ta的关注"
        prop="followCount"
        align="center"
        :width="150"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="handleCheckPage(scope.row, 'focus')">
            {{ scope.row.followCount || 0 }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="Ta的粉丝"
        prop="fansCount"
        align="center"
        :width="150"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="handleCheckPage(scope.row, 'friend')">
            {{ scope.row.fansCount || 0 }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="Ta的邀请"
        prop="inviteCount"
        align="center"
        :width="150"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="handleCheckPage(scope.row, 'invite')">
            {{ scope.row.inviteCount || 0 }}
          </el-button>
        </template>
      </el-table-column>
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
      >
      </el-table-column>
      <el-table-column label="操作" align="center" :width="150" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleUpdateUserStatus(scope.row)"
          >
            {{ scope.row.hasBlack ? "解除黑名单" : "拉黑" }}
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleCheckUserDetail(scope.row)"
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="pageNum"
      :limit.sync="pageSize"
      @pagination="queryUserList"
    />
  </div>
</template>

<script>
import dayjs from "dayjs";
import {
  fetchUserList,
  getUserDetail,
  updateUserStatus,
} from "@/api/userManage/userList";

export default {
  name: "UserList",

  dicts: ["sys_yes_no"],

  data() {
    return {
      loading: true,

      formData: {
        time: [
          dayjs().subtract(3, "month").format("YYYY-MM-DD"),
          dayjs().format("YYYY-MM-DD"),
        ],
        status: "",
        keyWord: "",
        vipOpean: "",
        hasBlack: "",
      },

      total: 0,
      pageNum: 1,
      pageSize: 10,

      tableData: [],

      dataMap: {
        sex: { 0: "女", 1: "男" },
        vipOpean: { 0: "否", 1: "是" },
        hasBlack: { 0: "否", 1: "是" },
      },
    };
  },

  created() {
    this.queryUserList();
  },

  methods: {
    handleCheckPage(row, type) {
      this.$router.push(`/userManage/userList/ta/${type}/${row.userId}`);
    },

    queryUserList() {
      this.loading = true;

      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };

      Object.entries(this.formData).forEach(([k, v]) => {
        if (k === "time") {
          params.beginTime = dayjs(v[0]).format("YYYY-MM-DD");
          params.endTime = dayjs(v[1]).format("YYYY-MM-DD");
        } else {
          params[k] = v;
        }
      });

      fetchUserList(params).then(({ rows, total }) => {
        this.tableData = rows;
        this.total = total;
        this.loading = false;
      });
    },

    async handleUpdateUserStatus(rowData) {
      const blackStatus = !rowData.hasBlack;
      await updateUserStatus({ ...rowData, hasBlack: blackStatus });
      this.queryUserList();
      this.$message.success(blackStatus ? "拉黑成功！" : "解除拉黑成功！");
    },

    async handleChangeUserStatus(val, rowData) {
      await updateUserStatus({ ...rowData, status: val });
      this.queryUserList();
      this.$message.success(val === "0" ? "账号启用成功！" : "账号禁用成功！");
    },

    async handleCheckUserDetail(rowData) {
      await getUserDetail(rowData.userId);
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
