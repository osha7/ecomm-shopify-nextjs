import Link from 'next/link';
import { Card, Image, Header } from "semantic-ui-react";

const Products = ({ products }) => {
    console.log({products})
    
    return (
        <>
            <Card.Group itemsPerRow={4} >
                {products.map(product => {
                    return (
                        <Link href={`/product/${product.id}`} key={product.title}>
                            <Card >
                                <Image src={product.images[0].src} size={'medium'}/>
                                <Card.Content>
                                    <Header as="h3">{product.title}</Header>   
                                    <p>{product.description}</p>
                                    <span>${product.variants[0].price}</span>

                                </Card.Content>
                            </Card>
                        </Link>
                    )
                })}
            </Card.Group>
        </>
    )
}

export default Products;