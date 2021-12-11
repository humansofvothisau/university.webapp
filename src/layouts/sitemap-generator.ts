require("babel-register")({
  presets: ["es2015", "react"],
});

const router = require("./sitemap-routes.tsx").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
  return new Sitemap(router)
    .build("https://university.humansofvothisau.com")
    .save("./public/sitemap.xml");
}

generateSitemap();

export {};
