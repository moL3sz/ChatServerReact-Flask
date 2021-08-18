import React from "react"

class Logout extends React.Component{
    constructor(props){
        super(props)
        this.state = {loggedIn:true}
    }
    render(){
        return(
            <div className="logout">&#xe163; Logout </div>
        );
    }
}