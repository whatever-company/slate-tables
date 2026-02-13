import isInTable from './queries/isInTable.js'
import isRangeInTable from './queries/isRangeInTable.js'
import getTableAtKey from './queries/getTableAtKey.js'
import getCellAtKey from './queries/getCellAtKey.js'
import getRowAtKey from './queries/getRowAtKey.js'
import canIncreaseColspanAtKey from './queries/canIncreaseColspanAtKey.js'
import canIncreaseRowspanAtKey from './queries/canIncreaseRowspanAtKey.js'
import canDecreaseColspanAtKey from './queries/canDecreaseColspanAtKey.js'
import canDecreaseRowspanAtKey from './queries/canDecreaseRowspanAtKey.js'
import getColumnPropertiesAtKey from './queries/getColumnPropertiesAtKey.js'

export default options => {
	return {
		isInTable: isInTable.bind(null, options),
		isRangeInTable: isRangeInTable.bind(null, options),
		getTableAtKey: getTableAtKey.bind(null, options),
		getCellAtKey: getCellAtKey.bind(null, options),
		getRowAtKey: getRowAtKey.bind(null, options),
		canIncreaseColspanAtKey: canIncreaseColspanAtKey.bind(null, options),
		canIncreaseRowspanAtKey: canIncreaseRowspanAtKey.bind(null, options),
		canDecreaseColspanAtKey: canDecreaseColspanAtKey.bind(null, options),
		canDecreaseRowspanAtKey: canDecreaseRowspanAtKey.bind(null, options),
		getColumnPropertiesAtKey: getColumnPropertiesAtKey.bind(null, options)
	}
}
