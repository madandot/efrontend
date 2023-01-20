import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import Samsung1 from "../../media/samsung/SAMSUNG_Galaxy_Z_Fold4.jpg";
import Samsung2 from "../../media/samsung/flip_two.jpg";
import useGetProducts from "./hooks/useGetProducts";
import Spinner from "../../components/Spinner";
import { BsChevronDown } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import useAddToCart from "../../hooks/useAddToCart";
import useAddToWishlist from "../../hooks/wishList/useAddToWishlist";
import { getFormattedCurrency } from "../../utils/getFormattedCurrency";
import { useState } from "react";
const Collections = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = React.useState("");
  const params = useParams();
  const allProducts = useGetProducts();
  const { status, mutate } = useAddToCart();
  const { status: wishlistStatus, mutate: addToWishList, error: wishListError } = useAddToWishlist();

  // const data = [
  // 	{
  // 		image: Samsung1,
  // 		id: 1,
  // 		name: 'Samsung galaxy Z Fold4 (Black)',
  // 		ratings: '1,87,255',
  // 		reviews: '11,252',
  // 		rating: '4.3',
  // 		spec: [
  // 			'12GB ram | 512GB rom | expandable upto 200gb',
  // 			'50mp + 10mp +10pm + 12mp front camera',
  // 			'android 12v | snapdragon processor 900',
  // 			'5000 mAh battery | 5G 4G Network',
  // 			'Display 7.6 inch full HD | Dynamic Amoled 2X',
  // 		],
  // 		actualPrice: '1,59,999',
  // 		discountedPrice: '1,49,999',
  // 		discountedPercentage: '10%',
  // 	},
  // 	{
  // 		image: Samsung2,
  // 		id: 2,
  // 		name: 'Samsung galaxy Z FLIP3 (Black)',
  // 		ratings: '1,87,255',
  // 		reviews: '11,252',
  // 		rating: '4.3',
  // 		spec: [
  // 			'8GB ram | 128GB rom | expandable upto 100gb',
  // 			'12mp +12pm + 10mp front camera',
  // 			'android 12v | snapdragon processor 888',
  // 			'4000 mAh battery | 5G 4G Network',
  // 			'Display 6.7 inch full HD | Dynamic Amoled 2X',
  // 		],
  // 		discountedPrice: '69,999',
  // 		actualPrice: '95,999',
  // 		discountedPercentage: '27%',
  // 	},
  // ];
  // console.log('allProducts', products);
  useEffect(() => {
    if (allProducts.isSuccess) {
      if (params.collectionId === "all") {
        setProducts(allProducts.data);
      } else if (params.collectionId === "samsung") {
        const FilteredData = allProducts.data.filter((item) => item.brand === "samsung");
        setProducts(FilteredData);
      } else if (params.collectionId === "apple") {
        const FilteredData = allProducts.data.filter((item) => item.brand === "apple");
        setProducts(FilteredData);
      } else if (params.collectionId === "oneplus") {
        const FilteredData = allProducts.data.filter((item) => item.brand === "oneplus");
        setProducts(FilteredData);
      } else {
        setProducts(allProducts.data);
      }
    }
  }, [allProducts.data, allProducts.isSuccess, params]);

  if (allProducts.isLoading) {
    return (
      <div className="  flex justify-center items-center min-h-screen">
        <Spinner size={"h-10 w-10"} color={"text-primary"} />
      </div>
    );
  }

  const addToCartHandler = (pid) => {
    if (!cookie.user) navigate("/login");

    if (cookie.user && pid && cookie?.user.token) {
      const cartItem = {
        product: pid,
        quantity: 1,
      };
      setCurrentProduct(pid);
      mutate(
        {
          cartItem,
          token: cookie?.user.token,
        },
        {
          onSuccess: () => {
            setCurrentProduct("");
            navigate("/cart");
          },
        }
      );
    }
  };

  const addToWishlistHandler = (pid) => {
    if (!cookie.user) navigate("/login");
    if (cookie.user && pid && cookie?.user.token) {
      setCurrentProduct(pid);
      addToWishList(pid, {
        onSuccess: () => {
          setCurrentProduct("");
          navigate("/wishlist");
        },
      });
    }
  };

  const sortHandler = (sortBy) => {
    if (sortBy === "priceLowToHigh") {
      const sortedData = products.sort((a, b) => a.price - b.price);
      console.log("sortedData", sortedData);
      setProducts([...sortedData]);
    } else if (sortBy === "priceHighToLow") {
      const sortedData = products.sort((a, b) => b.price - a.price);
      console.log("sortedData", sortedData);
      setProducts([...sortedData]);
    } else if (sortBy === "rating") {
      const sortedData = products.sort((a, b) => b.rating - a.rating);
      console.log("sortedData", sortedData);

      setProducts([...sortedData]);
    }
  };

  return (
    <section className=" max-w-6xl mx-auto">
      <div className=" flex justify-end pt-5 px-5 relative">
        <div
          className=" flex select-none items-center border-2 p-2 font-semibold rounded space-x-2 bg-gray-300 cursor-pointer"
          onClick={() => {
            setIsMenu(!isMenu);
          }}
        >
          <span>Sort By</span>
          <BsChevronDown className=" text-lg font-semibold" />
        </div>
        {isMenu && (
          <div className=" absolute bg-gray-300 top-16 p-2 rounded space-y-2">
            <div className=" p-1 select-none hover:bg-gray-400 rounded cursor-pointer" onClick={() => sortHandler("priceHighToLow")}>
              Price - High to Low
            </div>
            <div className=" p-1 select-none hover:bg-gray-400 rounded cursor-pointer" onClick={() => sortHandler("priceLowToHigh")}>
              Price - Low to High
            </div>
            <div className=" p-1 select-none hover:bg-gray-400 rounded cursor-pointer" onClick={() => sortHandler("rating")}>
              Popularity
            </div>
          </div>
        )}
      </div>
      {allProducts.isSuccess && (
        <div className="grid grid-cols-1 gap-y-5">
          {products?.map((item) => {
            // console.log('item', item);
            return (
              <div key={item.id} className=" flex space-x-5 ">
                <img src={item.image} alt={item.name} className=" w-[40%] " />
                <div className=" mt-10 space-y-5">
                  <h1 className=" text-3xl font-semibold">{item.name}</h1>
                  <div className=" flex items-center space-x-3 mt-2 text-lg font-medium">
                    <div className=" flex items-center space-x-1">
                      <span>{item.rating}</span>
                      <AiFillStar className=" text-xl" />
                    </div>
                    <p className=" ">
                      {item.ratings} ratings &{item.reviews} reviews{" "}
                    </p>
                  </div>
                  <div className="space-y-2 ">
                    {item.spec.map((spec, index) => {
                      return <p key={index}>{spec}</p>;
                    })}
                  </div>
                  <p className=" text-xl font-semibold">&#x20b9;{getFormattedCurrency(item.price)}</p>

                  <div className=" space-x-5 flex items-center">
                    <button
                      className="bg-[#5206e0] text-white px-5 w-32 h-10 flex justify-center items-center py-2 rounded"
                      onClick={() => {
                        addToWishlistHandler(item.id);
                      }}
                    >
                      {wishlistStatus === "loading" && currentProduct === item.id ? <Spinner /> : "WishList"}
                    </button>
                    <button
                      className="bg-[#5206e0] text-white px-5 w-32 h-10 flex justify-center items-center py-2 rounded"
                      onClick={() => {
                        addToCartHandler(item.id);
                      }}
                    >
                      {status === "loading" && currentProduct === item.id ? <Spinner /> : "Add to Cart"}
                    </button>
                  </div>
                  <div>
                    {wishlistStatus === "error" && currentProduct === item.id && (
                      <p className="text-red-500">{wishListError?.response?.data?.message || "Something went wrong"}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Collections;
