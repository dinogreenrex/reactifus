
export function crudReducer(model) {
	return (state = {
		selectedRecordId: null,
		listRecords: null,
		selectedRecord: null,
		selectedRecordError: null,
		isRecordLoading: null,
		toolbarAction: null,
		showRecordForm: false,

	} , action) => {
		switch(action.type) {
			case `FETCH_${model}`:
				return Object.assign({}, state,{
					isListLoading: true,
				})
			case 'FETCH_' + model + '_SUCCESS':
				return Object.assign({}, state,{
					isListLoading: false,
					listRecords: action.result,
				})
			case `FETCH_${model}_ERROR`:
				return Object.assign({}, state,{
					isListLoading: false,
					listRecords: action.error,
				})
			case `${model}_RECORD_SELECTION`:
				return Object.assign({}, state, {
					selectedRecordId: action.selectedRecordId,
				})
			case `FETCH_${model}_SINGLE`:
				return Object.assign({}, state,{
					isRecordLoading: true,
				})
			case `FETCH_${model}_SINGLE_SUCCESS`:
				return Object.assign({}, state,{
					isRecordLoading: false,
					selectedRecord: action.result,
				})
			case `FETCH_${model}_SINGLE_ERROR`:
				return Object.assign({}, state,{
					isRecordLoading: false,
					selectedRecordError: action.error,
				})
			case `EDIT_${model}_SINGLE`:
				return Object.assign({}, state,{
					editInProgress: true,
				})
			case `EDIT_${model}_SINGLE_SUCCESS`:
					const editedRecord = action.result;
					const cloneListRecords = state.listRecords.slice();
					cloneListRecords.map((item) => {
						if(item.id === editedRecord.id){
							item.street = editedRecord.street,
							item.city = editedRecord.city,
							item.country = editedRecord.country,
							item.postalcode = editedRecord.postalcode
						}
					})
				return Object.assign({}, state,{
					editInProgress: false,
					listRecords: cloneListRecords
				})
			case `EDIT_${model}_SINGLE_ERROR`:
				return Object.assign({}, state,{
					editInProgress: false,
					listRecordsError: action.error,
				})

			case `DELETE_${model}_SINGLE`:
				return Object.assign({}, state,{
					editInProgress: true,
				})
			case `DELETE_${model}_SINGLE_SUCCESS`:
				const deletedRecord = action.result; //should return the id of the deleted record
				const records = state.listRecords.slice();
				return Object.assign({}, state,{
					deleteInProgress: true,
				})
			case `DELETE_${model}_SINGLE_ERROR`:
				return Object.assign({}, state,{
					editInProgress: false,
					listRecordsError: action.error,
				})
			case 'EDIT_RECORD':
				return Object.assign({}, state, {
					showRecordForm: true,
					toolbarAction: 'edit',
				})
			case 'DELETE_RECORD':
				return Object.assign({}, state, {
					showRecordForm: false,
					toolbarAction: 'delete',
				})
			case 'INSERT_RECORD':
				return Object.assign({}, state, {
					showRecordForm: true,
					toolbarAction: 'insert',
				})

			default:
				return state;
		}
	}

}