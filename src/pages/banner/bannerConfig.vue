<!--banner配置-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="5">
          <el-form-item label="显示状态">
            <mj-select v-model="search.showStatus" :options="options" clearable></mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="显示终端">
            <mj-select v-model="search.deviceType"
                       :kind="this.$enum.DEVICE_TYPE"
                       :group="this.$enum.DEVICE_TYPE" clearable></mj-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="名称">
            <el-input v-model="search.bannerName" placeholder="名称" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查找"
                       @click="handleSearch"></el-button>
            <el-button type="primary" icon="el-icon-plus" title="新增"
                       @click="handleCreate"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="list" border class="table-center">
        <el-table-column label="id" prop="bannerId" align="center"></el-table-column>
        <el-table-column label="图片缩略图" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.imageUrl" width="80px" height="50px" alt="">
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="bannerName" align="center"></el-table-column>
        <el-table-column label="链接" width="180px" prop="bannerLink" align="center"></el-table-column>
        <el-table-column label="有效时间" width="180px" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.validTimeStart}}</span>--<span>{{scope.row.validTimeEnd}}</span>
          </template>
        </el-table-column>
        <el-table-column label="权重" prop="weight" align="center"></el-table-column>
        <el-table-column label="前端显示" prop="showStatus" align="center"
                         :formatter="(row, col, val) => (val==false? '隐藏':'显示')"></el-table-column>
        <el-table-column label="发布人员" prop="operateName" align="center"></el-table-column>
        <el-table-column label="更新时间" prop="updatedTime" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-tooltip content="修改">
              <el-button size="small" type="info" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除">
              <el-button size="small" class="el-icon-delete"
                         @click="handleDel(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" class="mgt20">
      <el-pagination layout="sizes,total, prev, pager, next, jumper"
                     :total="pageTotal"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     :current-page="search.pageNumber"
                     :page-sizes="[10, 15,20, 30,50]"
                     :page-size="search.pageSize"></el-pagination>
    </el-row>

    <!--弹框-->
    <el-dialog :title="dialogTitle" :visible.sync="isShow"
               @open="handleDialogOpen"
               @close="handleDialogClose">
      <el-form :model="bannerModel" ref="bannerModel" label-width="130px" :rules="rules">
        <el-row>
          <el-col :span="20">
            <el-form-item label="名称" prop="bannerName">
              <mj-input v-model.trim="bannerModel.bannerName"
                        :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="链接" prop="bannerLink">
              <mj-input v-model.trim="bannerModel.bannerLink"
                        :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="有效时间" required>
              <el-date-picker v-model="appDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="权重" prop="weight">
              <mj-input v-model.trim="bannerModel.weight"
                        :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="devices" :span="20">
            <el-form-item label="终端显示" prop="devices">
              <mj-checkbox v-model="bannerModel.devices" :kind="this.$enum.DEVICE_TYPE"
                           :group="this.$enum.DEVICE_TYPE" :mode="mode"></mj-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="前端显示" prop="showStatus">
              <mj-radio v-model="bannerModel.showStatus" :options="options" :mode="mode"></mj-radio>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20">
            <el-form-item label="图片预览" required>
              <mj-upload v-model="bannerPic" :mode="mode" accept="image/*" placeholder="3M以内" :maxSize="'3M'" :limit="1"
                         @success="handleUpload"
                         @remove="handleRemove"></mj-upload>
            </el-form-item>

          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center">
        <el-button v-if="mode !='VIEW'" type="primary" @click="handleSave">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {getBannerList, addBanner, getBannerDetail, delBanner, editBanner} from '../../api/banner.js'

  export default {
    components: {},
    data() {
      return {
        mode: "",
        search: {
          pageNumber: 1,
          pageSize: 10
        },
        options: [{text: '隐藏', value: false}, {text: '显示', value: true}],
        productStrategyList: [],
        dialogTitle: "",
        bannerModel: {
          bannerName: "",
          bannerLink: "",
          validTimeStart: '',
          validTimeEnd: "",
          weight: "",
          showStatus: true,
          devices: []
        },
        bannerImg: [],
        bannerId: '',
        isShow: false,
        pageTotal: 0,
        list: [],
        rules: {
          bannerName: [
            {required: true, message: '请输入名称!', trigger: 'blur'},
            {
              min: 1,
              max: 50,
              message: "请输入50字以内",
              trigger: "blur"
            }
          ],
          bannerLink:[
            {
              pattern: this.$valid.webSite,
              message: "请输入正确的链接",
              trigger: "blur"
            }
          ],
          weight: [
            {required: true, message: '请输入权重!', trigger: 'blur'},
            {
              pattern: /^[1-9][0-9]{0,2}$/,
              message: "请输入1-999以内",
              trigger: "blur"
            }
          ],
          devices: [
            {required: true, message: '至少选择一种终端!', trigger: 'change', type: 'array'}
          ],
          showStatus: [
            {required: true, message: '至少选择一种显示!', trigger: 'blur',}
          ]
        },
      }
    },
    computed: {
      bannerPic: {
        get() {
          return this.bannerImg.map(_ =>
            ({
              name: _.name,
              url: _.fileUri,
              type: _.fileType
            }));
        },
        set(val) {
          this.bannerImg = val.map(_ => ({
            name: _.name,
            fileUri: _.url,
            fileType: _.type
          }));
        }
      },
      appDate: {
        get() {
          if (this.bannerModel.validTimeStart || this.bannerModel.validTimeEnd) {
            let dateRange = [];
            dateRange[0] = this.bannerModel.validTimeStart;
            dateRange[1] = this.bannerModel.validTimeEnd;
            return dateRange;
          } else {
            return [];
          }
        },
        set(range) {
          if (range) {
            this.bannerModel.validTimeStart = range[0];
            this.bannerModel.validTimeEnd = range[1];
          } else {
            this.bannerModel.validTimeStart = '';
            this.bannerModel.validTimeEnd = '';
          }
        }
      }
    },
    created() {
      this.getData(this.search.pageSize, this.search.pageNumber)
    },
    methods: {
      bannerValidate() {
        if (this.bannerModel.validTimeStart == '' || this.bannerModel.validTimeEnd == '') {
          this.$message.error({
            type: "warning",
            message: "请填写时间"
          });
          return false
        };
        if (!this.bannerImg.length) {
          this.$message.error({
            type: "warning",
            message: "请上传图片!"
          });
          return false
        } else {
          return true;
        }
      },
      handleUpload(file) {
        this.bannerPic = [
          {
            url: file.fileUri,
            type: file.type,
            name: file.name
          }
        ];
      },
      handleRemove() {
        this.bannerPic = [];
      },
      handleCurrentChange(val) {
        this.search.pageNumber = val
        this.getData(this.search.pageSize, val);
      },
      handleSizeChange(val) {
        this.search.pageSize = val
        this.getData(val, this.search.pageNumber)
      },
      // 查询列表
      handleSearch() {
        this.search.pageNumber = 1;
        this.getData(this.search.pageSize, this.search.pageNumber)
      },
      handleSave() {
        this.$refs['bannerModel'].validate((val) => {
          if (val && this.bannerValidate()) {
            if (this.mode == 'CREATE') {
              this.addBanner();
            } else if (this.mode == 'EDIT') {
              this.$confirm('确定修改数据吗？', '温馨提示', {
                type: 'warning'
              }).then(() => {
                this.editBanner();
              })
            }
          } else {
            return false;
          }
        })
      },

      handleDialogClose() {
        this.isShow = false;
        this.bannerImg = [];
        this.bannerModel.validTimeStart = '';
        this.bannerModel.validTimeEnd = '';
        this.$refs['bannerModel'].resetFields();
      },
      handleCancel() {
        // this.$refs['product'].resetFields();
        this.isShow = false;
      },
      handleDialogOpen() {
        this.$nextTick(() => {
          this.$refs.product && this.$refs.product.resetFields();
        })
      },
      handleDel(row) {
        this.$confirm('确定删除该条数据吗？', '温馨提示', {
          type: 'warning'
        }).then(() => {
          this.delBanner(row.bannerId);
        })
      },
      handleCreate() {
        this.isShow = true;
        this.dialogTitle = '新增banner配置'
        this.mode = 'CREATE';
      },
      handleEdit(row) {
        this.getBannerDetail(row.bannerId);
        this.isShow = true;
        this.dialogTitle = '编辑banner配置'
        this.mode = 'EDIT';
        this.bannerId = row.bannerId;
      },

      getData(pageSize, pageNum) {
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        search.pageSize = pageSize;
        search.pageNumber = pageNum;
        getBannerList(search).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.list = res.body.list;
            this.pageTotal = res.body.totalRecord;
          }
        })
      },
      //新增
      addBanner() {
        const bannerModel = this.$deepcopy(this.bannerModel);
        bannerModel.imageUrl = this.bannerImg[0].fileUri;
        let displayDevice = 0;
        bannerModel.devices.forEach(item => {
          displayDevice += Number(item);
        })
        bannerModel.displayDevice = displayDevice;
        bannerModel.operateName = this.$getLocalStorage('user').realName;
        addBanner(bannerModel).then(response => {
          const res = response.data;
          if (response.status === 201) {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            this.isShow = false;
            this.bannerImg = [];
            setTimeout(() => {
              this.getData(this.search.pageSize, this.search.pageNumber)
            }, 1000)
          }
        })
      },

      //详情
      getBannerDetail(id) {
        getBannerDetail(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.bannerModel.bannerName = res.body.bannerName;
            this.bannerModel.bannerLink = res.body.bannerLink;
            this.bannerModel.validTimeStart = res.body.validTimeStart;
            this.bannerModel.validTimeEnd = res.body.validTimeEnd;
            this.bannerModel.weight = res.body.weight;
            const devices = [];
            res.body.devices.forEach(item => {
              devices.push(item.toString());
            })
            this.bannerModel.devices = devices;
            this.bannerModel.showStatus = res.body.showStatus;
            this.bannerImg = [];
            const obj = {fileUri: res.body.imageUrl};
            this.bannerImg.push(obj);
          }
        })
      },
      //编辑
      editBanner() {
        const bannerModel = this.$deepcopy(this.bannerModel);
        bannerModel.imageUrl = this.bannerImg[0].fileUri;
        let displayDevice = 0;
        bannerModel.devices.forEach(item => {
          displayDevice += Number(item);
        })
        bannerModel.displayDevice = displayDevice;
        bannerModel.bannerId = this.bannerId;
        bannerModel.operateName = this.$getLocalStorage('user').realName;
        editBanner(bannerModel).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: "修改成功"
            });
            this.isShow = false;
            this.bannerImg = [];
            setTimeout(() => {
              this.getData(this.search.pageSize, this.search.pageNumber)
            }, 1000)
          }
        })
      },
      //删除
      delBanner(id) {
        delBanner(id).then(response => {
          if (response.status === 204) {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            setTimeout(() => {
              this.getData(this.search.pageSize, this.search.pageNumber)
            }, 1000)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .product-tip {
    font-size: 8px;
    color: #444;
  }

  .line {
    color: #243;
    margin-left: 5px;
  }

  .devices {
    .el-checkbox-group {
      line-height: 40px;
    }
  }
</style>

