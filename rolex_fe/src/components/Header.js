import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm state để theo dõi trạng thái đăng nhập
  const [username, setUsername] = useState(localStorage.getItem("username")); // Thêm state để lưu trữ tên người dùng


  // Hàm xử lý logout
  const handleLogout = () => {
    // Xóa token khỏi Local Storage
    localStorage.removeItem("token");

    // Reset trạng thái đăng nhập và tên người dùng
    setIsLoggedIn(false);
    setUsername(null);

    // Điều hướng về trang đăng nhập
    navigate("/rolex-world");
  };

  // Kiểm tra trạng thái đăng nhập
  const checkLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Lấy tên người dùng từ token hoặc từ API nếu có
      const usernameFromToken = localStorage.getItem("name");; // Thay bằng phương thức lấy tên người dùng từ token hoặc API
      setUsername(usernameFromToken);
    }
  };  

  // Kiểm tra trạng thái đăng nhập khi thành phần được render
  useEffect(() => {
    checkLoggedIn();
    setUsername(localStorage.getItem("username"))
  }, [location]);
  return (
    <>
      <header className="header_section sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
            <NavLink
              className="navbar-brand"
              to="/rolex-world"
              style={{ position: "relative", right: "70px" }}
            >
              <a aria-label="Quay về trang chủ" href="/vi">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 456.6 494.7"
                  alt=""
                  aria-hidden="true"
                  style={{ width: "50px", height: "50px" }}
                >
                  <linearGradient
                    id="b"
                    x1="-8.035"
                    x2="430.509"
                    y1="206.645"
                    y2="284.926"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#e8c798"></stop>
                    <stop offset="0.139" stop-color="#e8c89b"></stop>
                    <stop offset="0.241" stop-color="#ebcda4"></stop>
                    <stop offset="0.316" stop-color="#edd3b0"></stop>
                    <stop offset="0.399" stop-color="#ecd0a9"></stop>
                    <stop offset="0.482" stop-color="#e9ca9d"></stop>
                    <stop offset="0.757" stop-color="#e7c89a"></stop>
                    <stop offset="0.769" stop-color="#c8a77f"></stop>
                    <stop offset="0.79" stop-color="#a07e5e"></stop>
                    <stop offset="0.811" stop-color="#816046"></stop>
                    <stop offset="0.832" stop-color="#6a4b35"></stop>
                    <stop offset="0.854" stop-color="#5c3d2b"></stop>
                    <stop offset="0.877" stop-color="#533624"></stop>
                    <stop offset="0.901" stop-color="#503322"></stop>
                  </linearGradient>
                  <linearGradient
                    id="c"
                    x1="111.356"
                    x2="409.373"
                    y1="206.84"
                    y2="311.671"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.12" stop-color="#f3dfbd"></stop>
                    <stop offset="0.257" stop-color="#f0dbb9"></stop>
                    <stop offset="0.382" stop-color="#e7cfac"></stop>
                    <stop offset="0.503" stop-color="#d9ba96"></stop>
                    <stop offset="0.62" stop-color="#c69f7a"></stop>
                    <stop offset="0.691" stop-color="#b98b67"></stop>
                  </linearGradient>
                  <linearGradient
                    id="d"
                    x1="-7.272"
                    x2="431.272"
                    y1="205.232"
                    y2="283.513"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#e8c798"></stop>
                    <stop offset="0.139" stop-color="#e8c89b"></stop>
                    <stop offset="0.241" stop-color="#ebcda4"></stop>
                    <stop offset="0.316" stop-color="#edd3b0"></stop>
                    <stop offset="0.399" stop-color="#ecd0a9"></stop>
                    <stop offset="0.482" stop-color="#e9ca9d"></stop>
                    <stop offset="0.714" stop-color="#e7c89a"></stop>
                    <stop offset="0.749" stop-color="#efd8b7"></stop>
                    <stop offset="0.784" stop-color="#f5e5cf"></stop>
                    <stop offset="0.821" stop-color="#faefe0"></stop>
                    <stop offset="0.86" stop-color="#fdf5ea"></stop>
                    <stop offset="0.901" stop-color="#fef7ee"></stop>
                  </linearGradient>
                  <linearGradient
                    id="e"
                    x1="229.976"
                    x2="209.978"
                    y1="118.482"
                    y2="537.763"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0.581"
                      stop-color="#fcfbe9"
                      stop-opacity="0"
                    ></stop>
                    <stop
                      offset="0.628"
                      stop-color="#eee6d0"
                      stop-opacity="0.181"
                    ></stop>
                    <stop
                      offset="0.725"
                      stop-color="#ccb592"
                      stop-opacity="0.554"
                    ></stop>
                    <stop offset="0.842" stop-color="#a37b4c"></stop>
                    <stop offset="0.843" stop-color="#9e764b"></stop>
                    <stop offset="0.858" stop-color="#6e543e"></stop>
                    <stop offset="0.873" stop-color="#4a3a31"></stop>

                    <stop offset="0.889" stop-color="#2f2624"></stop>
                    <stop offset="0.904" stop-color="#1c1718"></stop>
                    <stop offset="0.92" stop-color="#0f0c0d"></stop>
                    <stop offset="0.937" stop-color="#070506"></stop>
                    <stop offset="0.955" stop-color="#050304"></stop>
                  </linearGradient>
                  <linearGradient
                    id="f"
                    x1="-8.035"
                    x2="430.509"
                    y1="206.645"
                    y2="284.926"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#e8c798"></stop>
                    <stop offset="0.102" stop-color="#e8c89b"></stop>
                    <stop offset="0.178" stop-color="#ebcda4"></stop>
                    <stop offset="0.234" stop-color="#edd3b0"></stop>
                    <stop offset="0.357" stop-color="#ecd0a9"></stop>
                    <stop offset="0.482" stop-color="#e9ca9d"></stop>
                    <stop offset="0.796" stop-color="#e7c89a"></stop>
                    <stop offset="0.888" stop-color="#967456"></stop>
                    <stop offset="0.964" stop-color="#62432f"></stop>
                    <stop offset="1" stop-color="#503322"></stop>
                  </linearGradient>
                  <linearGradient
                    id="g"
                    x1="392.616"
                    x2="25.121"
                    y1="181.809"
                    y2="331.512"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0.803"
                      stop-color="#fcfbe9"
                      stop-opacity="0"
                    ></stop>
                    <stop
                      offset="0.812"
                      stop-color="#eee6d0"
                      stop-opacity="0.181"
                    ></stop>
                    <stop
                      offset="0.831"
                      stop-color="#ccb592"
                      stop-opacity="0.554"
                    ></stop>
                    <stop offset="0.854" stop-color="#a37b4c"></stop>
                    <stop offset="0.855" stop-color="#9e764b"></stop>
                    <stop offset="0.868" stop-color="#6e543e"></stop>
                    <stop offset="0.882" stop-color="#4a3a31"></stop>
                    <stop offset="0.896" stop-color="#2f2624"></stop>
                    <stop offset="0.91" stop-color="#1c1718"></stop>
                    <stop offset="0.924" stop-color="#0f0c0d"></stop>
                    <stop offset="0.939" stop-color="#070506"></stop>
                    <stop offset="0.955" stop-color="#050304"></stop>
                  </linearGradient>
                  <radialGradient
                    id="h"
                    cx="30.8"
                    cy="146.5"
                    r="32.89"
                    fx="23.585"
                    fy="166.478"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#fffefa"></stop>
                    <stop offset="0.248" stop-color="#fefdf8"></stop>
                    <stop offset="0.433" stop-color="#fefbf1"></stop>
                    <stop offset="0.452" stop-color="#fdfaf0"></stop>
                    <stop
                      offset="0.513"
                      stop-color="#f6efe2"
                      stop-opacity="0.866"
                    ></stop>
                    <stop
                      offset="0.62"
                      stop-color="#e4d2be"
                      stop-opacity="0.627"
                    ></stop>
                    <stop
                      offset="0.76"
                      stop-color="#c8a789"
                      stop-opacity="0.314"
                    ></stop>
                    <stop
                      offset="0.901"
                      stop-color="#ac7954"
                      stop-opacity="0"
                    ></stop>
                  </radialGradient>
                  <radialGradient
                    id="i"
                    cx="234.59"
                    cy="322.848"
                    r="32.855"
                    fx="237.449"
                    fy="343.873"
                    gradientTransform="matrix(-.8158 .8158 -.8937 -.8937 599.003 165.7)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#fffefa"></stop>
                    <stop offset="0.192" stop-color="#fefdf7"></stop>
                    <stop offset="0.353" stop-color="#fdfaf0"></stop>
                    <stop offset="0.393" stop-color="#fcf6e9"></stop>
                    <stop offset="0.451" stop-color="#f7ead6"></stop>
                    <stop offset="0.52" stop-color="#efd7b8"></stop>
                    <stop offset="0.544" stop-color="#ecd0ac"></stop>
                    <stop offset="0.797" stop-color="#714d38"></stop>
                  </radialGradient>
                  <radialGradient
                    id="j"
                    cx="-357.837"
                    cy="226.244"
                    r="36.766"
                    fx="-352.883"
                    fy="247.148"
                    gradientTransform="matrix(-1.1203 0 0 -1.2159 -173.585 310.377)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#fffefa"></stop>
                    <stop offset="0.132" stop-color="#fefdf7"></stop>
                    <stop offset="0.242" stop-color="#fdfaf0"></stop>
                    <stop offset="0.303" stop-color="#fcf6e9"></stop>
                    <stop offset="0.392" stop-color="#f7ead6"></stop>
                    <stop offset="0.497" stop-color="#efd7b8"></stop>
                    <stop offset="0.532" stop-color="#ecd0ac"></stop>
                    <stop offset="0.677" stop-color="#835d48"></stop>
                    <stop offset="0.95" stop-color="#8c5c3d"></stop>
                  </radialGradient>
                  <radialGradient
                    id="k"
                    cx="-333.529"
                    cy="415.262"
                    r="41.056"
                    fx="-340.736"
                    fy="440.547"
                    gradientTransform="matrix(-1.2082 -.2093 .2174 -1.2545 -158.298 521.438)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.031" stop-color="#fffefa"></stop>
                    <stop offset="0.095" stop-color="#fcf9f3"></stop>
                    <stop offset="0.188" stop-color="#f4eadf"></stop>
                    <stop offset="0.3" stop-color="#e7d4bf"></stop>
                    <stop offset="0.425" stop-color="#d6b594"></stop>
                    <stop offset="0.44" stop-color="#d4b18e"></stop>
                    <stop offset="0.57" stop-color="#d7b694"></stop>
                    <stop offset="0.747" stop-color="#6d422f"></stop>
                  </radialGradient>
                  <radialGradient
                    id="l"
                    cx="-277.091"
                    cy="427.103"
                    r="41.094"
                    fx="-287.076"
                    fy="451.452"
                    gradientTransform="matrix(-1.1863 -.2055 .2055 -1.1863 6.443 599.36)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.044" stop-color="#fdf6e0"></stop>
                    <stop offset="0.112" stop-color="#fbf1d9"></stop>
                    <stop offset="0.211" stop-color="#f4e3c5"></stop>
                    <stop offset="0.329" stop-color="#eacea5"></stop>
                    <stop offset="0.389" stop-color="#e4c092"></stop>
                    <stop offset="0.632" stop-color="#8c5c3d"></stop>
                    <stop offset="0.67" stop-color="#372623"></stop>
                  </radialGradient>
                  <path
                    fill="url(#a)"
                    stroke="url(#b)"
                    stroke-miterlimit="10"
                    d="M416.4 119.7s-20.2 1.8-24 26.7c0 0 0 13 5.9 21.6l2.2 3.1s1 1.4-.6 5.1l-73.7 171.2-2.4 4.1s-2.6 4.1-9.6 1.4c0 0-6.1-2.4-4.7-13.4l20.2-146.6 13-87.7s.7-3.4 3.4-4.2c.7-.2 1.4-.5 2.1-1 4.3-2.6 16.9-11.8 17.5-27.7 0 0 3-16.9-11.6-27.5-10.4-7.6-24.4-8.5-35.4-1.9-6.4 3.8-12.3 10.4-13.7 22 0 0-3.1 13.2 4.5 24.4 0 0 5.3 6.3 6.7 7.3 0 0 1.6 1.4 1.2 3.1l-44.2 207.6s-3.1 12.6-13.4 12.8c0 0-7.1 1.4-8.5-10.6l-6.1-129.9-5.5-112.1s.6-5.5 4.7-7.9c0 0 15.5-11.8 10.8-30.7 0 0-4.7-29.3-37.9-23.4 0 0-24.6 7.3-17.5 40.7 0 0 2.4 9.4 11.4 14.9 0 0 5.5 2.4 5.5 9.6L208.2 307s.8 13.8-12.2 14.7c0 0-7.7.8-12.4-23.2L138.1 105s-2.5-11.2 3-16.1c0 0 17.6-22.9-2.4-44.4 0 0-16.7-16.3-38.7-1.2 0 0-15.7 9.8-9.4 35.6 0 0 1.5 10.7 15.2 18.1 0 0 7.9 2.6 8.5 9.5l27.9 186.1s5.7 42.5 4.3 50.9c0 0 .8 7.5-7.3 9.8 0 0-6.1 1.4-12.8-15.5L57.3 179.9s-4.3-10.8 0-15.7c0 0 16.3-26.1-8.6-41.3 0 0-17.9-12.2-36.2 3.7 0 0-20.2 18.3 0 41.3 0 0 4.7 6.3 16.1 9.2 0 0 6.7.2 7.7 7.5l58.6 170.2 32.6 95.5s3.2 11.6 5.1 13.2c0 0 5.3 5.7 23.2 11.4 0 0 41.9 20.8 94.9 14.4 0 0 35.2-3.3 67.4-18.7l5.1-2.9s2.6-1 4.7-9.4l33-98.1 35.8-100.3 21-61.5 4.3-10.6s2.4-6.5 9.6-8.1c0 0 22.2-4.1 22-31.3.2 0-1.6-33.2-37.2-28.7zm-160 335.8s-55.4 9.2-87.3-11.2c0 0-15.1-7.9-10.2-27.7 0 0 3.6-9.3 17.3-14.2 0 0 22.4-13 78-7.7 0 0 44.6 5.1 44.8 28.5.1.1 7.9 24.6-42.6 32.3z"
                  ></path>
                  <path
                    fill="url(#c)"
                    stroke="url(#d)"
                    stroke-miterlimit="10"
                    d="M417.23 117.913s-20.2 1.8-24 26.7c0 0 0 13 5.9 21.6l2.2 3.1s1 1.4-.6 5.1l-73.7 171.2-2.4 4.1s-2.6 4.1-9.6 1.4c0 0-6.1-2.4-4.7-13.4l20.2-146.6 13-87.7s.7-3.4 3.4-4.2c.7-.2 3-1.6 3.7-2 4.3-2.6 15.4-10.8 15.9-26.7 0 0 3-16.9-11.6-27.5-10.4-7.6-24.4-8.5-35.4-1.9-6.4 3.8-12.3 10.4-13.7 22 0 0-3.1 13.2 4.5 24.4 0 0 5.3 6.3 6.7 7.3 0 0 1.6 1.4 1.2 3.1l-44.2 207.6s-3.1 12.6-13.4 12.8c0 0-7.1 1.4-8.5-10.6l-6.1-129.9-5.5-112.1s.6-5.5 4.7-7.9c0 0 15.5-11.8 10.8-30.7 0 0-3.8-28.3-37-22.4 0 0-24.7 6.2-17.6 39.6 0 0 3.4 6.8 11.3 13.6 0 0 4.8 3.8 4.8 11.1l-8.5 236.3s.8 13.8-12.2 14.7c0 0-7.7.8-12.4-23.2l-45.5-193.6s-2.5-11.2 3-16.1c0 0 17.6-22.9-2.4-44.4 0 0-16.7-16.3-38.7-1.2 0 0-15.7 9.8-9.4 35.6 0 0 1.5 10.7 15.2 18.1 0 0 7.9 2.6 8.5 9.5l27.9 186.1s5.7 42.5 4.3 50.9c0 0 .8 7.5-7.3 9.8 0 0-6.1 1.4-12.8-15.5l-69.1-157.9s-4.3-10.8 0-15.7c0 0 16.3-26.1-8.6-41.3 0 0-17.9-12.2-36.2 3.7 0 0-20.2 18.3 0 41.3 0 0 4.7 6.3 16.1 9.2 0 0 6.7.2 7.7 7.5l58.6 170.2 32.6 95.5s3.2 11.6 5.1 13.2c0 0 5.3 5.7 23.2 11.4 0 0 41.9 20.8 94.9 14.4 0 0 35.2-3.3 67.4-18.7l5.1-2.9s2.6-1 4.7-9.4l33-98.1 35.8-100.3 21-61.5 4.3-10.6s2.4-6.5 9.6-8.1c0 0 22.2-4.1 22-31.3.2 0-1.6-33.2-37.2-28.7zm-160 335.8s-55.4 9.2-87.3-11.2c0 0-15.1-7.9-10.2-27.7 0 0 3.6-9.3 17.3-14.2 0 0 22.4-13 78-7.7 0 0 44.6 5.1 44.8 28.5.1.1 7.9 24.6-42.6 32.3z"
                  ></path>
                  <path
                    fill="url(#e)"
                    stroke="url(#f)"
                    stroke-miterlimit="10"
                    d="M416.4 119.7s-20.2 1.8-24 26.7c0 0 0 13 5.9 21.6l2.2 3.1s1 1.4-.6 5.1l-73.7 171.2-2.4 4.1s-2.6 4.1-9.6 1.4c0 0-6.1-2.4-4.7-13.4l20.2-146.6 13-87.7s.7-3.4 3.4-4.2c.7-.2 1.4-.5 2.1-1 4.3-2.6 16.9-11.8 17.5-27.7 0 0 3-16.9-11.6-27.5-10.4-7.6-24.4-8.5-35.4-1.9-6.4 3.8-12.3 10.4-13.7 22 0 0-3.1 13.2 4.5 24.4 0 0 5.3 6.3 6.7 7.3 0 0 1.6 1.4 1.2 3.1l-44.2 207.6s-3.1 12.6-13.4 12.8c0 0-7.1 1.4-8.5-10.6l-6.1-129.9-5.5-112.1s.6-5.5 4.7-7.9c0 0 15.5-11.8 10.8-30.7 0 0-4.7-29.3-37.9-23.4 0 0-24.6 7.3-17.5 40.7 0 0 2.4 9.4 11.4 14.9 0 0 5.5 2.4 5.5 9.6L208.2 307s.8 13.8-12.2 14.7c0 0-7.7.8-12.4-23.2L138.1 105s-2.5-11.2 3-16.1c0 0 17.6-22.9-2.4-44.4 0 0-16.7-16.3-38.7-1.2 0 0-15.7 9.8-9.4 35.6 0 0 1.5 10.7 15.2 18.1 0 0 7.9 2.6 8.5 9.5l27.9 186.1s5.7 42.5 4.3 50.9c0 0 .8 7.5-7.3 9.8 0 0-6.1 1.4-12.8-15.5L57.3 179.9s-4.3-10.8 0-15.7c0 0 16.3-26.1-8.6-41.3 0 0-17.9-12.2-36.2 3.7 0 0-20.2 18.3 0 41.3 0 0 4.7 6.3 16.1 9.2 0 0 6.7.2 7.7 7.5l58.6 170.2 32.6 95.5s3.2 11.6 5.1 13.2c0 0 5.3 5.7 23.2 11.4 0 0 41.9 20.8 94.9 14.4 0 0 35.2-3.3 67.4-18.7l5.1-2.9s2.6-1 4.7-9.4l33-98.1 35.8-100.3 21-61.5 4.3-10.6s2.4-6.5 9.6-8.1c0 0 22.2-4.1 22-31.3.2 0-1.6-33.2-37.2-28.7zm-160 335.8s-55.4 9.2-87.3-11.2c0 0-15.1-7.9-10.2-27.7 0 0 3.6-9.3 17.3-14.2 0 0 22.4-13 78-7.7 0 0 44.6 5.1 44.8 28.5.1.1 7.9 24.6-42.6 32.3z"
                  ></path>
                  <path
                    fill="url(#g)"
                    stroke="url(#f)"
                    stroke-miterlimit="10"
                    d="M416.4 119.7s-20.2 1.8-24 26.7c0 0 0 13 5.9 21.6l2.2 3.1s1 1.4-.6 5.1l-73.7 171.2-2.4 4.1s-2.6 4.1-9.6 1.4c0 0-6.1-2.4-4.7-13.4l20.2-146.6 13-87.7s.7-3.4 3.4-4.2c.7-.2 1.4-.5 2.1-1 4.3-2.6 16.9-11.8 17.5-27.7 0 0 3-16.9-11.6-27.5-10.4-7.6-24.4-8.5-35.4-1.9-6.4 3.8-12.3 10.4-13.7 22 0 0-3.1 13.2 4.5 24.4 0 0 5.3 6.3 6.7 7.3 0 0 1.6 1.4 1.2 3.1l-44.2 207.6s-3.1 12.6-13.4 12.8c0 0-7.1 1.4-8.5-10.6l-6.1-129.9-5.5-112.1s.6-5.5 4.7-7.9c0 0 15.5-11.8 10.8-30.7 0 0-4.7-29.3-37.9-23.4 0 0-24.6 7.3-17.5 40.7 0 0 2.4 9.4 11.4 14.9 0 0 5.5 2.4 5.5 9.6L208.2 307s.8 13.8-12.2 14.7c0 0-7.7.8-12.4-23.2L138.1 105s-2.5-11.2 3-16.1c0 0 17.6-22.9-2.4-44.4 0 0-16.7-16.3-38.7-1.2 0 0-15.7 9.8-9.4 35.6 0 0 1.5 10.7 15.2 18.1 0 0 7.9 2.6 8.5 9.5l27.9 186.1s5.7 42.5 4.3 50.9c0 0 .8 7.5-7.3 9.8 0 0-6.1 1.4-12.8-15.5L57.3 179.9s-4.3-10.8 0-15.7c0 0 16.3-26.1-8.6-41.3 0 0-17.9-12.2-36.2 3.7 0 0-20.2 18.3 0 41.3 0 0 4.7 6.3 16.1 9.2 0 0 6.7.2 7.7 7.5l58.6 170.2 32.6 95.5s3.2 11.6 5.1 13.2c0 0 5.3 5.7 23.2 11.4 0 0 41.9 20.8 94.9 14.4 0 0 35.2-3.3 67.4-18.7l5.1-2.9s2.6-1 4.7-9.4l33-98.1 35.8-100.3 21-61.5 4.3-10.6s2.4-6.5 9.6-8.1c0 0 22.2-4.1 22-31.3.2 0-1.6-33.2-37.2-28.7zm-160 335.8s-55.4 9.2-87.3-11.2c0 0-15.1-7.9-10.2-27.7 0 0 3.6-9.3 17.3-14.2 0 0 23.474-14.622 79.202-8.184 0 0 43.398 5.584 43.598 28.984.1.1 7.9 24.6-42.6 32.3z"
                  ></path>
                  <circle cx="30.8" cy="146.5" r="26.8" fill="url(#h)"></circle>
                  <path
                    fill="url(#i)"
                    d="M99.1 90.2C86.5 78.1 86.6 56.9 98 45.8c11.2-10.9 29.8-10.2 41.9 1.9s14.7 26.9 1.9 41.9c-10.2 11.8-30.4 12.4-42.7.6z"
                  ></path>
                  <path
                    fill="url(#j)"
                    d="M199.2 34.7c0-16.5 12.9-29.7 28.1-29.7s28.1 13.5 28.1 30-7.9 30.7-28.1 30.7c-15.2-.1-28.1-13.3-28.1-31z"
                  ></path>
                  <path
                    fill="url(#k)"
                    d="M304.8 65.1c3-17.3 18.9-29 35.6-26.1 16.6 2.9 27.7 19.2 24.7 36.5s-17.2 29.3-35.6 26.1c-16.6-3-27.9-17.8-24.7-36.5z"
                  ></path>
                  <path
                    fill="url(#l)"
                    d="M393.3 144.5c.4-16.7 18.5-27.4 34.9-24.6s27.4 18.5 24.6 34.9-14.5 28.1-34.9 24.6c-16.4-2.7-25-14-24.6-34.9z"
                  ></path>
                  <g fill="#140a06">
                    <path d="M133.6 354.8s-11.4-21.5-17.5-37l-27.3-61.5L64 197.8s-10-21.4-12.1-28.9c0 0-1.3-4.9 2.5-12.1 0 0 9.1-12.4 3.1-20.9 0 0 1.6 6.2-2.8 12.8 0 0-7.2 11.2-7.5 15.5 0 0-.4 7.1 5.3 15.8 0 0 7.1 12.2 8.6 16.2 0 0 57.9 133.4 58.2 134.2.3.7 9.1 21.3 14.3 24.4zM139.5 147.1s25.8 101.3 27.4 105.3c0 0 13.5 53.5 16.1 59.3 0 0 4.4 5.4 8.8 8 0 0-4.9-6.1-7-15.6l-16.1-68.9-21.8-86.5s-10.8-41.4-11.1-50.2c0 0-.7-4.5 2.8-10l4.6-5.9c.5-.6.9-1.2 1.2-1.9 1-1.8 3-5.5 3.7-8.5 0 0 2-14.1-6.3-14.1 0 0-.3 7.7-4.6 14.3 0 0-6.2 9.6-8.9 15.3-.9 2-1.3 4.1-1.2 6.3.2 2.8 1.5 5.8 2.4 10.8.1 0 7.9 28.9 10 42.3zM229.5 78.8l3.3 79.2 4.5 92.6L243 308c1.2 12.4 8.3 10.9 8.3 10.9-6.6-2.8-6-22.7-6-22.7l-5.9-109.7-6-120c0-1 0-1.9.2-2.9 1.1-6.1 3.3-8.4 3.3-8.4 6-10.6 10.9-11.1 12.5-10.9 1.1.1 4.8.7 5.4-.3 1.1-1.7 1.5-8.2 1.5-8.2-1.4-6.3-5.9-7.8-5.9-7.8.4 1.4-5.9 8.5-5.9 8.5l-12 13.8c-3.3 4.3-3.1 10-3.1 10z"></path>
                    <path d="M239.3 66c-.4.6-.6 1.2-.8 1.9-.3 1.6-.9 4.9-.6 7.5l5.5 119.9 6.3 118.3s.7 4.5 6.7 6.2c0 0-5.9-2.6-5.3-16l-5.2-116.2L240.2 76s-1.1-7.4 1.3-13.3zM314.2 353.1s-4.9-2.9-4.9-10.5l6.1-84.9 12.8-95.5 7.1-59.8s-.7-5.2 3.9-9.4c.6-.6 3.7-4.5 4.2-5.1 1.7-2.3 4.9-3.5 9.7-7.6l6.9-4.6c1.5-.7 3.9 2.8 3.9 1.2.1-3.1-1.1-7.3-3.3-10.2L357 61s-11.1 8.2-14.2 10.6c0 0-12.4 12-15.3 22.9 0 0-2 12.2-2.7 20.2l-13.5 102.1S295.4 323.5 299 344.2c0 0 3.2 16.7 15.2 8.9z"></path>
                    <path d="M447 142.3s-4.9-7-11.4-9c-1-.3-2.1 0-2.8.6-1.7 1.4-4.7 3.9-6.8 5.6-.8.6-1.7 1.2-2.6 1.7-2.8 1.4-10.8 6.3-17.5 17.9-.4.6-.6 1.3-.7 2.1-.2 2.2-.7 7.1-.8 9.7 0 .7 0 1.3.2 2 .3 1.2.6 4.1-1.3 7.6l-44.4 104.8-26.9 65s-7.3 17.8-21.3 30c0 0-5.6 4.7-20.9 1.8 0 0-60.4-9.5-92.6-4.9 0 0-34.6 2.4-44.2 26.6 0 0-6.4 13.1-1.6 32.2 0 0 3.3 16.4 2.4 22.4 0 0 3.3 7.3 9.1 10.4l2.2 1.8s-15.3-.7-33.5-14.4c0 0 6.4 9.8 22 14.2 0 0 24 9.3 37.7 11.5 0 0-26.9-12-31.8-20.9 0 0 0-2.2 2.9-1.6 0 0 9.5 4.5 45.5 5 0 0 34.9.6 59.6-6.9 0 0 34.8-7.8 40.4-34 0 0 9.8-36.6 19.3-52 0 0 24.2-52.2 32.9-74.8l34.9-87.4s10.2-27 11.1-29c0 0 2.9-11.5 7.5-17.8 0 0 6.3-8.8 10.5-12.4 1.1-.9 2.3-1.6 3.7-1.8 1.6-.3 4.2-.6 6.4.5 0 0 11.5 4.7 15.8 4.2.1.1 2.6-2.3-3-10.7zM301.4 425.5s.5 14.7-20.3 23.3c0 0-20.9 14.3-77.3 8.7 0 0-41.7.2-47.6-21.5 0 0-4.054-13.133 5.25-28.42 0 0 12.113-15.76 54.313-17.56 0 0 52.294-2.525 77.395 15.775 0-.001 10.058 7.397 8.242 19.705z"></path>
                    <path d="M291.2 404.1c-9.1-7.1-18.124-11.522-18.124-11.522-30.9-6-60.837-4.316-60.837-4.316C167.339 391.362 159 410.9 159 410.9l.774-5.51c-3.402 1.686-2.416 13.034-1.263 14.712 1.426-3.967.705-5.328 4.329-8.875 6.625-6.484 11.734-7.626 14.795-8.919 6.878-2.905 14.116-4.767 20.569-5.961 11.525-2.132 20.547-2.132 20.547-2.132 20.134-.483 31.591.574 37.116 1.302 2.827.372 12.068 2.64 13.256 2.977 36.093 10.233 29.907 28.93 29.907 28.93 3.721-17.952-7.83-23.324-7.83-23.324z"></path>
                  </g>
                  <path
                    fill="#7b4f36"
                    d="M8.8 163.6s4.4 7.7 13.8 11.4c0 0 3.7 1.5 7.3 2.4 0 0 4.1.5 6 3.6l16.5 46.4 23.5 67.9 46 133.6 8.4 24.1 2.1 6.6s1.1 3.5 3.6 4.6c0 0 16.1 10.7 41.7 17.3 0 0 18.6 7.4 50.6 8.6 0 0 36.1 1.1 60.2-9 0 0 17.7-6.7 25.6-11.1 0 0-6.3 6-34.2 15.5 0 0-31 9.4-67.3 5.9 0 0-41.1-4.8-77.7-24.7 0 0-2.9-.5-5.8-10.1L114 411.9l-14.3-42.7L76 300.5l-20.9-61.3-19.1-55s-1.4-4.6-5.5-4.9c-.4 0-.7-.1-1.1-.1-3-.8-17.2-4.8-20.6-15.6z"
                  ></path>
                  <path
                    fill="#684c34"
                    d="M190.4 479.8s59.3 13.6 114.1-11.1l9.5-4.2s-18.1 16.4-72.6 21.2c-.1 0-31.2 1.4-51-5.9z"
                  ></path>
                  <path
                    fill="#79593a"
                    d="M150.9 420.9s2.1-18.3 10.1-25.7c0 0 7.3-10.7 43.3-14.9 0 0 40.7-5.1 78.3 8.6 0 0 11.9 4.5 16.9 14.8 0 0-7.8-17.6-57.2-21 0 0-27.4-2.1-52.4 3-3.5.7-6.9 1.5-10.4 2.2-5.586 2.002-24.1 5.6-28.6 33z"
                  ></path>
                </svg>
              </a>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
                <ul className="navbar-nav  ">
                  <li className="nav-item active">
                    <NavLink to="/rolex-world" className="nav-link">
                      {" "}
                      Trang Chủ
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link"  to={`/rolex-world/products/typeProduct?page=0&&typeId=1`}>
                      {" "}
                      Đồng Hồ Nam{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={`/rolex-world/products/typeProduct?page=0&&typeId=2`}> 
                      {" "}
                      Đồng Hồ Nữ{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/rolex-world/shopping-cart"
                      className="nav-link"
                    >
                      {" "}
                      Giỏ Hàng
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/rolex-world/details"}>
                      Chi TIết
                    </NavLink>
                  </li>
                  <li className="nav-item logined">
                    {isLoggedIn ? (
                      <>
                        <span className="nav-link">Xin chào, {username}</span>
                        <button onClick={handleLogout} className="btn-logout">Đăng xuất</button>
                      </>
                    ) : (
                      <NavLink to="/rolex-world/login" className="nav-link">Đăng nhập</NavLink>
                    )}
                    {/* <NavLink
                      to="/rolex-world/login"
                      className="nav-link"
                    >
                      Đăng nhập
                    </NavLink> */}
                  </li>
                  {/* <li className="nav-item">
                    <NavLink
                      to="/rolex-world/register"
                      className="nav-link"
                    >
                      Đăng ký
                    </NavLink>
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
