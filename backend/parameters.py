"""
Input arguments (Parameters) for Product resources RESTful API
-----------------------------------------------------------
"""
from flask_marshmallow import base_fields
from flask_restplus_patched import PostFormParameters, PatchJSONParameters

import schemas
from .models.product import Product


class AddProductParameters(PostFormParameters, schemas.BaseProductSchema):
    """
    New Product creation
    """

    name = base_fields.String(required=True)
    price = base_fields.Integer(required=True)
    image_url = base_fields.String()

    class Meta(schemas.BaseProductSchema.Meta):
        fields = schemas.BaseProductSchema.Meta.fields + (
            'name',
            'price',
            'image_url',
        )


class PatchProductDetailsParameters(PatchJSONParameters):
    # pylint: disable=abstract-method
    """
    Product details updating parameters following PATCH JSON RFC.
    """

    PATH_CHOICES = tuple(
        '/%s' % field for field in (
            Product.name.key,
            Product.price.key,
            Product.image_url.key,
        )
    )
