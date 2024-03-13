export class Recipe {
    id?: string | undefined;
    title: string;
    ingredients: string[];
    instructions: string;
    lastTimeModified: Date;

    constructor(id: string, title: string, ingredients: string[], instructions: string, lastTimeModified: Date) {
        this.id = id;
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.lastTimeModified = lastTimeModified;
    }

    static fromJSON(json: any): Recipe {
        return new Recipe(json.id, json.title, json.ingredients, json.instructions, new Date(json.lastTimeModified));
    }

    toJSON(): any {
        return {
            id: this.id,
            title: this.title,
            ingredients: this.ingredients,
            instructions: this.instructions,
            lastTimeModified: this.lastTimeModified
        }
    }

    getId(): string {
        return this.id ?? "";
    }

    getTitle(): string {
        return this.title.charAt(0).toUpperCase() + this.title.slice(1);
    }

    getIngredients(): string {
        return this.ingredients.join(", ");
    }

    getInstructions(): string {
        return this.instructions;
    }

    getLastTimeModified(): string {
        return this.lastTimeModified.toLocaleString();
    }
}
