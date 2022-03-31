import React from 'react'
import TopFilterTimeLine from "./TopFilterTimeLine"
import CustomAlertControl from "../AlertMessage";
import { checkAccessPermission } from 'src/utility/utils'
import Page403 from '../pages/page403/Page403'

const Timeline = () => {

  return (
    <>
      {
        checkAccessPermission('timeline_view') ? <><CustomAlertControl />
          {/* Top Filter Timeline */}
          <TopFilterTimeLine />
        </> : (<><Page403 /></>)
      }

    </>
  )
}

export default Timeline