const reducer = (state = {}, action) =>{
    switch(action.type){
        case "UPDATE_USER": {
            return {...state, user: action.user}
        }
        case "NEW_USER": {
            return {...state, new: action.new}
        }
        case "ALL_USER": {
            return {...state, userList: action.userList}
        }
        case "REMOVE_USER": {
            return {...state, user: null}
        }
        default: {
            return state;
        }
    }
}
export default reducer