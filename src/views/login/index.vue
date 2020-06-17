<template>
  <div class="form_box">
    <el-form
      label-position="right"
      label-width="60px"
      class="login_Form"
      :model="ruleForm"
      :rules="rules"
      ref="login_Form"
      @submit.native.prevent
    >
      <div class="form-title">
        <h2>用户登录</h2>
      </div>
      <el-form-item label="帐号" prop="username">
        <el-input v-model="ruleForm.username" type="text"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>

      <div class="form-btn">
        <el-button type="primary" @click.prevent="goLogin">登录</el-button>
        <el-button type="info">重置</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { login } from "@/http/api";
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 25, message: "长度在 6到 25 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 25, message: "长度在 6 到 25 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    goLogin() {
      this.$refs["login_Form"].validate(async valid => {
        //表单通过validate方法实现整体表单，其中valid为true代表所有验证规则通过,否则报错
        if (valid) {
          //调用封装的login方法
          const result = await login(this.ruleForm);
          console.log('登录结果：',result)
          let { flag } = result;
          if (flag === 2) {
            //登录成功，则中转回上次访问的页面
           // this.$router.push('/home');
            this.$router.push(this.$route.query.redirect)
          }
        } else {
          //登录失败，给出失败的提示
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login_Form {
  width: 30%;
  height: 40%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  // text-align: center;
  background: #fff;
  padding: 30px 20px 10px 20px;
  border-radius: 10px;
}

.form-title {
  line-height: 40px;
}

@media screen and (max-width: 850px) {
  .login_Form {
    width: 400px;
  }
}

.form_box {
  background: #031134;
  height: 100%;
}
</style>