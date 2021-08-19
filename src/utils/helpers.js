export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (allProducts, name) => {
  let a = allProducts.map((item) => item[name]);
  if (name === "colors") {
    a = a.flat();
  }
  const array = Array.from(new Set(a));
  return ["all", ...array];
};
