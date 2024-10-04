
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { deleteUsers, fetchUsers,  updateUsers } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./AddProduct.module.css"
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.user)
    const [show, setShow] = useState(false);
    const [updateUser, setUpdateUser] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = (id) => {
        dispatch(deleteUsers(id))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        
        const { name, email, contact, country } = Object.fromEntries(formData)

        const updatedUser = { id: updateUser.id, name, email, contact, country }
        dispatch(updateUsers(updatedUser))
        e.target.reset()
    }
    const handleUpdate = (id) => {
        const upUser = users.filter(us => us.id == id)
        setUpdateUser(upUser[0])
    }
    useEffect(() => {
        dispatch(fetchUsers())
    }, [users])

    if (!users) return <h4 align="center">Loading...</h4>
    return (
        <Container>
            <Link className='btn btn-primary my-4' to={"/add-user"} variant="primary">ADD USER</Link>
            <h5 align={"center"} className='mb-2'>ALL USERS </h5>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email (₹)</th>
                        <th>Contact</th>
                        <th>Country</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {users && users.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td>{item.country}</td>
                            <td>
                                <Button className='mx-2' onClick={() => handleDelete(item.id)} variant="danger">Delete</Button>
                                <Button variant="primary" onClick={() => { handleUpdate(item.id); handleShow() }}>Update</Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>

            <Modal show={show} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>UPDATE USER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="" action="" onSubmit={(e) => handleSubmit(e)}>
                        <div className={styles.form_div}>
                            <label htmlFor="">Name</label>
                            <input defaultValue={updateUser.name} name='name' type="text" placeholder=' Name' />
                        </div>
                        <div className={styles.form_div}>
                            <label htmlFor="">Email</label>
                            <input defaultValue={updateUser.email} name='email' type="text" placeholder='email' />
                        </div>
                        <div className={styles.form_div}>
                            <label htmlFor="">contact</label>
                            <input defaultValue={updateUser.contact} name='contact' type="number" placeholder='Contact' />
                        </div>
                        <div className={styles.form_div}>
                            <label htmlFor="">Country</label>
                            <input defaultValue={updateUser.country} name='country' type="text" placeholder='country' />
                        </div>
                       
                        <div className={styles.form_div}>
                            <Button type="submit" variant="primary" onClick={handleClose}>
                                Save
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </Container >
    )
}
