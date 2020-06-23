import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

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
  };

  removeIngredientHandler = (type) => {
    const currCount = this.state.ingredients[type];
    const newCount = currCount - 1;

    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = newCount;

    const currPrice = this.state.price;
    const ingredientPrice = INGREDIENT_PRICES[type];
    const newPrice = currPrice - ingredientPrice;

    this.setState({ ingredients: newIngredients, price: newPrice });
  };

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          add={this.addIngredientHandler}
          remove={this.removeIngredientHandler}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
