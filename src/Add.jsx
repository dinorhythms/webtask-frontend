import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import axios from 'axios';
import { Link } from 'react-router-dom';

const backend_url = 'https://rshunter-webtask.herokuapp.com/api/v1';

function Add() {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phoneNo: '',
    address: ''
  })

  useEffect(() => {
    const getRecords = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`${backend_url}/users`);
        setUsers(data.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error.message);
        setIsLoading(false)
      }
    }
    getRecords();
  }, [])
  
	const handleSubmit = async (e) => {
		e.preventDefault();

    try {
      setIsLoading(true)
      setErrors([]);
      const newData = await axios.post(`${backend_url}/users/create`, user);
      const newUser = newData.data.data
      
      setUsers([...users, {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        age: newUser.age,
        phoneNo: newUser.phoneNo,
        address: newUser.address
      }]) 
      setIsLoading(false)
      document.getElementById("userform").reset();
    } catch (error) {
      setIsLoading(false)
      
      if(error.response.data && error.response.data.errors){
        setErrors(error.response.data.errors);
      }
    }
  };
  
  const handleDelete = async (id) => {
    try {
      setIsLoading(true)
      setErrors([]);
      await axios.delete(`${backend_url}/users/${id}`);
      const newUsers = users.filter(user => user._id !== id)
      setUsers(newUsers);
      setIsLoading(false)
      
    } catch (error) {
      setIsLoading(false)
      if(error.response.data && error.response.data.errors){
        setErrors(error.response.data.errors);
      }
    }
  }
  
	return (
		<div className="App pt-5">
			<Container>
				<Row>
					<Col>
						<h2 className="text-center">Users Data</h2>
					</Col>
				</Row>
			</Container>
			<section>
				<Container>
					<Row>
						<Col>
							<Form onSubmit={handleSubmit} id="userform">
								<Form.Row className="mb-3">
									<Col>
										<Form.Control
											type="text"
											onChange={e => setUser({...user, firstName: e.target.value})}
											placeholder="First name"
											required
										/>
									</Col>
									<Col>
										<Form.Control
											type="text"
											onChange={e => setUser({...user, lastName: e.target.value})}
											placeholder="Last name"
											required
										/>
									</Col>
								</Form.Row>
								<Form.Row className="mb-3">
									<Col>
										<Form.Control
											type="number"
											onChange={e => setUser({...user, age: e.target.value})}
											placeholder="Age"
											required
										/>
									</Col>
									<Col>
										<Form.Control
											type="number"
											onChange={e => setUser({...user, phoneNo: e.target.value})}
											placeholder="Phone"
											required
										/>
									</Col>
								</Form.Row>
								<Form.Row className="mb-3">
									<Col>
										<Form.Control
											type="text"
											onChange={e => setUser({...user, address: e.target.value})}
											placeholder="Address"
											required
										/>
									</Col>
								</Form.Row>
                <div>
                  {errors?(
                    <>
                      {errors.map((error, index) => (
                        <p key={index} className="text-danger text-center">{error[Object.keys(error)]}</p>
                      ))}
                    </>
                  ):null}
                </div>
								<Button variant="primary" type="submit" block disabled={isLoading}>
									{isLoading?"...Loading": "Add User"}
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			</section>
			<section className="mt-3">
				<Container>
					<Row>
						<Col>
							<Table striped bordered hover size="sm">
								<thead>
									<tr>
										<th>#</th>
										<th>First Name</th>
										<th>Last Name</th>
										<th>Age</th>
										<th>Phone</th>
										<th>Address</th>
										<th>Update</th>
										<th>Del</th>
									</tr>
								</thead>
								<tbody>
                  {isLoading?(
                    <tr>
                      <td colSpan="8">...Loading</td>
                    </tr>
                  ):(
                    <>
                      {users.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index+1}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.age}</td>
                          <td>{user.phoneNo}</td>
                          <td>{user.address}</td>
                          <td style={{width: '2rem'}}>
                            <Button variant="primary" size="sm" as={Link} to={`/update/${user._id}`}>
                              Update
                            </Button>
                          </td>
                          <td style={{width: '2rem'}}>
                            <Button variant="danger" size="sm" onClick={(e) => handleDelete(user._id)}>
                              X
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
								</tbody>
							</Table>
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	);
}

export default Add;
