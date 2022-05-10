<template>
  <div class="title">D2R 우버디아 현황</div>

  <div class="content">
    <div class="server">
      <div class="server_title">
        <el-icon class="title_icon"><caret-right /></el-icon>
        Ladder - Asia
      </div>
      <div class="uber_bar">
        <el-progress :percentage="percentage" :text-inside="true" :stroke-width="30" :color="colors">
          <span>{{ value }} / {{ max }}</span>
        </el-progress>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHome',
  data () {
    return {
      value: 6,
      max: 6,
      colors: [
        { color: '#1989fa', percentage: 50 },
        { color: '#e6a23c', percentage: 70 },
        { color: '#f56c6c', percentage: 100 },
      ]
    }
  },
  computed: {
    percentage () {
      return (this.value / this.max * 100).toFixed(2)
    }
  }
}
</script>
<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e2e2;
  text-align: center;
  color: #e2e2e2;
}

.content {
  position: relative;
  padding: 0.5rem 1rem;
}

.content .server {
  margin-top: 1rem;
}

.content .server .server_title {
  font-size: 1rem;
  font-weight: bold;
  color: #e2e2e2;
  padding-bottom: 0.5rem;
}

.content .server .server_title .title_icon {
  top: 0.1rem;
}
</style>
