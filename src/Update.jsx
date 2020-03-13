import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row} from "react-bootstrap";
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const backend_url = 'https://rshunter-webtask.herokuapp.com/api/v1';

export default function Update({history}) {

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phoneNo: '',
    address: ''
  })
  
  const { id } = useParams();

  useEffect(() => {
    const getRecords = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`${backend_url}/users/${id}`);
        setUser(data.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error.message);
        setIsLoading(false)
      }
    }
    getRecords();
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    try {
      setIsLoading(true)
      setErrors([]);
      
      await axios.patch(`${backend_url}/users/update/${id}`, user);
      setIsLoading(false)
      history.push('/');
    } catch (error) {
      setIsLoading(false)
      
      if(error.response && error.response.data && error.response.data.errors){
        setErrors(error.response.data.errors);
      }
    }
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
							<Form onSubmit={handleSubmit} id="userform">
								<Form.Row className="mb-3">
									<Col>
										<Form.Control
                      type="text"
                      defaultValue={user.firstName}
											onChange={e => setUser({...user, firstName: e.target.value})}
											placeholder="First name"
											required
										/>
									</Col>
									<Col>
										<Form.Control
                      type="text"
                      defaultValue={user.lastName}
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
                      defaultValue={user.age}
											onChange={e => setUser({...user, age: e.target.value})}
											placeholder="Age"
											required
										/>
									</Col>
									<Col>
										<Form.Control
                      type="number"
                      defaultValue={user.phoneNo}
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
                      defaultValue={user.address}
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
									{isLoading?"...Loading": "Update"}
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			</section>
		</div>
  )
}
