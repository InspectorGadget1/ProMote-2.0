import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props{
    openForm: () => void;
}

export default function NavBar({openForm}: Props) {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
                    ProMote
                </Menu.Item>
                <Menu.Item name="Jobs"></Menu.Item>
                <Menu.Item name="Analysis"></Menu.Item>
                <Menu.Item>
                    <Button onClick={openForm} positive content='Create Job' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}