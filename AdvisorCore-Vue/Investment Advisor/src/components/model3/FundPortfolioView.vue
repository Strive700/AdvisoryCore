<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const selectedIndexInfo = ref<any[]>([])
const fundDetails = ref<any[]>([])

onMounted(async () => {
  if (route.query.selectedIndexInfo) {
    try {
      selectedIndexInfo.value = JSON.parse(decodeURIComponent(route.query.selectedIndexInfo as string))
      // 遍历每个指数，查询基金详细信息
      const allFunds: any[] = []
      for (const idx of selectedIndexInfo.value) {
        if (idx.name) {
          try {
            const res = await axios.get(`http://localhost:8080/fundIndexMapping/fundIdsByIndexName`, {
              params: { indexName: idx.name }
            })
            if (Array.isArray(res.data)) {
              allFunds.push(...res.data)
            }
          } catch (e) {
            // 可选：处理单个指数查询失败
          }
        }
      }
      fundDetails.value = allFunds
    } catch (e) {
      selectedIndexInfo.value = []
      fundDetails.value = []
    }
  }
})
</script>
