import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    price: 4,
    purchasable: false,
    ordering: false,
  };

  updateOrderingStateHandler = () => {
    this.setState({ ordering: true });
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

    return (
      <Fragment>
        <Modal show={this.state.ordering}>
          <OrderSummary ingredientsSummary={this.state.ingredients} />
        </Modal>
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
  }
}

export default BurgerBuilder;
