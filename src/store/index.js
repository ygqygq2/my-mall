import { createStore } from 'vuex';

const setLocalData = (state, data) => {
  const tmpData = state[data];
  const tmpDataString = JSON.stringify(tmpData);
  localStorage[data] = tmpDataString;
};

const getLocalData = (data) => {
  try {
    return JSON.parse(localStorage[data]);
  } catch (e) {
    return {};
  }
};

export default createStore({
  state: {
    cartList: getLocalData('cartList'),
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
    addressList: getLocalData('addressList'),
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
    address: getLocalData('address'),
    orderAddress: getLocalData('orderAddress')
  },
  getters: {},
  mutations: {
    // 修改购物车列表信息
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo } = payload;
      let shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      };
      if (!shopInfo) {
        shopInfo = {};
      }
      let product = shopInfo?.productList[productId];
      if (!product) {
        productInfo.count = 0;
        product = productInfo;
        setLocalData(state, 'cartList');
      }
      product.count = product.count + payload.num;
      if (payload.num > 0) {
        product.check = true;
      }
      if (product.count < 0) {
        product.count = 0;
      }
      shopInfo.productList[productId] = product;
      state.cartList[shopId] = shopInfo;
      setLocalData(state, 'cartList');
    },
    // 修改商店名
    changeShopName(state, payload) {
      const { shopId, shopName } = payload;
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      };
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
      setLocalData(state, 'cartList');
    },
    // 是否添加商品到购物车
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      const product = state.cartList[shopId].productList[productId];
      product.check = !product.check;
      setLocalData(state, 'cartList');
    },
    // 清空购物车
    cleanCartProducts(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId].productList = {};
      setLocalData(state, 'cartList');
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
      setLocalData(state, 'cartList');
    },
    // 删除购物车数据
    clearCartData(state, shopId) {
      state.cartList[shopId].productList = {};
    },
    // 添加地址列表
    saveAddressInfo(state, payload) {
      const { addressList } = payload;
      state.addressList = addressList;
      setLocalData(state, 'addressList');
    },
    // 保存编辑时表单地址临时数据
    saveEditAddress(state, payload) {
      const { address } = payload;
      state.address = address;
      setLocalData(state, 'address');
    },
    // 修改地址列表
    changeAddressItemInfo(state, payload) {
      // id 为用户 id
      const { address, addressList } = state;
      const { props } = payload;

      for (const item of addressList) {
        if (item._id === props.addressId) {
          Object.assign(item, address);
          break;
        }
      }
      setLocalData(state, 'addressList');
    },
    // 保存 orderAddress
    changeOrderAddress(state, payload) {
      const { orderAddress } = payload;
      state.orderAddress = orderAddress;
      setLocalData(state, 'orderAddress');
    }
  },
  actions: {},
  modules: {}
});
