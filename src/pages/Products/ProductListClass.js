import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import {
  retrieveProducts,
  findProductsByTitle,
  deleteAllProducts,
  deleteProduct,
} from "../../store/actions/products";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.removeAllProducts = this.removeAllProducts.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.state = {
      currentProduct: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }
  componentDidMount() {
    this.props.retrieveProducts();
  }
 
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle,
    });
  }
  refreshData() {
    this.setState({
      currentProduct: null,
      currentIndex: -1,
    });
  }
  setActiveProduct(product, index) {
    this.setState({
      currentProduct: product,
      currentIndex: index,
    });
  }
  removeAllProducts() {
    this.props
      .deleteAllProducts()
      .then((response) => {
        console.log(response);
        this.refreshData();
        
      })
      .catch((e) => {
        console.log(e);
      });
  }
  findByTitle() {
    this.refreshData();
    this.props.findProductsByTitle(this.state.searchTitle);
  }

  removeProduct() {
   // console.log(this.state.currentProduct.id);
    this.props
      .deleteProduct(this.state.currentProduct.id)
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, currentProduct, currentIndex } = this.state;
    const { products } = this.props;
    return (
      <>
        <PageTitle title={"Product List"} />
        <div className="container my-5">
          <div className="row">
            <h2>Product Create</h2>
            <div className="list row">
              <div className="col-md-8">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={this.onChangeSearchTitle}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={this.findByTitle}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4>Products List</h4>
                <ul className="list-group">
                  {products &&
                    products.map((product, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveProduct(product, index)}
                        key={index}
                      >
                        {product.title}
                      </li>
                    ))}
                </ul>
                <button
                  className="m-3 btn btn-sm btn-danger "
                  onClick={this.removeAllProducts}
                >
                  Remove All
                </button>
              </div>
              <div className="col-md-6">
                {currentProduct ? (
                  <div>
                    <h4>Product</h4>
                    <div>
                      <label>
                        <strong>Title:</strong>
                      </label>
                      {currentProduct.title}
                    </div>
                    <div>
                      <label>
                        <strong>Description:</strong>
                      </label>
                      {currentProduct.description}
                    </div>
                    <div>
                      <label>
                        <strong>Status:</strong>
                      </label>
                      {currentProduct.published ? "Published" : "Pending"}
                    </div>
                    <Link
                      to={"/products/" + currentProduct.id}
                      className="badge bg-warning"
                    >
                      Edit
                    </Link>
                    <button
                        className="badge bg-danger mx-2"
                        onClick={this.removeProduct}
                      >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div>
                    <br />
                    <p>Please click on a Product...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products.data,
  };
};
export default connect(mapStateToProps, {
  retrieveProducts,
  findProductsByTitle,
  deleteAllProducts,
  deleteProduct,
})(ProductList);
