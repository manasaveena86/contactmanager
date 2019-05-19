import {createStore,combineReducers} from 'redux'
import {userReducer} from '../reducers/user'
const configureStore =()=>{
    //console.log('in configurestore')
    const store = createStore(combineReducers({
        user : userReducer,
        
    }))
    return store
}
export default configureStore