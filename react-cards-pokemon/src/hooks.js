import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {v1 as uuid} from "uuid"

const useFlip = (initialState = true) => {
    const [isFlipped, setIsFlipped] = useState(initialState);

    const toggle = () => {
        setIsFlipped(isFlipped => !isFlipped)
    }

    return [isFlipped, toggle]
}

const useAxios = (url) => {
    const [data, setData] = useState([])
    const add = async (extras) => {
        const fullUrl = url + extras
        const response = await axios.get(fullUrl)
        setData(data => [...data, {...response.data, id: uuid()}])
    }
    return [data, add]

}

export {useFlip, useAxios}