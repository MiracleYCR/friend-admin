<template>
  <div class="app-container">
    <h4>帖子审核</h4>

    <div class="search_form">
      <el-form inline>
        <el-form-item label="时间：">
          <el-date-picker
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
            style="width: 255px"
            placeholder="用户昵称/姓名/身份证号/绑定手机号"
            v-model="formData.searchkeyWord"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核状态：">
          <el-select clearable v-model="formData.status">
            <el-option label="待审核" value="pending"></el-option>
            <el-option label="已通过" value="pass"></el-option>
            <el-option label="未通过" value="reject"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            style="margin-left: 10px"
            type="primary"
            @click="queryCheckPostList"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="margin: 10px 0">
      <el-button size="small" type="primary" @click="handleCheck('multiple')">
        批量审核
      </el-button>
      <el-button size="small" style="margin-left: 20px" type="primary">
        导出
      </el-button>
    </div>

    <el-table
      border
      style="width: 100%"
      height="600px"
      v-loading="loading"
      :data="tableData"
      @selection-change="handleChangeTableSelection"
    >
      <el-table-column type="selection"> </el-table-column>
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
        label="帖子内容"
        prop="postText"
        align="center"
        :width="150"
      />
      <el-table-column
        label="图片"
        prop="postImages"
        align="center"
        :width="400"
      >
        <template slot-scope="scope">
          <div style="display: flex; flex-wrap: wrap">
            <el-image
              v-for="(img, index) in scope.row.postImages"
              style="
                width: 100px;
                height: 60px;
                margin-right: 5px;
                margin-bottom: 5px;
              "
              fit="cover"
              :key="index"
              :src="img"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="视频" prop="field10" align="center" :width="400">
        <template slot-scope="scope">
          <video
            v-for="(img, index) in scope.row.postVideos"
            :key="index"
            :src="img"
            controls
            width="300px"
            height="160px"
          ></video>
        </template>
      </el-table-column>
      <el-table-column
        label="定位"
        prop="location"
        align="center"
        :width="150"
      />
      <el-table-column
        label="评论数"
        prop="commentCount"
        align="center"
        :width="150"
      />
      <el-table-column
        label="点赞数"
        prop="likeCount"
        align="center"
        :width="150"
      />
      <el-table-column
        label="审核状态"
        prop="status"
        align="center"
        :width="150"
      >
        <template slot-scope="scope">
          {{ dataMap.status[scope.row.status] }}
        </template>
      </el-table-column>
      <el-table-column
        label="驳回原因"
        prop="rejectReason"
        align="center"
        :width="150"
      />
      <el-table-column label="操作" align="center" :width="150" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleCheck('single', scope.row)"
          >
            审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="pageNum"
      :limit.sync="pageSize"
      @pagination="queryCheckPostList"
    />

    <el-dialog
      width="700px"
      title="审核"
      :show-close="true"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
    >
      <div style="display: flex; align-items: flex-start">
        <div style="margin-right: 20px">审核结果：</div>
        <div style="display: flex; flex-direction: column">
          <div style="margin-bottom: 20px">
            <el-radio v-model="checkStatus" label="pass">审核通过</el-radio>
          </div>
          <div>
            <el-radio v-model="checkStatus" label="reject">审核驳回</el-radio>
            <el-input
              v-if="checkStatus === 'reject'"
              style="margin-top: 10px"
              type="textarea"
              show-word-limit
              placeholder="选填"
              v-model="checkRemark"
              maxlength="20"
              :rows="2"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="btns">
        <el-button @click="handleCancelCheck">取消</el-button>
        <el-button
          type="primary"
          style="margin-left: 50px"
          @click="handleSaveCheck"
        >
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getCheckPostList, checkingPost } from "@/api/checkCenter/checkPost";

export default {
  name: "CheckPost",

  dicts: ["sys_yes_no"],

  data() {
    return {
      loading: false,

      formData: {
        time: [
          dayjs().startOf("month").format("YYYY-MM-DD"),
          dayjs().format("YYYY-MM-DD"),
        ],
        status: "",
        searchkeyWord: "",
      },

      total: 0,
      pageNum: 1,
      pageSize: 10,
      tableSelection: [],
      tableData: [{}, {}, {}],

      dataMap: {
        sex: { 0: "女", 1: "男" },
        status: {
          pending: "审核中",
          pass: "审核通过",
          reject: "审核驳回",
        },
      },

      checkIds: [],
      checkStatus: "pass",
      checkRemark: "",

      dialogVisible: false,
    };
  },

  created() {
    this.queryCheckPostList();
  },

  methods: {
    async queryCheckPostList() {
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

      getCheckPostList(params).then(({ rows, total }) => {
        this.tableData = rows;
        this.total = total;
        this.loading = false;
      });
    },

    handleChangeTableSelection(selection) {
      this.tableSelection = selection;
    },

    handleCheck(type, rowData) {
      if (type === "single") {
        this.checkIds = [rowData.id];
      } else {
        this.checkIds = this.tableSelection.map((item) => item.id);
      }

      if (this.checkIds.length === 0) {
        return this.$message.warning("请先选择数据！");
      }

      this.dialogVisible = true;
    },

    handleCancelCheck() {
      this.checkStatus = "pass";
      this.checkRemark = "";
      this.dialogVisible = false;
    },

    async handleSaveCheck() {
      await checkingPost({
        ids: this.checkIds,
        status: this.checkStatus,
        rejectReason: this.checkRemark,
      });

      this.queryCheckPostList();
      this.handleCancelCheck();
      this.$message.success("审核成功！");
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

.btns {
  display: flex;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
}
</style>
