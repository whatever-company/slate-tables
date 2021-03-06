import {
	insertTable,
	insertTableAtRange,
	insertRow,
	insertRowAtKey,
	insertRowAtEnd,
	insertColumn,
	insertColumnAtKey,
	deleteColumn,
	deleteColumnAtKey,
	deleteTable,
	deleteTableAtKey,
	deleteRowAtKey,
	deleteRow,
	deleteCellsContentAtRange,
	increaseColspanAtKey,
	increaseRowspanAtKey,
	decreaseColspanAtKey,
	decreaseRowspanAtKey,
	setCellProperties,
	setCellPropertiesAtKey,
	setColumnProperties,
	setColumnPropertiesAtIndex,
	setTableProperties,
	setTablePropertiesAtKey
} from './commands'

export default options => ({
	insertTable: insertTable.bind(null, options),
	insertTableAtRange: insertTableAtRange.bind(null, options),
	insertColumn: insertColumn.bind(null, options),
	insertColumnAtKey: insertColumnAtKey.bind(null, options),
	deleteColumn: deleteColumn.bind(null, options),
	deleteColumnAtKey: deleteColumnAtKey.bind(null, options),
	insertRow: insertRow.bind(null, options),
	insertRowAtEnd: insertRowAtEnd.bind(null, options),
	insertRowAtKey: insertRowAtKey.bind(null, options),
	deleteRowAtKey: deleteRowAtKey.bind(null, options),
	deleteRow: deleteRow.bind(null, options),
	deleteTable: deleteTable.bind(null, options),
	deleteTableAtKey: deleteTableAtKey.bind(null, options),
	deleteCellsContentAtRange: deleteCellsContentAtRange.bind(null, options),
	increaseColspanAtKey: increaseColspanAtKey.bind(null, options),
	increaseRowspanAtKey: increaseRowspanAtKey.bind(null, options),
	decreaseColspanAtKey: decreaseColspanAtKey.bind(null, options),
	decreaseRowspanAtKey: decreaseRowspanAtKey.bind(null, options),
	setCellProperties: setCellProperties.bind(null, options),
	setCellPropertiesAtKey: setCellPropertiesAtKey.bind(null, options),
	setColumnProperties: setColumnProperties.bind(null, options),
	setColumnPropertiesAtIndex: setColumnPropertiesAtIndex.bind(null, options),
	setTableProperties: setTableProperties.bind(null, options),
	setTablePropertiesAtKey: setTablePropertiesAtKey.bind(null, options)
})
