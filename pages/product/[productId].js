import { useRouter } from 'next/router';
import { useState } from 'react';
import { client } from '../../utils/shopify';
import {
    Button,
    Container,
    Grid,
    Header,
    Image,
    Input,
    Segment,
    Menu,
    Sidebar,
    Visibility,
    List,
} from "semantic-ui-react";

const { Row, Column } = Grid

const IndividualProduct = ({ product }) => {
    const [ image, setImage ] = useState(product.images[0])
    // const router = useRouter()
    // const { productId } = router.query
    // console.log(productId)
    // return (
    //     <div>
    //         <h1>{productId}</h1>
    //     </div>
    // ) 
    const [ quantity, setQuantity ] = useState(0)
    const addToCart = async () => {
        const storage = window.localStorage
        let checkoutId = storage.getItem('checkoutId')
        // console.log({checkoutId})
        if (!checkoutId) {
            const checkout = await client.checkout.create()
            checkoutId = checkout.id;
            storage.setItem('checkoutId', checkoutId)
        }
        const cart = await client.checkout.addLineItems(checkoutId, [{
            variantId: product.variants[0].id,
            quantity: quantity
        }])
        storage.setItem('cart', JSON.stringify(cart))
        console.log({ cart })
    }

    console.log("product", product)
    return (
        <Grid container centered >
            <Row column={2}>
                <Column width={10} style={{marginTop: 50}}>
                    <Row><Image src={image.src}/></Row>
                    <Row>
                        <List horizontal divided >
                            {product.images.map(image =>  {
                                return (
                                    <List.Item onClick={() => setImage(image)}>
                                        <Image avatar src={image.src} size={'small'} />
                                    </List.Item>
                                )
                            })}
                        </List>
                    </Row>
                </Column>
                <Column width={6} style={{marginTop: 50}}>
                <Input
                    action={{
                    color: 'teal',
                    labelPosition: 'left',
                    icon: 'cart',
                    onClick: addToCart,
                    content: 'Checkout',
                    }}
                    onChange={(e, {value}) => setQuantity(Number(value))}
                    type="number"
                    actionPosition='left'
                    placeholder='Search...'
                    defaultValue={quantity}
                />
                </Column>
            </Row>
        </Grid>
        // <div>
        //     <h1>{product.title}</h1>
        // </div>
    ) 
}
export async function getServerSideProps({ query }) {

const productId = query.productId
console.log (productId)
    // Fetch data from external API
const product = await client.product.fetch(productId);

console.log({product});
    // Pass data to the page via props
return { props: { product: JSON.parse(JSON.stringify(product)) } };
}

export default IndividualProduct;