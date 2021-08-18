import React from "react"
import "./chat.css"
import Message from "./message"
class Chat extends React.Component{

    constructor(props){
        super(props)
        this.state = {messages:[],id:props.id,members:[]}
        this.sendMessage = this.sendMessage.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.name = props.name
        this.messageIndexes = 0;
    }
    
    async getMembers(){

    }

    async getMessages(){
        fetch("http://localhost:4000/chat",{
            method:"GET",
            mode:"cors"
        })
        .then(res =>(res.json()))
        .then(res => {
            const l = Object.keys(res).length
            if(l !== this.state.messages.length){
                Object.entries(res).forEach(([id,prop]) => {
                    this.state.messages.push(<Message src={prop.src} msg={prop.msg} key={id}/>)
                })

                const newMsgStates = this.state.messages;
                this.setState({
                    messages:newMsgStates
                })
            }
        })
        .catch(error =>{
            console.log(error)
        })
    }
    async componentDidMount(){
        await setInterval(this.getMessages,1000);
    }
    sendMessage(){
        const current_msg = document.getElementById("messageInput").value;
        if(current_msg.length > 0){
            fetch("http://localhost:4000/chat",{
                method:"POST",
                body:JSON.stringify({
                    id:this.state.id,
                    src:this.name,
                    msg:current_msg
                })
            })
            .then(res =>{
                this.state.messages.push(<Message src="own" msg={current_msg} key={this.messageIndexes++}/>)
                const newMessageList = this.state.messages
                document.getElementById("messageInput").value = ""
                this.setState({
                    messages:newMessageList
                })
            }).catch(err =>{
                console.log(err)
            })
        }
        

    }

    render(){
        return(
            <div className="chat">
                <div className="chatHeader">
                </div>
                <div className="messageBox">
                    {this.state.messages.map(message =>(message))}

                </div>
                <div className="inputMsg">
                    <input type="text" id="messageInput" onKeyPress={(e)=>{
                        console.log(e)
                        if(e.key === "Enter"){
                            this.sendMessage()
                        }
                    }}/>
                    <span className="sendBtn" onClick={this.sendMessage}>Send</span>
                </div>
            </div>


        )
    }
}

export default Chat;