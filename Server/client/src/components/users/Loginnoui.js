import React from 'react'
import axios from '../../config/axios';
import {Form,FormGroup,Label,Input,Button} from 'reactstrap'
import {Link,Redirect} from 'react-router-dom'
class Login extends React.Component{
    constructor(){
        super()
        this.state ={
            email:'',
            password :'',
            redirectList : false,
            isLogin : false
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleForm=this.handleForm.bind(this)
    }
    
    handleChange(event){
        event.persist()
        this.setState(()=>({
            [event.target.name] : event.target.value
        }))
    
}
handleForm(event){
    event.preventDefault()
    const formData={
        email : this.state.email,
        password : this.state.password
    }
    axios.post('/users/login',formData)
    .then((response)=>{
        const {token} =response.data
        console.log(token)
        localStorage.setItem('token',token)
        this.setState(()=>{
            return{
                email:'',
                password : '',
                redirectList:false,
                isLogin : true
            }
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
    render(){
        if(this.state.redirectList){
            return <Redirect to="/contacts"/>
        }
        return(
            <div>
                {this.state.isLogin&&<div>
                
                    <Link to="/contacts"> contacts</Link>
                    <Link to="/users/logout">Logout</Link></div>}
               
                {!this.state.isLogin&&
                <Form onSubmit={this.handleForm}> 
                <Label>
                    email
                    <Input type="text" value={this.state.email} name="email"onChange={this.handleChange}/>
                    <br/>
                </Label>
                <Label>password
                    <Input type="password" value={this.state.password}name="password" onChange={this.handleChange}/>
                </Label><br/>
                <Input type="submit" value="submit"/>

                </Form>}

            </div>
        )
    }
}
export default Login