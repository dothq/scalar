import { create_ssr_component } from "svelte/internal";
import "svelte/register";

const main = async () => {
    const App = require("./app/app.svelte").default as ReturnType<typeof create_ssr_component>;

    const { html } = App.render();

    console.log(html);
}

main();