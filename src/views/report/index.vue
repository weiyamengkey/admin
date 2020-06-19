
<template>
  <div>
    <my-brand level1="数据统计" level2="数据报表"></my-brand>
    <el-card class="mt20">
      <div ref="mycart" class="mycart"></div>
    </el-card>
  </div>
</template>

<script>
//按需引入echarts
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
//再引入你需要用到的相关图表模块
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
// 引入拆线图
require("echarts/lib/chart/line");
import { getReportChart } from "@/http/api";
export default {
  name: "report",
  data() {
    return {
      // 图表
      option: {}
    };
  },
  mounted() {
    this.setchart();
  },
  methods: {
    async setchart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.mycart); //后台返回的动态数据
      const res = await getReportChart();
      console.log("返回报表数据", res);
      const option1 = res.result; //固定图表数据
      const option2 = {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        }
      }; // 合并配置项
      this.option = { ...option1, ...option2 }; //生成图表
      myChart.setOption(this.option);
    }
  }
};
</script>
<style lang="scss">
.mycart{
  width: 100%;
  height: 400px;
}
</style>