<!--配置管理-->
<template>
  <div class="app-account">
    <top-header></top-header>
    <div class="main">
      <div class="users">
        <div class="wrapper">
          <h2>登录</h2>
          <section class="phone">
            <el-input v-model.trim="login.phone"
                      ref="phone"
                      placeholder="请输入手机号"
                      autofocus
                      @input="handlePhoneChange"
                      @keyup.native.enter="handleLogin"></el-input>
            <p class="hint" v-if="isActive">
              您的账号未注册，
              <router-link :to="{name: 'ResetPage', params: {phone: login.phone,type:'active'}}">立即去注册</router-link>
            </p>
          </section>
          <section class="password">
            <el-input v-model="login.password"
                      ref="password"
                      placeholder="请输入密码"
                      type="password"
                      @input="handlePasswordChange"
                      @keyup.native.enter="handleLogin"></el-input>
          </section>
          <section class="code">
            <el-row>
              <el-col :span="14">
                <el-input v-model.trim="login.phoneCode" ref="phoneCode"
                          placeholder="请输入短信验证码"
                          @input="handleCodeChange"
                          @keyup.native.enter="handleLogin"></el-input>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-button type="primary" plain
                           :disabled="disabledCode"
                           tabindex="-1"
                           @click="handleCode">{{ btnCountDown || '获取验证码' }}
                </el-button>
              </el-col>
            </el-row>
          </section>
          <!--<section class="picturevalidate">-->
          <!--<el-input v-model="login.validatecod"-->
          <!--ref="validatecode"-->
          <!--placeholder="请输入图形验证码"-->
          <!--type="text"-->
          <!--@input="handleValidateCodeChange"-->
          <!--@keyup.native.enter="handleLogin"></el-input>-->
          <!--</section>-->
          <section class="forget-password">
            <router-link :to="{name: 'ResetPage', params: {phone: login.phone},query:{type:'active'}}" title="去注册">注册
            </router-link>
            <router-link :to="{name: 'ResetPage', params: {phone: login.phone},query:{type:'forget'}}" class="resetpass"
                         title="忘记密码，去重置">忘记密码
            </router-link>
          </section>
          <section class="action">
            <el-button type="primary"
                       :loading="loading"
                       @click="handleLogin">立即登录
            </el-button>
          </section>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { checkPhone, doLogin, phoneCodeLogin, sendCode } from "../../api/login";
import TopHeader from "./components/header.vue";
import Utils from "../../lib/method";

const IS_CHECKING = "IS_CHECKING";
const NO_AUTHORITY = "NO_AUTHORITY";
const NOT_ACTIVATED = "NOT_ACTIVATED";

const ILLEGAL_PHONE = "ILLEGAL_PHONE";
const ILLEGAL_PASSWORD = "ILLEGAL_PASSWORD";
const ILLEGAL_PASSWORD_NO_SPACE = "ILLEGAL_PASSWORD_NO_SPACE";
const NULL_CODE = "NULL_CODE";
const NULL_PASSWORD = "NULL_PASSWORD";
const INCONSISTENT_PASSWORD = "INCONSISTENT_PASSWORD";
const NETWORK_ERROR = "NETWORK_ERROR";
const SEND_CODE_SUCCESS = "SEND_CODE_SUCCESS";
const SEND_CODE_FAILED = "SEND_CODE_FAILED";

const PASSWORD_ERROR = "PASSWORD_ERROR";
const LOGIN = "LOGIN"; //识别登录
// const phoneRegexp = /^1[3456789]\d{9}$/;
const phoneRegexp = /^((17[0-9])|(14[0-9])|(13[0-9])|(15[^4,\D])|(18[0-9])|(166)|(199)|(198))\d{8}$/;

export default {
  name: "LoginPage",
  components: { TopHeader },
  data() {
    return {
      login: {
        phone: "",
        password: "",
        phoneCode: ""
      },
      isActive: false,
      loading: false,
      btnCountDown: "",
      disabledCode: true
    };
  },
  created() {
    this.login.phone = this.$route.params.phone;
    if (this.login.phone) {
      this.disabledCode = false;
    } else {
      this.disabledCode = true;
    }
  },
  methods: {
    handlePhoneChange(phone) {
      if (phoneRegexp.test(phone)) {
        this.disabledCode = false;
      } else {
        this.disabledCode = true;
      }
    },
    handleLogin() {
      const phone = this.login.phone;
      if (!phoneRegexp.test(phone)) {
        this.$refs.phone.$refs.input.focus();
        this.$refs.phone.$refs.input.classList.add("error");
        this.$message({
          message: this.getMessageByIllegalType(ILLEGAL_PHONE),
          type: "error"
        });
      } else if (!this.login.password) {
        this.$refs.phone.$refs.input.focus();
        this.$refs.password.$refs.input.classList.add("error");
        this.$message({
          message: this.getMessageByIllegalType(NULL_PASSWORD),
          type: "error"
        });
      } else if (!this.login.phoneCode) {
        this.$refs.phone.$refs.input.focus();
        this.$refs.phoneCode.$refs.input.classList.add("error");
        this.$message({
          message: this.getMessageByIllegalType(NULL_CODE),
          type: "error"
        });
      } else {
        this.loading = true;
        this.phoneCodeLogin(
          this.login.phone,
          this.login.password,
          this.login.phoneCode
        );
      }
    },
    doLogin(phone, password) {
      doLogin(phone, password).then(
        ({ data }) => {
          this.loading = false;
          if (data.code === "200") {
            this.loading = true;
            const token = data.body.token;
            Utils.$setLocalStorage("token", token);
            /**  接口异常(切换)  **/
            // this.$router.push({path: '/mijin'})
            this.checkPhone(token);
          } else if (data.code === "202002") {
            //密码错误
            this.$refs.password.$refs.input.focus();
            this.$refs.password.$refs.input.classList.add("error");
            this.$message({
              message: this.getMessageByIllegalType(PASSWORD_ERROR),
              type: "error"
            });
          } else if (data.code === "2002001") {
            //未激活
            this.isActive = false;
          } else {
            this.$message({
              message: data ? data.message : "服务器忙，请稍后再试",
              type: "error"
            });
          }
        },
        () => {
          this.loading = false;
          this.$message({
            message: this.getMessageByIllegalType(NETWORK_ERROR),
            type: "error"
          });
        }
      );
    },
    //账号密码验证码登录
    phoneCodeLogin(phone, password, phoneCode) {
      let psd = this.$psdEncrypt(password);
      phoneCodeLogin(phone, psd, phoneCode).then(({ data }) => {
          this.loading = false;
          if (data.code === "200") {
            this.loading = true;
            const token = data.body.token;
            Utils.$setLocalStorage("token", token);
            Utils.$setLocalStorage("userId", data.body.userId);
            /** 调用电话号码埋点方法 **/
            this.$doDCP();
            /**  接口异常(切换)  **/
            // this.$router.push({path: '/mijin'})
            this.checkPhone(token);
          } else if (data.code === "202002") {
            //密码错误
            this.$refs.password.$refs.input.focus();
            this.$refs.password.$refs.input.classList.add("error");
            this.$message({
              message: this.getMessageByIllegalType(PASSWORD_ERROR),
              type: "error"
            });
          } else if (data.code === "2002001") {
            //未激活
            this.isActive = false;
          } else {
            this.$message({
              message: data ? data.message : "服务器忙，请稍后再试",
              type: "error"
            });
          }
        },
        () => {
          this.loading = false;
          this.$message({
            message: this.getMessageByIllegalType(NETWORK_ERROR),
            type: "error"
          });
        }
      );
    },
    checkPhone(token) {
      checkPhone(token).then(
        ({ data }) => {
          if (data.code === 200) {
            if (data.body == "USABLE" || data.body == "DISABLED") {
              this.$router.push({ name: "Welcome" });
            } else {
              this.loading = false;
              // this.isActive = true;
              this.$message({
                message: "您的账号异常,请联系客服处理",
                type: "error"
              });
            }
          }
        },
        error => {
          let message = "服务器忙，请稍后再试";
          if (error && error.response && error.response.data) {
            message = error.response.data.message || message;
          }
          this.loading = false;
          this.$message({
            message,
            type: "error"
          });
        }
      );
    },
    handlePasswordChange(password) {
      if (password) {
        this.$refs.password.$refs.input.classList.remove("error");
      }
    },
    //获取验证码
    handleCode() {
      const phone = this.login.phone;
      this.sendCode(LOGIN, phone);
    },
    //监听短信验证码
    handleCodeChange(code) {
      if (code) {
        this.$refs.phoneCode.$refs.input.classList.remove("error");
      }
    },
    //发送验证码
    sendCode(usage, phone) {
      sendCode(usage, phone)
        .then(({ data }) => {
          if (data.code == 200) {
            this.countDown(60);
            this.$message({
              message: this.getMessageByIllegalType(SEND_CODE_SUCCESS),
              type: "success"
            });
          } else {
            this.$message({
              message: data.message,
              type: "error"
            });
          }
        })
        .catch(() => {
          this.$message({
            message: this.getMessageByIllegalType(NETWORK_ERROR),
            type: "error"
          });
        });
    },
    //验证码倒计时
    countDown(sec) {
      if (sec >= 0) {
        this.disabledCode = true;
        this.btnCountDown = `剩余${sec}s`;
        setTimeout(() => {
          this.countDown(--sec);
        }, 1000);
      } else {
        this.disabledCode = false;
        this.btnCountDown = "";
      }
    },
    getMessageByIllegalType(type) {
      let msg = "";
      switch (type) {
        case ILLEGAL_PHONE:
          msg = "请输入正确的手机号";
          break;
        case NULL_PASSWORD:
          msg = "请输入密码";
          break;
        case NULL_CODE:
          msg = "请输入验证码";
          break;
        case SEND_CODE_SUCCESS:
          msg = "发送成功";
          break;
        case IS_CHECKING:
          msg = "正在检测账号安全";
          break;
        case NO_AUTHORITY:
          msg = "没有系统权限";
          break;
        case NOT_ACTIVATED:
          msg = "尚未注册";
          break;
        case NETWORK_ERROR:
          msg = "您的网络有问题，请稍后再试";
          break;
        case PASSWORD_ERROR:
          msg = "密码错误";
          break;
        default:
          msg = type;
          break;
      }
      return msg;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
