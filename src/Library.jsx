import { useState } from "react"
import { useEffect } from "react"

export const Library = () => {

    const [findID, setFindID] = useState('');
    const [lib, setlib] = useState('asdasdas');


    function clearInput() {
        setFindID('')
    }

    function click() {
        console.log(findID)
        clearInput()
    }

    return (
        <>
            <div className="library">Welcome to online library 📚
                <div className="outPut">{lib}</div>
                <div className="wrapperMenu">
                    <div className="setID">Set id
                        <input 
                            onChange={event => setFindID(event.target.value)}
                            className="id" value={findID}></input>
                    </div>
                    <button onClick={click} className="get">get a list of all books</button>
                    <button className="getID">get book by id</button>
                    <button className="post">download the book in library</button>
                    <button className="delete">remove book from library</button>
                    <button className="put">change book details</button>
                </div>
            </div>
        </>
    )
}