import React, { Suspense } from "react";
import {
  CContainer,
  CImage,
  CTooltip,
  CCol,
} from "@coreui/react";

import ClassroomIcon from "../assets/images/rightmenu_icons/classroom.png";
import LibraryIcon from "../assets/images/rightmenu_icons/Library.png";
import MessageIcon from "../assets/images/rightmenu_icons/Messages.png";
import SchoolIcon from "../assets/images/rightmenu_icons/school-icon.png";
import SecondSchoolIcon from "../assets/images/rightmenu_icons/school-icon-two.png";
import { NavLink } from "react-router-dom";
import { getUserRole } from "../utility/utils";

// routes config
import routes from "../routes";

const AppRightBar = () => {
  return getUserRole() !== "admin" ? (
    <CContainer lg className="top-menu-hide-from-mobile-view">
      <div className="right-menu-body-css">
        {getUserRole() !== "school-admin" &&
        getUserRole() !== "school-tutor" &&
        getUserRole() !== "school-student" ? (
          <CCol className="right-sidebar-menu-css">
            <CTooltip content="View
            
            School" placement="left">
              <NavLink
                to="/join-school"
                className="header-top-menu-nav-link-css"
              >
                <CImage src={SchoolIcon} className="image-icon-css"></CImage>
              </NavLink>
            </CTooltip>
          </CCol>
        ) : null}

        <CCol className="right-sidebar-menu-css">
          <CTooltip content="School Diary" placement="left">
            <NavLink
              to="/school-diary"
              className="header-top-menu-nav-link-css"
            >
              <CImage src={LibraryIcon} className="image-icon-css"></CImage>
            </NavLink>
          </CTooltip>
        </CCol>
        <CCol className="right-sidebar-menu-css">
          <CTooltip content="Message" placement="left">
            <NavLink to="/Messages" className="header-top-menu-nav-link-css">
              <CImage src={MessageIcon} className="image-icon-css"></CImage>
            </NavLink>
          </CTooltip>
        </CCol>
        <CCol className="right-sidebar-menu-css">
          <CTooltip content="Classroom" placement="left">
            <NavLink to="/class-room" className="header-top-menu-nav-link-css">
              <CImage src={ClassroomIcon} className="image-icon-css"></CImage>
            </NavLink>
          </CTooltip>
        </CCol>
        {getUserRole() !== "school-admin" &&
        getUserRole() !== "school-tutor" &&
        getUserRole() !== "school-student" ? (
          <CCol className="right-sidebar-menu-css">
            <CTooltip content="My School" placement="left">
              <NavLink to="/my-school" className="header-top-menu-nav-link-css">
                {/* <NavLink to='/home' className="header-top-menu-nav-link-css"> */}
                <CImage
                  style={{ cursor: "pointer" }}
                  src={SecondSchoolIcon}
                  className="image-icon-css"
                ></CImage>
              </NavLink>
            </CTooltip>
          </CCol>
        ) : (
          <CCol className="right-sidebar-menu-css">
            <CTooltip content="My School" placement="left">
              {/* <NavLink to='/my-school' className="header-top-menu-nav-link-css"> */}
              <NavLink to="/home" className="header-top-menu-nav-link-css">
                <CImage
                  src={SecondSchoolIcon}
                  className="image-icon-css"
                ></CImage>
              </NavLink>
            </CTooltip>
          </CCol>
        )}
      </div>
    </CContainer>
  ) : (
    ""
  );
};

export default React.memo(AppRightBar);
