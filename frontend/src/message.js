import avatar from "./img_avatar.png"

function Message(props){
    return(
        <div className={"message " + props.src}>
            <div className="avatar">
                <img src={avatar} alt="" className="avatar"/>
            </div>
            <div className="messageText">
                {props.msg}
            </div>
        </div>
    )
}
export default Message;