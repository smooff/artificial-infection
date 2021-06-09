import React from 'react';
import ImageGallery from 'react-image-gallery';
import Img1 from '../../images/tutorialImages/1.jpg';
import Img2 from '../../images/tutorialImages/2.jpg';
import Img3 from '../../images/tutorialImages/3.jpg';
import Img4 from '../../images/tutorialImages/4.jpg';
import Img5 from '../../images/tutorialImages/5.jpg';
import Img6 from '../../images/tutorialImages/6.jpg';
import Img7 from '../../images/tutorialImages/7.jpg';
import Img8 from '../../images/tutorialImages/8.jpg';
import Img9 from '../../images/tutorialImages/9.jpg';
import Img10 from '../../images/tutorialImages/10.jpg';
import Img11 from '../../images/tutorialImages/11.jpg';
import Img12 from '../../images/tutorialImages/12.jpg';
import Img13 from '../../images/tutorialImages/13.jpg';
import Img14 from '../../images/tutorialImages/14.jpg';
import Img15 from '../../images/tutorialImages/15.jpg';
import Img16 from '../../images/tutorialImages/16.jpg';
import Img17 from '../../images/tutorialImages/17.jpg';
import "react-image-gallery/styles/css/image-gallery.css";

/**
 * Renders a <TutorialImageCarousel /> component
 * component is used to display game tutorial (image carousel)
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
function TutorialImageCarousel() {

    const images = [
        {
            src: Img1,
            original: Img1,
            thumbnail: Img1,
        },
        {
            src: Img2,
            original: Img2,
            thumbnail: Img2,
        },
        {
            src: Img3,
            original: Img3,
            thumbnail: Img3,
        },
        {
            src: Img4,
            original: Img4,
            thumbnail: Img4,
        },
        {
            src: Img5,
            original: Img5,
            thumbnail: Img5,
        },
        {
            src: Img6,
            original: Img6,
            thumbnail: Img6,
        },
        {
            src: Img7,
            original: Img7,
            thumbnail: Img7,
        },
        {
            src: Img8,
            original: Img8,
            thumbnail: Img8,
        },
        {
            src: Img9,
            original: Img9,
            thumbnail: Img9,
        },
        {
            src: Img10,
            original: Img10,
            thumbnail: Img10,
        },
        {
            src: Img11,
            original: Img11,
            thumbnail: Img11,
        },
        {
            src: Img12,
            original: Img12,
            thumbnail: Img12,
        },
        {
            src: Img13,
            original: Img13,
            thumbnail: Img13,
        },
        {
            src: Img14,
            original: Img14,
            thumbnail: Img14,
        },
        {
            src: Img15,
            original: Img15,
            thumbnail: Img15,
        },
        {
            src: Img16,
            original: Img16,
            thumbnail: Img16,
        },
        {
            src: Img17,
            original: Img17,
            thumbnail: Img17,
        },
    ];
    return (
        <div>
            <ImageGallery showPlayButton={false} showThumbnails={true} items={images}/>
        </div>
    );
}

export default TutorialImageCarousel;
