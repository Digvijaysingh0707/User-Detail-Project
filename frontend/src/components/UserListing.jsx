import React, { useContext, useEffect, useState } from 'react'
import { getUserList, deleteUser } from '../config/services/userDetails';
import { UserContext } from './ResizableComponent';

const UserListing = () => {
  const { userList, check, setCheck, setUserDetails, isUpdate, setIsUpdate, pageNo, setPagination, lastPage } = useContext(UserContext)



  const handleDeleteUser = async (item) => {
    try {
      let params = { _id: item?._id }
      let res = await deleteUser(params)
      let { message } = res?.data
      window.alert(message)

      setCheck(!check)
    }
    catch (err) {
      console.error(err, '..error');
    }
  };

  const handleEdit = (item) => {
    setUserDetails(item)
    setIsUpdate(true)

  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '2px solid #000', width: "20%" }}>FirstName</th>
          <th style={{ borderBottom: '2px solid #000', width: "20%" }}>Last Name</th>
          <th style={{ borderBottom: '2px solid #000', width: "20%" }}>Email</th>
          <th style={{ borderBottom: '2px solid #000', width: "20%" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {userList?.length > 0 && userList?.map(item => (
          <tr key={item._id} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{}}>{item.firstName}</td>
            <td style={{ padding: '10px', width: "20%" }}>{item.lastName}</td>
            <td style={{ padding: '10px', width: "20%" }}>{item.email}</td>
            <td style={{ padding: '10px', cursor: 'pointer', color: '#007bff' }} onClick={() => handleEdit(item)}>Edit</td>
            <td style={{ padding: '10px', cursor: 'pointer', color: 'red' }} onClick={() => handleDeleteUser(item)}>Delete</td>
          </tr>
        ))}
      </tbody>
      <div style={{ display: 'flex', justifyContent: "right" }}>
        <button disabled={pageNo <= 0 ? true : false} onClick={() => setPagination(pageNo - 1)}>{"<"}</button>
        <p>{pageNo + 1}</p>
        <button disabled={lastPage} onClick={() => setPagination(pageNo + 1)}>{">"}</button>
      </div>

    </table>
  );

}

export default UserListing