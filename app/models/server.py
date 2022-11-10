from models.member import Member
from models.user import User
from .db import db


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    preview_image = db.Column(db.String)
    private = db.Column(db.Boolean)
    is_DM = db.Column(db.Boolean)
    owner_id = db.Column(db.Integer, foreign_key=True)
 #relationship
    members = db.relationship('Member', back_populate='servers', cascade="all,delete-orphan")
    message = db.relationship('Message', back_populate='server', cascade="all,delete")
    channel = db.relationship('Channel', back_populate='server', cascade="all,delete")