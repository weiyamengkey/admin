<template>
  <div>
    <!-- 面包屑导航 -->
    <my-brand level1="权限管理" level2="权限列表"></my-brand>
    <el-card class="mt20">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index"  label="#" width="80"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="path" label="路径" width="180"></el-table-column>
        <el-table-column  label="等级">

             <template slot-scope="scope">
                <el-tag :type="typesArr[scope.row.level]"> 
                    {{ scope.row.level | levelFn }}
                </el-tag>
               
             </template>

        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import {getRightList} from '@/http/api'
export default {
  name: "rightlist",
  data(){
      return {
          tableData:[],
          typesArr:['success','warning','danger']
      }
  },
  created() {
     this.getRightList() 
  },
  methods:{
      //获取权限列表
      async getRightList() {
          //调取权限列表接口
        const res=await getRightList()
        this.tableData=res.result;
      }
  }
};
</script>

<style lang="scss">
.mt20 {
  margin-top: 20px;
}
</style>