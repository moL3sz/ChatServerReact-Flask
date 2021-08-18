import avatar from "./img_avatar.png"

function Message(props){
    return(
        <div className={"message " + props.src}>
            <div className="avatar">
                {props.name != "" ? 
                            <div className="avatarLetter">
                                {props.name[0]}
                            </div>
                            :""
                }

            </div>
            <div className="messageText">
                {props.msg}
            </div>
        </div>
    )
}
export default Message;