<template>
  <div>
    <my-brand level1="权限管理" level2="角色列表"></my-brand>
    <el-card class="mt20">
      <el-card class="el_card_box">
        <!-- 1.搜索框，添加用户按钮 -->
        <el-input
          placeholder="请输入内容"
          class="searchInput"
          clearable
        ></el-input>
        <el-button type="primary" class="adduser">添加用户</el-button>

        <!-- 2.添加用户表格 -->
        <el-table
          :data="tableData"
          class="user_table"
          border
          style="width: 100%"
        >
          <el-table-column type="expand" width="140">
            <template slot-scope="scope">
              <el-row v-for="(item, index) in scope.row.children" :key="index">
                <el-col :span="4">
                  <el-tag closable>{{ item.authName }}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-row
                    v-for="(item2, index2) in item.children"
                    :key="index2"
                  >
                    <el-col :span="4">
                      <el-tag closable class="m5" type="success">{{
                        item2.authName
                      }}</el-tag>
                    </el-col>
                    <el-col :span="20">
                      <el-tag
                        closable
                        class="m5"
                        v-for="(item3, index3) in item2.children"
                        type="warning"
                        :key="index3"
                        @close="deleteRights"
                        >{{ item3.authName }}</el-tag
                      >
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

              <el-tag v-if="!scope.row.children.length"
                >目前该角色暂无权限</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column type="index" label="#" width="40"></el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名称"
            width="180"
          ></el-table-column>
          <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-row>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  size="mini"
                  @click="showUserDialog(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteUserShowDia(scope.row)"
                  circle
                  size="mini"
                ></el-button>
                <el-button
                  type="warning"
                  icon="el-icon-star-off"
                  @click="setRightShowDia(scope.row)"
                  circle
                  size="mini"
                ></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分配权限弹模型 -->
        <el-dialog
          title="分配权限"
          :visible.sync="dialogVisibleRight"
          width="40%"
        >
          <!-- 
            :data="data" 指定数据源
            show-checkbox 指定复选框模式
            node-key="id"  指定树形结构的id标识
            :default-expanded-keys="[1, 3]" 指定默认展开的id
            :default-checked-keys="[5]"  指定默认选中的id
            :props="defaultProps" 指定label和children的key
         -->
          <el-tree
            ref="roletree"
            :data="rightTree"
            show-checkbox
            node-key="id"
            :default-checked-keys="checkArr"
            :props="defaultProps"
            default-expand-all
          ></el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleRight = false">取 消</el-button>
            <el-button type="primary" @click="setRightsToRole">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
    </el-card>
  </div>
</template>
<script>
import { getRoleList, getRightTree, setRightsToRole } from "@/http/api";
import {treeToList} from '@/utils'
export default {
  name: "rolelist",
  data() {
    return {
      dialogVisibleRight: false,
      tableData: [],
      rightTree: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      currrentRoleId: -1,
      //打开树形结构默认选中项
      checkArr: [] //通过获取得到当前树形id组成的数组
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    /**
     * 将树形结构的选中的权限赋值给某个角色
     */
    async setRightsToRole() {
      //setRightsToRole(roleId,data)
      //roleid怎么获取 roleId 角色id
      //data怎么获取：data 是全部或部分选中的id  '1,2,2,3,5,6,7,7,8'

      //则返回目前半选中的节点所组成的数组
      const arr1 = this.$refs.roletree.getHalfCheckedKeys();

      //全部选中
      const arr2 = this.$refs.roletree.getCheckedKeys();

      //合并全部选中和部分选中的id节点
      const resultArr = [...arr1, ...arr2].join(",");

      //调分配权限给角色的方法
      const res = await setRightsToRole(this.currrentRoleId, {
        rids: resultArr
      });
      console.log("调分配权限给角色的返回：", res);
      this.getRoleList()
      this.dialogVisibleRight = false;
      
    },
    /**
     * 打开分配权限弹框
     */
    async setRightShowDia(role) {
      console.log("当前角色权限：", role);

      //封装一个获取id的函数
      const checkArr=treeToList(role);
      console.log('checkArr:',checkArr)
      this.checkArr=checkArr;

      //则返回目前半选中的节点所组成的数组
      // const arr1=this.$refs.roletree.getHalfCheckedKeys()

      this.currrentRoleId = role.id;
      //调权限列表树形结构接口
      const res = await getRightTree();
      console.log("树形：", res);
      this.rightTree = res.result;

      this.dialogVisibleRight = true;
    },
    deleteRights() {
      console.log("删除权限！");
    },
    async getRoleList() {
      //调用角色列表
      const res = await getRoleList();

      // console.log("角色列表：：", res);
      this.tableData = res.result;
    }
  }
};
</script>

<style lang="scss" scoped>
.searchInput {
  width: 300px;
}

.adduser {
  margin-left: 20px;
}

.user_table {
  margin-top: 20px;
}
</style>
