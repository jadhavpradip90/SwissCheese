let nextTodoId = 0;
export const appActions = {
	ADD_TODO : 'ADD_TODO',
	SET_VISIBILITY_FILTER : 'SET_VISIBILITY_FILTER',
	TOGGLE_TODO : 'TOGGLE_TODO'
}

export const addTodo = (text) => ({
	type : 'ADD_TODO',
	id: nextTodoId++,
	text
})

export const setVisibilityFilter = filter => ({
	type : 'SET_VISIBILITY_FILTER',
	filter
})

export const toggleTodo = id => ({
	type : 'TOGGLE_TODO',
	id
})

export const deleteTodo = id => ({
	type : 'DELETE_TODO',
	id
})


export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}