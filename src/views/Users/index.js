import React from 'react'
import UserList from './UserList';
import CustomAlertControl from "../AlertMessage";

const Syllabus = () => {

  return(
    <>
        <CustomAlertControl />
        {/* User List */}
        <UserList />
    </>
  )
}

export default Syllabus