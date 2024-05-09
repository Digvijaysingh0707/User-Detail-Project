import React, { useContext } from 'react';
import { addUser, updateUser } from '../config/services/userDetails';
import _ from 'lodash';
import { UserContext } from './ResizableComponent';

const UserDetailsForm = ({ type }) => {
  const { userDetails, setUserDetails, check, setCheck, isUpdate, setIsUpdate } = useContext(UserContext)

  const handleValidation = (data) => {
    if (!data?.firstName) {
      window.alert("Invalid firstName")
      return false
    }
    if (!data?.lastName) {
      window.alert("Invalid lastName")
      return false

    }
    if (!data?.email || !data?.email?.includes("@gmail.com")) {
      window.alert("Invalid email")
      return false

    }
    return true
  }

  const handleSubmit = async () => {
    try {
      const validation = handleValidation(userDetails)
      if (validation) {
        const params = {
          firstName: userDetails?.firstName,
          lastName: userDetails?.lastName,
          email: userDetails?.email,
        };

        let res = await addUser(params)
        let { message } = res?.data

        window.alert(message)
        setUserDetails({ firstName: "", lastName: "", email: "" })
        setCheck(!check)
      }
    }
    catch (err) {
      console.error(err, '..error');
    }

  };

  const handleUpdate = async () => {
    try {
      const validation = handleValidation(userDetails)
      if (validation) {
        let params = userDetails
        let res = await updateUser(params)
        let { message } = res?.data
        window.alert(message)
        setUserDetails({ firstName: "", lastName: "", email: "" })
        setCheck(!check)
        setIsUpdate(!isUpdate)
      }
    }
    catch (err) {
      console.error(err, '..error');
    }
  };

  const handleDetails = (e, key) => {

    let { value } = e.target
    setUserDetails(prev => {
      return {
        ..._.cloneDeep(prev),
        [key]: value
      }
    })
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{`${type} User Detail`}</h1>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={userDetails?.firstName}
          onChange={(e) => handleDetails(e, "firstName")}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={userDetails?.lastName}
          onChange={(e) => handleDetails(e, "lastName")}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={userDetails?.email}
          onChange={(e) => handleDetails(e, "email")}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={isUpdate ? handleUpdate : handleSubmit}
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {type}
        </button>
      </div>

    </>
  );

};

export default UserDetailsForm;
