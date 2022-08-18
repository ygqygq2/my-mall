import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state;
  const cartListString = JSON.stringify(cartList);
  localStorage.cartList = cartListString;
}

const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList);
  } catch (e) {
    return {}
  }
}

const setLocalAddressList = (state) => {
  const { addressList } = state;
  const addressListString = JSON.stringify(addressList);
  localStorage.addressList = addressListString;
}

const getLocalAddressList = () => {
  try {
    return JSON.parse(localStorage.addressList);
  } catch (e) {
    return {}
  }
}

const setLocalAddress = (state) => {
  const { address } = state;
  const addressString = JSON.stringify(address);
  localStorage.address = addressString;
}

const getLocalAddress = () => {
  try {
    return JSON.parse(localStorage.address);
  } catch (e) {
    return {}
  }
}

export default createStore({
  state: {
    cartList: getLocalCartList(),
    // cartList: {
    // 第一层级： 商铺 id
    // 第二层级： 商铺名、商品列表
    // shopId: {
    //   shopName: '沃尔玛',
    //   productList: {
    //     productId: {
    //       _id: '1',
    //       name: '番茄250g/份',
    //       imgUrl: '../../assets/images/home/tomato.png',
    //       sales: 10,
    //       price: 33.6,
    //       oldPrice: 39.6,
    //       count: 2
    //     }
    //   }
    // }
    addressList: getLocalAddressList(),
    // id: '1069643013',
    // addressList: [{
    //     _id: '1',
    //     city: '北京',
    //     hourse: '北理工大学国防科技园',
    //     floor: '2号楼10层',
    //     consignee: '小慕',
    //     phone: 18911023277
    //   },
    //   {
    //     _id: '2',
    //     city: '北京',
    //     hourse: '北理工大学国防科技园',
    //     floor: '2号楼13层',
    //     consignee: '小慕',
    //     phone: 18911023277
    //   }
    // ]
    address: getLocalAddress()
  },
  getters: {
  },
  mutations: {
    // 修改购物车列表信息
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo } = payload;
      let shopInfo = state.cartList[shopId] || { shopName: '', productList: {} };
      if (!shopInfo) { shopInfo = {} }
      let product = shopInfo?.productList[productId];
      if (!product) {
        productInfo.count = 0
        product = productInfo
        setLocalCartList(state);
      }
      product.count = product.count + payload.num;
      if (payload.num > 0) { product.check = true }
      if (product.count < 0) {
        product.count = 0
      }
      shopInfo.productList[productId] = product;
      state.cartList[shopId] = shopInfo;
      setLocalCartList(state);
    },
    // 修改商店名
    changeShopName(state, payload) {
      const { shopId, shopName } = payload;
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} };
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
      setLocalCartList(state);
    },
    // 是否添加商品到购物车
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      const product = state.cartList[shopId].productList[productId];
      product.check = !product.check;
      setLocalCartList(state)
    },
    // 清空购物车
    cleanCartProducts(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId].productList = {};
      setLocalCartList(state);
    },
    // 购物车全选与否
    setCartItemsChecked(state, payload) {
      const { shopId } = payload;
      const products = state.cartList[shopId].productList;
      if (products) {
        for (const key in products) {
          const product = products[key];
          product.check = !product.check;
        }
      }
      setLocalCartList(state);
    },
    // 删除购物车数据
    clearCartData(state, shopId) {
      state.cartList[shopId].productList = {};
    },
    // 添加地址列表
    saveAddressInfo(state, payload) {
      const { addressList } = payload;
      state.addressList = addressList;
      setLocalAddressList(state);
    },
    // 保存编辑时表单地址临时数据
    saveEditAddress(state, payload) {
      const { address } = payload;
      state.address = address;
      setLocalAddress(state);
    },
    // 修改地址列表
    changeAddressItemInfo(state, payload) {
      // id 为用户 id
      const { address, addressList } = state;
      const { props } = payload;

      for (const item of addressList) {
        if (parseInt(item._id, 10) === parseInt(props.addressId, 10)) {
          console.log(item, address)
          Object.assign(item, address);
          break;
        }
      }
      setLocalAddressList(state);
    }
  },
  actions: {
  },
  modules: {
  }
});
