import { useState, useEffect, useRef } from "react";
import axios, { Axios } from 'axios';
import React from "react";
import book_png from './book.png';
import Modal from "./Modal";
import ModalCard from "./ModalCard";
import { motion, AnimatePresence, } from "framer-motion";
import findImg from './find.png';
import { render } from "react-dom";

const server = 'http://localhost:80/lib';
const serverDownload = 'http://localhost:80/download';


export const Library = () => {

    const [nameValue, setNameValue] = useState('')
    const [authorValue, setAuthorValue] = useState('')
    const [descriptionValue, setDescriptionValue] = useState('')
    const [lib, setlib] = useState([])
    const [activeAlert, setActiveAlert] = useState(false)
    const [activeCreate, setActiveCreate] = useState(false)
    const [activeDetails, setActiveDetails] = useState(false)
    const [activeModalCard, setActiveModalCard] = useState(false)
    const [valueAlert, setAlertValue] = useState('')
    const [modalCardValue, setModalCardValue] = useState('')
    const [listBook, setListBook] = useState([])
    const [findValue, setFindValue] = useState('')


    useEffect(() => {
        setListBook(lib.map((card) => (
            <div
                key={card.id}
                className="bookCard">
                <div className="photoCard">
                    <img className="photo" src={book_png}></img>
                </div>
                <div className="nameCard">{card.nameCard}</div>
                <div className="authorCard">{card.authorCard}</div>
                <button
                    className="descriptionButton"
                    onClick={() => {
                        setModalCardValue(card.descriptionCard)
                        setActiveModalCard(!activeModalCard)
                    }}>description
                </button>
            </div>
        )))
    }, [lib])


    function clickDescription(value) {
        setActiveModalCard(!activeModalCard)
    }

    const clearInput = () => {
        setNameValue('')
        setAuthorValue('')
        setDescriptionValue('')
        setFindValue('')
        render
    }

    function clickFind() {
        if (findValue.length > 0) {
            setlib(lib.filter(book => {
                if (book.nameCard.toLowerCase().includes(findValue.toLowerCase())) return book
                else if (book.authorCard.toLowerCase().includes(findValue.toLowerCase())) return book
                else if (book.descriptionCard.includes(findValue.toLowerCase())) return book
            }))
        }
    }

    function loadAll() {
        axios
            .get(server)
            .then(response => {
                setlib(response.data)
            }).catch(error => {
                console.log(error.response.data)
            })
    }


    function postData(nextID, nameValue, authorValue, descriptionValue) {

        axios.post('http://localhost:80/download', {
            id: nextID,
            nameCard: nameValue,
            authorCard: authorValue,
            descriptionCard: descriptionValue
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function dellData() {
        if (nameValue != '') {
            axios.post('http://localhost:80/dell', {
                nameCard: nameValue
            })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                })
            clearInput()
        } else {
            setActiveAlert(true)
            setAlertValue("fill in the fields name Book")
        }
    }

    function returnLastItem(arr) {
        return arr[arr.length - 1]
    }

    function clickCreateBook() {
        //необходимо изменить метод получения следующего ид
        const nextID = returnLastItem(lib).id + 1
        if (nameValue != '' && authorValue != '' && descriptionValue != '') {
            postData(nextID, nameValue, authorValue, descriptionValue)
            clearInput()
        }
        else {
            setActiveAlert(true)
            setAlertValue("fill in the fields name Book , author, description")
        }
    }

    function clickChangeDetails() {
        setActiveAlert(!activeAlert)
        setAlertValue("Fill in at least one field and book id")
    }

    return (
        <>
            <div onLoad={loadAll} className="allLib">
                <div className="logo">
                    <div className="logoWrapper">
                        Welcome to online library 📚
                    </div>
                </div>
                <div className="library">
                    <motion.div
                        className="wrapperBookCard">
                        <div className="find">
                            <button className="loadAll" onClick={loadAll}>Load all</button>
                            <div className="findWrapper">
                                <input
                                    className="inputFind"
                                    onChange={event => {
                                        setFindValue(event.target.value)
                                        clickFind()
                                        if (event.target.value == '') {
                                            loadAll()
                                        }
                                    }}
                                    type="text"
                                    value={findValue}
                                    placeholder="enter to search" />
                                <button
                                    onClick={clickFind}
                                    className="buttonFind"><img className="findImg" src={findImg} alt="поиск" />
                                </button>
                            </div>
                        </div>
                        {listBook}
                    </motion.div>
                    <div className="libWrapper">
                        <div className="createWrapper">
                            <motion.div
                                onClick={() => setActiveCreate(!activeCreate)}
                                className={"createDiv"}
                            >
                                <span
                                    className={"createSpan"}>Create
                                </span>
                            </motion.div>
                            <AnimatePresence>
                                {activeCreate && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: .3 }}
                                        exit={{ opacity: 0 }}
                                        className={"wrapperMenu"}>
                                        <div className="setName">Set name Book
                                            <input
                                                onChange={event => setNameValue(event.target.value)}
                                                className="name" value={nameValue}>
                                            </input>
                                        </div>
                                        <div className="setAuthor">Set author Book
                                            <input
                                                onChange={event => setAuthorValue(event.target.value)}
                                                className="author" value={authorValue}>
                                            </input>
                                        </div>
                                        <div className="setDescription">Set description
                                            <textarea
                                                onChange={event => setDescriptionValue(event.target.value)}
                                                className="description" value={descriptionValue}>
                                            </textarea>
                                        </div>
                                        <motion.div className="button">
                                            <button title="Заполните все поля" onClick={clickCreateBook} className="post">download</button>
                                            <button onClick={dellData} className="delete">remove</button>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="detailsWrapper">
                            <motion.div
                                onClick={() => setActiveDetails(!activeDetails)}
                                className={"detailsDiv"}
                            >
                                <span className={"detailsSpan"}>Change details</span>
                            </motion.div>
                            <AnimatePresence>
                                {activeDetails && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: .3 }}
                                        exit={{ opacity: 0 }}
                                        className={"wrapperMenu"}>
                                        <div className="setName">Сurrent book name
                                            <input
                                                className="name"></input>
                                        </div>
                                        <div className="setName">New name Book
                                            <input
                                                className="name"></input>
                                        </div>
                                        <div className="setAuthor">New author Book
                                            <input
                                                className="author" ></input>
                                        </div>
                                        <div className="setDescription">New description
                                            <textarea
                                                className="description" ></textarea>
                                        </div>
                                        <motion.div className="button">
                                            <button className="details">change</button>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <ModalCard
                        active={activeModalCard}
                        setActive={setActiveModalCard}
                        value={modalCardValue}>
                    </ModalCard>
                    <Modal active={activeAlert} setActive={setActiveAlert} value={valueAlert} />
                </div>
            </div>
        </>
    )
}