<template>
  <div class="app-container">
    <h4>安全指南</h4>
    <editor :height="600" v-model="content" />
    <el-button class="saveBtn" type="primary">保存</el-button>
  </div>
</template>

<script>
import { getPolicyDetail, updatePolicyData } from "@/api/base/policy";

export default {
  name: "SecurityGuide",

  dicts: ["sys_yes_no"],

  data() {
    return {
      content: "",
    };
  },

  created() {
    this.fetchPolicyDetail();
  },

  methods: {
    async fetchPolicyDetail() {
      const { data } = await getPolicyDetail({
        code: "USER_CONDUCT",
      });
      this.content = decodeURIComponent(data.content);
    },

    async handleUpdatePolicyData() {
      await updatePolicyData({
        code: "USER_CONDUCT",
        content: encodeURIComponent(this.content),
      });
      this.$message.success("编辑成功！");
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

  .saveBtn {
    margin-top: 20px;
    float: right;
  }
}
</style>
