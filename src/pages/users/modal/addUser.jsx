import { useState } from 'react';
import { Modal, Input } from 'antd';
// import { UserAdd, UsersData, selectPosts } from '../store/users';
import { useAddUserMutation } from '../store/usersApi';
import '../style.scss';
const initialState = {
   name: '',
   username: '',
   password: '',
   passwordConfirmation: '',
};

const AddUser = ({ addUserOpen, setAddUserOpen }) => {
   const [formData, setFormData] = useState(initialState);
   // const { isCreating } = useSelector(selectPosts);

   const [addUser, { isLoading: isLoadingAddUser }] = useAddUserMutation();

   const handleInputChange = e => {
      const { name, value } = e.target;
      setFormData(prevData => ({ ...prevData, [name]: value }));
   };

   const handleAdd = async () => {
      try {
         await addUser(formData);
         setAddUserOpen(false);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <Modal
         open={addUserOpen}
         title='Add row'
         onOk={handleAdd}
         confirmLoading={isLoadingAddUser}
         onCancel={() => setAddUserOpen(false)}
         afterClose={() => setFormData(initialState)}
      >
         <form className='userAddForm'>
            <br />
            <label>
               <Input placeholder='Name' type='text' name='name' value={formData.name} onChange={handleInputChange} />
            </label>
            <br />
            <label>
               <Input
                  placeholder='UserName'
                  type='text'
                  name='username'
                  value={formData.username}
                  onChange={handleInputChange}
               />
            </label>
            <br />
            <label>
               <Input
                  placeholder='Password'
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
               />
            </label>
            <br />
            <label>
               <Input
                  placeholder='PasswordConfirmation'
                  type='password'
                  name='passwordConfirmation'
                  value={formData.passwordConfirmation}
                  onChange={handleInputChange}
               />
            </label>
            <br />
            {/*<Select*/}
            {/*   defaultValue='lucy'*/}
            {/*   loading={false}*/}
            {/*   style={{*/}
            {/*      width: 120,*/}
            {/*   }}*/}
            {/*   options={[*/}
            {/*      {*/}
            {/*         value: 'Super Admin',*/}
            {/*         label: 'Super Admin',*/}
            {/*      },*/}
            {/*      {*/}
            {/*         value: 'Admin',*/}
            {/*         label: 'Admin',*/}
            {/*      },*/}
            {/*      {*/}
            {/*         value: 'Guest',*/}
            {/*         label: 'Guest',*/}
            {/*      },*/}
            {/*   ]}*/}
            {/*/>*/}
            <br />
         </form>
      </Modal>
   );
};

export default AddUser;
