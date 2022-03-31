import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader, AppRightBar } from '../components/index'

const DefaultLayout = () => {

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener('resize', setDimension);
    
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])
  
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column bg-light" style={{minHeight:(screenSize.dynamicHeight-176)}}>
        <AppHeader />
        <div className="wrapper d-flex flex-row bg-light p-0" style={{minHeight:(screenSize.dynamicHeight-176)}}>
       
          <div className="body-content-css" sm={12} md={12} lg={12} xl={12} xxl={12} xs={12}>
            <AppContent />
          </div>
          <div className="right-sidebar-css top-menu-hide-from-mobile-view">
            <AppRightBar />
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
