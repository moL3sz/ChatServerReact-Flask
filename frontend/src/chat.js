import React from "react"
import "./chat.css"
import Message from "./message"
import Member from "./member"
class Chat extends React.Component{

    constructor(props){
        super(props)
        this.state = {messages:[],id:props.id,members:[]}
        this.sendMessage = this.sendMessage.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.getMembers = this.getMembers.bind(this)
        this.name = props.name
        this.messageIndexes = 0;
    }
    
    async getMembers(){
        fetch("http://localhost:4000/chat/getmems",{
            method:"GET",
        })
        .then(res => (res.json()))
        .then(res => {
            const mems = []
            Object.entries(res).forEach(([key,mem])=>{
                mems.push(mem)
            })
            this.setState({
                members:mems
            })
        })

    }
    autoScrollDown(){
        const msgbox = document.getElementById("messageBox");
        msgbox.scrollTop = msgbox.scrollHeight;
        
    }
    async getMessages(){
        fetch("http://localhost:4000/chat/getmsgs",{
            method:"GET",
            mode:"cors",
        })
        .then(res =>(res.json()))
        .then(res => {

            const l = Object.keys(res).length
            const l1 = this.state.messages.length
            this.messageIndexes = l1+1;
            const newMsgs = []
            if(l !== l1){
                Object.entries(res).forEach(([id,prop]) => {
                    newMsgs.push(<Message src={prop.src == this.name ? 'own' : prop.src} msg={prop.msg} key={id} name={prop.src == this.name ? "" : prop.src}/>)
                })
                this.setState({
                    messages:newMsgs
                })
                this.autoScrollDown();
            }
        })
        .catch(error =>{
            console.log(error)
        })
    }
    async componentDidMount(){
        await this.getMessages();
        await this.getMembers();
        await setInterval(this.getMessages,200);
        await setInterval(this.getMembers,500);
    }
    componentWillUnmount(){
        clearInterval(this.getMessages)
        clearInterval(this.getMembers)
    }
    sendMessage(){
        const current_msg = document.getElementById("messageInput").value;
        if(current_msg.length > 0){
            fetch("http://localhost:4000/chat/1",{
                method:"POST",
                body:JSON.stringify({
                    id:this.state.id,
                    src:this.name,
                    msg:current_msg
                })
            })
            .then(res =>{
                this.state.messages.push(<Message src="own" msg={current_msg} key={this.messageIndexes++} name={""}/>)
                const newMessageList = this.state.messages
                document.getElementById("messageInput").value = ""
                this.setState({
                    messages:newMessageList
                })
            }).catch(err =>{

                

            })
        }
    }
    render(){
        return(
            <div className="chat">
                <div className="chatHeader">
                    <h3 className="memNamesTitle">Members:</h3>
                    {
                        this.state.members.map((mem,i)=>{
                            return <Member name={(i+1 == this.state.members.length) ? mem.name : mem.name + ","} key={i}/>
                        })
                    }
                </div>
                <div className="messageBox" id="messageBox">
                    {this.state.messages.map(message =>(message))}

                </div>
                <div className="inputMsg">
                    <input type="text" id="messageInput" onKeyPress={(e)=>{
                        if(e.key === "Enter"){

                            this.sendMessage()
                            this.autoScrollDown();
                        }
                    }}/>
                    <span className="sendBtn" onClick={this.sendMessage}>Send</span>
                </div>
            </div>


        )
    }
}

export default Chat;