import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CImage,
} from "@coreui/react";
import Logo from "../../src/assets/images/logo/TutorPark_Web_logo.png";
import { AppSidebarNav } from "./AppSidebarNav";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import navigation from "../_nav";
import { getUserData, getUserRole } from "src/utility/utils";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidbarState);
  const sidebarShowData = sidebarShow.sidebarShow;
  // const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  // const sidebarShow = useSelector((state) => state.sidebarShow)

  // console.log("sidebarShow sidebar")
  // console.log(sidebarShow.sidebarShow)
  return (
    <CSidebar
      position="fixed"
      selfHiding="md"
      visible={sidebarShowData}

      onHide={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
      
      onClick={() =>
        dispatch({ type: "top_menu_item_active", topMenuItemActive: false })
      }
    >
    {/* <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    > */}

      <CSidebarBrand className="d-none d-md-flex" to="/">
        <NavLink to="/home">
          <CImage src={Logo} />
        </NavLink>
      </CSidebarBrand>
      <p className="tp-id-dispaly-css">
        {getUserData().user_details.tp_id && getUserData().user_details.tp_id}
      </p>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>

    </CSidebar>
  );
};

export default React.memo(AppSidebar);
