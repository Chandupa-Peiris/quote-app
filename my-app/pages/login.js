import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";


export default function login(){

 const [user, setUser] = useState('');
 const [password, setPassword] = useState('');
 const [warning, setWarning] = useState('');

 const router = useRouter();


 async function handleSubmit(e) {
  e.preventDefault();
  try {
    await authenticateUser(user, password);
    router.push('/favorites');
  } catch (err) {
    setWarning(err.message);
  }
}
    
 return(<>
 <Card bg="light">
    <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
 </Card>

 <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="userName" placeholder="Enter userName" value={user} name='user' onChange={e=>setUser(e.target.value)} />
        <Form.Text className="text-muted">
          Enter the username you have used to register.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} name='password' onChange={e=>setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Agree to our Terms & conditions" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

 </>
 );
}