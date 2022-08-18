import { reactive } from "vue";
import { useStore } from "vuex";

// 地址相关逻辑
export const useAddressEffect = (props, context) => {
  const store = useStore();
  const address = reactive({
    // _id: '1',
    // city: '北京',
    // hourse: '北理工大学国防科技园',
    // floor: '2号楼10层',
    // consignee: '小慕',
    // phone: 18911023277
    _id: props.addressId,
    city: '',
    hourse: '',
    floor: '',
    consignee: '',
    phone: 0
  });

  // 合并表单数据至 address 对象
  const updateAddress = (data) => {
    Object.assign(address, data);
  };

  // 填充表单
  const fillForm = () => {
    for (const item of store.state.addressList) {
      if (parseInt(item._id, 10) === parseInt(props.addressId, 10)) {
        updateAddress(item)
        break;
      }
    }
  };

  // 发送 address 至 store
  const saveEditAddress = () => {
    store.commit('saveEditAddress', {
      address
    });
  };

  return { address, fillForm, saveEditAddress, updateAddress };
};
