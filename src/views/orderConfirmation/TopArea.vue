<template>
  <div class="top">
    <div class="top__header">
      <div class="top__header__back iconfont" @click="handleBack">&#xe6db;</div>
      确认订单
    </div>
    <div class="top__address">
      <div class="top__address__title">收货地址</div>
      <div class="top__address__address">
        {{ address.city }}{{ address.hourse }}
      </div>
      <div class="top__address__info">
        <span class="top__address__info__name">{{ address.consignee }}</span>
        <span class="top__address__info__phone">{{ address.phone }}</span>
      </div>
      <div class="top__address__icon iconfont" @click="showAddressList(true)">
        &#xe6aa;
      </div>
    </div>
  </div>
  <div v-show="isShow">
    <AddressList
      @show-address-list="showAddressList"
      :orderAddress="address"
      @update-address="updateAddress"
    />
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { get } from '../../utils/request';
import AddressList from './AddressList.vue';
import { useBackRouterEffect } from '../..//effects/backEffect';
import { useShowAddressListEffect } from './showAddressListEffect';
// import { handleAddressGet } from '../../effects/addressEffect';

const useAddressEffect = () => {
  const store = useStore();
  const data = reactive({ address: {} });

  const getOrderAddress = async () => {
    // 从 localStorage 中获取 orderAddress
    const { orderAddress } = localStorage;
    if (orderAddress) {
      data.address = JSON.parse(orderAddress);
    } else {
      const result = await get('/api/user/address/1');
      if (result?.errno === 0 && result?.data) {
        data.address = result.data;
        // 使用 store 保存 orderAddress
        store.commit('changeOrderAddress', { orderAddress: result.data });
      }
    }
  };

  const updateAddress = (address) => {
    data.address = address;
    // 使用 store 保存 orderAddress
    store.commit('changeOrderAddress', { orderAddress: address });
  };

  const { address } = toRefs(data);

  return { address, getOrderAddress, updateAddress };
};

export default {
  name: 'TopArea',
  components: { AddressList },
  setup() {
    const isShow = ref(false);
    const { handleBack } = useBackRouterEffect();
    const { address, getOrderAddress, updateAddress } = useAddressEffect();
    const { showAddressList } = useShowAddressListEffect(isShow);

    watchEffect(() => {
      getOrderAddress();
    });

    return {
      address,
      handleBack,
      isShow,
      showAddressList,
      getOrderAddress,
      updateAddress
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  &__header {
    position: relative;
    padding-top: 0.2rem;
    line-height: 0.24rem;
    color: $bgcolor;
    text-align: center;
    font-size: 0.16rem;
    &__back {
      position: absolute;
      left: 0.18rem;
      font-size: 0.22rem;
    }
  }
  &__address {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background-color: $bgcolor;
    border-radius: 0.04rem;
    &__title {
      line-height: 0.22rem;
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &__address {
      line-height: 0.2rem;
      padding: 0 0.4rem 0 0.16rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
    }
    &__info {
      padding: 0.06rem 0 0 0.16rem;
      &__name {
        margin-right: 0.06rem;
        line-height: 0.18rem;
        font-size: 0.12rem;
        color: $medium-fontcolor;
      }
    }
    &__icon {
      position: absolute;
      right: 0.16rem;
      top: 0.5rem;
      color: $medium-fontcolor;
      font-size: 0.2rem;
      line-height: 0.2rem;
    }
  }
}
</style>
