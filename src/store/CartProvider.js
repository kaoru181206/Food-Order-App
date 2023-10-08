import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // カート内に同様のアイテムがあるかをチェックする
    // 存在する場合、そのアイテムのindexを格納する
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // 上記で取得したindexのアイテムを取得する
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    // カード内に同様のアイテムが存在した場合
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      // カート内に同様のアイテムが存在しなかった場合
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  } else if (action.type === "REMOVE") {
    // 削除対象アイテムのindexを取得する
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // 上記で取得したindexのアイテムを取得する
    const existingCartItem = state.items[existingCartItemIndex];
    // カート内の合計金額の再計算を行う
    const updateTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      
    }

    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
