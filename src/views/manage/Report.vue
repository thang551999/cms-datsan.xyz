<template lang="html">
  <div>
    <v-header
      :has-button="false"
      title-icon="user"
      title-text="Quản lý khiếu nại đơn hàng"
    />
    <div class="content-main-container">
      <div class="bg-white">
        <v-table
          :table-data="results"
          :columns="cols"
          :limit="limit"
          :page="page"
          :total="total"
          @onChangePage="changePage"
        >
          <template #action="{ row }">
            <div class="text-center">
              <el-button
                type="danger"
                icon="el-icon-minus"
                circle
                @click="handleRejectReportOrder(row.id)"
              />
              <el-button
                type="primary"
                icon="el-icon-check"
                circle
                @click="handleAcceptReportOrder(row.id)"
              />
            </div>
          </template>
        </v-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getReportOwner, acceptReportOrder, rejectReportOrder } from '@/apis/order'

export default {
  data() {
    return {
      reports: [],
      loading: false,
      total: 1,
      page: 1,
      limit: 20,
      results: [],

      cols: [
        {
          prop: 'fullName',
          label: 'Người khiếu nại',
          minWidth: '20'
        },
        {
          prop: 'email',
          label: 'Email',
          minWidth: '20'
        },
        {
          prop: 'content',
          label: 'Lý do',
          minWidth: '25'
        },
        {
          prop: 'orderId',
          label: 'Mã đơn hàng',
          minWidth: '25'
        },
        {
          prop: 'content',
          label: 'Nội dung khiếu nại',
          minWidth: '25'
        },
          {
          prop: 'action',
          label: this.$t('label.action'),
          minWidth: '15'
        }
      ]
    }
  },
  async created() {
    await getReportOwner().then((res) => {
      console.log(res)
      const reports = res.data.map((report) => {
        console.log(report)
        return {
          content: report.content,
          orderId: report.order.id,
          email: report.order.customer?.userInfo.email,
          fullName: report.order.customer?.userInfo.fullName,
          phone: report.order.customer?.userInfo.phone
        }
      })
        this.results = reports
    })
  },

  methods: {
    async changePage(page) {
      this.page = page
      await this.getUserList()
    },
    async handleRejectReportOrder(id) {
      await rejectReportOrder(id)
    },
    async handleAcceptReportOrder(id) {
      await acceptReportOrder(id)
    }
  }
}
</script>
<style lang="scss"></style>
