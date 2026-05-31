// by brandon 6/9/2022
import React from 'react';
import { Link } from "react-router-dom";
import './Tile.css'

function CarouselItem(props) {
    const content = props.data.itemContent;
    const titlePosition = props.data.titlePosition;

    let imgSrc = content.displayImageUrl

    //imgSrc = "https://drive.google.com/uc?export=view&id=" + imgSrc.substring(31, imgSrc.length)

    const link = "/" + props.data.slug + "/" + String(content.pk)//props.data.link || "https://reactjs.org/"
    const backgroundImage = {
        backgroundImage: `url(${imgSrc})`
    }

    const itemHeadingBot =             
        <h3 className='title'>
            { content.name }
        </h3>
    
    const itemHeadingTop = 
        <h3 className='title title-box'>
            { content.name }
        </h3>

    return(
        <Link to={ link } className="col-6 col-lg-4" style={{textDecoration:"none"}}>
            <div key={content.pk} className="item-container" style={backgroundImage}>
                <div className='title-container'>
                    { content.name && titlePosition === "botIn" && itemHeadingTop }
                </div>
            </div>
            { content.name && titlePosition === "botOut" && itemHeadingBot }
        </Link>
    );

}

export default CarouselItem;
// modification ends