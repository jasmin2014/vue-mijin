<template>
  <div>
    <el-form>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="5">
          <h5>{{title}}</h5>
        </el-col>
        <el-col :span="1" v-if="mode !== 'VIEW'">
          <el-button size="small" type="primary" title="添加一行" class="margin-top15" @click="handleCreateRow"><i class="icon el-icon-plus"></i></el-button>
        </el-col>
      </el-row>
      <el-table v-if="mode === 'VIEW'" :data="currentValue.tableData" border style="width: 100%">
        <el-table-column v-for="(col, index) in currentValue.tableHeaders"
                         :prop="col.prop"
                         :label="col.label"
                         :align="col.align"
                         :formatter="col.formatter"
                         :key="col.prop">
        </el-table-column>
      </el-table>

      <el-table v-else :data="currentValue.tableData" border style="width: 100%">
        <el-table-column v-for="(col, index) in currentValue.tableHeaders"
                         :prop="col.prop"
                         :label="col.label"
                         :align="col.align"
                         :key="col.prop">
          <template slot-scope="scope">
            <div v-if="scope.row.$create && !col.readyonly">
              <el-form-item :prop="scope.row[col.prop]">
                <el-input v-if="col.type === 'input'" v-model="scope.row[col.prop]"></el-input>
                <div v-else-if="col.type === 'select'">
                  <mj-select v-if="col.kind || col.group" v-model="scope.row[col.prop]" :kind="col.kind" :group="col.group"></mj-select>
                  <mj-select v-else-if="col.region && col.prop === 'province' " v-model="scope.row[col.prop]" :region="'86'"></mj-select>
                  <mj-select v-else-if="col.prop === 'city'" v-model="scope.row[col.prop]" :region="scope.row['province']"></mj-select>
                </div>
                <span v-else-if="col.isReady">{{ scope.row[col.prop] }}</span>
              </el-form-item>
            </div>
            <span v-else>{{ scope.row[col.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'MjBaseTable',
    props: {
      mode: String, //组件的状态，编辑，删除，查看等
      title: String, //组件的名称
      value: Object, //组件表格里面需要传的值
    },
    data () {
      return {
        currentValue: {
          tableData: [],
          tableHeaders: []
        },
        isEditing: false
      }
    },
    watch:{
      'value.tableData'(val,oldval){
        this.currentValue.tableData = val;
      },
      'value.tableHeaders'(val,oldval){
        this.currentValue.tableHeaders = val;
      }
    },
    created(){
      this.currentValue = this.value ? this.$deepcopy(this.value) : {};
    },
    methods: {
      handleCreateRow(){
        const propNames = this.currentValue.tableHeaders.map(_ => ({
          propname: _.prop,
          type: _.type
        }));
        let _item = {};
        propNames.forEach(i => {
          _item[i.propname] = '';
        });
        _item.$create = true;
        this.currentValue.tableData.push(_item);
      },
      handleSaveRow(value){
        value.$create = false;
        this.isEditing = false;
        this.$emit('save', value);
      },
      handleCancelRow(row){

      }
    }
  }
</script>

<style scoped>
  .icon {
    font-size: 130%;
    font-weight: bold;
  }
</style>
