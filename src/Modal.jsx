import { useRef } from 'react';


function Modal({ active, setActive, value }) {

    function openModal() {
        setActive(false)
    }

    return (
        <div className={active ? "modal active" : "modal"} >
            <div
                className='modal_content'
                onClick={e => e.stopPropagation()}
            >
                <div className='ico'>&#128129;</div>
                <div className='contentValue'>{value}</div>
                <div className="close" onClick={openModal}></div>
            </div>
        </div>
    )

}

export default Modal;