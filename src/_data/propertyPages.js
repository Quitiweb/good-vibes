// Combina propiedades × idiomas para generar una ficha por apartamento e idioma.
const properties = require("./properties.json");
const langmeta = require("./langmeta.json");

const langs = Object.keys(langmeta);

module.exports = properties.flatMap((prop) =>
  langs.map((lang) => ({
    lang,
    prop,
    permalink: langmeta[lang].propertiesDir + prop.slug + "/",
  }))
);
