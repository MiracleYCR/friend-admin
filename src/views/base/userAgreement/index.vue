<template>
  <div class="app-container">
    <h4>用户协议</h4>
    <editor :height="600" v-model="content" />
    <el-button class="saveBtn" type="primary" @click="handleUpdatePolicyData">
      保存
    </el-button>
  </div>
</template>

<script>
import { getPolicyDetail, updatePolicyData } from "@/api/base/policy";

export default {
  name: "UserAgreement",

  dicts: ["sys_yes_no"],

  // INFORMATION_FOR_USERS 用户须知
  // PRIVACY_POLICY 隐私政策
  // USER_CONDUCT 用户行为规范
  // MEMBERSHIP_AGREEMENT 会员协议
  // PERMISSION_LIST 权限获取清单
  // THIRD_PARTY_SDK_LIST 三方SDK清单
  // INFORMATION_SHARING_LIST 信息共享清单
  // REGISTRATION_COMMITMENT 注册承诺函
  // AUTHORIZATION_LETTER 授权书

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
      const { data } = await getPolicyDetail({ code: "INFORMATION_FOR_USERS" });
      this.content = decodeURIComponent(data.content);
    },

    async handleUpdatePolicyData() {
      await updatePolicyData({
        code: "INFORMATION_FOR_USERS",
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
