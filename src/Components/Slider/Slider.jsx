import { useRef, useEffect, useState } from "react"
import Modal from "../Modal/Modal";
import "./Slider.sass"


export default function Slider() {

    const sliderRef = useRef(null);

    const [direction, setDirection] = useState(null);
    const [sliderOffset, setSliderOffset] = useState(0);
    const [modalWindowInfo, setModalWindowInfo] = useState({id: null, status: false});

    const [lots, refreshLots] = useState([
        {imageSrc: "1.webp", name: "Something 1", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa nihil obcaecati eaque vero, tenetur consequatur minima voluptate aut animi amet?"},
        {imageSrc: "2.webp", name: "Something 2", text: "asdzxcasdzxcasdzxc"},
        {imageSrc: "3.webp", name: "Something 3", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa nihil obcaecati eaque vero, tenetur consequatur minima voluptate aut animi amet"},
        {imageSrc: "4.webp", name: "Something 4", text: "placeholder for something 4"},
        {imageSrc: "5.webp", name: "Something 5", text: "placeholder for something 5"},
        {imageSrc: "6.webp", name: "Something 6", text: "placeholder for something 6"}
    ])

    useEffect(() => {
        //show all slides when there is a small quantity of them
        if (lots.length < 6) {
            sliderRef.current.style.width = "100%";
            for (let i = 0; i < lots.length; i++) {
                sliderRef.current.children[i].style.width = `${100 / lots.length}%`;
            }
            return;
        };
        //responsivness of slider
        setSliderOffset(getComputedStyle(sliderRef.current.children[0]).width);
        addEventListener("resize", () => {
            setSliderOffset(getComputedStyle(sliderRef.current.children[0]).width);
        })
        //styles for properly work of the slider
        sliderRef.current.style.width = `${lots.length * 100 / 4}%`;
        sliderRef.current.style.left = "-25%";
        sliderRef.current.style.transform = "";
    }, [])

    const leftClick = () => {
        if (direction !== null || lots.length < 6) return;
        setDirection("left");
        sliderRef.current.style.transform = `translateX(${sliderOffset})`;
        sliderRef.current.style.transition = "transform 0.35s";
    }

    const rightClick = () => {
        if (direction !== null || lots.length < 6) return;
        setDirection("right");
        sliderRef.current.style.transform = `translateX(-${sliderOffset})`;
        sliderRef.current.style.transition = "transform 0.35s";
    }
    
    const switchSlides = () => {
        setTimeout(() => {
            if (direction === "left") {
                refreshLots(prev => {
                    return [prev[prev.length - 1], ...prev.slice(0, -1)];
                })
            } else {
                refreshLots(prev => {
                    return [...prev.slice(1), prev[0]];
                })
            }
            sliderRef.current.style.transform = "";
            sliderRef.current.style.transition = "";
            setDirection(null);
        })
    }

    const scaleItemUp = (i) => {
        sliderRef.current.children[i].style.transform = "translate3d(0px, 0px, 0px) scale(1.05)";
    }

    const scaleItemDown = (i) => {
        sliderRef.current.children[i].style.transform = "translate3d(0px, 0px, 0px) scale(1)";
    }

    const showModalWindow = (i) => {
        setModalWindowInfo({id: i, status: true});
        document.body.style.overflow = "hidden";
    }

    const closeModalWindow = () => {
        setModalWindowInfo({id: null, status: false});
        document.body.removeAttribute("style");
    }

    return (
        <div className="slider-section">

            {/* modal window */}
            {modalWindowInfo.status && <Modal info={lots[modalWindowInfo.id]} closeModalWindow={closeModalWindow}/>}
            {/* end of the modal window */}

            <div className="container">
                <h1 className="slider-section__title">Lorem ipsum dolor sit amet.</h1>
                <div className="slider">
                    <div className="slider__left-button">
                        <div className="circle" style={{display: lots.length < 6 ? "none" : "flex"}} onClick={leftClick}>
                            <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="21" cy="21" r="20.5"></circle>
                                <circle className="animated-border" cx="21" cy="21" r="20.5"></circle>
                            </svg>
                            <div className="arrow">
                                <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="15" x2="27" y1="21" y2="21" stroke="#000"></line>
                                    <line x1="15" x2="19" y1="21" y2="16" stroke="#000"></line>
                                    <line x1="15" x2="19" y1="21" y2="26" stroke="#000"></line>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="slider__body">
                        <div className="slider__inner" onTransitionEnd={switchSlides} ref={sliderRef}>
                            {lots.map((x, i) => {
                                return <picture className="slider__item"
                                            onMouseEnter={() => scaleItemUp(i)}
                                            onMouseLeave={() => scaleItemDown(i)}
                                            onClick={() => showModalWindow(i)}
                                            onTransitionEnd={(e) => e.stopPropagation()}
                                            key={i}>
                                            <img src={x.imageSrc} alt="#" className="item-img" width="300" height="600"/>
                                        </picture>
                            })}
                        </div>
                    </div>
                    <div className="slider__right-button">
                        <div className="circle" style={{display: lots.length < 6 ? "none" : "flex"}} onClick={rightClick}>
                            <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="21" cy="21" r="20.5"></circle>
                                <circle className="animated-border" cx="21" cy="21" r="20.5"></circle>
                            </svg>
                            <div className="arrow">
                                <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="15" x2="27" y1="21" y2="21" stroke="#000"></line>
                                    <line x1="15" x2="19" y1="21" y2="16" stroke="#000"></line>
                                    <line x1="15" x2="19" y1="21" y2="26" stroke="#000"></line>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 