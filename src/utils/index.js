import { ASC, DESC } from "./constant";

export const ascendingDescending = (
  productData,
  setProductData,
  operation,
  SetToggle
) => {
  let updatedProductData = [...productData];

  if (operation === ASC) {
    updatedProductData.sort((a, b) => a.price - b.price);
    SetToggle(false);
  }
  if (operation === DESC) {
    updatedProductData.sort((a, b) => b.price - a.price);
    SetToggle(true);
  }

  setProductData(updatedProductData);
};

export const filterToAgeRange = (productData, min, max) =>
productData.filter(
    (number) => number.rating >= min && number.rating <= max
  );

export const generateRatingRange = (productData) => {
  const maxRating = Math.max(
    ...productData.map((ele) => parseInt(ele.rating))
  );
  const rangeCount = Math.ceil(maxRating / 1);
  const ranges = [];

  for (let i = 0; i < rangeCount; i++) {
    const minRating = i * 1;
    const maxRating = minRating + 1;
    const datum = {
      value: {
        min: minRating,
        max: maxRating,
      },
      label: `${minRating}-${maxRating}`,
    };
    ranges.push(datum);
  }
  return ranges;
};
