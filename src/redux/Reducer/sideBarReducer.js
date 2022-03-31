const initialState = {
  sidebarShow: true,
  topMenuItemActive: false,
};

const sidbarState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    case "top_menu_item_active":
      return { ...state, ...rest };
    default:
      return state;
  }
};

export default sidbarState;
