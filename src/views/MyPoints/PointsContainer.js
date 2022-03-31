import React from 'react'
import TransferPoints from './TransferPoints'
import PointHistory from './PointHistory'

const PointsContainer = (Data) => {

	switch (Data.Data) {

		// Transfer Point Page
		case 'TransferPoints':
			return (
				<div>
					<TransferPoints />
				</div>
			)

		// Point History Page
		case 'PointsHistory':
			return (
				<div>
					<PointHistory />
				</div>
			)

		// Default Page
		default:
			return (
				<div>
					<TransferPoints />
				</div>
			)
			break;
	}
}
export default PointsContainer
