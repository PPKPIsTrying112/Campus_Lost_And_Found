import { setWorldConstructor } from "@cucumber/cucumber";

class CustomWorld {
    constructor({ page }) {
        this.page = page;
    }
}

setWorldConstructor(CustomWorld);
