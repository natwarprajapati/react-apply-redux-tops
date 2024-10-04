import { Container } from 'react-bootstrap';
import styles from './AddUser.module.css'
import { useDispatch, useSelector } from 'react-redux';
import {  addUsers } from '../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function AddUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        for (const [key, value] of formData.entries()) {
            if (value.trim() === '') {
                toast.error(`${key} is required!`);
                document.querySelector(`#${key}`).focus()
                return;
            }
        }
        let newId = new Date().getTime().toString()
        formData.append("id", newId)
        const { id, name, email, contact, country } = Object.fromEntries(formData)
        const newProduct = { id, name, email, contact, country,  }
        dispatch(addUsers(newProduct))
        e.target.reset()
        navigate("/")
    }
    return (
        <Container className='p-5'>
            <Link className='btn btn-primary my-2' to={"/"} variant="primary">Back</Link>

            <h5 align={"center"} className='mb-2'>USER FORM</h5>
            <form className={styles.control_form} action="" onSubmit={handleSubmit}>
                <div className={styles.form_div}>
                    <label htmlFor="">Name</label>
                    <input name='name' id='name' type="text" placeholder='Name' />
                </div>
                <div className={styles.form_div}>
                    <label htmlFor="">Email</label>
                    <input name='email' id='email' type="email" placeholder='email' />
                </div>
                <div className={styles.form_div}>
                    <label htmlFor="">Contact</label>
                    <input name='contact' id='contact' type="number" placeholder='Contact' />
                </div>
                <div className={styles.form_div}>
                    <label htmlFor="">Country</label>
                    <input name='country' id='country' type="text" placeholder='Country' />
                </div>
                
                <div className={styles.form_div}>
                    <button type='submit'>Add</button>
                    <button className={styles.reset_btn} type='reset'>Reset</button>
                </div>
            </form>

        </Container>
    );
}

export default AddUser;