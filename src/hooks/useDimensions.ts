import {useContext} from 'react'

import {DimensionsContext} from '../contexts/dimensions'

export function useDimensions() {
	return useContext(DimensionsContext)
}

export default useDimensions
