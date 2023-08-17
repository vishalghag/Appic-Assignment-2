//Please Go through readMe document
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import {
  ascendingDescending,
  filterToAgeRange,
  generateRatingRange,
} from "../utils";
import { ASC, DESC, productsURL } from "../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { GET } from "../utils/configAxios/methods";
import Products from "./User";

const DynamicTable = () => {
  const [productData, setProductData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [toggle, SetToggle] = useState(true);
  const [selectedProductRange, setSelectedProductRange] = useState(null);
  const [consistentProductData, setConsistenProductData] = useState([]);
  const [apiStatus, setApiStatus] = useState(400);
  const [searchedProduct, setSearchedProduct] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedProductRange === null) {
      setProductData(consistentProductData);
    }
  }, [selectedProductRange]);

  const fetchInitialData = async () => {
    setLoader(true);
    const { data, status } = await GET(productsURL);
    if (status === 200) {
      const roundedOffProductData = data.products.map((product) => {
        return {
          ...product,
          rating: Math.ceil(product.rating),
        };
      });
      setProductData(roundedOffProductData);
      setConsistenProductData(roundedOffProductData);
    }
    setApiStatus(status);
    setLoader(false);
  };

  const handleSelectOnChange = (data) => {
    setSelectedProductRange(data);
    setProductData(
      filterToAgeRange(consistentProductData, data.value.min, data.value.max)
    );
  };

  const renderTable = () => {
    if (productData.length) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                {toggle ? (
                  <th>
                    Price{" "}
                    <button
                      onClick={() =>
                        ascendingDescending(
                          productData,
                          setProductData,
                          ASC,
                          SetToggle
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faArrowUp} />
                    </button>{" "}
                  </th>
                ) : (
                  <th>
                    Price{" "}
                    <button
                      onClick={() =>
                        ascendingDescending(
                          productData,
                          setProductData,
                          DESC,
                          SetToggle
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faArrowDown} />
                    </button>{" "}
                  </th>
                )}
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <Products productArray={productData} />
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: "1rem" }}>
          <h2>Data Not Found</h2>
        </div>
      );
    }
  };

  return loader ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <HashLoader size={40} color="#443C68" />
    </div>
  ) : apiStatus === 200 ? (
    <>
      <h2
        style={{
          margin: "3rem",
        }}
      >
        Dynamic Table
      </h2>
      <div class="react-select-wrapper">
        <input
          type="text"
          class="custom-text-input"
          placeholder="Search a Product"
          value={searchedProduct}
          onChange={(e) => {
            setSearchedProduct(e.target.value);
          }}
        />
        <button
          onClick={() => {
            if (searchedProduct === "" || searchedProduct === null) {
              alert("Please enter products in Search");
            } else {
              const filteredProducts = productData.filter((product) =>
                product.title.toLowerCase().includes(searchedProduct)
              );
              setProductData(filteredProducts);
            }
          }}
        >
          Search Product
        </button>
        <button
          onClick={() => {
            setProductData(consistentProductData);
            setSearchedProduct("");
            setSelectedProductRange(null);
          }}
        >
          Clear Search
        </button>
      </div>
      <Select
        placeholder="Select Rating Range"
        // value={selectedProductRange}
        value={selectedProductRange}
        onChange={handleSelectOnChange}
        options={generateRatingRange(consistentProductData)}
      />
      {renderTable()}
    </>
  ) : (
    <h2>Error While Fetching Data</h2>
  );
};

export default DynamicTable;
