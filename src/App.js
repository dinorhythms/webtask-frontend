import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import axios from 'axios';

const backend_url = 'https://rshunter-webtask.herokuapp.com/api/v1';

function App() {

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [age, setAge] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRecords = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`${backend_url}/users`);
        setUsers(data.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error.message);
      }
    }
    getRecords();
  }, [])
  
	const handleSubmit = e => {
		e.preventDefault();

		const userData = {
			firstName,
			lastName,
			age,
			phoneNo,
			address
		};
  };
  
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
							<Form onSubmit={handleSubmit}>
								<Form.Row className="mb-3">
									<Col>
										<Form.Control
											type="text"
											onChange={e => setFirstName(e.target.value)}
											placeholder="First name"
											required
										/>
									</Col>
									<Col>
										<Form.Control
											type="text"
											onChange={e => setLastName(e.target.value)}
											placeholder="Last name"
											required
										/>
									</Col>
								</Form.Row>
								<Form.Row className="mb-3">
									<Col>
										<Form.Control
											type="number"
											onChange={e => setAge(e.target.value)}
											placeholder="Age"
											required
										/>
									</Col>
									<Col>
										<Form.Control
											type="number"
											onChange={e => setPhoneNo(e.target.value)}
											placeholder="Phone"
											required
										/>
									</Col>
								</Form.Row>
								<Form.Row className="mb-3">
									<Col>
										<Form.Control
											type="text"
											onChange={e => setAddress(e.target.value)}
											placeholder="Address"
											required
										/>
									</Col>
								</Form.Row>
								<Button variant="primary" type="submit" block>
									Add User
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
                            <Button variant="primary" size="sm">
                              Update
                            </Button>
                          </td>
                          <td style={{width: '2rem'}}>
                            <Button variant="danger" size="sm">
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

export default App;
