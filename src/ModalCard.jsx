function ModalCard({ active, setActive, value }) {

    function openModal() {
        setActive(false)
    }

    return (
        <div 
            onClick={openModal}
            className={active ? "modalCard active" : "modalCard"} >
            <div
                className='modal_card_content'
                onClick={e => e.stopPropagation()}
            >
                <div className="modalCardWrapper">{value}</div>
            </div>
        </div>
    )

}

export default ModalCard;