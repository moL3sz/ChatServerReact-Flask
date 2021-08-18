class Room:
    def __init__(self):
        self.members = []
        self.code = "12345"
        self.messages = []
        self.lastMemberId = 0
    def get_members(self):
        return self.members
    def add_member(self,member):
        self.members.append(member)