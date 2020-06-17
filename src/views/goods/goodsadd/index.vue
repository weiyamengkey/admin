<template>
  <div>
    <my-brand level1="商品管理" level2="商品添加"></my-brand>
    <el-card class="mt20">
      <el-alert title="消息提示的文案" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条 -->
      <el-steps class="mt20" align-center :active="active*1" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>

      <!-- tab标签页 -->
      <el-form
        label-position="top"
        :model="goodsForm"
        label-width="80px"
        style="height:400px;overflow:auto"
      >
        <el-tabs class="mt20" v-model="active" tab-position="left" @tab-click="tabChange">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称">
              <el-input v-model="goodsForm.goods_name"></el-input>
            </el-form-item>

            <el-form-item label="商品价格">
              <el-input v-model.number="goodsForm.goods_price"></el-input>
            </el-form-item>

            <el-form-item label="商品重量">
              <el-input v-model.number="goodsForm.goods_weight"></el-input>
            </el-form-item>

            <el-form-item label="商品数量">
              <el-input v-model.number="goodsForm.goods_number"></el-input>
            </el-form-item>

            <el-form-item label="商品分类">
                {{ selectOption }}
              <el-cascader
                v-model="selectOption"
                :options="options"
                :props="defaultProps"
                @change="handleChange"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-for="(item,index) in dyparams" :key="index">
              <el-checkbox-group v-model="checkList">
                <el-checkbox :label="item2" v-for="(item2,index) in item.attr_vals" :key="index"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="(item,index) in staticParams" :key="index">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- 图片上传 -->
            <el-form-item label="名称">
              <el-upload
                action="https://www.liulongbin.top:8888/api/private/v1/upload"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                multiple
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
               <el-form-item>
                   <quill-editor v-model="goodsForm.goods_introduce"></quill-editor>
                   <el-button type="primary" class="mt20" @click="addGoods">添加商品</el-button>
               </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>

      <!-- 
            <el-form-item label="名称">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
      -->
    </el-card>
  </div>
</template>
<script>
import { getGoodsCate, getCateIdAttribute,addGoods } from "@/http/api";

//注意，富文西编辑器如果多个页面使用，要单独封装成一个富组件引入来使用，我这里就不封装了
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'


export default {
  name: "goodsadd",
  data() {
    return {
      checkList: [],
      active: 0,
      /**
       * goods_name商品名称不能为空
       * goods_price价格不能为空
       * goods_number数量不能为空
       * goods_weight重量不能为空
       * goods_introduce介绍可以为空
       * pics上传的图片临时路径（对象）可以为空
       *
       * 
       * attrs商品的参数（数组），包含 `动态参数` 和 `静态属性`可以为空
       * goods_cat以为','分割的分类列表不能为空
       */

      goodsForm: {
        goods_name: "",
        goods_cat: "",
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce:'',
        //pics:[{pic:'上传的图片临时地址'},{pic:'上传的地址2'}],
        pics: [],
        /**
         * atrrs:[{attr_id:111,attr_vals:2345}] 
         */
        attrs: [] //动态+静态参数组成一个新数组，一起提交给后台
      },
      //添加商品分类相关数据
      options: [], //数据源
      selectOption: [], //选定的三级联动数组
      defaultProps: {
        //配置三级联动key
        expandTrigger: "hover", //展现方式，鼠标经过hover,click:点击
        label: "cat_name", //指定要显示的标签名
        value: "cat_id", //指定级别菜单的唯一标识
        children: "children" //指定子级菜单的属性名
      },
      //商品的动态参数变量
      dyparams: [],
      //商品的静态参数变量
      staticParams: [],
      //文件上传用的请求头
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
      /**
       * 添加商品，提交数据
       */
    async addGoods() {
        this.goodsForm.goods_cat=this.selectOption.join(',')
        let parmas1=this.dyparams.map(item=>({attr_id:item.attr_id,attr_value:item.attr_vals}))
        let parmas2=this.staticParams.map(item=>({attr_id:item.attr_id,attr_value:item.attr_vals}))
        this.goodsForm.attrs=[...parmas1,...parmas2]
        this.goodsForm.attrs.forEach(item=>{
            item.attr_value=item.attr_value+"";
            
        })

        //调用添加商品接口提交数据
        const res=await addGoods(this.goodsForm)
        console.log('this.goodsForm：：',JSON.stringify(this.goodsForm))
        console.log('返回的结果res：：',res)


    },
    /**
     * 文件上传相关方法
     */
    //图片预览
    handlePreview(file) {
      console.log("图片预览", file);
    },
    //图片删除
    handleRemove(file) {
      console.log("图片删除", file);

      // console.log(this.goodsForm.pics)
      //删除图片的同时，要删除goodsForm.pics数组中指定的图片地址
      //删除数组中图片思路：
      //1.通过删除的file参数找到要删除的图片路径
      let delpicurl = file.response.data.tmp_path;
      //2.通过找到的图片路径遍历this.goodsForm.pics找到要删除的图片索引

      //this.goodsForm.picspics
      //[{pic:'上传的图片临时地址'},{pic:'上传的地址2'}],
      let index = this.goodsForm.pics.findIndex((item, index) => {
        return item.pic === delpicurl;
      });
      //3.找以下标通过splice方法再删除数组中指定元素
      this.goodsForm.pics.splice(index, 1);

      console.log(this.goodsForm.pics);
    },
    //图片上传成功
    handleSuccess(file) {
      console.log("图片上传成功", file.data.tmp_path);
      let imgurl = file.data.tmp_path;
      this.goodsForm.pics.push({ pic: imgurl });
      console.log(this.goodsForm.pics);
    },

    /**
     * 监听tab点击时触发的回调
     */
    async tabChange() {
      // console.log('click:',this.active)
      if (this.active === "1") {
        if (this.selectOption.length !== 3) {
          this.$message({
            message: "请您先选择三级分类后，再设置商品参数",
            type: "warning"
          });
          return;
        }
        //调商品动态分类参数接口
        const cat_id = this.selectOption[2];
        const res = await getCateIdAttribute(cat_id);
        console.log("针对分类获取匹配的参数：", res);
        this.dyparams = res.result;

        let tempArr = [];
        this.dyparams.forEach((item, index) => {
          //将字符串按空白分隔的形式切割成数组
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.split(/\s+/g);
          tempArr.push(...item.attr_vals);
        });
        this.checkList = tempArr;
      } else if (this.active === "2") {
        if (this.selectOption.length !== 3) {
          this.$message({
            message: "请您先选择三级分类后，再设置商品参数",
            type: "warning"
          });
          return;
        }

        //调取商品静态参数的接口

        const cat_id = this.selectOption[2];
        const res = await getCateIdAttribute(cat_id, "only");
        // console.log('商品的静态参数属性：',res)
        this.staticParams = res.result;
      } else if (this.active === "3") {
        if (this.selectOption.length !== 3) {
          this.$message({
            message: "请您先选择三级分类后，再设置商品参数",
            type: "warning"
          });
          return;
        }
        //图片上传不用调axios
      } else if (this.active === "4") {
        if (this.selectOption.length !== 3) {
          this.$message({
            message: "请您先选择三级分类后，再设置商品参数",
            type: "warning"
          });
          return;
        }
      }
    },
    handleChange(e) {
      console.log("e:", e);
    },
    async getGoodsCate() {
      //调取分类接口
      const res = await getGoodsCate();
      console.log("res:", res);
      this.options = res.result;
    }
  },
  components:{ quillEditor}

};
</script>

<style lang="scss">
.ql-editor {
    height: 220px;
}
</style>