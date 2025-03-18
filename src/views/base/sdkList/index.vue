<template>
  <div class="app-container">
    <h4>三方SDK清单</h4>
    <editor :height="600" v-model="content" />
    <el-button class="saveBtn" type="primary" @click="handleUpdatePolicyData">
      保存
    </el-button>
  </div>
</template>

<script>
import { getPolicyDetail, updatePolicyData } from "@/api/base/policy";

export default {
  name: "SdkList",

  dicts: ["sys_yes_no"],

  created() {
    this.fetchPolicyDetail();
  },

  methods: {
    async fetchPolicyDetail() {
      const { data } = await getPolicyDetail({
        code: "THIRD_PARTY_SDK_LIST",
      });
      this.content = decodeURIComponent(data.content);
    },

    async handleUpdatePolicyData() {
      await updatePolicyData({
        code: "THIRD_PARTY_SDK_LIST",
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
