import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import background from "../../assets/images/background.jpg";

const Home = () => {
  const API_URL = "https://app.tapmad.com/api/getWebFeaturedContent";
  const [items, setItems] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(9);

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth < 768 ? 1 : 9);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const data = {
    TabId: 5,
    verticalStart: 0,
    verticalEnd: 5,
    horizontalStart: 0,
    horizontalEnd: 17,
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.post(API_URL, data);
      setItems(response.data.Tabs[0].Sections);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="main">
        <div className="bgImage">
          <div className="bgSetting">
            <img src={background} alt="" />
            <Link to={"/live"}>
              <button className="btn-Watch Home_Button" role="button">
                Watch Now
              </button>
            </Link>
          </div>
        </div>
        <div className="container sections">
          <div className="row">
            <h1 className="text-white">Featured</h1>
            <Swiper
              slidesPerView={slidesPerView}
              spaceBetween={10}
              navigation={{
                clickable: true,
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              {items.length > 0 &&
                items[0].Videos.map((data, index) => {
                  return (
                    <div className="col-sm-12 col-md-6 col-lg-4">
                      <SwiperSlide
                        style={{
                          borderRadius: "10px",
                        }}
                      >
                        <Link
                          className="Featured"
                          to={{
                            pathname: `/play/${data.ContentVideoName.replace(
                              " - ",
                              " "
                            )
                              .replace(/[()]/g, "")
                              .replace(/\s/g, "-")
                              .toLowerCase()}/${data.ContentEntityId}/${
                              data.IsChannel ? 1 : 0
                            }`,
                          }}
                        >
                          <a>
                            <img
                              src={data.ContentImage}
                              alt="Image"
                              width="300"
                              height="150"
                            />
                          </a>
                        </Link>
                      </SwiperSlide>
                    </div>
                  );
                })}
            </Swiper>
          </div>
        </div>
        {items.map((content, index) => {
          return (
            index !== 0 && (
              <div key={index} className="container-fluid px-5">
                <h1 className="text-white">{content.SectionName}</h1>
                <Swiper
                  slidesPerView={slidesPerView}
                  spaceBetween={6}
                  navigation={{
                    clickable: true,
                  }}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {content.Videos.map((data, index) => {
                    return (
                      <div key={index}>
                        <SwiperSlide
                          style={{
                            borderRadius: "10px",
                          }}
                        >
                          <Link
                            className="Featured videoLink"
                            to={{
                              pathname: `/play/${data.ContentVideoName.replace(
                                " - ",
                                " "
                              )
                                .replace(/\s/g, "-")
                                .replace(/[()]/g, "")
                                .toLowerCase()}/${data.ContentEntityId}/${
                                data.IsChannel ? 1 : 0
                              }`,
                            }}
                          >
                            <a>
                              <img
                                src={data.ContentImage}
                                alt="Image"
                                width="324"
                                height="432"
                              />
                            </a>
                          </Link>
                        </SwiperSlide>
                      </div>
                    );
                  })}
                </Swiper>
              </div>
            )
          );
        })}
      </div>
    </>
  );
};

export default Home;
