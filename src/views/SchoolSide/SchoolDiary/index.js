import React from 'react'
import TopFilterSchoolDiary from './TopFilterSchoolDiary'
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../../pages/page403/Page403";

const SchoolDiary = () => {

  return (

    <>

      {checkAccessPermission("school_diary_view") ? (
        <>
          {/* Top Filter School Diary2 */}
          <TopFilterSchoolDiary />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  )
}

export default SchoolDiary
