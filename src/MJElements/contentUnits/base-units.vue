<template>
  <div class="base-datas">
    <h3 v-if="!isArray">{{title}}</h3>
    <el-form :model="currentValue.baseDatas" class="flex" :class="{'base-main':!isArray}" label-width="150px">
      <el-row class="row-bg" justify="space-between">
        <el-col :span="8" v-for="item in baseElseUnits" :key="item.name">
          <el-form-item :label="item.label">
            <span v-if="item.type === 'select'">
              <mj-select v-if="item.kind || item.group" :mode="mode" v-model="currentValue.baseDatas[item.name]" :kind="item.kind" :group="item.group"></mj-select>
              <mj-select v-else-if="item.isRegion" :mode="mode" v-model="currentValue.baseDatas[item.name]" :region="item.region"></mj-select>
              <mj-select v-else-if="item.options" :mode="mode" v-model="currentValue.baseDatas[item.name]" :options="item.options"></mj-select>
            </span>
            <mj-input v-else-if="item.type === 'input'" :mode="mode" v-model="currentValue.baseDatas[item.name]"></mj-input>
            <mj-input v-else-if="item.type === 'textarea'" :type="item.type" :rows="item.rows" :mode="mode" v-model="currentValue.baseDatas[item.name]"></mj-input>
            <el-date-picker v-else-if="item.type === 'date'"
              v-model="currentValue.baseDatas[item.name]"
              type="date"
              placeholder="选择日期" @change="">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="base-uploads">
        <el-col :span="8" v-for="item in baseUploads" :key="item.name">
          <el-form-item :label="item.label">
            <mj-upload v-model="currentValue.baseDatas[item.name]" :mode="mode" :text="item.label" @success="uploadSuccess(currentValue.baseDatas[item.name])"
                        @remove="handleRemove(currentValue.baseDatas[item.name])"></mj-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: 'MjBaseUnits',
    props: {
      mode: String, //组件的状态，编辑，删除，查看等
      title: String, //组件的名称
      value: Object, //组件表格里面需要传的值
      isArray: Boolean
    },
    data () {
      return {
        currentValue: {
          baseDatas: {},
          baseUnits: []
        },
        baseElseUnits: [],
        baseUploads: []
      }
    },
    watch:{
      'value.baseDatas'(val,oldval){
        this.setCurrentValue(this.$deepcopy(val), 'baseDatas');
      },
      'value.baseUnits'(val,oldval){
        this.setCurrentValue(this.$deepcopy(val), 'baseUnits');
      }
    },
    created(){

      this.currentValue = this.value ? this.$deepcopy(this.value) : {};
      this.currentValue.baseDatas = this.value.baseDatas ? this.$deepcopy(this.value.baseDatas) : {}
      this.currentValue.baseUnits = this.value.baseUnits ? this.$deepcopy(this.value.baseUnits) : {}
      this.setBaseUploads();

    },
    methods: {
      getCurrentValue(){
        return this.currentValue.baseDatas;
      },
      handleSetValue(val,name){
        let value = {
          name: name,
          val: val
        }
        this.$emit('set',value);
      },
      setCurrentValue(val, key) {
        if (this.currentValue.hasOwnProperty(key)) {
          if (typeof val === 'object' && val instanceof Array) {
            this.currentValue[key] = val;
          } else if (typeof val === 'object') {
            for (const k in val) {
              if (this.currentValue[key].hasOwnProperty(k)) {
                this.currentValue[key][k] = val[k];
              }
            }
          } else {
            this.currentValue[key] = val;
          }
        }
      },
      setBaseUploads(){
        let _item = {};
        this.baseUploads = [];
        if(this.currentValue.baseUnits && this.currentValue.baseUnits.length>0){
          this.currentValue.baseUnits.forEach((item)=> {
            if(item.type === 'upload'){
              this.baseUploads.push(item);
            }else{
              this.baseElseUnits.push(item)
            }
          })
        }

      },
      getBaseDatas(){
      },
      uploadSuccess(row){

      },
      handleRemove(row){

      }
    }
  }
</script>

<style  lang="scss">
  .base-datas {
    h3 {
      font-size: 14px;
    }
    .base-main {
      padding: 20px;
      padding-bottom: 0;
      border:1px solid #ebeef5;
    }
    .upload-demo {
      display: flex;
      align-content: space-between;
    }
    .base-uploads {
      .el-upload--picture-card {
        width: 128px;
        height: 128px;
        line-height: 126px;
        .el-upload__text {
          position: absolute;
          left: 0;
          bottom: 10px;
          width: 130px;
          font-size: 12px;
          color: #999;
          line-height: 30px;
        }
      }
    }
  }
</style>
