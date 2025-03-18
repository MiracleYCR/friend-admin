<template>
  <div class="banner_edit">
    <el-form label-width="120px">
      <el-form-item label="图片：">
        <el-upload
          action="/prod-api/common/oss/upload"
          :limit="1"
          :multiple="false"
          :with-credentials="true"
          list-type="picture-card"
          :headers="uploadHeaders"
          :file-list="formData.fileList"
          :on-change="handleChangeUploadFile"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题：">
        <div class="formItem">
          <el-input v-model="formData.bannerName"></el-input>
          <span>说明：仅后台查看，选填</span>
        </div>
      </el-form-item>
      <el-form-item label="排序值：">
        <div class="formItem">
          <el-input-number
            v-model="formData.sortOrder"
            :min="0"
            :max="99"
          ></el-input-number>
          <span>说明：排序值越大，轮播排序越靠前</span>
        </div>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="formData.status">
          <el-option label="启用" :value="0"></el-option>
          <el-option label="禁用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择链接：">
        <div class="formItem">
          <div class="linkHeader">
            <el-radio v-model="curBannerLinkType" label="app">
              功能页面
            </el-radio>
            <el-radio v-model="curBannerLinkType" label="h5"> H5链接 </el-radio>
            <el-radio v-model="curBannerLinkType" label="other">
              小程序
            </el-radio>
          </div>

          <div class="linkContent">
            <template v-if="curBannerLinkType === 'app'">
              <el-select
                style="width: 400px"
                v-model="appBannerLinkData.linkUrl"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in appPageLinkList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">
                    {{ item.value }}
                  </span>
                </el-option>
              </el-select>
            </template>

            <template v-if="curBannerLinkType === 'h5'">
              <div style="display: flex; align-items: center">
                <div style="width: 80px; text-align: right">H5链接：</div>
                <el-input
                  style="flex: 1"
                  clearable
                  v-model="h5BannerLinkData.linkUrl"
                  placeholder="请输入H5链接"
                ></el-input>
              </div>
            </template>

            <template v-if="curBannerLinkType === 'other'">
              <div style="display: flex; align-items: center">
                <div style="width: 80px; text-align: right">APPID：</div>
                <el-input
                  style="flex: 1"
                  v-model="otherBannerLinkData.appId"
                  placeholder="请输入APPID"
                ></el-input>
              </div>
              <div style="display: flex; align-items: center; margin-top: 10px">
                <div style="width: 80px; text-align: right">页面路径：</div>
                <el-input
                  style="flex: 1"
                  clearable
                  v-model="otherBannerLinkData.linkUrl"
                  placeholder="请输入页面路径"
                ></el-input>
              </div>
            </template>
          </div>
        </div>
      </el-form-item>
    </el-form>

    <div class="btns">
      <el-button @click="handleCancelEdit">取消</el-button>
      <el-button
        type="primary"
        style="margin-left: 50px"
        @click="handleConfirmEdit"
      >
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { addBanner, updateBanner, checkBanner } from "@/api/base/banner";

export default {
  props: {
    type: {
      type: String,
    },
    id: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      uploadHeaders: {
        Authorization: "Bearer " + getToken(),
      },

      formData: {
        fileList: [],
        bannerImageUrl: "",
        bannerName: "",
        status: 0,
        sortOrder: 0,
      },

      curBannerLinkType: "app",
      appBannerLinkData: {
        linkType: 1,
        linkUrl: "",
      },
      h5BannerLinkData: {
        linkType: 2,
        linkUrl: "",
      },
      otherBannerLinkData: {
        linkType: 3,
        appId: "",
        linkUrl: "",
      },

      appPageLinkList: [
        { label: "广场", value: "/pages/square/index" },
        { label: "发布", value: "/pages/publish/index" },
        { label: "消息", value: "/pages/message/index" },
        { label: "我的", value: "/pages/own/index" },
        { label: "我的会员", value: "/pages/vip/index" },
      ],

      dialogVisible: false,
    };
  },

  mounted() {
    if (this.type === "edit") {
      checkBanner(this.id).then(({ data }) => {
        this.formData = {
          id: data.id,
          fileList: [{ url: data.bannerImageUrl }],
          bannerImageUrl: data.bannerImageUrl,
          bannerName: data.bannerName,
          status: data.status,
          sortOrder: data.sortOrder,
        };

        this.curBannerLinkType = data.linkType;

        if (data.linkType === 1) {
          this.curBannerLinkType = "app";
          this.appBannerLinkData = Object.assign(this.appBannerLinkData, {
            linkType: data.linkType,
            linkUrl: data.linkUrl,
          });
        }
        if (data.linkType === 2) {
          this.curBannerLinkType = "h5";
          this.h5BannerLinkData = Object.assign(this.h5BannerLinkData, {
            linkType: data.linkType,
            linkUrl: data.linkUrl,
          });
        }
        if (data.linkType === 3) {
          this.curBannerLinkType = "other";
          this.otherBannerLinkData = Object.assign(this.otherBannerLinkData, {
            appId: data.appId,
            linkType: data.linkType,
            linkUrl: data.linkUrl,
          });
        }
      });
    }
  },

  methods: {
    handleCancelEdit() {
      this.$emit("dialog-close");
    },

    handleChangeUploadFile(file, fileList) {
      this.formData.fileList = fileList;
    },

    async handleConfirmEdit() {
      let tbBannerLink;

      if (this.curBannerLinkType === "app") {
        tbBannerLink = this.appBannerLinkData;
      }

      if (this.curBannerLinkType === "h5") {
        tbBannerLink = this.h5BannerLinkData;
      }

      if (this.curBannerLinkType === "other") {
        tbBannerLink = this.otherBannerLinkData;
      }

      if (this.type === "add") {
        await addBanner({
          bannerImageUrl: this.formData.fileList[0].response.msg,
          bannerName: this.formData.bannerName,
          status: this.formData.status,
          sortOrder: this.formData.sortOrder,
          ...tbBannerLink,
        });

        this.$message.success("新增成功！");
      }

      if (this.type === "edit") {
        await updateBanner({
          id: this.formData.id,
          bannerImageUrl: this.formData.fileList[0].url,
          bannerName: this.formData.bannerName,
          status: this.formData.status,
          sortOrder: this.formData.sortOrder,
          ...tbBannerLink,
        });

        this.$message.success("修改成功！");
      }

      this.$emit("dialog-close", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.banner_edit {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  .formItem {
    flex: 1;
    display: flex;
    flex-direction: column;

    span {
      color: #e6a23c;
      font-size: 12px;
    }

    .linkContent {
      margin-top: 10px;
    }
  }
}

.btns {
  display: flex;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
}

.bannerPageTabLine {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    border-bottom: 1px solid rgb(235, 238, 245);
  }

  div {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;

    &:first-child {
      flex: 1;
      border-top: 1px solid rgb(235, 238, 245);
      border-left: 1px solid rgb(235, 238, 245);
    }

    &:last-child {
      border-top: 1px solid rgb(235, 238, 245);
      border-left: 1px solid rgb(235, 238, 245);
      border-right: 1px solid rgb(235, 238, 245);
    }
  }

  div:last-child {
    border-bottom: 1px solid rgb(235, 238, 245);
  }
}

.customLink {
  display: flex;
  align-items: center;
  margin: 20px 0;
  .title {
    width: 100px;
    text-align: right;
  }
}
</style>
