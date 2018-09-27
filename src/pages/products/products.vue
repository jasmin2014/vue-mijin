<!--产品-->
<template>
  <div class="box">
    <el-form class="form-label flex fixed-width">
      <el-row>
        <el-col :span="5">
          <el-form-item label="产品名称">
            <el-input v-model="search.productName" placeholder="产品名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="产品编号">
            <el-input v-model="search.productId" placeholder="产品编号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="状态">
            <mj-select v-model="search.status"
                       :kind="this.$enum.PRODUCT_STATUS"
                       :group="this.$enum.PRODUCT_STATUS" clearable></mj-select>
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
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column v-for="(col, index) in table" :prop="col.prop" :label="col.label"
                         :formatter="col.formatter"
                         :width="col.width" :key="index" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-tooltip content="查看">
              <el-button size="small" icon="el-icon-view"
                         @click="handleDetail(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip content="编辑">
              <el-button size="small" type="info" icon="el-icon-edit"
                         @click="handleEdit(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.status =='OFF'" content="上架">
              <el-button size="small"
                         @click="handleOn(scope.row)">上架
              </el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.status =='ON'" content="下架">
              <el-button size="small"
                         @click="handleOff(scope.row)">下架
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" class="mgt20">
      <el-pagination layout="prev, next" :total="pageTotal" :page-size="search.pageSize"
                     @current-change="getData"></el-pagination>
    </el-row>

    <!--弹框-->
    <el-dialog :title="productTitle" :visible.sync="isShow"
               @open="handleDialogOpen"
               @close="handleDialogClose">
      <el-form :model="product" ref="product" label-width="130px" :rules="rules">
        <el-row>
          <el-col :span="20">
            <el-form-item label="产品名称" prop="productName">
              <mj-input v-model="product.productName"
                        :mode="mode"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="产品编号" prop="productId">
              <mj-input v-model="product.productId"
                        :disabled="mode!=='CREATE'"></mj-input>
              <span class="product-tip">编号规则:渠道缩写+产品缩写+四位数字,例:MJDSD0001</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="产品类型" prop="productType">
              <mj-select v-model="product.productType"
                         :kind="this.$enum.LOAN_KIND"
                         :group="this.$enum.PRODUCT"
                         :mode="mode"
                         clearable></mj-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="关联产品策略" prop="strategyIdList">
              <el-checkbox-group v-model="product.strategyIdList">
                <el-checkbox v-for="item in productStrategyList"
                             :label="item.strategyId"
                             :key="item.strategyId"
                             @change="changeTest(product.strategyIdList)"
                             :disabled="mode==='VIEW'">{{item.strategyName}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" class="credit-flex" style="display: flex; justify-content: space-between;">
            <el-form-item label="授信额度(万元)" prop="creditMinAmount">
              <mj-input v-model="product.creditMinAmount"
                        :mode="mode" type="number" style="width: 100%;"></mj-input>
            </el-form-item>
            <span style="height: 40px;line-height: 40px;">-</span>
            <el-form-item label-width="0" prop="creditMaxAmount">
              <mj-input v-model="product.creditMaxAmount"
                        :mode="mode" type="number" style="width: 100%;"></mj-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="授信额度有效期" prop="creditExpireDate">
              <mj-input v-model="product.creditExpireDate"
                        :mode="mode" type="number" unit="天">
              </mj-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button v-if="mode !='VIEW'" type="primary" @click="handleSave">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getProductList,
    createProduct,
    onProduct,
    offProduct,
    productStrategy,
    getProductDetail,
    editProduct
  } from '../../api/products'

  export default {
    name: 'ProductsList',
    components: {},
    data() {
      const dateInt = (rule, value, callback) => {
        if (!Number.isInteger(value)) {
          callback('请输入整数');
        } else {
          if (value < 1) {
            callback('不能小于1');
          } else {
            callback();
          }
        }
      };
      const minAmountInt = (rule, value, callback) => {
        if (!Number.isInteger(value)) {
          callback('请输入整数');
        } else {
          if (value < 1) {
            callback('不能小于1');
          } else if (value > 100) {
            callback('授信额度不能超过100万元');
          } else {
            callback();
          }
        }
      };
      const maxAmountInt = (rule, value, callback) => {
        if (!Number.isInteger(value)) {
          callback('请输入整数');
        } else {
          if (value < 1) {
            callback('不能小于1');
          } else if (value > 100) {
            callback('授信额度不能超过100万元');
          } else if (value < this.product.creditMinAmount) {
            callback('最大值不能小于最小值');
          } else {
            callback();
          }
        }
      };
      return {
        mode: "",
        search: {
          pageNumber: 1,
          pageSize: 10
        },
        productStrategyList: [],
        productTitle: "",
        product: {
          productName: "",
          productId: "",
          productType: "",
          strategyIdList: [],
          creditMinAmount: "",
          creditMaxAmount: "",
          creditExpireDate: ""
        },
        isShow: false,
        pageTotal: 0,
        list: [],
        table: [
          {
            label: '产品编号',
            prop: 'productId'
          },
          {
            label: '产品名称',
            prop: 'productName'
          },
          {
            label: '最后修改时间',
            prop: 'updatedTime'
          },
          {
            label: '状态',
            prop: 'status',
            formatter: (row, col, val) => this.$filter(val, this.$enum.PRODUCT_STATUS, this.$enum.PRODUCT_STATUS)
          },
          {
            label: '最后操作人',
            prop: 'realName'
          }
        ],
        rules: {
          productName: [
            {required: true, message: '请输入产品名称!', trigger: 'blur'}
          ],
          productId: [
            {required: true, message: '请输入产品编号!', trigger: 'blur'}
          ],
          productType: [
            {required: true, message: '请选择产品类型!', trigger: 'change'}
          ],
          strategyIdList: [
            {required: true, message: '至少选择一种放款模式!', trigger: 'change', type: 'array'}
          ],
          creditMinAmount: [
            {required: true, message: '请输入授信额度!', trigger: 'blur'},
            {validator: minAmountInt, trigger: 'blur'}
          ],
          creditMaxAmount: [
            {required: true, message: '请输入授信额度!', trigger: 'blur'},
            {validator: maxAmountInt, trigger: 'blur'}
          ],
          creditExpireDate: [
            {required: true, message: '授信额度有效期!', trigger: 'blur'},
            {validator: dateInt, trigger: 'blur'}
          ],
        },
      }
    },
    created() {
      this.getData(1);
      this.productStrategy();
    },
    methods: {
      handleSearch() {
        this.getData(1);
      },
      changeTest(val) {
        // console.log('23213', val);
      },
      handleSave() {
        this.$refs['product'].validate((val) => {
          if (val) {
            if (this.mode == 'CREATE') {
              this.createProduct();
            } else if (this.mode == 'EDIT') {
              this.editProduct();
            }
          } else {
            return false;
          }
        })
      },
      handleOff(row) {
        this.$confirm('确定下架该产品吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.offProduct(row.productId);
        })
      },
      handleOn(row) {
        this.$confirm('确定上架该产品吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.onProduct(row.productId);
        })
      },
      handleDialogClose() {
        this.isShow = false;
        // this.product = {
        //   strategyIdList: []
        // }
        this.$refs['product'].resetFields();
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
      handleCreate() {
        this.isShow = true;
        this.productTitle = '新增产品'
        this.mode = 'CREATE';
      },
      handleDetail(row) {
        this.getProductDetail(row.productId);
        this.isShow = true;
        this.productTitle = '查看产品'
        this.mode = 'VIEW';

      },
      handleEdit(row) {
        this.getProductDetail(row.productId);
        this.isShow = true;
        this.productTitle = '编辑产品'
        this.mode = 'EDIT';
      },

      getData(index) {
        const search = this.$objFilter(this.$deepcopy(this.search), _ => _ !== '');
        search.pageNumber = index;
        getProductList(search).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.list = res.body.list;
            this.pageTotal = res.body.totalRecord;
          }
        })
      },
      //新增产品
      createProduct() {
        const product = this.$deepcopy(this.product);
        product.creditMinAmount = product.creditMinAmount * 10000;
        product.creditMaxAmount = product.creditMaxAmount * 10000;
        createProduct(product).then(response => {
          const res = response.data;
          if (response.status === 201) {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            // this.product = {
            //   strategyIdList: []
            // };
            this.isShow = false;
            setTimeout(() => {
              this.getData(this.search.pageNumber);
            }, 1000)
          }
        })
      },

      //上架产品
      offProduct(id) {
        offProduct(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            setTimeout(() => {
              this.getData(this.search.pageNumber);
            }, 1000)
          }
        })
      },
      //下架产品
      onProduct(id) {
        onProduct(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            setTimeout(() => {
              this.getData(this.search.pageNumber);
            }, 1000)
          }
        })
      },
      //关联产品策略
      productStrategy() {
        productStrategy().then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.productStrategyList = res.body;
          }
        })
      },
      //产品详情
      getProductDetail(id) {
        getProductDetail(id).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.product.productName = res.body.productName;
            this.product.productId = res.body.productId;
            this.product.productType = res.body.productType;
            this.product.creditMinAmount = res.body.creditMinAmount / 10000;
            this.product.creditMaxAmount = res.body.creditMaxAmount / 10000;
            this.product.creditExpireDate = res.body.creditExpireDate;
            this.product.strategyIdList = res.body.strategyIdList || [];
          }
        })
      },
      //编辑产品
      editProduct() {
        const product = this.$objFilter(this.$deepcopy(this.product), _ => _ !== '');
        product.creditMinAmount = product.creditMinAmount * 10000;
        product.creditMaxAmount = product.creditMaxAmount * 10000;
        editProduct(product).then(response => {
          const res = response.data;
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: "修改成功"
            });
            this.isShow = false;
            setTimeout(() => {
              this.getData(this.search.pageNumber);
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
</style>
