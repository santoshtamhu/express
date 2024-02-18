const createProducts = () => {
  console.log("product created");
};

const fetchProducts = () => {
  console.log("product fetched");
};

module.exports = {
  create: createProducts,
  fetch: fetchProducts,
};
