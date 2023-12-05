import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";

import "./AmbassadorDetail.css";
import AOS from "aos";
import "aos/dist/aos.css";

function AmbassadorDetail() {
  const params = useParams();
  const id = params.id;
  const [{ state, isLoading }, setState] = useState({
    state: {},
    isLoading: true,
  });

  const apiDomain = "https://ntueeegarage.pythonanywhere.com/api/";

  useEffect(() => {
    const url = apiDomain + "ambassadors/" + String(id);

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setState((currentState) => ({
          state: json,
          isLoading: false,
        }));
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    AOS.init({
      duration: 1500,
    });
    window.addEventListener("load", AOS.refresh);
  }, []);

  return (
    <div className="ambassador-page">
      <Header />
      {isLoading === true ? (
        <Loading />
      ) : (
        <main className="detail-main">
          <div className="main-wrapper" data-aos="fade-up">
            {/* put your code below */}
            <div>
              <div className="detail-header-box">
                <p className="detail-header">{state.name}</p>
                <button className="detail-header-button">
                  <div className="detail-header-button-chevron-left">
                    &#x2C2;
                  </div>
                  <div className="detail-header-button-back">Back</div>
                </button>
              </div>
              <img
                src={state.displayImageUrl}
                className="display-image"
                alt={"image of '" + state.name + "'"}
              />
            </div>
            <p className="article">{state.desc}</p>
            {/* put your code above */}
          </div>
          <Footer />
        </main>
      )}
    </div>
  );
}

export default AmbassadorDetail;
