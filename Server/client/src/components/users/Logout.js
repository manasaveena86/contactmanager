import React from 'react'
import axios from '../../config/axios';
import {removeUser} from '../redux/actions/user'
import {connect} from 'react-redux'
class  Logout extends React.Component{
    constructor(props){
        super(props)
        this.state={
            logoutMessage : false
        }
    }
    componentDidMount(){
        axios.delete('/user/logoutfromall',{ header: { 'x-auth': localStorage.getItem('token') } })
        .then((response)=>{
            console.log(response.data)
            
            this.setState(()=>({logoutMessage:true}))
            this.props.dispatch(removeUser({}))
            localStorage.removeItem('token')

            this.props.history.push('/user/login')
        })
        .catch((err)=>{
            console.log(err)
            
        })
    }
    render(){
        console.log('in logout')
        return(
            <div>
           
        
        </div>
        )
    }
    
}
export default connect()(Logout)