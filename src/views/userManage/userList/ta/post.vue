<template>
  <div class="app-container">
    <h4>Ta的帖子</h4>

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
            v-model="formData.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select clearable v-model="formData.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="待审核" value="pending"></el-option>
            <el-option label="已通过" value="pass"></el-option>
            <el-option label="未通过" value="reject"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            style="margin-left: 20px"
            type="primary"
            @click="queryPostDetail"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      ref="tableRef"
      border
      style="width: 100%"
      v-loading="loading"
      :height="650"
      :data="tableData"
    >
      <el-table-column
        label="时间"
        prop="createTime"
        align="center"
        :minWidth="150"
      />
      <el-table-column
        label="帖子内容"
        prop="postText"
        align="center"
        :minWidth="150"
      />
      <el-table-column
        label="图片"
        prop="postImages"
        align="center"
        :minWidth="400"
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
      <el-table-column
        label="视频"
        prop="postVideos"
        align="center"
        :minWidth="300"
      >
        <template slot-scope="scope">
          <video
            v-for="(img, index) in scope.row.postVideos"
            controls
            width="250px"
            height="160px"
            :key="index"
            :src="img"
          ></video>
        </template>
      </el-table-column>
      <el-table-column
        label="定位"
        prop="location"
        align="center"
        :minWidth="150"
      />
      <el-table-column
        label="评论数"
        prop="commentCount"
        align="center"
        :minWidth="150"
      />
      <el-table-column
        label="帖子状态"
        prop="status"
        align="center"
        :width="150"
      >
        <template slot-scope="scope">
          {{ dataMap.status[scope.row.status] }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" :width="150" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleChangePostVisible(scope.row)"
          >
            {{ scope.row.hideStatus ? "展示" : "隐藏" }}
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleCheckComments(scope.row)"
          >
            查看评论
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="pageNum"
      :limit.sync="pageSize"
      @pagination="queryPostDetail"
    />

    <el-dialog
      width="700px"
      title="查看评论"
      :show-close="true"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
    >
      <template v-if="dialogVisible">
        <CommentTree
          v-for="(comment, index) in curPostDetailData.postComments"
          :key="index"
          :commentData="comment"
          @on-hide-comment="handleHideComment"
          @on-delete-comment="handleDeleteComment"
        />
      </template>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getUserDetail, getPostDetail } from "@/api/userManage/userList";
import {
  changePostStatus,
  checkPostDetail,
  hidePostComment,
  deletePostComment,
} from "@/api/checkCenter/checkPost";

import CommentTree from "@/components/Custom/commentTree.vue";

export default {
  name: "TaPost",

  dicts: ["sys_yes_no"],

  components: {
    CommentTree,
  },

  data() {
    return {
      loading: false,

      userInfo: {},
      formData: {
        time: [
          dayjs().subtract(3, "month").format("YYYY-MM-DD"),
          dayjs().format("YYYY-MM-DD"),
        ],
        status: "",
      },

      total: 0,
      pageNum: 1,
      pageSize: 10,
      tableData: [],

      dataMap: {
        status: {
          pass: "已通过",
          reject: "未通过",
          pending: "待审核",
        },
      },

      dialogVisible: false,
      curPostDetailData: {},
    };
  },

  created() {
    this.queryUserDetail();
    this.queryPostDetail();
  },

  methods: {
    async queryUserDetail() {
      const { data } = await getUserDetail(this.$route.params.id);
      this.userInfo = data;
    },

    async queryPostDetail() {
      this.loading = true;

      const postData = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        userId: this.$route.params.id,
      };

      Object.entries(this.formData).forEach(([k, v]) => {
        if (k === "time") {
          postData["beginTime"] = v[0];
          postData["endTime"] = v[1];
        } else {
          postData[k] = v;
        }
      });

      const { rows, total } = await getPostDetail(postData);

      this.tableData = rows;
      this.total = total;
      this.loading = false;
    },

    async handleChangePostVisible(rowData) {
      const status = rowData.hideStatus === 1 ? 0 : 1;

      await changePostStatus({
        ids: [rowData.id],
        hideStatus: status,
      });

      this.$message.success(`帖子${status === 1 ? "隐藏" : "展示"}成功！`);

      this.queryPostDetail();
    },

    // 查看评论
    async handleCheckComments(postDetailData) {
      const { data } = await checkPostDetail(postDetailData.id);
      this.curPostDetailData = data;
      this.dialogVisible = true;
    },

    // 隐藏评论
    async handleHideComment(hideData) {
      await hidePostComment(hideData);
      const { data } = await checkPostDetail(this.curPostDetailData.id);
      this.curPostDetailData = data;
    },
    // 删除评论
    async handleDeleteComment(deleteData) {
      await deletePostComment(deleteData.id);
      const { data } = await checkPostDetail(this.curPostDetailData.id);
      this.curPostDetailData = data;
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
