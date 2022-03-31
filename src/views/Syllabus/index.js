import React from 'react'
import SyllabusList from './SyllabusList'
import CustomAlertControl from "../AlertMessage";

const Syllabus = () => {

  return(
    <>
        <CustomAlertControl />
        {/* Syllabus List */}
        <SyllabusList />
    </>
  )
}

export default Syllabus
