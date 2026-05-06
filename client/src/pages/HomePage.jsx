import React, { useEffect, useState } from "react";
import "../App.css";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [updateUser, setUpdateUSer] = useState({})
  const [editId, setEditId] = useState()
  const [userEdit, setUSerEdit] = useState({
    name: "",
    email: ""
  })


  const [loading, setloading] = useState(false)

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const getUSers = async () => {
    try {
      setloading(true)
      const response = await fetch('api/users', {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error("Failed to Fetch")
      }
      const data = await response.json();
      setUsers(data);

    }
    catch (e) {
      alert(e.message || "Something went wrong")
    }
    finally {
      setloading(false)
    }

  }

  useEffect(() => {
    getUSers();
  }, [])


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      if (response.status === 201 || response.status === 403) {
        localStorage.removeItem('token');
        alert('Unauthorised Please Login Again');
        navigate('/')
        return;
      }

    }
    catch (e) {
      alert(e.message || "Somethign went Wrong")
    }
    finally {
      setEditId(null)
      setUpdateUSer({
        name: "",
        email: ""
      })
      getUSers();
    }


  }
  const clickEdit = (id, user) => {
    setEditId(id);
    setUSerEdit({ ...userEdit, name: user.name, email: user.email })
  }
  const clickSave = (id) => {

    if (id !== editId) {
      return alert("try again");
    }
    handleEdit(id, userEdit);

  }

  const handleEdit = async (id, updateUser) => {
    try {
      const response = await fetch(`api/users/${id}`, {
        method: 'PATCH',
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateUser)
      })
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

    }
    catch (e) {
      alert(e.message || "Something went wrong")
    }
    finally {
      setEditId(null)
      setUpdateUSer({
        name: "",
        email: ""
      })
      getUSers();
    }



  }
  const override = {
    display: "block",
    margin: "10px auto",
  };
  return (
    <div className="container">
      <div className="box">
        <h1>Home Page</h1>
        {loading ? (<ClipLoader
          color="#1f1944"
          loading={loading}
          cssOverride={override}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />) : (
          <table border={1}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (users.map((user) => (
                <tr key={user.id}>
                  {user.id == editId ? (
                    <>
                      <td>
                        <input type="text" value={userEdit.name} onChange={(e) => {
                          setUSerEdit({ ...userEdit, name: e.target.value })
                        }} />
                      </td>
                      <td>
                        <input type="email" value={userEdit.email} onChange={(e) => {
                          setUSerEdit({ ...userEdit, email: e.target.value })
                        }} />
                      </td>
                      <td>

                        <MdSave onClick={() => {
                          clickSave(user.id)
                        }} />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        {user.name}
                      </td>
                      <td>
                        {user.email}
                      </td>
                      <td><MdDelete onClick={() => handleDelete(user.id)} /> <MdEdit onClick={() => {
                        clickEdit(user.id, user)
                      }} /></td>
                    </>
                  )
                  }



                </tr>
              ))) : (<tr><td>No users found.</td></tr>)}
            </tbody>
          </table>

        )
        }

      </div>

    </div>
  );
}