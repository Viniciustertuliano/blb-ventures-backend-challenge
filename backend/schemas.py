"""
Product schemas
------------
"""
from flask_restplus_patched import ModelSchema

from models.product import Product


class BaseProductSchema(ModelSchema):
    """
    Base Product schema exposes only the most general fields.
    """

    class Meta:
        # pylint: disable=missing-docstring
        model = Product
        fields = (
            Product.id.key,
            Product.name.key,
            Product.price.key,
            Product.image_url.key,
        )
        dump_only = (
            Product.id.key,
        )


class DetailedProductSchema(BaseProductSchema):
    """
    Detailed Product schema exposes all useful fields.
    """

    class Meta(BaseProductSchema.Meta):
        fields = BaseProductSchema.Meta.fields + (
            Product.name.key,
            Product.price.key,
            Product.image_url.key,
        )
