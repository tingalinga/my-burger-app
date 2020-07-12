import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    price: 4,
    purchasable: false,
    ordering: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://my-burger-app-af62d.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        console.log("help");
        this.setState({ error: true });
      });
  }

  updateOrderingStateHandler = () => {
    this.setState({ ordering: true });
  };

  cancelOrderingStateHandler = () => {
    this.setState({ ordering: false });
  };

  continueOrderingStateHandler = () => {
    this.setState({ loading: true });

    // alert("continuing!!");
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: "tingalinga",
        address: {
          street: "Ubi Ave 1",
          zipCode: "400313",
          country: "Singapore",
        },
        email: "itshuitingg@gmail.com",
      },
      deliveryMethod: "express",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false, ordering: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
          ordering: false,
          error: true,
        });
      });
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredient) => ingredients[ingredient])
      .reduce((arr, el) => {
        return arr + el;
      }, 0);
    this.setState({
      purchasable: sum > 0,
    });
  };

  addIngredientHandler = (type) => {
    const currCount = this.state.ingredients[type];
    const newCount = currCount + 1;

    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = newCount;

    const currPrice = this.state.price;
    const ingredientPrice = INGREDIENT_PRICES[type];
    const newPrice = currPrice + ingredientPrice;

    this.setState({ ingredients: newIngredients, price: newPrice });
    this.updatePurchaseState(newIngredients);
  };

  removeIngredientHandler = (type) => {
    const currCount = this.state.ingredients[type];

    if (currCount <= 0) {
      return;
    }

    const newCount = currCount - 1;

    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = newCount;

    const currPrice = this.state.price;
    const ingredientPrice = INGREDIENT_PRICES[type];
    const newPrice = currPrice - ingredientPrice;

    this.setState({ ingredients: newIngredients, price: newPrice });
    this.updatePurchaseState(newIngredients);
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients cannot be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            add={this.addIngredientHandler}
            remove={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            price={this.state.price}
            ordering={this.updateOrderingStateHandler}
            purchasable={this.state.purchasable}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredientsSummary={this.state.ingredients}
          price={this.state.price}
          cancel={this.cancelOrderingStateHandler}
          continue={this.continueOrderingStateHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal
          show={this.state.ordering}
          close={this.cancelOrderingStateHandler}
        >
          {this.state.loading ? <Spinner /> : orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
