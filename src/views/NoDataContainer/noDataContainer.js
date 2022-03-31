import React from 'react'

const noDataContainer = (data) => {
    return(
        <>
          <div style={{ textAlign: 'center', paddingTop: '10%' }}>
            <h4>{data.module} data not available...</h4>
          </div>
        </>
      )
}
export default  noDataContainer