export type FileOrUndefined = File | undefined;

// DTOs

export type Recipe = {
    _id?: String,
    title: String,
    summary: String,
    preparationTime: number,
    rating: Number,
    coverImage?: String,
    published: Boolean,
    publishedDate: Date | Number
}

export type Ingredient = {
    _id?: String,
    name: String,
    vegan: Boolean,
    vegetarian: Boolean
}

export type RecipeIngredient = {
    _id?: String,
    recipeId: String,
    ingredientId: String,
    desc: String
}

export type RecipeSection = {
    _id?: String,
    recipeId: String,
    title: String,
    richText: String,
    order: Number
}