import React from 'react'
import AllSessions  from './AllSessions'
import CompleteSession  from './CompleteSession'
import UpcomingSession  from './UpcomingSession'

const NetworkContainer = (Data) => {
  switch (Data.Data) {
    case 'All':
      return(
        <div>
          <AllSessions SearchData={Data.SearchAll}/>
        </div>
      )
    case 'Complete':
      return(
        <div>
          <CompleteSession SearchData={Data.SearchAll}/>
        </div>
      )
    case 'Upcoming':
      return(
        <div>
          <UpcomingSession SearchData={Data.SearchAll}/>
        </div>
      )
    default:
      return(
      <div>
        <UpcomingSession SearchData={Data.SearchAll}/>
      </div>
    )
      break;
  }
}
export default NetworkContainer
