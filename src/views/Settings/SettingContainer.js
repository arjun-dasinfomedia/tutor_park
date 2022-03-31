import React from 'react'
import PointSystemSetting from './PointSystemSetting'
import OtherSetting from './OtherSetting'

const SettingContainer = (Data) => {

	switch (Data.Data) {

		// Point System Setting Page
		case 'PointSystem':
			return (
				<div>
					<PointSystemSetting />
				</div>
			)

		// Other Setting Page
		case 'OtherSetting':
			return (
				<div>
					<OtherSetting />
				</div>
			)

		// Default Page
		default:
			return (
				<div>
					<PointSystemSetting />
				</div>
			)
			break;
	}
}
export default SettingContainer 
