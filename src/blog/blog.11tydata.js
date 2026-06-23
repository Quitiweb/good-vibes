module.exports = {
  layout: "layouts/post.njk",
  tags: ["posts"],
  eleventyComputed: {
    // Compute nice permalink based on language
    permalink: (data) => {
      const l = data.lang || "es";
      const slug = data.slug || data.page.fileSlug;
      if (l === "es") {
        return `/blog/${slug}/`;
      }
      return `/${l}/blog/${slug}/`;
    }
  }
};
