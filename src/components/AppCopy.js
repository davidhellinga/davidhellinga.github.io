import React, {Component, Fragment} from "react";
import {CssBaseline} from "@material-ui/core";
import {Footer, Header} from "../containers/layouts";
import Content from "../containers/content";
import Popup from "../containers/content/Snackbar";

export const handleRequestBill = () => {
    alert("Requested bill.");
};

function sortByElement(element) {
    let sortOrder = 1;

    // Sort decending if property is negative
    if (element[0] === "-") {
        sortOrder = -1;
        element = element.substr(1);
    }

    return function (a, b) {
        if (sortOrder === -1) {
            return b[element].localeCompare(a[element]);
        } else {
            return a[element].localeCompare(b[element]);
        }
    }
}

export default class extends Component {
    state = {
        dishes: [],
        allergyNames: [],
        allergies: [],
        filteredAllergies: [],
        categoryNames: [],
        categories: [],
        dish: {},
        order: [],
        totalOrder: [],
        totalPrice: 0,
        editMode: false,
        isLoaded: false,
        showAll: true,
        popupIsOpen: false,
        message: "",
        tableNr: 0
    };

    componentDidMount() {
        this.fetchAllergyData();
        this.fetchCategoryData();
    }

    fetchAllergyData() {
        fetch("http://localhost:9050/allergies")
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.allergies.map(allergy => (
                {
                    name: `${allergy.name}`,
                    id: `${allergy.id}`
                }
            )))
            .then(data => this.setState({
                allergies: data,
                allergyNames: data.map((item) => item.name),
            }))
            .catch(error => console.log("There was an error during: 'fetchAllergyData'", error))
    }

    fetchCategoryData() {
        fetch("http://localhost:9050/categories")
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.categories.map(category => (
                {
                    name: `${category.name}`,
                    id: `${category.id}`
                }
            )))
            .then(data => this.setState({
                categories: data,
                categoryNames: data.map((item) => item.name)
            }))
            .catch(error => console.log("There was an error during: 'fetchCategoryData' ", error))
    }

    handleAddItemToOrder = id => {

        // Increase the amount of a dish
        this.handleSelectEdit((id));
        let temp_dish = this.handleGetDishByID((id));
        temp_dish.amount++;
        this.handleDishEdit(temp_dish);

        // Add item id to order list
        let orderItem = {
            uuid: id,
            name: temp_dish.title
        };
        let newArray = this.state.order.slice();

        newArray.push(orderItem);
        this.setState({order: newArray});
    };

    handleRemoveItemFromOrder = id => {
        // Remove the first item in the array with the same item-id
        for (let i = 0; i < this.state.order.length; i++) {
            if (this.state.order[i].uuid === id) {
                if (this.state.order.length <= 1) {
                    this.setState({order: []});
                }
                else {
                    this.state.order.splice(i, 1);
                    this.setState({order: this.state.order});
                }

                // Decrease the amount of a dish
                this.handleSelectEdit((id));
                let temp_dish = this.handleGetDishByID((id));
                temp_dish.amount--;
                this.handleDishEdit(temp_dish);
                break;
            }
        }
    };

    getDishesByCategory() {
        const initCategories = this.state.categoryNames.reduce(
            (dishes, category) => ({
                ...dishes,
                [category]: []
            }),
            {}
        );

        return Object.entries(
            this.state.dishes.reduce((dishes, dish) => {
                const {category} = dish;

                dishes[category] = [...dishes[category], dish];

                return dishes;
            }, initCategories)
        );
    }

    handleCategorySelect = category => {
        this.setState({
            category
        });
    };

    handleAddItemToOrder = id => {

        // Increase the amount of a dish
        this.handleSelectEdit((id));
        let temp_dish = this.handleGetDishByID((id));
        temp_dish.amount++;
        this.handleDishEdit(temp_dish);

        // Add item id to order list
        let orderItem = {
            uuid: id,
            name: temp_dish.title
        };
        let newArray = this.state.order.slice();

        newArray.push(orderItem);
        this.setState({order: newArray});
    };

    handleAllergySelect = allergy => {
        if (allergy === "")
        {
            this.setState({filteredAllergies: []})
            return;
        }
        let newArray = this.state.filteredAllergies.slice();
        newArray.push(allergy);
        this.setState({filteredAllergies: newArray});
    };

    handleDishSelect = id => {
        this.setState(({dishes}) => ({
            dish: dishes.find(_dish => _dish.id === id),
            editMode: false,
        }));
    };

    handleGetDishByID = id => {
        return this.state.dishes.find(_dish => _dish.id === id);
    };

    handleDishDelete = id => {
        this.setState(({dishes, dish, editMode}) => ({
            dishes: dishes.filter(_dish => _dish.id !== id),
            // Check if editMode previously stored dish (in state) is equal to the selected dish
            // This is to prevent deleting a different dish, switching the currently selected state.dish editMode
            editMode: dish.id === id ? false : editMode,
            // Check if id previously stored dish (in state) is equal to the selected dish
            // This is to prevent deleting a different dish, switching the currently selected state.dish
            dish: dish.id === id ? {} : dish
        }));
    };

    handleSelectEdit = id => {
        this.setState(({dishes}) => ({
            dish: dishes.find(_dish => _dish.id === id),
            editMode: true
        }));
    };

    handleDishEdit = dish => {

        // Loop through all dishes
        for (let i = 0; i < this.state.dishes.length; i++) {
            // Find the correct dish
            if (this.state.dishes[i].uuid === dish.uuid) {

                let newDishArray = this.state.dishes.slice();

                newDishArray[i].dish = dish;

                this.setState({dishes: newDishArray});
                break;
            }
        }
    };

    handleToggleShowAll = () => {
        this.setState({showAll: !this.state.showAll});
    };

    handleTogglePopup = () => {
        this.setState({popupIsOpen: !this.state.popupIsOpen});
    };

    render() {
        const dishes = this.getDishesByCategory(),
            {category, allergy, dish, editMode, showAll, popupIsOpen} = this.state;
        return (
            <Fragment>
                {/*CssBaseline handles the different baseline css browsers have, to make it more consitant across multiple different browsers*/}
                <CssBaseline/>

                <Header
                    allergies={this.state.allergyNames}
                    categories={this.state.categoryNames}
                    toggleShowAll={this.handleToggleShowAll}
                    showAll={showAll}
                    totalPrice={this.state.totalPrice}
                    order={this.state.totalOrder}
                />

                <Content
                    dish={dish}
                    dishes={dishes}
                    category={category}
                    allergy={allergy}
                    filteredAllergies={this.state.filteredAllergies}
                    editMode={editMode}
                    allergies={this.state.allergyNames}
                    onSelect={this.handleDishSelect}
                    onDelete={this.handleDishDelete}
                    onSelectEdit={this.handleSelectEdit}
                    onEdit={this.handleDishEdit}
                    onAddItem={this.handleAddItemToOrder}
                    onRemoveItem={this.handleRemoveItemFromOrder}
                    showAll={showAll}
                />

                <Footer
                    allergies={this.state.allergyNames}
                    filteredAllergies={this.state.filteredAllergies}
                    categories={this.state.categoryNames}
                    category={category}
                    allergy={allergy}
                    onSelectAllergy={this.handleAllergySelect}
                    onSelect={this.handleCategorySelect}
                    isEmpty={(this.state.order.length === 0)}
                />

                <Popup open={popupIsOpen} togglePopup={this.handleTogglePopup} message={this.state.message}/>
            </Fragment>
        );
    }
}
