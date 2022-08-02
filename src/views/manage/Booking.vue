<template lang="html">
  <div>
    <v-header
      :has-button="false"
      title-icon="booking"
      :button-text="$t('button.add')"
      title-text="Quản lý đơn hàng"
    />

    <main class="content-main-container">
      <!-- <h2 class="my-[1em] text-lg font-500">Khoảng thời gian</h2> -->
      <!-- <el-date-picker
        v-model="dateSearch"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
      <el-button
        class="btn--green btn ml-[1em]"
        icon="el-icon-circle-check"
        @click="onSearch"
      >Tìm kiếm</el-button> -->

      <div class="box-shadow bg-white rounded-lg p-[1em]">
        <div class="flex ">
          <div class="flex box-shadow-1 rounded-md w-fit px-[16px] py-[0.5rem] mr-[0.5rem]">
            <v-icon icon-class="cart" class="text-[80px] mr-[8px]" />
            <div>
              <p class="text-lg font-bold text-[#3a3a3a] mb-[0.5em]">
                Tổng số đơn hàng
              </p>
              <p class="text-center text-[#00b5ad] text-[30px]">{{ numberOrder }}</p>
            </div>
          </div>
          <div class="flex box-shadow-1 rounded-md w-fit px-[16px] py-[0.5rem]">
            <v-icon icon-class="cart" class="text-[80px] mr-[8px]" />
            <div>
              <p class="text-lg font-bold text-[#3a3a3a] mb-[0.5em]">
                Doanh thu hệ thống
              </p>
              <p class="text-center text-[#00b5ad] text-[30px]">{{ money | formatMoney }}</p>
            </div>
          </div>
        </div>
        <h2 class="my-[1em] text-lg font-500">Thông tin chi tiết</h2>

        <v-table
          :table-data="results"
          :columns="cols"
          :limit="limit"
          :page="page"
          :total="total"
        >
          <template slot="status">
            <div
              class="text-center bg-[#00b5ad] text-[white] rounded-lg py-[0.5rem] w-[85%] mx-auto"
            >
              Đã thanh toán
            </div>
          </template>
          <template slot="action">
            <div class="text-center">
              <el-button type="primary" icon="el-icon-check">Pay</el-button>
            </div>
          </template>
        </v-table>
      </div>
    </main>
  </div>
</template>
<script>
import { getOrderAdmin } from '@/apis/order'
export default {
  data() {
    return {
      loading: false,
      isOpen: false,
      total: 1,
      page: 1,
      limit: 20,
      numberOrder: 0,
      gas: 10,
      money: 0,
      results: [
      ],

      cols: [
        {
          prop: 'station',
          label: 'Sân',
          minWidth: '20'
        },
        // {
        //   prop: 'name',
        //   label: 'Người đặt vé',
        //   minWidth: '15'
        // },
        {
          prop: 'phoneNumber',
          label: 'Số điện thoại',
          minWidth: '15'
        },
        {
          prop: 'time',
          label: 'Thời gian sử dụng',
          minWidth: '15'
        },
        {
          prop: 'money',
          label: 'Số tiền',
          minWidth: '10'
        },

        {
          prop: 'created_at',
          label: 'Ngày đặt',
          minWidth: '10'
        }
      ]
    }
  },
  async created() {
    let money = 0
    const orders = await getOrderAdmin()
    this.results = orders.data.map((order) => {
      money = Number(money) + Number(order.totalPrice)
      console.log(order)
      return {
        station: order.place.name + ' ' + order.place.address,
        phoneNumber: order.phoneNumber,
        money: order.money,
        created_at: order.createAt,
        time:
          order.timeBlocks[0]?.timeStart + '-' + order.timeBlocks[0]?.dayOrder
      }
    })
    console.log(money)
    console.log(orders.data.length)
    this.money = money
    this.numberOrder = orders.data.length
  }
}
</script>
<style lang=""></style>
