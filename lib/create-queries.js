import isInTable from './queries/isInTable'
import isRangeInTable from './queries/isRangeInTable'
import getTableAtKey from './queries/getTableAtKey'
import getCellAtKey from './queries/getCellAtKey'
import getRowAtKey from './queries/getRowAtKey'
import canIncreaseColspanAtKey from './queries/canIncreaseColspanAtKey'
import canIncreaseRowspanAtKey from './queries/canIncreaseRowspanAtKey'
import canDecreaseColspanAtKey from './queries/canDecreaseColspanAtKey'
import canDecreaseRowspanAtKey from './queries/canDecreaseRowspanAtKey'
import getColumnPropertiesAtKey from './queries/getColumnPropertiesAtKey'

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
