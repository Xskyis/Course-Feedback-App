import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedBack] = useState([
        {
            id: 1,
            text: 'Ini feedback ke satu',
            rating: 10
        },
        {
            id: 2,
            text: 'Ini feedback ke dua',
            rating: 8
        },
        {
            id: 3,
            text: 'Ini feedback ke tiga',
            rating: 7
        },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,

    })

    // tambah feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedBack([newFeedback, ...feedback])
    }

    // hapus feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Apakah anda yakin ingin menghapus ?')) {
            setFeedBack(feedback.filter((item) => item.id !== id))
        }
    }

    //update feedback item
    const updateFeedback = (id, updItem) => {
        setFeedBack(
            feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
        )
    }

    // set item ke update
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }


    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext