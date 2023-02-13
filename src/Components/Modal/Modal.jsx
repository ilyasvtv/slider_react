import "./Modal.sass"

export default function Modal({info, closeModalWindow}) {
    return (
        <div className="modal-window">
            <div className="modal-window__content">
                <div className="modal-window__inner">
                    <picture className="modal-window__img">
                        <img src={info.imageSrc} alt="#" width="300" height="600"/>
                    </picture>
                    <div className="modal-window__info">
                        <h2 className="modal-window__title"> {info.name} </h2>
                        <hr />
                        <div className="modal-window__text"> {info.text} </div>
                    </div>
                </div>
                <div className="modal-window__close-window" onClick={closeModalWindow}></div>
            </div>
        </div>
    )
}