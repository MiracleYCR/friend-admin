<template>
  <div class="app-container">
    <div class="title">首页轮播</div>

    <el-table border style="width: 100%" :data="bannerSetting">
      <el-table-column label="Banner切换时间间隔" align="center">
        <template slot-scope="scope">
          <template v-if="!isSetting">
            <span>{{ interval || "-" }} ms</span>
          </template>
          <template v-else>
            <el-input-number
              style="width: 200px"
              v-model="interval"
              :min="1000"
              :max="10000"
              :step="100"
            />
            &nbsp; ms
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <template v-if="!isSetting">
            <el-button type="text" size="small" @click="handleSetting">
              编辑
            </el-button>
          </template>
          <template v-else>
            <el-button type="text" size="small" @click="handleCancelSetting">
              取消
            </el-button>
            <el-button type="text" size="small" @click="handleSaveSetting">
              保存
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <div class="bannerList">
      <div class="operateList">
        <el-button type="primary" size="small" @click="handleAddBanner">
          新增
        </el-button>
        <el-button type="primary" size="small" @click="queryBannerList">
          刷新
        </el-button>
      </div>

      <el-table border v-loading="loading" :height="600" :data="bannerList">
        <el-table-column label="创建时间" prop="createTime" align="center" />
        <el-table-column label="标题" prop="bannerName" align="center" />
        <el-table-column
          label="Banner图片"
          prop="bannerImageUrl"
          align="center"
        >
          <template slot-scope="scope">
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <el-image
                fit="contain"
                style="width: 80px; height: 80px"
                :src="scope.row.bannerImageUrl"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="排序值" prop="sortOrder" align="center" />
        <el-table-column
          label="状态"
          prop="status"
          width="120px"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="0"
              :inactive-value="1"
              @change="handleUpdateBannerStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120px">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEditBannerItem(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handleDeleteBannerItem(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="pageNum"
        :limit.sync="pageSize"
        @pagination="queryBannerList"
      />
    </div>

    <el-dialog
      width="700px"
      title="新增/修改"
      :show-close="true"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
    >
      <template v-if="dialogVisible">
        <EditComp
          :type="currentBannerType"
          :id="currentBannerId"
          @dialog-close="(refreshTable) => handleCloseDialog(refreshTable)"
        />
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchBannerList,
  setBannerInterval,
  getBannerInterval,
  checkBanner,
  deleteBanner,
  updateBanner,
} from "@/api/base/banner";

import EditComp from "./components/edit.vue";

export default {
  name: "Banner",

  dicts: ["sys_yes_no"],

  components: {
    EditComp,
  },

  data() {
    return {
      interval: 0,
      isSetting: false,
      bannerSetting: [{}],

      total: 0,
      pageNum: 1,
      pageSize: 10,
      bannerList: [],
      loading: false,

      dialogVisible: false,
      currentBannerId: 0,
      currentBannerType: "",
    };
  },

  created() {
    this.queryBannerList();
    this.queryBannerInterval();
  },

  methods: {
    async queryBannerList() {
      try {
        this.loading = true;

        const { rows, total } = await fetchBannerList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        });

        this.total = total;
        this.bannerList = rows;
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },

    async queryBannerInterval() {
      const { data } = await getBannerInterval();
      this.interval = data.bannerTime;
    },

    // 轮播间隔
    handleSetting() {
      this.isSetting = true;
    },
    handleCancelSetting() {
      this.isSetting = false;
    },
    async handleSaveSetting() {
      await setBannerInterval({
        bannerTime: this.interval,
      });
      this.isSetting = false;
      this.$message.success("设置成功！");
    },

    // 轮播增删改查
    handleAddBanner() {
      this.currentBannerType = "add";
      this.dialogVisible = true;
    },
    // 编辑banner
    async handleEditBannerItem(rowData) {
      this.currentBannerId = rowData.id;
      this.currentBannerType = "edit";
      this.dialogVisible = true;
    },
    // 删除banner
    async handleDeleteBannerItem(rowData) {
      try {
        await this.$confirm("确认删除选中数据？", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        });
        await deleteBanner(rowData.id);
        this.queryBannerList();
        this.$message.success("删除成功！");
      } catch (err) {}
    },
    // 轮播图状态切换
    async handleUpdateBannerStatus(rowData) {
      await updateBanner(rowData);
      this.queryBannerList();
      this.$message.success("状态切换成功！");
    },
    // 链接绑定
    handleBindLink() {
      this.dialogVisible = false;
    },

    handleCloseDialog(refresh) {
      this.dialogVisible = false;
      refresh && this.queryBannerList();
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

  .title {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &::before {
      content: "";
      width: 4px;
      height: 20px;
      margin-right: 5px;
      border-radius: 2px;
      background-color: #fd1674;
    }
  }

  .bannerList {
    margin-top: 10px;

    .operateList {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
  }
}
</style>
