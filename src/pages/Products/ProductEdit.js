import React, { Component } from "react";
import { connect } from "react-redux";
import PageTitle from "../../components/PageTitle/PageTitle";
import { updateProduct, deleteProduct } from "../../store/actions/products";
import ProductDataService from "../../store/services/ProductDataService";

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.state = {
      currentProduct: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }
  componentDidMount() {
    //this.getProduct(this.props.match.params.id);
  }
  onChangeTitle(e) {
    const title = e.target.value;
    this.setState(function (prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          title: title,
        },
      };
    });
  }
  onChangeDescription(e) {
    const description = e.target.value;
    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        description: description,
      },
    }));
  }
  getProduct(id) {
    ProductDataService.get(id)
      .then((response) => {
        this.setState({
          currentProduct: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  updateStatus(status) {
    var data = {
      id: this.state.currentProduct.id,
      title: this.state.currentProduct.title,
      description: this.state.currentProduct.description,
      published: status,
    };
    this.props
      .updateProduct(this.state.currentProduct.id, data)
      .then((reponse) => {
        console.log(reponse);
        this.setState((prevState) => ({
          currentProduct: {
            ...prevState.currentProduct,
            published: status,
          },
        }));
        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  updateContent() {
    this.props
      .updateProduct(this.state.currentProduct.id, this.state.currentProduct)
      .then((reponse) => {
        console.log(reponse);

        this.setState({ message: "The Product was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  removeProduct() {
    this.props
      .deleteProduct(this.state.currentProduct.id)
      .then(() => {
        this.props.history.push("/Products");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { currentProduct } = this.state;
    // let location = useLocation();
    // let navigate = useNavigate();

    return (
      <>
        <PageTitle title={"Product Edit"} />
        <div className="container my-5">
          <div className="row">
            {currentProduct ? (
              <div className="edit-form">
                <h4>Product</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={currentProduct.title}
                      onChange={this.onChangeTitle}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={currentProduct.description}
                      onChange={this.onChangeDescription}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <strong>Status:</strong>
                    </label>
                    {currentProduct.published ? (
                      <span className="badge bg-secondary">Published</span>
                    ) : (
                      <span className="badge bg-secondary">Pending</span>
                    )}
                  </div>

                  <div className="form-group mt-3">
                    {currentProduct.published ? (
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => this.updateStatus(false)}
                      >
                        UnPublish
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => this.updateStatus(true)}
                      >
                        Publish
                      </button>
                    )}
                    <button
                      className="btn btn-danger mx-2"
                      onClick={this.removeProduct}
                    >
                      Delete
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={this.updateContent}
                    >
                      Update
                    </button>
                  </div>
                </form>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Product...</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
export default connect(null, { updateProduct, deleteProduct })(ProductEdit);
