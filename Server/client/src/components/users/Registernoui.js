import React from 'react'
import axios from '../../config/axios'
import {Form,Label,Input,FormGroup} from 'reactstrap'
class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username : '',
            email : '',
            password : '',
            noticeMsg :''
        }
        this.emailChange = this.emailChange.bind(this)
        //this.passwordChange = this.passwordChange.bind(this)
        this.submitHandle = this.submitHandle.bind(this)
    }
    //es6 arrow functions for event handlers where you dont have to bind this keyword
    nameChange=(event)=>{
        const username=event.target.value
        this.setState(()=>({username}))
    }
    //regular method used fro event handlers
    emailChange(event){
        const email=event.target.value
        this.setState(()=>({email}))
    }
    passwordChange(event){
        const password=event.target.value
        this.setState(()=>({password}))
    }
    submitHandle(event){
        event.preventDefault()
        //client side validations
        const formData = {
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        if(formData.username===''){
            alert('username must be filled')
        }
        else{
        axios.post('/users/register',formData)
        .then((response)=>{
            console.log(response.data)
            this.setState(()=>{
                return {
                username :'',
                email:'',
                password : '',
                noticeMsg :response.data.notice
                }

            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    }
    render(){
        return (
            <div>
                
                {this.state.noticeMsg&&<p>{this.state.noticeMsg}</p>}
                <Form onSubmit={this.submitHandle}>
                <FormGroup>
                    <Label>Username
                        <Input type="text" value={this.state.username} placeholder="Enter username" onChange={this.nameChange}/>
                        <br/>
                    </Label>
                    </FormGroup><br/>
                    <FormGroup>
                    <Label>Email
                    <Input type="text" value={this.state.email} placeholder ="Enter Email"onChange={this.emailChange}/>
                        <br/>
                    </Label>
                    </FormGroup><br/>
                    <FormGroup>
                    <Label>password
                    <Input type="password" value={this.state.password} placeholder ="Enter Password"onChange={this.passwordChange.bind(this)}/>
                    </Label><br/>
                    </FormGroup><br/>
                    <Input type="submit" value="submit" />
                </Form>
            </div>
        )
    }
}
export default Register