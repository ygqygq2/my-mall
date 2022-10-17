<template>
  <div class="top">
    <div class="top__header">
      <div class="top__header__back iconfont" @click="handleClick">
        &#xe6db;
      </div>
      收货地址
    </div>
  </div>
  <div class="address">
    <div
      class="address__item"
      v-for="(item, index) in addressList"
      :key="index"
      @click="setAddressSelected(item)"
    >
      <div class="address__item__left">
        <span
          class="address__item__icon iconfont"
          :class="{ address__item__icon__select: isSelected(item._id) }"
          v-html="isSelected(item._id) ? '&#xe70f;' : '&#xe61a;'"
        ></span>
      </div>
      <div class="address__item__right">
        <div class="address__item__position">
          {{ item.city }} {{ item.hourse }} {{ item.floor }}
        </div>
        <div class="address__item__contact">
          <span class="address__item__contact__name">{{ item.consignee }}</span>
          <span class="address__item__contact__phone">
            {{ showPhone(item.phone) }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="address__new">
    <!-- <div class="address__new__btn">新建收货地址</div> -->
  </div>
  <Toast v-if="show" :message="toastMessage" />
</template>

<script>
import { ref, onMounted, reactive, toRefs } from 'vue';
// import { useStore } from 'vuex';
import { handleAddressGet } from '../../effects/addressEffect';
import Toast, { useToastEffect } from '../../components/Toast';

const useAddressEffect = (props, context, showToast) => {
  // 从本地缓存获取用户 id
  const { username } = localStorage;

  return {
    username,
    handleAddressGet
  };
};

const usePhoneEffect = () => {
  const showPhone = (phone) => {
    const phoneString = phone.toString();
    if (phoneString.length === 11) {
      const reg = /^(\d{3})\d{4}(\d{4})$/;
      return phoneString.replace(reg, '$1****$2');
    }
  };

  return { showPhone };
};

export default {
  name: '',
  emits: ['show-address-list', 'update-address'],
  props: ['orderAddress'],
  components: { Toast },
  setup(props, { emit }, context) {
    const isShow = ref(false);
    const data = reactive({ addressList: [] });
    // const store = useStore();
    const { show, toastMessage, showToast } = useToastEffect();

    const { username, handleAddressGet } = useAddressEffect(
      props,
      context,
      showToast
    );

    // 子组件通知父组件修改 isShow
    const handleClick = () => {
      emit('show-address-list', false);
    };

    // 父组件专过来的 orderAddress 为选中的地址
    const isSelected = (id) => {
      return id === props.orderAddress._id;
    };

    // 点击地址列表中的地址，将地址设置为选中状态
    // const setAddressSelected = (address) => {
    //   store.commit('changeOrderAddress', { orderAddress: address });
    // };
    const setAddressSelected = (address) => {
      // console.log(address);
      emit('update-address', address);
    };

    const { showPhone } = usePhoneEffect();

    onMounted(() => {
      handleAddressGet(username, showToast).then((res) => {
        data.addressList = res;
      });
    });

    const { addressList } = toRefs(data);
    return {
      show,
      toastMessage,
      isShow,
      handleClick,
      addressList,
      showPhone,
      isSelected,
      setAddressSelected
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.top {
  position: absolute;
  /* z-index: 1; */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
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
}

.address {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0.85rem;
  bottom: 0.49rem;
  background-color: $bgcolor;

  &__item {
    display: flex;
    position: relative;
    margin: 0 0.18rem 0.1rem 0.18rem;
    padding: 0.16rem 0.18rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
    border-bottom: 0.01rem solid rgba(232, 233, 235, 0.856);

    &__left {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &__icon {
      font-size: 0.18rem;
      color: #dbdbdb;
      font-weight: bold;
      &__select {
        color: $btn-bgcolor;
      }
    }

    &__right {
      flex: 1;
      margin-left: 0.1rem;
    }
    &__position {
      padding-bottom: 0.06rem;
      background-color: $bgcolor;
      line-height: 0.2rem;
      font-size: 0.16rem;
      font-weight: bold;
      color: $content-fontcolor;
    }
    &__contact {
      color: $medium-fontcolor;
      font-size: 0.14rem;
      &__name {
        margin-right: 0.06rem;
        line-height: 0.18rem;
      }
    }
  }
}

.address__new {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.49rem;
  line-height: 0.49rem;
  background-color: $bgcolor;
  /* &__btn {
    background: linear-gradient(
      135deg,
      #fa2c19 0,
      #fa3f19 45%,
      #fa5919 83%,
      #fa6419 100%
    );
    position: absolute;
    height: 0.4rem;
    line-height: 0.4rem;
    top: 50%;
    margin-top: -0.2rem;
    left: 0.18rem;
    right: 0.18rem;
    border-radius: 0.896rem;
    color: $bgcolor;
    text-align: center;
    font-size: 0.14rem;
  } */
}
</style>
