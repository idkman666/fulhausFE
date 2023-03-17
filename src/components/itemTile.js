import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import {  BsPlusCircle  } from "react-icons/bs";


export function ItemTile(props) {

    const ImageContainer = () => {
        return (
            <div className='image-tile' onClick={() => props.handlePreview(props.selectedProduct)}>
                <img className="d-block w-100" src={props.imageLinks} style={{ objectFit: "cover" }}></img>
            </div>);
    }

    return (
        <section className='itemTile'>
            <ImageContainer></ImageContainer>
            <div style={{ height: "50px" }}>
                <div className='container'>
                    <div className='row' style={{ backgroundColor: "grey" }}>
                        <h6 className='col'>{props.selectedProduct.fulhausProductName}</h6>
                    </div>
                    <div className='price-container' >
                        <div style={{maxWidth:"100px"}}>
                        <h6 className=''>$ {props.selectedProduct.retailPrice} </h6>
                        </div>

                        
                        <a className='clickableIcons' onClick={() => props.handleClick(props.productId)}>
                            <BsPlusCircle size={20} color="yellow" ></BsPlusCircle>
                        </a>

                    </div>

                </div>

            </div>
        </section>
    );
}