import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import LinkPreview from "../../components/link-preview/LinkPreview";
import Loading from "../../components/loading/Loading";
import ImageGallery from "../../components/image-gallery/ImageGallery";

import "./ProjectDetail.css";
import AOS from "aos";
import "aos/dist/aos.css";

function ProjectDetail(){
    const params = useParams()
    const id = params.id
    const [{state, isLoading}, setState] = useState({state: {}, isLoading: true});

    const apiDomain = "https://ntueeegarage.pythonanywhere.com/api/";

    useEffect(() => {
        const url = apiDomain + "projects/" + String(id);

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
                setState(currentState => ({
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
        window.addEventListener('load', AOS.refresh);
    }, []);

        return(
            <div className="project-detail-page">
                <Header/>
                    {isLoading === true ? <Loading/> :
                    <main className="detail-main">
                        <div className="main-wrapper" data-aos="fade-up">
                        {/* put your code below */}
                        <h1 className="detail-header">{state.name} </h1>
                        <h3 className="subheader">{state.desc}</h3>
                        <br/>
                        <img src={state.displayImageUrl} className="display-image" alt={"image of '" + state.name + "'"}></img>
                        <br/>
                        <br/>
                        <LinkPreview link={String(state.link)}/>
                        <br/>
                        <p className="article">{state.article}</p>
                        <br/>
                        {state.contentVideoUrl ? 
                        <video className="video" controls>
                            <source src={state.contentVideoUrl} type="video/mp4"/>
                            <source src={state.contentVideoUrl} type="video/ogg"/>
                            Your browser does not support the video tag.
                        </video>
                        :
                        <p></p>
                        }
                        {state.contentImages ?
                            <ImageGallery images={state.contentImages}/>
                        :
                            <p></p>
                        }
                        
                        

                        <br/>
                        <br/>
                        <br/>
                        {/* put your code above */}
                        </div>
                    </main>                    
                }
                <br/>
                {isLoading === false ? <Footer/> : <p></p>}
            </div>
        );
};

export default ProjectDetail;