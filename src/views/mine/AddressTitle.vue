<template>
  <div class="title">
    <div class="title__back">
      <span class="title__back__icon iconfont" @click="handleBack">&#xe6db;</span>
    </div>
    <span class="title__content">{{titleInfo.title}}收货地址</span>
    <div class="title__save">
      <span
        class="title__save__btn"
        @click="() => handleAddressClick(titleInfo.btnAction, handleAddressSave)"
      >{{titleInfo.btn}}</span>
    </div>
  </div>
  <Toast v-if="show" :message="toastMessage" />
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { get, post } from '../../utils/request';
import { useBackRouterEffect } from '../../effects/backEffect';
import Toast, { useToastEffect } from '../../components/Toast';

// 头部信息相关逻辑
const useTitleInfoEffect = (props, context) => {
  const titleInfo = {};

  if (props.addressAction === 'new') {
    titleInfo.title = '新建';
    titleInfo.btn = '保存';
    titleInfo.btnAction = 'save';
  } else if (props.addressAction === 'edit') {
    titleInfo.title = '编辑';
    titleInfo.btn = '保存';
    titleInfo.btnAction = 'save';
  } else if (props.addressAction === 'manage') {
    titleInfo.title = '管理';
    titleInfo.btn = '新建';
    titleInfo.btnAction = 'jump';
  }

  return { titleInfo };
};

// 按钮相关逻辑
const useBtnEffect = () => {
  const router = useRouter();
  const handleAddressClick = (btnAction, handleAddressSave) => {
    if (btnAction === 'save') {
      handleAddressSave();
    } else if (btnAction === 'jump') {
      router.push({ name: 'NewAddress' });
    }
  };
  return { handleAddressClick };
};

// 地址相关逻辑
const useAddressEffect = (props, context, showToast) => {
  // 从本地缓存获取用户 id
  const { id } = localStorage;
  const store = useStore();

  const handleAddressGet = async () => {
    try {
      const result = await get('/api/address/list', {
        id
      });
      if (result?.errno === 0 && result?.data) {
        const addressList = result.data.addressList;
        return addressList;
      }
    } catch (e) {
      showToast('请求失败');
    }
  };

  const handleAddressSave = async () => {
    let { address } = localStorage;
    address = JSON.parse(address);

    if (!address.city.trim()) {
      showToast('请输入城市');
      return;
    } else if (!address.hourse.trim()) {
      showToast('请输入小区');
      return;
    } else if (!address.floor.trim()) {
      showToast('请输入门牌号');
    } else if (!address.consignee.trim()) {
      showToast('请输入收货人');
    } else if (!String(address.phone).trim()) {
      showToast('请输入联系电话');
      return;
    }

    try {
      const result = await post('/api/address/register', {
        id: id,
        city: address.city,
        hourse: address.hourse,
        floor: address.floor,
        consignee: address.consignee,
        phone: address.phone
      });
      if (result?.errno === 0) {
        store.commit('changeAddressItemInfo', {
          props
        });
        showToast('保存成功');
      } else {
        showToast('保存失败');
      }
    } catch (e) {
      showToast('请求失败');
    }
  };

  return {
    handleAddressGet,
    handleAddressSave
  };
};

export default {
  name: 'AddressTitle',
  props: ['addressAction', 'addressId'],
  components: { Toast },
  setup(props, context) {
    const { handleBack } = useBackRouterEffect();
    const { titleInfo } = useTitleInfoEffect(props, context);
    const { show, toastMessage, showToast } = useToastEffect();

    const { handleAddressGet, handleAddressSave } = useAddressEffect(
      props,
      context,
      showToast
    );

    const { handleAddressClick } = useBtnEffect();

    return {
      show,
      toastMessage,
      showToast,
      handleAddressGet,
      handleAddressSave,
      titleInfo,
      handleBack,
      handleAddressClick
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.title {
  display: flex;
  height: 0.44rem;
  padding: 0 0.18rem;
  justify-content: space-between;
  background-color: $bgcolor;
  &__back {
    flex: 1;
    display: flex;
    justify-content: left;
    align-items: center;
    color: #b6b6b6;
    font-size: 0.24rem;
  }
  &__content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.22rem;
    padding: 0.11rem 0;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &__save {
    flex: 1;
    display: flex;
    justify-content: right;
    align-items: center;
    font-size: 0.14rem;
    height: 0.2rem;
    padding: 0.12rem 0;
  }
}
</style>
