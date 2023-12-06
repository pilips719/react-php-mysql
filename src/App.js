import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    mission: "",
    email: "",
    phone: "",
    blog: ""
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson(values => ({...values, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!person.firstName || !person.lastName || !person.mission || !person.email || !person.phone || !person.blog) {
      alert("Please enter all required fields");
      return;
    }
    axios.post('http://localhost/server.php', person).then(function(response) {
      getItems();
    });

    setPerson({
      firstName: "",
      lastName: "",
      mission: "",
      email: "",
      phone: "",
      blog: ""
    });
  }

  const getItems = () => {
    axios.get('http://localhost/server.php').then(function(response) {
      setItems(response.data.data);
    });
  }

  const deleteItems = (id) => {
    axios.delete(`http://localhost/server.php/${id}`).then(function() {
      getItems();
    });
  }

  return (
    <div className="w-full h-[964px] flex flex-row bg-teal-600">
      <div className="grow-[2] flex flex-col justify-start items-center bg-teal-700 gap-6 pt-6">
        <div className="stage">
          <div className="ball bubble"><h1 className="text-center text-7xl text-teal-800 mt-14">Test</h1></div>
        </div>
        <form className="flex flex-col gap-8 items-center" onSubmit={(event) => handleSubmit(event)} >
          <input className="border border-white border-solid w-64 py-1 pl-2 text-lg focus:outline-0" type="text" placeholder="FirstName" name="firstName" value={person.firstName} onChange={handleChange} />
          <input className="border border-white border-solid w-64 py-1 pl-2 text-lg focus:outline-0" type="text" placeholder="LastName" name="lastName" value={person.lastName} onChange={handleChange} />
          <input className="border border-white border-solid w-64 py-1 pl-2 text-lg focus:outline-0" type="text" placeholder="Mission" name="mission" value={person.mission} onChange={handleChange} />
          <input className="border border-white border-solid w-64 py-1 pl-2 text-lg focus:outline-0" type="text" placeholder="Email" name="email" value={person.email} onChange={handleChange} />
          <input className="border border-white border-solid w-64 py-1 pl-2 text-lg focus:outline-0" type="text" placeholder="Phone" name="phone" value={person.phone} onChange={handleChange} />
          <input className="border border-white border-solid w-64 py-1 pl-2 text-lg focus:outline-0" type="text" placeholder="Blog" name="blog" value={person.blog} onChange={handleChange} />
          <button className="border border-white border-solid text-white text-3xl font-semibold bg-teal-700 rounded-[9px] py-2 mt-8 w-40 duration-700 hover:text-teal-900 hover:bg-white" type="submit">Submit</button>        </form>
      </div>

      <div className="grow-[3] flex justify-center items-start">
        <table className="text-white text-center mt-40">
          <thead className="text-2xl font-semibold bg-teal-900">
            <tr>
              <th className="border border-white border-solid py-4 px-4">No</th>
              <th className="border border-white border-solid py-4 px-4">First Name</th>
              <th className="border border-white border-solid py-4 px-4">Last Name</th>
              <th className="border border-white border-solid py-4 px-8">Mission</th>
              <th className="border border-white border-solid py-4 px-32">Email</th>
              <th className="border border-white border-solid py-4 px-12">Phone</th>
              <th className="border border-white border-solid py-4 px-16">Blog</th>
              <th className="border border-white border-solid py-4 px-8">Action</th>
            </tr>
          </thead>
          <tbody className="text-xl font-normal bg-teal-700">
            {items.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-white border-solid py-2">{index + 1}</td>
                <td className="border border-white border-solid py-2">{item.firstName}</td>
                <td className="border border-white border-solid py-2">{item.lastName}</td>
                <td className="border border-white border-solid py-2">{item.mission}</td>
                <td className="border border-white border-solid py-2">{item.email}</td>
                <td className="border border-white border-solid py-2">{item.phone}</td>
                <td className="border border-white border-solid py-2">{item.blog}</td>
                <td className="border border-white border-solid py-2">
                  <button className="border border-red-600 bg-red-600 px-4 py-0.5 rounded-xl hover:bg-teal-600 hover:border-red-600 hover:border hover:text-red-700" onClick={() => deleteItems(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;


