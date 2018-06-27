<template>
<div class="x-bar">
    <div :id="id"
    :option="option"></div>
  </div>
</template>

<script>
import HighCharts from 'highcharts'
export default{
	props: {
    id: {
      type: String
    },
    option: {
      type: Object
    }
  },
   mounted() {
   	HighCharts.setOptions({
   		lang:{
   			resetZoom:"重置"
   		}
   	});
    HighCharts.chart(this.id,this.option)
  }
}
</script>

<style>
</style>