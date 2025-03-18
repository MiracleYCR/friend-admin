<template>
  <div class="app-container">
    <div class="title">自动回复</div>

    <div class="header">
      <div style="display: flex; align-items: center">
        <span>时间：</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>

      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>

    <el-table border :height="500" :data="tableList">
      <el-table-column
        label="创建时间"
        prop="field1"
        align="center"
        width="200px"
      />
      <el-table-column
        label="类型"
        prop="field2"
        align="center"
        width="120px"
      />
      <el-table-column label="自动回复内容" prop="field3" align="center" />
      <el-table-column label="状态" prop="field4" width="120px" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.field4"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit">
            编辑
          </el-button>
          <el-button type="text" size="small" @click="handleDelete">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      width="700px"
      title="新增/修改"
      :show-close="true"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
    >
      <el-form label-width="120px">
        <el-form-item label="类型：">
          <el-select v-model="formData.type">
            <el-option label="打招呼" :value="0"></el-option>
            <el-option label="问候语" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input
            type="textarea"
            style="width: 255px"
            placeholder="用户昵称/姓名/身份证号/绑定手机号"
            v-model="formData.content"
            maxlength="30"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="formData.status">
            <el-option label="启用" :value="0"></el-option>
            <el-option label="禁用" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="btns">
        <el-button @click="handleCancelEdit">取消</el-button>
        <el-button type="primary" style="margin-left: 50px">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AutoApply",

  dicts: ["sys_yes_no"],

  data() {
    return {
      tableList: [
        {
          field1: "1111",
          field2: "2222",
          field3: "3333",
          field4: true,
          field5: "5555",
        },
        {
          field1: "1111",
          field2: "2222",
          field3: "3333",
          field4: true,
          field5: "5555",
        },
        {
          field1: "1111",
          field2: "2222",
          field3: "3333",
          field4: true,
          field5: "5555",
        },
      ],

      formData: {
        type: 1,
        status: 1,
        content: "",
      },
      dialogVisible: false,
    };
  },

  methods: {
    handleAdd() {
      console.log("handleAdd");
      this.dialogVisible = true;
    },
    handleEdit() {
      console.log("handleAdd");
      this.dialogVisible = true;
    },
    async handleDelete() {
      try {
        await this.$confirm("确认删除选中数据？", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        });
      } catch (err) {}
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

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
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

.btns {
  display: flex;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
}
</style>
