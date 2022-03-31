import React from 'react'
import CustomAlertControl from '../AlertMessage';
import TopFilter from "./TopFilter"

const Guardian = () => {
	return (
		<>
            <CustomAlertControl />
			{/* Top Filter For Parents	 */}
			<TopFilter /> 
		</>
	)
}
export default Guardian;
