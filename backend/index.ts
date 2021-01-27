import Server from './server';

export const app = new Server(3000);

app.get("/", (req, res) => {
  return { name: "home", data: { place: "hell" } }
});
