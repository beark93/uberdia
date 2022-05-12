<template>
  <div class="title">D2R 우버디아 현황</div>

  <div class="content">
    <div class="server" v-if="getUberList">
      <div class="lists" v-for="(uberList, index) in getUberList" :key="index">
        <div class="server_title">
          <el-icon class="title_icon"><caret-right /></el-icon>
          {{ uberList.title }}
        </div>
        <div class="uber_bar">
          <el-progress :percentage="uberList.percentage" :text-inside="true" :stroke-width="30" :color="colors">
            <span>{{ uberList.progress }} / 6</span>
          </el-progress>
        </div>
      </div>
    </div>
    <template v-if="!apiData">
      {{ apiData }}
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TheHome',
  data () {
    return {
      colors: [
        { color: '#1989fa', percentage: 50 },
        { color: '#e6a23c', percentage: 70 },
        { color: '#f56c6c', percentage: 100 }
      ],
      apiData: null
    }
  },
  computed: {
    ...mapGetters(['getUberList'])
  },
  methods: {
    ...mapActions(['callUberApi'])
  },
  mounted () {
    this.callUberApi()
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

.content .server .lists {
  margin-bottom: 1rem;
}

.content .server .lists .server_title {
  font-size: 1rem;
  font-weight: bold;
  color: #e2e2e2;
  padding-bottom: 0.5rem;
}

.content .server .lists .server_title .title_icon {
  top: 0.1rem;
}
</style>
