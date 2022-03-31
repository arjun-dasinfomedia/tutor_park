import React from 'react'
import { checkAccessPermission } from 'src/utility/utils'
import Page403 from 'src/views/pages/page403/Page403'
import TopFilterClassRoom from './TopFilterClassRoom'

const ClassRoom = () => {

  return (
    <>
      {(checkAccessPermission("class_romm_view")) ? (
        <>
			    {/* <CustomAlertControl /> */}
          <TopFilterClassRoom />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  )
}

export default ClassRoom
