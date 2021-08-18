class Message:
    def __init__(self,message,source):
        self.msg = message
        self.src = source
    def __repr__(self):
        return f"{self.src} -> {self.msg}"
    def get(self):
        return {"src":self.src,"msg":self.msg}