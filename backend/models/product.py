"""
Product database models
--------------------
"""
from sqlalchemy_utils import Timestamp

from app import db


class Product(db.Model, Timestamp):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String())


def __repr__(self):
    return (
        "<{class_name}("
        "id={self.id}, "
        "name=\"{self.name}\", "
        "price=\"{self.price}\", "
        "image_url={self.image_url},"
        ")>".format(
            class_name=self.__class__.__name__,
            self=self
        )
    )
