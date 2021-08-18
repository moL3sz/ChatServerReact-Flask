from flask_restful import Resource
from init import app,request,api,cross_origin
from room import Room
from member import Member
from message import Message
import json
import json
auths = {}
room = Room()
class Chat(Resource):
    @cross_origin(origin='*',headers=['Content-Type','Authorization'])
    def get(self,opt):
        if opt == "getmsgs":
            messages = {id:msg.get() for id,msg in enumerate(room.messages)}
            return messages
        elif opt == "getmems":
            members = {id:mem.get() for id,mem in enumerate(room.get_members())}
            return members

        pass
    @cross_origin(origin='*',headers=['Content-Type','Authorization'])
    def post(self,opt):
        data = json.loads(request.get_data().decode("utf-8"))
        msg = data["msg"]
        src = data["src"]
        message = Message(msg,src)
        room.messages.append(message)
        return data["msg"]
        pass
class JoinRoom(Resource):
    @cross_origin(origin='*',headers=['Content-Type','Authorization'])
    def post(self):
        data = json.loads(request.get_data().decode('utf-8'))
        name = data['name']
        code = data['code']
        if code == room.code:
            #create member for the chat
            current_member = Member(id=room.lastMemberId,name=name)
            for mem in room.members:
                if mem.name == current_member.name:
                    print(f"[*] Already in {mem.name}")
                    return "200"
            room.lastMemberId+=1
            room.add_member(current_member)

            return "200",200
        return "404",404
    def delete(self):
        #remove member from room
        print(request.get_json())
        data = request.get_data()
        print(data)
        print("Logout data")
        mem_id = data["id"]
        for mem in room.members:
            if mem.id == mem_id:
                room.members.remove(mem)
                return "200"
        return "403"
        
api.add_resource(Chat,"/chat/<string:opt>")
api.add_resource(JoinRoom,"/room")








