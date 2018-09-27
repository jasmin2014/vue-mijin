<!--角色-->
<template>
  <el-form label-width="100px"
           :model="currentValue">
    <el-row>
      <el-col :span="22">
        <el-form-item label="角色名称">
          <mj-input v-model="currentValue.code"
                    :mode="mode"></mj-input>
        </el-form-item>
      </el-col>
      <el-col :span="22">
        <el-form-item label="角色描述">
          <mj-input v-model="currentValue.code"
                    :mode="mode"></mj-input>
        </el-form-item>
      </el-col>
      <el-col :span="22">
        <el-form-item label="权限分配">
          <el-checkbox-group v-model="currentValue.actionCodeList"
                             :disabled="mode==='VIEW'">
            <el-table :data="currentAuthList.children || []"
                      :show-header="false" border>
              <el-table-column label="一级菜单" width="120px">
                <template slot-scope="scope">
                  <el-checkbox :label="scope.row.activeCode">{{scope.row.tname}}</el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="二级菜单" width="120px">
                <template slot-scope="scope">
                  <el-checkbox :label="scope.row.activeCode">{{scope.row.tname}}</el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="三级菜单">
                <template slot-scope="scope">
                  <el-row v-for="(item,index) in scope.row.children" :key="index">
                    <el-col :span="5">
                      <el-checkbox :label="item.actionCode">{{item.tname}}</el-checkbox>
                    </el-col>
                    <el-col :span="18">
                      <el-checkbox v-for="(op, index) in item.children" :key="index"
                      :label="op.actionCode">{{op.tname}}</el-checkbox>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <div v-if="mode !=='VIEW'">
        <el-button type="primary">确定</el-button>
        <el-button>取消</el-button>
      </div>
    </el-row>
  </el-form>
</template>

<script>
  export default {
    props: {
      value: Object,
      authList: Object,
      mode: String
    },
    data() {
      return {
        currentValue: this.value,
        currentAuthList:{}
      }
    },
    watch: {
      'authList'(val,oldVal) {
        this.currentAuthList = val;
      },
      value(val){
        this.currentValue = val;
      }
    }
  }
</script>

<style scoped>

</style>
