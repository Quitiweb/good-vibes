module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ CNAME: "CNAME" });

  eleventyConfig.addFilter("readableDate", (iso, lang = "es") => {
    const locales = { es: "es-ES", en: "en-GB", fr: "fr-FR", it: "it-IT" };
    return new Date(iso).toLocaleDateString(locales[lang] || "es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // JSON seguro para incrustar datos en <script>
  eleventyConfig.addFilter("jsonify", (value) =>
    JSON.stringify(value).replace(/</g, "\\u003c")
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
