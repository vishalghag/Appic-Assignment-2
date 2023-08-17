const Products = ({ productArray }) => {
  return productArray.map((product) => {
    const {
      id = "-",
      title = "-",
      description = "-",
      price = "-",
      rating = "-",
    } = product;

    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{title}</td>
        <td>{description}</td>
        <td>{price}</td>
        <td>{rating}</td>
      </tr>
    );
  });
};

export default Products;
