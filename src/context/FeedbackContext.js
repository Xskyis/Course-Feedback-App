import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedBack] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    // Fetch Feedback
    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)

        const data = await response.json()

        setFeedBack(data);
        setIsLoading(false)
    }

    // tambah feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })

        const data = await response.json()

        setFeedBack([data, ...feedback])
    }

    // hapus feedback
    const deleteFeedback = async (id) => {
        if (window.confirm('Apakah anda yakin ingin menghapus ?')) {
            await fetch(`/feedback/${id}`, { method: 'DELETE' })

            setFeedBack(feedback.filter((item) => item.id !== id))
        }
    }

    //update feedback item
    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem),
        })

        const data = await response.json()

        setFeedBack(
            feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
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
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext