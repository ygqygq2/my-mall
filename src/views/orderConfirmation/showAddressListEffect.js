export const useShowAddressListEffect = (isShow) => {
  const showAddressList = (sta) => {
    isShow.value = sta;
  };

  return { showAddressList };
};
