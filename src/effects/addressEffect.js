import { get } from '../utils/request';

export const handleAddressGet = async (username, showToast) => {
  try {
    const result = await get('/api/user/address', {
      username
    });
    if (result?.errno === 0 && result?.data) {
      const addressList = result.data;
      return addressList;
    }
  } catch (e) {
    showToast('请求失败');
  }
};
