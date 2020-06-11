<template>
  <div class="wym_box">
    <!-- 登录页面 -->
    <el-form
      label-position="right"
      label-width="60px"
      class="login"
      :model="ruleForm"
      :rules="rules"
      ref="login"
      @submit.native.prevent
    >
        
      <div class="wym_login">
        <h2>用户登录</h2>
      </div>

      <el-form-item label="帐号" prop="username">
        <el-input v-model="ruleForm.username" type="text"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>

      <div class="form-btn">
        <el-button type="primary" @click.prevent="gohome">登录</el-button>
      </div>

    </el-form>
  </div>
</template>
<script>
// 引入封装组件
import {login} from '@/http/api'
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      // 验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3到 6 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    gohome() {
      this.$refs["login"].validate(async valid => {
        //表单通过validate方法实现整体表单，其中valid为true代表所有验证规则通过,否则报错
        if (valid) {
          //调用封装的login方法
         const result = await login(this.ruleForm)
         let {flag}=result;
         if(flag ===2) {
           this.$router.push({ name: "Home" });
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

.wym_box {
  background: #323a4e;
  height: 100%;
}

.login {
  width: 30%;
  height: 40%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  background: #fff;
  padding: 30px 20px 10px 20px;
  border-radius: 10px;
}

.wym_login {
  line-height: 40px;
}

@media screen and (max-width: 850px) {
  .login {
    width: 400px;
  }
}


</style>