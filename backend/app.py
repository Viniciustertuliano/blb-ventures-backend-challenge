from .schemas import schemas
from .parameters import AddProductParameters
from models.product import Product
from flask import Flask
from flask_restplus._http import HTTPStatus
from flask_sqlalchemy import SQLAlchemy
from flask_restplus_patched import Api, Namespace, Resource

# Extensions initialization
# =========================
app = Flask(__name__)
db = SQLAlchemy(app)
api = Api(app)


# "Product" resource RESTful API definitions
# ========================================
products_api = Namespace('products')
api.add_namespace(products_api)


@products_api.route('/')
class Products(Resource):

    @api.response(schemas.BaseProductSchema(many=True))
    def get(self):
        """
        List of Products.
        Returns a list of Products.
        """
        return Product.query.all()

    @api.parameters(AddProductParameters())
    @api.response(schemas.DetailedProductSchema())
    @api.response(code=HTTPStatus.FORBIDDEN)
    @api.response(code=HTTPStatus.CONFLICT)
    @api.doc(id='create_Product')
    def post(self, args):
        """
        creates a new product.
        """
        with api.commit_or_abort(
            db.session,
            default_error_message="Some error message"
        ):
            new_product = Product(**args)
            db.session.add(new_product)
        return new_product, 201


@products_api.route('/<int:product_id>')
@products_api.resolve_object('product',
                             lambda kwargs: Product.query.get_or_404(
                                 kwargs.pop('product_id')))
class ProductByID(Resource):

    @api.response(code=HTTPStatus.CONFLICT)
    @api.response(code=HTTPStatus.NO_CONTENT)
    def delete(self, Product):
        """
        Delete a Product by ID.
        """
        with api.commit_or_abort(
            db.session,
            default_error_message="Some error message"
        ):
            db.session.delete(Product)
        return None, 204


# Run the RESTful API server
# ==========================
if __name__ == '__main__':
    db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
