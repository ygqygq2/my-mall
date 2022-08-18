<template>
  <AddressTitle addressAction="manage" ref="RefChilde" />
  <div class="content">
    <div class="content__title">
      <span class="content__title_name">我的收货地址</span>
    </div>
    <div class="content__address" v-for="(item, index) in data.addressList" :key="index">
      <div class="content__address__left">
        <div class="content__address__left__info">
          <span class="content__address__left__name">{{item.consignee}}</span>
          <span class="content__address__left__phone">{{item.phone}}</span>
          <div>{{item.city}} {{item.hourse}} {{item.floor}}</div>
        </div>
      </div>
      <div class="content__address__right">
        <span class="content__address__right__icon iconfont" @click="() => pushAddress(item._id)">&#xe6aa;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AddressTitle from './AddressTitle.vue';

const useHandlePushEffect = () => {
  const router = useRouter();

  const pushAddress = (addressId) => {
    router.push({ path: `/mine/editAddress/${addressId}` });
  };
  return {
    pushAddress
  };
};

export default {
  name: 'ManageAddress',
  components: {
    AddressTitle
  },
  setup() {
    const RefChilde = ref(); // RefChilde 要和子组件上的class名相同
    const store = useStore();
    const data = reactive({
      addressList: []
    });
    const fnCallChild = () => {
      const result = RefChilde.value.handleAddressGet(); // handleAddressGet是子组件里的方法
      return result;
    };

    const saveAddressInfo = (id, addressList) => {
      store.commit('saveAddressInfo', {
        id,
        addressList
      });
    };

    const { pushAddress } = useHandlePushEffect();

    onMounted(() => {
      fnCallChild().then((res) => {
        data.addressList = res;
        const { id } = localStorage;
        saveAddressInfo(id, res);
      });
    });
    return { RefChilde, data, pushAddress };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.content {
  @include backgroud;
  &__title {
    margin: 0.16rem 0.18rem 0.12rem 0.18rem;
    font-size: 0.14rem;
    color: #333;
  }
  &__address {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.18rem 0.1rem 0.18rem;
    padding: 0.16rem 0.18rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
    background-color: $bgcolor;
    border-radius: 0.04rem;
    &__left {
      margin-right: 0.38rem;
      &__info {
        color: $light-fontcolor;
        span {
          display: inline-block;
          margin-bottom: 0.08rem;
        }
      }
      &__name {
        width: 0.9rem;
      }
    }
    &__right {
      &__icon {
        display: inline-block;
        color: $light-fontcolor;
        font-size: 0.16rem;
      }
    }
  }
}
</style>
