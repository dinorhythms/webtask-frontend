import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

function App() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [age, setAge] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [address, setAddress] = useState("");

	const handleSubmit = e => {
		e.preventDefault();

		const userData = {
			firstName,
			lastName,
			age,
			phoneNo,
			address
		};

		console.log("form submitted :", userData);
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
									<tr>
										<td>1</td>
										<td>Mark</td>
										<td>Otto</td>
										<td>@mdo</td>
										<td>@mdo</td>
										<td>@mdo</td>
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
