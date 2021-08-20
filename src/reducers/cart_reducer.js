import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    // Search qua một lượt danh sách các sp đã được thêm ở cart , nếu như có thì xử lý , còn chưa có thì tạo mới
    const tempItem = state.cart.find((i) => i.id === id + color);
    // nếu như có thì kiểm tra xem nó thuộc loại sp nào với màu sắc nào
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          // kiểm tra xem số lượng thêm + số lượng cũ đã vượt quá số lượng hàng còn trong kho hay không
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          // cuối cùng trả về một object mới gồm các phần tử cũ và cập nhật số lượng sp mới thêm vào
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      // trả về object với tempcart đã được cập nhật
      return { ...state, cart: tempCart };
    }
    //  nếu không có thì khởi tạo mới
    else {
      const newItem = {
        // id + color để phân biệt sãn phẩm cùng loại nhưng màu sắc khác nhau
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    let newCartItems = state.cart.filter((item) => {
      return item.id !== action.payload;
    });
    return { ...state, cart: newCartItems };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
