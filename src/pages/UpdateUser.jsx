import { Container } from 'react-bootstrap';
import styles from './AddProduct.module.css'
function UpdateUser() {
    return (
        <Container className='p-5'>
            <h5 className='mb-2'>USER FORM</h5>
            <form className={styles.control_form} action="">
                <div className={styles.form_div}>
                    <label htmlFor=""> Name</label>
                    <input type="text" placeholder='Name'/>
                </div>
                <div className={styles.form_div}>
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder='Email' />
                </div>
                <div className={styles.form_div}>
                    <label htmlFor="">Contact</label>
                    <input type="text" placeholder='Contact' />
                </div>
                <div className={styles.form_div}>
                    <label htmlFor="">Country</label>
                    <input type="text" placeholder='Country' />
                </div>
                <div className={styles.form_div}>
                    <button type='submit'>Add</button>
                    <button className={styles.reset_btn} type='reset'>Reset</button>
                </div>
            </form>

        </Container>
    );
}

export default UpdateUser;