<template>
  <div class="title">
    D2R Uber Diablo Status
    <el-icon class="reload" @click="uberReload"><RefreshRight /></el-icon>
  </div>

  <div class="content">
    <div class="tab">
      <div class="tab_list" @click="tabChange('1')" :class="(tab === '1') ? 'active' : ''">Ladder</div>
      <div class="tab_list" @click="tabChange('2')" :class="(tab === '2') ? 'active' : ''">Non Ladder</div>
    </div>
    <div class="server" v-if="displayUberList">
      <div class="lists" v-for="(uberList, index) in displayUberList" :key="index">
        <div class="server_title">
          <el-icon class="title_icon"><caret-right /></el-icon>
          {{ uberList.title }}
        </div>
        <div class="uber_bar">
          <el-progress :percentage="uberList.percentage" :text-inside="true" :stroke-width="25" :color="colors">
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
      apiData: null,
      tab: '1'
    }
  },
  computed: {
    ...mapGetters(['getUberList']),
    displayUberList () {
      if (this.getUberList && this.getUberList.length > 0) {
        return this.getUberList.filter(item => item.ladder === this.tab)
      }
      return []
    }
  },
  methods: {
    ...mapActions(['callUberApi', 'clearUberList']),
    tabChange (tab) {
      this.tab = tab
    },
    async uberReload () {
      await this.clearUberList() 
      await this.callUberApi()
    }
  },
  mounted () {
    this.callUberApi()
  }
}
</script>
<style scoped>
.title {
  position: relative;
  font-size: 2rem;
  font-weight: bold;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e2e2;
  text-align: center;
  color: #e2e2e2;
}

.title .reload {
  position: absolute;
  top: 16px;
  right: 18px;
  width: 2rem;
  height: 2rem;
}

.content {
  position: relative;
  padding: 0.5rem 1rem;
}

.content .tab {
  position: relative;
  overflow: auto;
  width: 100%;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
  color: #aaaaaa;
}

.content .tab .tab_list {
  position: relative;
  box-sizing: border-box;
  width: 50%;
  float: left;
  padding: 0.5rem 0;
}

.content .tab .tab_list.active {
  color: #ea2525;
}

.content .tab .tab_list:first-child:after {
  position: absolute;
  top: 50%;
  right: 0px;
  z-index: 1;
  display: block;
  width: 1px;
  height: 25px;
  content: "";
  transform: translateY(-50%);
  background-color: #e2e2e2;
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
