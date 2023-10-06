import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  findProductASC,
  findProductByCategory,
  findProductByGender,
  findProductDESC,
  findProductsort,
  getProductQuantity,
} from "../services/ProductsService";
import { findAllCategory, findCategoryById } from "../services/CategoryService";
import { type } from "@testing-library/user-event/dist/type";
import {
  addProductToCart,
  countProductOnCart,
  listProductOnCart,
  totalProductOnCart,
} from "../services/CartService";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { updateCart } from "../store/action/CartAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const categoryName = searchParams.get("categoryName");
  const pages = searchParams.get("page");
  const typeNameHome = searchParams.get("typeName");
  const username = localStorage.getItem("username");
  const [showGender, setShowGender] = useState(true);
  const gender = localStorage.getItem("gender");
  const [showSize, setShowSize] = useState(true);
  const [showSmallSize, setShowSmallSize] = useState(true);
  const [showBigSize, setShowBigSize] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(pages);
  const dispatch = useDispatch();
  const [typeName, setTypeName] = useState("");
  const [material, setMaterial] = useState("");
  const [size, setSize] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [flag, setFlag] = useState(false);

  const nextPage = async () => {
    setPage((page) => page + 1);
  };

  const prevPage = async () => {
    setPage((page) => page - 1);
  };
  const handleReset = async () => {
    setTypeName("");
    setMaterial("");
    setSize(0);
    setPage(pages);
    try {
      const data = await findProductByCategory(
        page,
        categoryName,
        typeName,
        material,
        size
      );
      console.log(data);
      setProducts(data);
      setFlag(true);
    } catch (error) {
      console.log("Error products:", error);
    }
    const checkboxButtons = document.querySelectorAll('input[type="checkbox"]');
    checkboxButtons.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const ShowProductsByCategory = async () => {
    try {
      if (categoryName) {
        const data = await findProductByCategory(
          page,
          categoryName,
          typeName,
          material,
          size
        );
        console.log(data);
        setProducts(data);
        setShowGender(true);
        setShowSize(true);
        setShowBigSize(true);
        setFlag(true);
        setShowSmallSize(true);
      }
    } catch (error) {
      console.log("Error products:", error);
    }
  };
  const ShowProductsByGender = async () => {
    if (gender == 0) {
      try {
        if (typeNameHome !== "") {
          const data = await findProductByCategory(
            page,
            categoryName,
            typeNameHome,
            material,
            size
          );
          console.log(data);
          setProducts(data);
          setShowGender(false);
          setShowSmallSize(false);
          setShowBigSize(true);
          setFlag(true);
        }
      } catch (error) {
        console.log("Error products:", error);
      }
    } else if (gender == 1) {
      try {
        if (typeNameHome !== "") {
          const data = await findProductByCategory(
            page,
            categoryName,
            typeNameHome,
            material,
            size
          );
          setFlag(true);
          setProducts(data);
          setShowGender(false);
          setShowSmallSize(true);
          setShowBigSize(false);
        }
      } catch (error) {
        console.log("Error products:", error);
      }
    }
  };

  const handleAddToCart = async (idProduct, nameProduct) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      const availableQuantity = await getProductQuantity(idProduct);
      const quantityInCart = await countProductOnCart(idProduct, headers);

      if (quantityInCart >= availableQuantity) {
        Swal.fire({
          icon: "error",
          title: "Số lượng sản phẩm trong giỏ hàng đã đạt giới hạn!",
          showConfirmButton: false,
          timer: 1500,
          theme: "light",
        });
      } else {
        await addProductToCart(idProduct, headers);

        Swal.fire(`Đã thêm ${nameProduct} vào giỏ`, {
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const data = await totalProductOnCart(headers);
        dispatch(updateCart(data));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Vui lòng đăng nhập để mua hàng !");
      navigate("/rolex-world/login");
    }
  };
  const getAllCategory = async () => {
    try {
      const data = await findAllCategory();
      setCategories(data);
    } catch (Error) {
      console.log("Không tìm thấy dữ liệu!!!!");
    }
  };

  const showCategoryById = async () => {
    try {
      const data = await findCategoryById(categoryName);
      setCategory(data);
    } catch (error) {
      console.log("Error category:", error);
    }
  };
  const handlePickCategory = async (nameCategory) => {
    setTypeName("");
    setMaterial("");
    setSize(0);
    setPage(pages);
    try {
      const data = await findProductByCategory(
        page,
        nameCategory,
        typeName,
        material,
        size
      );
      console.log(data);
      setFlag(true);
      setProducts(data);
    } catch (error) {
      console.log("Error products:", error);
    }
    const checkboxButtons = document.querySelectorAll('input[type="checkbox"]');
    checkboxButtons.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };
  const handleProductSort = async () => {
    try {
      const sort = document.getElementById("price-main").value;
      const data = await findProductsort(page, categoryName, sort);
      setProducts(data);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  function handleMaterial(e) {
    if (material === e.target.value) {
      setMaterial("");
    } else {
      setMaterial(e.target.value);
    }
  }

  function handleSize(e) {
    if (size === e.target.value) {
      setSize("");
    } else {
      setSize(e.target.value);
    }
  }
  function handleType(e) {
    if (typeName === e.target.value) {
      setTypeName("");
    } else {
      setTypeName(e.target.value);
    }
  }



  useEffect(() => {
    ShowProductsByCategory();
    getAllCategory();
    ShowProductsByGender();
  }, [categoryName, showGender, typeNameHome, page, material, size, typeName]);

  useEffect(() => {
    showCategoryById();
    handleProductSort();
    window.scrollTo(0, 0);
    document.title = "ROLEX WORLD | Cửa Hàng";
  }, [location,page]);
  return (
    <>
       <div className="breacrumb-section">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb-text product-more">
              <a href="./home.html">
               Trang chủ
              </a>
              <a>
                <span>Cửa Hàng</span>
              </a>

              <span>{categoryName}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <img
          class="d-main-banner collection-banner alignnone wp-image-11285 size-full"
          src={
            categoryName
              ? category.images2
              : `https://rolex.dafc.com.vn/wp-content/uploads/rolex-watches/family-lady-datejust.jpg`
          }
          alt=""
          width="100%"
          height="230px"
        ></img>
      </div>
      <section className="brand_section layout_padding2">
        <div className="container " style={{ paddingBottom: "40px" }}>
          <div className=""></div>
          <div className="brand_heading ">
            <h4 style={{ textAlign: "center" }}>
              {categoryName
                ? category.title
                : `Mỗi chiếc đồng hồ viết nên một câu chuyện`}
            </h4>
            <h3 className="custom_heading" style={{ textAlign: "center" }}>
              {categoryName ? category.categoryName : `ROLEX`}
            </h3>
            <div className="font-descriptions">
              {categoryName
                ? category.descriptions
                : `Có một câu chuyện về những chiếc đồng hồ cho tù binh và cuộc đào thoát vĩ đại” diễn ra trong thế chiến thứ 2. Chuyện kể rằng, khi bắt đầu cho chiến tranh thế giới thứ 2, Hoàng gia Anh đã trang bị cho phi công của lực lượng không quân những chiếc đồng hồ Rolex bền chắc. Nhưng, khi bị bắt làm tù binh, những chiếc đồng hồ này đã bị tịch thu. Khi biết điều này, người sáng lập đồng hồ Rolex Hans Wilsdorf đã đề nghị cấp 3000 chiếc đồng hồ cho tù binh và không yêu cầu thanh toán. Thêm một câu chuyện khác nữa, năm 1943, khi còn là một từ nhân trong trại tù binh của Đức, Live James Nutting đã yêu cầu một chiếc Rolex Oyster 3525 Chronograph bằng thép không gỉ và trả từ tiền đóng giày trong trại tù. Đây là chiếc đồng hồ Rolex đã giúp làm nên kỳ tích trong cuộc đào tẩu vĩ đại của 76 tù nhân. Chiếc đồng hồ này, năm 2007, được bán đấu giá với mức giá 66.000 bảng Anh – một con số vô cùng ấn tượng.`}
            </div>
          </div>
        </div>

        <div className="container brand_item-container">
          <div className="col-md-3">
            <div className="filter-wrapper">
              <div className="filter-wrapper">
                <div className="search-filter">
                  <span>Lọc Tìm Kiếm</span>
                  <div className="mobile-filter-button-wrapper">
                    <button
                      className="rlx-grid-filters__header-reset inactive cvp-live-reset"
                      type="reset"
                      onClick={handleReset}
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>

                <label for="price">Sắp xếp theo giá:</label>
                <select
                  name="price-main"
                  id="price-main"
                  onChange={() => {
                    handleProductSort();
                  }}
                >
                  <option id="asc" name="asc" value={2}>
                    Từ thấp đến cao
                  </option>
                  <option id="desc" name="desc" value={1}>
                    Từ cao đến thấp
                  </option>
                </select>

                {showGender && (
                  <div
                    className="cvp-live-filter cvp-checkbox "
                    data-name="tx_gender"
                    data-sid="9c91f3d3cq"
                  >
                    <label className="cvp-label">Size</label>
                    <div className="checkbox nu">
                      <label>
                        <input
                          type="checkbox"
                          name="tx_gender"
                          value="Nữ"
                          checked={typeName === "Nữ"}
                          onChange={handleType}
                        />
                        Nữ
                      </label>
                    </div>
                    <div className="checkbox nam">
                      <label>
                        <input
                          type="checkbox"
                          name="tx_gender"
                          value="Nam"
                          checked={typeName === "Nam"}
                          onChange={handleType}
                        />
                        Nam
                      </label>
                    </div>
                  </div>
                )}
                <div
                  className="cvp-live-filter cvp-checkbox "
                  data-name="tx_material"
                  data-sid="9c91f3d3cq"
                >
                  <label className="cvp-label">Chất Liệu</label>
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="tx_material"
                        value="vàng"
                        checked={material === "vàng"}
                        onChange={handleMaterial}
                      />
                      Vàng
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="tx_material"
                        value="oystersteel và vàng"
                        checked={material === "oystersteel và vàng"}
                        onChange={handleMaterial}
                      />
                      Oystersteel và vàng
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="tx_material"
                        value="vàng everose"
                        checked={material === "vàng everose"}
                        onChange={handleMaterial}
                      />
                      Vàng Everose
                    </label>
                  </div>
                  <div className="checkbox gold">
                    <label>
                      <input
                        type="checkbox"
                        name="tx_material"
                        value="bạch kim"
                        onChange={handleMaterial}
                        checked={material === "bạch kim"}
                      />
                      Bạch Kim
                    </label>
                  </div>
                  <div className="checkbox gold">
                    <label>
                      <input
                        type="checkbox"
                        name="tx_material"
                        value="kim cương"
                        checked={material === "kim cương"}
                        onChange={handleMaterial}
                      />
                      Kim cương
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="tx_material"
                        value="Oystersteel"
                        checked={material === "Oystersteel"}
                        onChange={handleMaterial}
                      />
                      Oystersteel
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="tx_material"
                        value="Titanium RLX"
                        checked={material === "Titanium RLX"}
                        onChange={handleMaterial}
                      />
                      Titanium RLX
                    </label>
                  </div>
                </div>

                <div
                  className="cvp-live-filter cvp-checkbox "
                  data-name="tx_material"
                  data-sid="9c91f3d3cq"
                  onChange={handleSize}
                >
                  <label className="cvp-label">Kích thước</label>
                  <div className="checkbox">
                    {showSmallSize && (
                      <label>
                        <input
                          type="checkbox"
                          name="tx_size"
                          value="1"
                          checked={size === "1"}
                          onChange={handleSize}
                        />
                        Cỡ Nhỏ
                      </label>
                    )}
                  </div>
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="tx_size"
                        value="2"
                        checked={size === "2"}
                        onChange={handleSize}
                      />
                      Cỡ Trung
                    </label>
                  </div>
                  <div className="checkbox">
                    {showBigSize && (
                      <label>
                        <input
                          type="checkbox"
                          name="tx_size"
                          value="3"
                          onChange={handleSize}
                          checked={size === "3"}
                        />
                        Cỡ Lớn
                      </label>
                    )}
                  </div>
                </div>

                <div
                  className="cvp-live-filter cvp-checkbox "
                  data-name="tx_product_cat"
                  data-sid="9c91f3d3cq"
                >
                  <div className="checkbox"></div>
                  <div className="checkbox">
                    <label className="cvp-label">BỘ SƯU TẬP</label>
                  </div>
                  {categories.map((cate) => {
                    return (
                      <div className="checkbox">
                        <Link
                          onClick={(ct) => {
                            handlePickCategory(ct.categoryName);
                          }}
                          to={`/rolex-world/products/list?page=0&&categoryName=${cate.categoryName}&&typeName=${typeName}&&material=${material}&&sizePage=${size}`}
                        >
                          <label>{cate.categoryName}</label>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9 rolex-collection-view">
            {products.totalElements == 0 ||
            products.numberOfElement == 0 ||
            products.content == [] ||
            products.empty == true ? (
              <>
                <div style={{marginTop:"50px"}}> 
                  <div className="not-data">Không có sản phẩm</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 650 512"
                    id="surprise"
                  >
                    <path
                      fill="#dbe8ec"
                      d="M577.56357,272.68531V254.49414a13.07945,13.07945,0,0,0-13.07945-13.07945h-46.166a13.07945,13.07945,0,0,1-13.07945-13.07945V210.14408a13.07945,13.07945,0,0,1,13.07945-13.07945h1.45764a13.07945,13.07945,0,0,0,13.07946-13.07945V165.794a13.07945,13.07945,0,0,0-13.07946-13.07945H147.8686A13.07945,13.07945,0,0,0,134.78915,165.794v18.19117a13.07945,13.07945,0,0,0,13.07945,13.07945h0a13.07945,13.07945,0,0,1,13.07945,13.07945v18.19116a13.07945,13.07945,0,0,1-13.07945,13.07945H97.28922a13.07945,13.07945,0,0,0-13.07946,13.07945v18.19117a13.07945,13.07945,0,0,0,13.07946,13.07945H117.1358a13.07945,13.07945,0,0,1,13.07945,13.07945v18.19125a13.07945,13.07945,0,0,1-13.07945,13.07945h-.048a13.07945,13.07945,0,0,0-13.07945,13.07945v18.19108a13.07945,13.07945,0,0,0,13.07945,13.07945h2.87138a13.07945,13.07945,0,0,1,13.07946,13.07945v18.19125A13.07945,13.07945,0,0,1,119.95922,418.815H72.83472a13.07945,13.07945,0,0,0-13.07946,13.07945v18.19117a13.07945,13.07945,0,0,0,13.07946,13.07945h453.963a13.07945,13.07945,0,0,0,13.07946-13.07945V431.89449A13.07945,13.07945,0,0,0,526.79773,418.815H515.45721a13.07945,13.07945,0,0,1-13.07945-13.07945V387.54434a13.07945,13.07945,0,0,1,13.07945-13.07945h26.73986a13.07945,13.07945,0,0,0,13.07945-13.07945V343.19436a13.07945,13.07945,0,0,0-13.07945-13.07945h-8.11163A13.07945,13.07945,0,0,1,521.006,317.03546V298.84421a13.07945,13.07945,0,0,1,13.07945-13.07945h30.39868A13.07945,13.07945,0,0,0,577.56357,272.68531Z"
                    />
                    <circle
                      cx="324.318"
                      cy="275.399"
                      r="173.618"
                      fill="#dbe8ec"
                    />
                    <polygon
                      fill="#db620f"
                      points="388.771 216.023 483.233 266.484 483.233 413.627 388.771 363.166 388.771 216.023"
                    />
                    <polygon
                      fill="#ee781d"
                      points="388.771 216.023 168.157 266.484 168.157 413.627 388.771 363.166 388.771 216.023"
                    />
                    <polygon
                      fill="#f98232"
                      points="350.925 169.448 130.312 219.909 168.157 266.131 388.771 215.67 350.925 169.448"
                    />
                    <polygon
                      fill="#f98232"
                      points="262.619 463.734 168.157 413.274 168.157 266.131 262.619 316.591 262.619 463.734"
                    />
                    <polygon
                      fill="#fc934c"
                      points="224.774 350.198 130.312 299.737 168.157 266.131 262.619 316.591 224.774 350.198"
                    />
                    <polygon
                      fill="#ee781d"
                      points="483.233 266.131 388.771 215.67 426.616 182.063 521.079 232.524 483.233 266.131"
                    />
                    <polygon
                      fill="#ee781d"
                      points="262.619 463.734 483.233 413.274 483.233 266.131 262.619 316.591 262.619 463.734"
                    />
                    <polygon
                      fill="#f98232"
                      points="262.619 317.298 483.233 266.837 521.079 307.66 300.465 358.12 262.619 317.298"
                    />
                    <path
                      fill="#ee781d"
                      d="M114.36325,91.7337a51.90454,51.90454,0,0,1,15.04488.02371,56.50939,56.50939,0,0,1,14.62741,4.02047,46.81731,46.81731,0,0,1,12.84236,8.15A39.93979,39.93979,0,0,1,166.041,115.883a60.65364,60.65364,0,0,0-10.42535-10.44415,58.18131,58.18131,0,0,0-12.57875-7.3455,59.22817,59.22817,0,0,0-6.86-2.5375c-2.32836-.749-4.71059-1.32712-7.10784-1.86671A94.80386,94.80386,0,0,0,114.36325,91.7337Z"
                    />
                    <path
                      fill="#3086a3"
                      d="M422.42815,114.42574a51.90172,51.90172,0,0,1,3.78974-14.55983,56.50007,56.50007,0,0,1,7.55494-13.155,46.82051,46.82051,0,0,1,11.10558-10.39282,39.94948,39.94948,0,0,1,13.86858-5.878,60.67271,60.67271,0,0,0-12.72171,7.4783,58.16915,58.16915,0,0,0-10.2609,10.33913,59.19959,59.19959,0,0,0-4.17413,6.0061c-1.30813,2.06666-2.46441,4.22847-3.587,6.41428A94.7953,94.7953,0,0,0,422.42815,114.42574Z"
                    />
                    <path
                      fill="#d62828"
                      d="M300.68681,101.31857a51.90055,51.90055,0,0,1-1.515-14.96849,56.501,56.501,0,0,1,2.50379-14.9617A46.82043,46.82043,0,0,1,308.46945,57.78a39.94034,39.94034,0,0,1,10.95547-10.33759A60.65439,60.65439,0,0,0,310.10161,58.881,58.17477,58.17477,0,0,0,304.081,72.1448a59.18834,59.18834,0,0,0-1.82263,7.0837c-.507,2.39275-.83854,4.82154-1.13018,7.26141A94.79721,94.79721,0,0,0,300.68681,101.31857Z"
                    />
                    <path
                      fill="#ee781d"
                      d="M491.65466,160.97813a51.90427,51.90427,0,0,1,3.69658-14.58381,56.50151,56.50151,0,0,1,7.47065-13.20279A46.8217,46.8217,0,0,1,513.86082,122.728a39.94886,39.94886,0,0,1,13.83072-5.96663,60.67084,60.67084,0,0,0-12.67365,7.55954,58.17589,58.17589,0,0,0-10.19457,10.40442,59.19343,59.19343,0,0,0-4.13569,6.03285c-1.29491,2.07491-2.43727,4.24375-3.54589,6.43693A94.79538,94.79538,0,0,0,491.65466,160.97813Z"
                    />
                    <path
                      fill="#3086a3"
                      d="M204.4484,183.55543a2.54334,2.54334,0,0,1,1.27772,1.17282,5.53475,5.53475,0,0,1,.50062,1.7084c.17312,1.16512.14875,2.32192.25035,3.41619a3.80633,3.80633,0,0,0,.86331,2.60034,1.73611,1.73611,0,0,0,2.11368-.13921,26.82174,26.82174,0,0,0,2.52535-2.00469,7.74536,7.74536,0,0,1,3.47861-1.91814,3.3221,3.3221,0,0,1,2.46786.58394,3.54309,3.54309,0,0,1,.918.928,4.74889,4.74889,0,0,1,.48259,1.08072,12.48042,12.48042,0,0,1,.30293,3.77408,10.7,10.7,0,0,0,.14317,2.97731,1.15292,1.15292,0,0,0,.45942.73609,1.00829,1.00829,0,0,0,.74387.1968,5.92057,5.92057,0,0,0,2.43278-1.29324,19.3567,19.3567,0,0,1,2.96473-1.99822,4.26216,4.26216,0,0,1,2.07952-.51187,3.0598,3.0598,0,0,1,2.10749.93166,3.747,3.747,0,0,1,.88439,1.93631,8.86562,8.86562,0,0,1,.06654,1.83807c-.0805,1.17282-.2493,2.28311-.2867,3.38324a3.16051,3.16051,0,0,0,1.08616,2.92557,2.54785,2.54785,0,0,1-1.28-1.171,5.529,5.529,0,0,1-.504-1.7084c-.17417-1.16512-.15161-2.32223-.25415-3.4162a3.80585,3.80585,0,0,0-.86309-2.6,1.72573,1.72573,0,0,0-2.1086.12935,26.76,26.76,0,0,0-2.52592,1.99915,7.78584,7.78584,0,0,1-3.473,1.92214,3.32507,3.32507,0,0,1-2.46927-.56977,3.48086,3.48086,0,0,1-.9239-.92273,4.59972,4.59972,0,0,1-.49211-1.08042,12.303,12.303,0,0,1-.30767-3.7787,10.71646,10.71646,0,0,0-.13868-2.98285,2.41962,2.41962,0,0,0-.18678-.47492c-.10253-.08038-.14076-.2239-.27-.26856a1.021,1.021,0,0,0-.74043-.2042,5.88579,5.88579,0,0,0-2.4302,1.28955,19.66632,19.66632,0,0,1-2.96068,1.99976,4.29214,4.29214,0,0,1-2.07358.51988,3.05362,3.05362,0,0,1-2.11051-.92366,3.73689,3.73689,0,0,1-.88663-1.93477,8.72118,8.72118,0,0,1-.06654-1.83776c.08067-1.17251.24918-2.28311.28781-3.38355A3.15817,3.15817,0,0,0,204.4484,183.55543Z"
                    />
                    <path
                      fill="#ee781d"
                      d="M325.4886,127.90555a2.731,2.731,0,0,1-.0785,1.77893,5.3435,5.3435,0,0,1-.99737,1.53347c-.80129.90826-1.73325,1.64866-2.52653,2.44942A3.88056,3.88056,0,0,0,320.425,136.094a1.93261,1.93261,0,0,0,1.461,1.73182,25.42939,25.42939,0,0,0,3.20241.82232,7.74264,7.74264,0,0,1,3.71746,1.67637,3.56785,3.56785,0,0,1,1.04766,2.30436,3.63626,3.63626,0,0,1-.11845,1.29293,4.73063,4.73063,0,0,1-.50572,1.09582,12.23469,12.23469,0,0,1-2.76256,2.74909,10.435,10.435,0,0,0-2.23382,2.082,1.33545,1.33545,0,0,0-.27344.90579,1.28317,1.28317,0,0,0,.33737.81124,5.85845,5.85845,0,0,0,2.56118,1.20022,18.9973,18.9973,0,0,1,3.48229,1.1839,6.9615,6.9615,0,0,1,.89754.55161,3.96481,3.96481,0,0,1,.78774.84419,3.33188,3.33188,0,0,1,.58048,2.23568,3.89789,3.89789,0,0,1-.90918,1.96588,8.40237,8.40237,0,0,1-1.393,1.28215c-.975.71546-1.96155,1.313-2.84635,2.01547a3.31215,3.31215,0,0,0-1.55855,2.81254,2.734,2.734,0,0,1,.07638-1.77955,5.34856,5.34856,0,0,1,.99571-1.53563c.801-.90887,1.73212-1.6505,2.52479-2.45188a3.8759,3.8759,0,0,0,1.46063-2.4254,1.92512,1.92512,0,0,0-1.45286-1.73273,25.396,25.396,0,0,0-3.19907-.826,7.7689,7.7689,0,0,1-3.7174-1.67175,3.75373,3.75373,0,0,1-.94425-3.59236,4.68387,4.68387,0,0,1,.50037-1.10167,12.08373,12.08373,0,0,1,2.76281-2.75433,10.43784,10.43784,0,0,0,2.24-2.082,1.336,1.336,0,0,0,.27984-.90733,1.2994,1.2994,0,0,0-.33027-.8137,5.8425,5.8425,0,0,0-2.55836-1.19992,19.24836,19.24836,0,0,1-3.48124-1.18021,6.78587,6.78587,0,0,1-.89771-.54883,3.93161,3.93161,0,0,1-.78987-.83957,3.3235,3.3235,0,0,1-.58548-2.23353,3.89025,3.89025,0,0,1,.907-1.96557,8.30164,8.30164,0,0,1,1.39272-1.28215c.97486-.71515,1.9611-1.31326,2.84662-2.01516A3.31055,3.31055,0,0,0,325.4886,127.90555Z"
                    />
                    <path
                      fill="#3086a3"
                      d="M384.45844,175.46753a3.929,3.929,0,0,1,1.14266-1.6469,5.53071,5.53071,0,0,1,1.81976-.96618c1.30388-.42336,2.64574-.56739,3.87414-.87516a4.44332,4.44332,0,0,0,2.86132-1.64108,3.0904,3.0904,0,0,0,.19023-2.9257,22.14509,22.14509,0,0,0-1.99276-3.13718,8.0582,8.0582,0,0,1-1.67575-4.23592,5.08616,5.08616,0,0,1,2.516-4.30313,11.93707,11.93707,0,0,1,4.257-1.12285,9.97286,9.97286,0,0,0,3.34754-.76865A2.76269,2.76269,0,0,0,402.1314,151.66a6.07154,6.07154,0,0,0-1.14885-3.01758,18.29423,18.29423,0,0,1-1.981-3.66309,5.07912,5.07912,0,0,1-.23085-2.38157,4.77931,4.77931,0,0,1,.94434-2.19876,5.83373,5.83373,0,0,1,3.97745-1.88012c1.36246-.14371,2.66293-.13674,3.91915-.33662a4.24008,4.24008,0,0,0,3.13211-1.9395,3.93482,3.93482,0,0,1-1.14118,1.64832,5.54654,5.54654,0,0,1-1.819.96918c-1.30389.42435-2.64576.57-3.87391.87836a4.45292,4.45292,0,0,0-2.86165,1.6389,3.09573,3.09573,0,0,0-.1982,2.92337,22.06659,22.06659,0,0,0,1.98662,3.13747,8.13376,8.13376,0,0,1,1.68389,4.231,5.11359,5.11359,0,0,1-2.5006,4.31717,11.80021,11.80021,0,0,1-4.26014,1.12956,9.99857,9.99857,0,0,0-3.35384.76441,2.756,2.756,0,0,0-1.34557,2.17794,5.994,5.994,0,0,0,1.14218,3.0151A18.49781,18.49781,0,0,1,396.186,166.732a5.06474,5.06474,0,0,1,.23875,2.37834,4.73513,4.73513,0,0,1-.94041,2.19962,5.80578,5.80578,0,0,1-3.97372,1.88236c-1.3622.14394-2.66273.13733-3.91946.33608A4.23509,4.23509,0,0,0,384.45844,175.46753Z"
                    />
                    <path
                      fill="#f9ae2b"
                      d="M405.44974,228.14549a3.92975,3.92975,0,0,1,.69694-1.87933,5.53527,5.53527,0,0,1,1.522-1.38872c1.15751-.73455,2.42134-1.20792,3.53454-1.81158a4.44267,4.44267,0,0,0,2.36286-2.30158,3.09016,3.09016,0,0,0-.54377-2.88092,22.11914,22.11914,0,0,0-2.71073-2.54243,8.059,8.059,0,0,1-2.67715-3.68568,5.08558,5.08558,0,0,1,1.366-4.79382,11.92471,11.92471,0,0,1,3.84368-2.147,9.98,9.98,0,0,0,3.05093-1.57751,2.76371,2.76371,0,0,0,.74716-2.44788,6.07252,6.07252,0,0,0-1.86366-2.63668,18.29194,18.29194,0,0,1-2.83015-3.05492,5.07767,5.07767,0,0,1-.81627-2.24923,4.77635,4.77635,0,0,1,.36745-2.36442,5.83134,5.83134,0,0,1,3.3845-2.81069c1.28371-.47861,2.545-.79553,3.712-1.30155a4.23988,4.23988,0,0,0,2.55093-2.65793,3.93743,3.93743,0,0,1-.69507,1.88057,5.547,5.547,0,0,1-1.52064,1.39118c-1.15731.73547-2.42071,1.21039-3.53341,1.815a4.45075,4.45075,0,0,0-2.36373,2.29943,3.09513,3.09513,0,0,0,.53542,2.8806,22.07738,22.07738,0,0,0,2.70495,2.54459,8.13256,8.13256,0,0,1,2.68385,3.67891,5.113,5.113,0,0,1-1.34766,4.80336,11.80114,11.80114,0,0,1-3.845,2.15437,9.99373,9.99373,0,0,0-3.05821,1.57474,2.75616,2.75616,0,0,0-.76124,2.44419,5.99588,5.99588,0,0,0,1.85666,2.63637,18.48127,18.48127,0,0,1,2.83166,3.04968,5.06446,5.06446,0,0,1,.82313,2.244,4.73783,4.73783,0,0,1-.36343,2.36441,5.80686,5.80686,0,0,1-3.38032,2.81223c-1.28355.47831-2.54479.79554-3.71248,1.30094A4.23419,4.23419,0,0,0,405.44974,228.14549Z"
                    />
                    <path
                      fill="#3086a3"
                      d="M271.74238 228.77533a2.27725 2.27725 0 01.90245 1.39826 5.99635 5.99635 0 01.0281 1.70532c-.11895 1.12077-.40517 2.19041-.56963 3.23356a3.751 3.751 0 00.13563 2.60434c.39848.47368.97909.52512 1.88348.137a29.83438 29.83438 0 002.72135-1.48757 7.85846 7.85846 0 013.58183-1.28308 2.9772 2.9772 0 012.33742 1.03422 3.13509 3.13509 0 01.65085 1.1451 4.49493 4.49493 0 01.16154 1.13462 13.0385 13.0385 0 01-.641 3.55725 11.29968 11.29968 0 00-.59725 2.81316 2.34783 2.34783 0 00.04439.47337c.068.08131.05743.20728.14768.2504.10955.16231.26487.214.53658.24054a6.10339 6.10339 0 002.51407-.8482 20.13067 20.13067 0 013.12149-1.39364 4.29242 4.29242 0 012.05718-.18849 2.68447 2.68447 0 011.87671 1.34282 3.53812 3.53812 0 01.32252 2.045 9.89665 9.89665 0 01-.40037 1.709c-.35808 1.06625-.77448 2.05982-1.08212 3.07155a2.95662 2.95662 0 00.25046 2.96992 2.28238 2.28238 0 01-.90539-1.397 5.98739 5.98739 0 01-.03164-1.70624c.11792-1.12108.40241-2.19164.56587-3.23479a3.74975 3.74975 0 00-.13584-2.60434c-.3955-.47646-.97389-.531-1.87608-.146a29.64829 29.64829 0 00-2.72106 1.482 7.90817 7.90817 0 01-3.57637 1.28738 2.98233 2.98233 0 01-2.34157-1.01728 3.18731 3.18731 0 01-.66436-1.14232 4.59348 4.59348 0 01-.16683-1.13709 12.82611 12.82611 0 01.6376-3.5631 11.31576 11.31576 0 00.60306-2.81747 2.19929 2.19929 0 00-.04358-.47615c-.06665-.08654-.0536-.21251-.14492-.25594-.10743-.16415-.26461-.214-.5307-.24639a6.06785 6.06785 0 00-2.51021.84512 20.45788 20.45788 0 01-3.11765 1.39611 4.33014 4.33014 0 01-2.0518.198 2.68764 2.68764 0 01-1.88248-1.33389 3.53076 3.53076 0 01-.32518-2.04473 9.69593 9.69593 0 01.40046-1.70871c.35827-1.06594.77442-2.06012 1.08338-3.07155A2.95423 2.95423 0 00271.74238 228.77533zM229.70641 57.20681a3.52284 3.52284 0 01.19148 1.92676 5.3692 5.3692 0 01-.7649 1.83776c-.70495 1.11892-1.60238 2.06105-2.3211 3.05123a4.25094 4.25094 0 00-1.11528 2.95021 2.71544 2.71544 0 001.74376 2.11 22.76385 22.76385 0 003.47973.88115 7.94883 7.94883 0 014.00764 1.85285 4.65474 4.65474 0 01.92146 4.81291 11.91486 11.91486 0 01-2.47223 3.46024 10.002 10.002 0 00-2.01342 2.63206 2.28716 2.28716 0 00.38147 2.28772 5.96165 5.96165 0 002.79711 1.33852 18.36775 18.36775 0 013.81392 1.26367 4.79952 4.79952 0 011.76614 1.52392 4.34389 4.34389 0 01.75355 2.23629 5.61568 5.61568 0 01-1.81843 3.868c-.92237.94583-1.888 1.74844-2.70175 2.6684a3.92748 3.92748 0 00-1.13358 3.35337 3.52945 3.52945 0 01-.19366-1.92708 5.37986 5.37986 0 01.7627-1.8393c.70446-1.11953 1.60081-2.0629 2.31881-3.05369a4.25882 4.25882 0 001.1167-2.94867 2.71855 2.71855 0 00-1.73642-2.1131 22.6882 22.6882 0 00-3.47582-.88515 7.97955 7.97955 0 01-4.00793-1.847 4.66558 4.66558 0 01-.9438-4.81107 11.777 11.777 0 012.47068-3.467 10.02485 10.02485 0 002.0207-2.63267 2.296 2.296 0 00-.36563-2.293 5.94091 5.94091 0 00-2.79366-1.33912 18.56062 18.56062 0 01-3.8128-1.25906 4.79043 4.79043 0 01-1.76937-1.51591 4.313 4.313 0 01-.75707-2.23444 5.59106 5.59106 0 011.81431-3.86709c.92225-.94583 1.88765-1.74875 2.70229-2.66809A3.92378 3.92378 0 00229.70641 57.20681z"
                    />
                    <path
                      fill="#ee781d"
                      d="M220.5256,130.08166a6.30757,6.30757,0,1,0-7.49707-4.83373,6.37855,6.37855,0,0,0,7.49707,4.83373Z"
                    />
                    <path
                      fill="#3086a3"
                      d="M339.58814,71.84194a6.30757,6.30757,0,1,0-7.49707-4.83373,6.37856,6.37856,0,0,0,7.49707,4.83373Z"
                    />
                    <path
                      fill="#dbe8ec"
                      d="M353.69685 126.40723a6.30757 6.30757 0 10-7.49707-4.83373 6.37856 6.37856 0 007.49707 4.83373zM319.99109 211.27861a6.30757 6.30757 0 10-7.49707-4.83373 6.37858 6.37858 0 007.49707 4.83373zM365.51551 250.61738a6.30757 6.30757 0 10-7.49707-4.83373 6.37857 6.37857 0 007.49707 4.83373z"
                    />
                    <path
                      fill="#f9ae2b"
                      d="M326.33167,280.39271a6.30757,6.30757,0,1,0-7.49707-4.83373,6.37857,6.37857,0,0,0,7.49707,4.83373Z"
                    />
                    <path
                      fill="#3086a3"
                      d="M477.2445,225.16893a6.30758,6.30758,0,1,0-7.49708-4.83373,6.37858,6.37858,0,0,0,7.49708,4.83373Z"
                    />
                    <path
                      fill="#d62828"
                      d="M492.78919 129.3524a6.30757 6.30757 0 10-7.49707-4.83373 6.37857 6.37857 0 007.49707 4.83373zM175.82933 222.18873a6.30757 6.30757 0 10-7.49707-4.83373 6.37857 6.37857 0 007.49707 4.83373z"
                    />
                    <path
                      fill="#3086a3"
                      d="M194.77545 263.25858a6.30758 6.30758 0 10-7.49708-4.83372 6.37855 6.37855 0 007.49708 4.83372zM285.531 109.93981h0v0a31.66032 31.66032 0 00-5.87316 16.80153v0h0a31.66036 31.66036 0 00-16.80154-5.87316h0l0 0a31.66036 31.66036 0 005.87316-16.80154v0l0 0A31.66032 31.66032 0 00285.531 109.93981zM176.73063 157.02039h0a31.66036 31.66036 0 00-5.87316 16.80154v0h0a31.66024 31.66024 0 00-16.80153-5.87316l0 0h0a31.66036 31.66036 0 005.87316-16.80154v0l0 0A31.66044 31.66044 0 00176.73063 157.02039z"
                    />
                    <path
                      fill="#f9ae2b"
                      d="M268.78094,180.81586h0v0a31.66033,31.66033,0,0,0-5.87316,16.80154v0l0,0a31.66036,31.66036,0,0,0-16.80154-5.87316h0l0,0a31.66033,31.66033,0,0,0,5.87316-16.80154v0l0,0A31.66032,31.66032,0,0,0,268.78094,180.81586Z"
                    />
                    <path
                      fill="#ee781d"
                      d="M397.6011,85.73366h0l0,0a31.66038,31.66038,0,0,0-5.87316,16.80153v0h0A31.66027,31.66027,0,0,0,374.9264,96.662h0l0,0a31.66044,31.66044,0,0,0,5.87316-16.80154v0A31.66036,31.66036,0,0,0,397.6011,85.73366Z"
                    />
                    <path
                      fill="#3086a3"
                      d="M375.52119,189.2533l0,0h0a31.66044,31.66044,0,0,0-5.87316,16.80154v0a31.66044,31.66044,0,0,0-16.80154-5.87316h0a31.66027,31.66027,0,0,0,5.87316-16.80154l0,0h0A31.66027,31.66027,0,0,0,375.52119,189.2533Z"
                    />
                    <path
                      fill="#d62828"
                      d="M474.22057,161.72832h0v0a31.66036,31.66036,0,0,0-5.87316,16.80154v0l0,0a31.66036,31.66036,0,0,0-16.80154-5.87316h0l0,0a31.66032,31.66032,0,0,0,5.87316-16.80153v0h0A31.66032,31.66032,0,0,0,474.22057,161.72832Z"
                    />
                    <path
                      fill="#3086a3"
                      d="M538.13528,165.11418h0v0a31.66033,31.66033,0,0,0-5.87316,16.80154v0l0,0a31.66036,31.66036,0,0,0-16.80154-5.87316h0l0,0a31.66033,31.66033,0,0,0,5.87316-16.80154h0A31.66032,31.66032,0,0,0,538.13528,165.11418Z"
                    />
                    <path
                      fill="#f9ae2b"
                      d="M433.7655,253.16829h0l0,0a31.66041,31.66041,0,0,0-5.87316,16.80153v0h0a31.66036,31.66036,0,0,0-16.80154-5.87316h0l0,0a31.66044,31.66044,0,0,0,5.87316-16.80154v0A31.66036,31.66036,0,0,0,433.7655,253.16829Z"
                    />
                    <path
                      fill="#dbe8ec"
                      d="M253.94862,257.42575h0l0,0a31.66044,31.66044,0,0,0-5.87316,16.80154v0a31.66036,31.66036,0,0,0-16.80154-5.87316h0v0a31.66024,31.66024,0,0,0,5.87316-16.80153l0,0h0A31.66036,31.66036,0,0,0,253.94862,257.42575Z"
                    />
                  </svg>
                </div>
              </>
            ) : (
              <div className="row">
                {products.content &&
                  products.content.map((product, index) => {
                    const backgroundImageStyle = {
                      backgroundImage: `url(${product.img})`,
                    };
                    return (
                      <div className="brand_item-box" key={`product_${index}`}>
                        <div
                          className="brand_img-box"
                          style={backgroundImageStyle}
                        >
                          <Link
                            to={`/rolex-world/details/${product.productId}/${product.categoryId.categoryId}`}
                            style={{ color: "#fff" }}
                          >
                            Xem Chi Tiết
                          </Link>
                        </div>
                        <div className="brand_detail-box">
                          <div className="name-product">
                            <div
                              style={{ fontWeight: "bold", fontSize: "17px" }}
                            >
                              {product.productName}
                            </div>
                          </div>

                          <div className="info-product">
                            {product.designs}, {product.size} mm,{" "}
                            {product.material}
                          </div>
                          <button
                            onClick={() =>
                              handleAddToCart(
                                product.productId,
                                product.productName
                              )
                            }
                          >
                            Thêm Giỏ Hàng
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {products.totalPages > 1 ? (
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="ps-pagination">
                  <ul className="pagination justify-content-center">
                    {page > 0 && (
                      <li className="page-item">
                        <a
                          className="page-link"
                          rel="noindex, nofollow"
                          onClick={() => {
                            prevPage();
                            setActivePage(page - 1);
                          }}
                        >
                          ‹
                        </a>
                      </li>
                    )}
                    {Array.from({ length: products.totalPages }, (_, index) => (
                      <li
                        key={index}
                        className={`page-item${
                          activePage === index ? " active" : ""
                        }`}
                      >
                        <a
                          className="page-link"
                          rel="noindex, nofollow"
                          onClick={() => {
                            setPage(index);
                            setActivePage(index);
                          }}
                        >
                          <sub>{index + 1}</sub>
                        </a>
                      </li>
                    ))}
                    {page < products.totalPages - 1 && (
                      <li className="page-item">
                        <a
                          className="page-link"
                          rel="noindex, nofollow"
                          onClick={() => {
                            nextPage();
                            setActivePage(page + 1);
                          }}
                        >
                          ›
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
