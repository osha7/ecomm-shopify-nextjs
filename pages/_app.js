import { useState, useEffect } from "react";
import Router from 'next/router';
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Link from 'next/link';
import {
    Button,
    Container,
    Grid,
    Header,
    Image,
    Segment,
    Menu,
    Sidebar,
    Visibility,
} from "semantic-ui-react";

const NavBar = () => {
    const [fixed, setFixed] = useState();
    return (
        <Visibility
            once={false}
            onBottomPassed={() => setFixed(true)}
            onBottomPassedReversed={() => setFixed(false)}
        >
          <Segment
            inverted
            textAlign="center"
            style={{minHeight: 50, padding: '1em 2em'}}
            >
            <Menu
            inverted={!fixed}
            fixed={ fixed ? "top" : null}
            pointing={!fixed}
            secondary={!fixed}
            size={'large'}
            >
              <Container>
                <Link href="/">
                  <Menu.Item active>
                    HOME
                  </Menu.Item>
                </Link>
                <Link href="/about">
                  <Menu.Item>
                    ABOUT US
                  </Menu.Item>
                </Link>
                  <Menu.Item position="right">
                    <Button onClick={() => {
                      const storage = window.localStorage
                      const cart = JSON.parse(storage.getItem("cart"))
                      Router.replace(cart.webUrl)
                    }} >Checkout</Button>
                  </Menu.Item>

              </Container>
            </Menu>
          </Segment>
        </Visibility>
    );
};

function MyApp({ Component, pageProps }) {
    return (
      <>
        <NavBar />
        <Component {...pageProps} />
      </>
    )
}

export default MyApp;
