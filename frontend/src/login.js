import React from "react"
import ReactDOM from 'react-dom';
import Chat from "./chat"
import "./login.css"
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this.loginToChat = this.loginToChat.bind(this)
    }
    loginToChat(){
        const roomcode = document.getElementById("roomcode").value;
        const username = document.getElementById("username").value;
        if(roomcode.length > 0 && username.length > 0){
            fetch("http://localhost:4000/room",{
                method:"POST",
                body:JSON.stringify({
                    name:username,
                    code:roomcode
                })
            }).then(res=>{
                return res.json()
            })
            .then(res => {
                if(res === 200){
                    //successfuly join
                    ReactDOM.render(
                        <Chat id={this.state.id} name={username}/>,
                        document.getElementById("root")
                    ) ;
                }
            })
        } 


    }
    render(){
        return(
            <div className="loginform">
                <div className="loginTitle">
                    Login to the chat app
                </div>
                <div className="loginInputs">
                    <div className="roomInput">
                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username"/><br />
                        <label htmlFor="roomcode">Room code: </label>
                        <input type="text" id="roomcode" maxLength="5"
                         onKeyPress={(e)=>{
                             if(e.key === "Enter"){
                                 this.loginToChat();
                             }
                         }}
                        
                        />
                    </div>
                    <div className="loginButton" onClick={this.loginToChat}>Login</div>

                </div>
            </div>
        )

    }
}

export default Login