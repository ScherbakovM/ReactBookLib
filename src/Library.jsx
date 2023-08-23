import { useState, useEffect } from "react";
import axios, { Axios } from 'axios';
import React from "react";
import book_png from './book.png';

const server = 'http://localhost:80/lib';
const serverDownload = 'http://localhost:80/download';


export const Library = () => {

    const [findID, setFindID] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [authorValue, setAuthorValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [lib, setlib] = useState([]);
    const [render, setRender] = useState(false)


    useEffect(() => {
        axios
            .get(server)
            .then(response => {
                setlib(response.data.Book)
            }).catch(error => {
                console.log(error.response.data)
            }, [lib, render]);
    })


    let listBook = lib.map((card) => (
        <div
            key={card.id}
            className="bookCard">
            <div className="photoCard">
                <img className="photo" src={book_png}></img>
            </div>
            <div className="nameCard">{card.nameCard}</div>
            <div className="authorCard">{card.authorCard}</div>
            <div className="descriptionCard">{card.descriptionCard}</div>
        </div>
    ))

    function returnLastItem(arr) {
        return arr[arr.length - 1];
    }

    function clearInput() {
        setFindID('')
        setNameValue('')
        setAuthorValue('')
        setDescriptionValue('')
    }

    function postData(nextID, nameValue, authorValue, descriptionValue) {

        axios.post('http://localhost:80/download', {
            id: nextID,
            nameCard: nameValue,
            authorCard: authorValue,
            descriptionCard: descriptionValue
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function clickLoadBook() {
        //необходимо изменить метод получения следующего ид
        const nextID = returnLastItem(lib).id + 1
        if (nameValue != '' && authorValue != '' && descriptionValue != '') {
            postData(nextID, nameValue, authorValue, descriptionValue)
        }
        else alert('fill in the fields name Book , author, description')
    }

    function click() {
        let lastItem = returnLastItem(lib)
        console.log(`find id: ${findID}, name:  ${nameValue}, author : ${authorValue}, description : ${descriptionValue}`)
        clearInput()
        setRender(true)
    }

    return (
        <>
            <div className="library"><h1>Welcome to online library 📚</h1>
                <div className="wrapperMenu">
                    <div className="setName">Set name Book
                        <input
                            onChange={event => setNameValue(event.target.value)}
                            className="name" value={nameValue}></input>
                    </div>
                    <div className="setAuthor">Set author Book
                        <input
                            onChange={event => setAuthorValue(event.target.value)}
                            className="author" value={authorValue}></input>
                    </div>
                    <div className="setDescription">Set description
                        <input
                            onChange={event => setDescriptionValue(event.target.value)}
                            className="description" value={descriptionValue}></input>
                    </div>
                    <div className="setID">Book ID to search
                        <input
                            onChange={event => setFindID(event.target.value)}
                            className="id" value={findID}></input>
                    </div>
                </div>
                <div className="button">
                    {/* <button onClick={click} className="get">get a list of all books</button> */}
                    <button onClick={clickLoadBook} className="post">download the book in library</button>
                    <button className="getID">get book by id</button>
                    <button className="delete">remove book from library</button>
                    <button className="put">change book details</button>
                </div>
                <div className="wrapperBookCard">
                    {listBook}
                </div>
            </div>
        </>
    )
}