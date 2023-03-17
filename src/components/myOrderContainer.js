import { SelectedOrderTile } from "./selectedOrderTile";
import Stack from 'react-bootstrap/Stack';
import {BsFillXCircleFill} from "react-icons/bs";


export function MyOrderContainer(props) {
    

    return (
        <div className="myOrderContainer" >
            <h3>My Orders</h3>
            {
                props.selectedItems.map((product, index) => {
                    return ( <SelectedOrderTile key={index + "ss"} selectedProduct={product} imageUrl={product.imageUrl} handleDelete={props.handleDelete}></SelectedOrderTile>)
                })
            }
           <Stack  direction="horizontal"  className="totalPrice">
                <h3>
                    Total: ${props.totalPrice}
                </h3>
                <a className="clickableIcons" onClick={() => props.handleClose()}>
                    <BsFillXCircleFill size={30} color="red" ></BsFillXCircleFill>
                </a>
           </Stack>
        </div>

    );
}