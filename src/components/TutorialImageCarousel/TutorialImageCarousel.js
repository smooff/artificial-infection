import React from 'react';
import ImageGallery from 'react-image-gallery';
import Img1 from '../../images/1.png';
import Img2 from '../../images/2.png';
import Img8 from '../../images/8.png';
import "react-image-gallery/styles/css/image-gallery.css";


function TutorialImageCarousel() {

    const images = [
        {
            src:Img1,
            original:Img1,
            thumbnail:Img1,
        },
        {
            src:Img2,
            original:Img2,
            thumbnail: Img2,
        },
        {
            src:Img8,
            original:Img8,
            thumbnail: Img8,
        },
    ];
    return (
        <div>
            <ImageGallery showPlayButton={false} showThumbnails={true} items={images} />
        </div>
    );
}

export default TutorialImageCarousel;