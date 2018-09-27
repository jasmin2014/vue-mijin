<!--运营管理 账户显示配置-->
<template>
  <div class="box">
    <el-col :span="18">
      <el-table :data="list" border class="table-center">
        <el-table-column prop="nodeName" label="修改时间"></el-table-column>
        <el-table-column prop="nodeName" label="前端显示账户"></el-table-column>
        <el-table-column prop="nodeName" label="操作人"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-tooltip content="修改">
              <el-button size="small" type="info" icon="el-icon-edit"
                         @click="handleEdit(scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <!--修改-->
    <el-dialog title="修改" :visible.sync="dialog">
      <el-form :model="ref" label-width="100px">
        <el-row>
          <el-form-item label="前端显示账户">
            <el-checkbox-group v-model="ref.checkList">
              <el-checkbox label="资金账户"></el-checkbox>
              <el-checkbox label="存管账户"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button type="primary">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'OperateManagePage',
    data() {
      return {
        dialog: false,
        ref:{},
        list: [{nodeName: "121212"}],
      }
    },
    methods: {
      handleEdit(row) {
        this.dialog = true;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
