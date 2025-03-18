<template>
  <div class="comment_container root">
    <div class="comment_body">
      <div class="left">
        <el-image
          style="
            width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 50%;
          "
          fit="cover"
          :src="commentData.sysUser.avatar"
        />
      </div>

      <div class="right">
        <div class="name">{{ commentData.sysUser.nickName }}</div>
        <div class="commentContent">
          {{ commentData.commentContent }}
        </div>
        <div class="status">
          <div class="time">
            {{ commentData.createTime }} ·
            {{ commentData.sysUser.locationCity }}
          </div>

          <div>
            <el-button
              type="text"
              @click="handleOperateComment('hide', commentData)"
            >
              {{ commentData.hideStatus === 0 ? "隐藏评论" : "显示评论" }}
            </el-button>
            <el-button
              type="text"
              style="color: #f56c6c"
              @click="handleOperateComment('delete', commentData)"
            >
              删除评论
            </el-button>
          </div>
        </div>

        <template
          v-if="commentData.children && commentData.children.length > 0"
        >
          <CommentTree
            class="leaf"
            v-for="(comment, index) in commentData.children"
            :key="index"
            :commentData="comment"
            @on-hide-comment="handleOperateComment('hide', comment)"
            @on-delete-comment="handleOperateComment('delete', comment)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentTree",

  props: {
    commentData: {
      type: Object,
    },
  },

  methods: {
    handleOperateComment(type, commentData) {
      if (type === "hide") {
        this.$emit("on-hide-comment", {
          ids: [commentData.id],
          hideStatus: commentData.hideStatus === 0 ? 1 : 0,
        });
      }

      if (type === "delete") {
        this.$emit("on-delete-comment", {
          id: commentData.id,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.comment_container {
  &.root {
    margin-bottom: 20px;
  }

  .leaf {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .comment_body {
    width: 100%;
    display: flex;
    .left {
      width: 50px;
      display: flex;
      align-items: flex-start;
      margin-right: 10px;
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .name {
        font-weight: 500;
        font-size: 13px;
        color: #686a7a;
        margin-bottom: 5px;
      }
      .commentContent {
        font-weight: 400;
        font-size: 14px;
        color: #212121;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 5px;
        word-break: break-all;
      }
      .status {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 400;
        font-size: 12px;
        color: #ff4d73;

        .time {
          color: #9395a4;
        }
      }
    }
  }
}
</style>
