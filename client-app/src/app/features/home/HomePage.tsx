import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomePage() {
    return (
        <Container style={{margin: '7em'}}>
            <h1>Home page</h1>
            <h3>Go to <Link to='/jobs'>Jobs</Link></h3>
        </Container>
    )
}