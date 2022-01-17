import Vue from 'vue'
import Router from 'vue-router'
import ModelIver from '@/components/ModelIver'
import EarthTide from '@/components/EarthTide'
import MagMod from '@/components/MagMod'
import PageTable from '@/components/PageTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ModelIver',
      component: ModelIver
    },
    {
      path: '/EarthTide',
      name: 'EarthTide',
      component: EarthTide
    },
    {
      path: '/MagMod IGRF',
      name: 'MagMod',
      component: MagMod
    },
    {
      path: '/test',
      name: 'PageTable',
      component: PageTable
    }
  ]
})
