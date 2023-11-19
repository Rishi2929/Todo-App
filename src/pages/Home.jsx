import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../main'
import toast from 'react-hot-toast'

function Home() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState([])


    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await axios.post(`${server}/task/new`, {
                title, description
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                },
            })
            setTitle("")
            setDescription("")
            toast.success(data.message)
            setLoading(false)

        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        axios.get(`${server}/task/my`, {
            withCredentials: true
        }).then(res => {
            setTasks(res.data.tasks)
        }).catch(e => {
            toast.error(e.response.data.message)
        })
    }, [])

    return (
        <div className='container'>
            <div className='login'>
                <section>
                    <form onSubmit={submitHandler}>
                        <input type='text' placeholder='Text' value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <input type='text' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} required />
                        <button disabled={loading} type='submit'>Add Task</button>
                    </form>
                </section>
            </div>
            <section className='todosContainer'>
                {
                    tasks.map(i => (
                        <div key={i._id}>{i.title}</div>
                    ))
                }
            </section>
        </div>

    )
}

export default Home