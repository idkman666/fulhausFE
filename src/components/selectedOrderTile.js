import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import {BsFillTrash3Fill} from "react-icons/bs";

export function SelectedOrderTile(props) {

    return (<div className='shopping-cart-tile'>
        <Card >
            <Stack direction="horizontal" gap={3}>
                <img style={{ width: "100%", height: "100px" }} className="selected-item-image" src={props.imageUrl}></img>

                <Stack direction="vertical" gap={0}>
                    <h6>
                        {props.selectedProduct.productName}
                    </h6>
                    <h6>Price: ${props.selectedProduct.price}</h6>
                    <h6>Count: {props.selectedProduct.count}</h6>
                    <a className='clickableIcons' onClick={() => props.handleDelete(props.selectedProduct.productId)}>
                       <BsFillTrash3Fill size={15} color="red"></BsFillTrash3Fill>
                    </a>
                </Stack>

            </Stack>
        </Card>
    </div>)
}