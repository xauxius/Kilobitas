import ItemMinimal from "./itemMinimal";

export default class ItemFull extends ItemMinimal {
    constructor(id, name, price, description, itemType, amount) {
        super(id, name, price);
        this.description = description;
        this.itemType = itemType;
        this.amount = amount;
    }
}