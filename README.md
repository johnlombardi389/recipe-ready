# Recipe Ready

Effortlessly organize your kitchen, get instant recipes tailored to your ingredients, and cut food waste while elevating your culinary journey.

![Project Preview Image](/src/assets/Project6.png)

## Table of Contents

- [Overview](#overview)
  - [Try Recipe Ready](#link)
- [User Guide](#user-guide)
- [Project Details](#project-details)
  - [Tech Toolkit](#tech-toolkit)
  - [Sample Code](#sample-code)
- [Photos](#photos)
- [Back-End](#back-end)
- [Author](#author)
  - [Credits](#credits)

## Overview

Recipe Ready is an innovative kitchen assistant app designed to streamline the culinary experience by addressing various kitchen-related challenges. With a focus on ingredient management, the application aids users in efficiently organizing their kitchen supplies, providing real-time suggestions on available recipes based on current ingredients, facilitating the creation of dynamic shopping lists, and enabling users to track the purchase dates of their ingredients.

By seamlessly integrating these features, Recipe Ready becomes an indispensable tool for users seeking to optimize their meal planning, reduce food waste, and enhance their cooking experience.

### Try Recipe Ready

[Link to Recipe Ready](https://johnlombardi389.github.io/recipe-ready)

## User Guide

1. Account Creation and Login:

- Register a new account and log in to access Recipe Ready's features.

2. Managing Pantry Ingredients:

- Add ingredients available in your kitchen to your pantry within the app.

3. Finding Recipes:

- Click the "Find Recipes" button to instantly discover recipes you can make with your current ingredients.

4. Viewing Recipes:

- Recipes display the number of missing ingredients required for preparation.

5. Accessing Recipe Details:

- Click on a recipe to view the full list of ingredients and step-by-step instructions.

6. Adding Ingredients to Shopping List:

- Each recipe includes an option to automatically add missing ingredients to your shopping list.

7. Customizing Shopping List:

- Modify your shopping list by adding any extra items you want to purchase.

8. Shopping List Management:

- From the shopping list page, delete unwanted items or mark purchased items by clicking the 'Purchased' button.

9. Automating Pantry Updates:

- Upon marking items as purchased, they will be added to your pantry automatically for future reference.

## Details

### Tech Toolkit

Front-End Tools:

- React
- JavaScript
- Styled Components
- Sass
- CSS
- HTML
- Vite
- Git
- Figma

Back-End Tools:

- Python
- Django
- REST Framework
- REST API
- Git
- PythonAnywhere

### Sample Code

#### Recipe Display Section

```javascript
<div>
  {loading && <LoadingMessage>Loading...</LoadingMessage>}

  <RecipesGrid>
    {recipes.map((recipe) => (
      <Recipe key={recipe.id} recipe={recipe} openRecipe={handleRecipeClick} />
    ))}
  </RecipesGrid>

  {modalOpen && selectedRecipe && (
    <RecipeModal
      recipe={selectedRecipe}
      closeModal={() => setModalOpen(false)}
    />
  )}
</div>
```

This section of code is responsible for displaying the recipes on the webpage.

It uses a modular component structure for clean and easy to read code. Dynamic modal rendering is also used to ensure the modal displays the details when the correct conditions are met.

## Photos

### Log In

![Log In](/src/assets/Project1.png)

#### Register Account

![Register](/src/assets/Project2.png)

#### New Account Pantry

![New Account Pantry](/src/assets/Project3.png)

#### Add Ingredients

![Add Ingredients](/src/assets/Project4.png)

#### Pantry View

![Pantry View](/src/assets/Project5.png)

#### Edit Ingredients

![Edit Ingredients](/src/assets/Project13.png)

#### Your Recipes

![Recipes for your Pantry](/src/assets/Project6.png)

#### View Recipe

![View Recipe](/src/assets/Project7.png)

#### Recipe Ingredients You Need

![Recipe Ingredients](/src/assets/Project10.png)

#### Recipe Directions

![Recipe Directions](/src/assets/Project9.png)

#### Your Shopping List

![Shopping List](/src/assets/Project12.png)

## Back-End

Powered by Django and Django Rest Framework, Recipe Ready's backend architecture offers an array of robust features to support a seamless user experience. Leveraging Python's capabilities, the platform manages user accounts, providing secure login and registration functionalities. The application allows users to save ingredients to a personalized virtual pantry, enabling efficient organization and tracking of purchased items.

Moreover, the system facilitates the creation and management of dynamic shopping lists, ensuring a user-centric and practical approach to meal planning. Through these Django-based features, Recipe Ready ensures a user-friendly and intuitive environment, allowing individuals to curate their kitchen inventory and shopping needs with ease and precision.

[See the Back-End Repository](https://github.com/johnlombardi389/recipe-ready-backend)

## Author

John Lombardi

- [Portfolio](https://johnlombardi389.github.io/portfolio/)
- [LinkedIn](https://www.linkedin.com/in/johnlombardi389/)
- [GitHub](https://github.com/johnlombardi389)

---

### Credits

Photo by Yaroslav Shuraev: https://www.pexels.com/photo/fresh-vegetables-and-fruits-on-the-table-8844888/

Photo by Yaroslav Shuraev: https://www.pexels.com/photo/hand-of-a-person-on-an-open-book-near-fresh-vegetables-8845419/

Photo by August de Richelieu: https://www.pexels.com/photo/family-preparing-food-in-the-kitchen-4262010/

Photo by Kevin Malik: https://www.pexels.com/photo/consumer-looking-at-a-product-9016554/

Recipe Data: https://spoonacular.com/food-api/docs
