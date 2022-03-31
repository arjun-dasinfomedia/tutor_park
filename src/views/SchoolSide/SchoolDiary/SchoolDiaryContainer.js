import React from 'react'
import SchoolDiaryList from './SchoolDiaryList'
import MyDiary from './MyDiary'

const SchoolDiaryContainer = (Data) => {
  switch (Data.Data) {

    // My Diary Page
    case 'MyDiary':
      return (
        <div>
          <MyDiary />
        </div>
      )

    // School Diary Page
    case 'SchoolDiaryList':
      return (
        <div>
          <SchoolDiaryList />
        </div>
      )

    // Default page
    default:
      return (
        <div>
          <MyDiary />
        </div>
      )
      break;
  }
}
export default SchoolDiaryContainer
