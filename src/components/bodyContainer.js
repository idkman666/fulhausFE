import { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import { ItemTile } from "./itemTile";
import Carousel from 'react-bootstrap/Carousel';
import { MyOrderContainer } from "./myOrderContainer";
import { BsFillCartXFill, BsFillCartCheckFill  } from "react-icons/bs";

export function BodyContainer() {
    const [products, setProducts] = useState([]);
    const [itemsInBag, setItemsInBag] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
    const [previewProduct, setPreviewProduct] = useState({
        imageURLs: []
    });
    

    useEffect(() => {

        const callApi = async () => {
            let url = "https://fh-api-dev.herokuapp.com/api/products-service/products/website/CAD?page=0&limit=6"
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            setProducts(parsedData.data.products);
            setPreviewProduct(parsedData.data.products[0]);
        }
        callApi();
    }, [])

    useEffect(() => {
        calculateTotal();
        
    }, [itemsInBag])

    const ItemGridTile = (props) => {
        //could randomize xs value
        return (
            <Grid className="grid-tile" xs={10} item={true}>
                <ItemTile selectedProduct={props.product} handlePreview={props.handlePreview} productId={props.product._id} imageLinks={props.product.imageURLs[0]} handleClick={props.handleClick}></ItemTile>
            </Grid>);
    }

    const calculateTotal = () => {
        if (itemsInBag.length > 0) {
            let total = itemsInBag.reduce((n, { price }) => n + price, 0);
            setTotalPrice(total);
        }else(
            setTotalPrice(0)
        );
    }

    const addItemsToBag = (itemId) => {
        let count = 1;
        let isUniqueItem = true;
        //check if item is already in the 
        let selectedItemModel = {};
        if (itemsInBag.length > 0) {
            let isItemInBag = itemsInBag.map((e) => e.productId === itemId);
            let originalProduct = products.filter((item) => item._id === itemId); //returns list [{product}]
            let newItemBagState = [...itemsInBag];
            let duplicateItemIndex = itemsInBag.findIndex((item) => item.productId === itemId);
            
            //updating count number
            if (isItemInBag.includes(true)) {
                count = ++itemsInBag[duplicateItemIndex].count;
                let updatedItem = {...itemsInBag[duplicateItemIndex], count:count , price: originalProduct[0].retailPrice * count };
                //duplicate item
                newItemBagState[duplicateItemIndex] = updatedItem;

                isUniqueItem = false;
                setItemsInBag(newItemBagState);
            }
        }
        let selectedItem = products.filter((product) => product._id === itemId);
        
        if(isUniqueItem){
            selectedItemModel = {
                productId: itemId,
                productName: selectedItem[0].fulhausProductName,
                count: count,
                imageUrl: selectedItem[0].imageURLs[0],
                price: selectedItem[0].retailPrice * count,
            }
            setItemsInBag((prev) => [...prev, selectedItemModel]);
        }
        calculateTotal();
    }
    const removeItemsFromBag = (itemId) => {
        let newItemsInBag = itemsInBag.filter((item) => item.productId !== itemId);
        setItemsInBag(newItemsInBag);
        calculateTotal();
    }

    const handleShoppingCartClose = () => {
        setIsShoppingCartOpen(false);
    }

    const changePreview = (product) => {
        setPreviewProduct(product);
    }


    return (<div>
        <h3>Fulhaus</h3>
        {isShoppingCartOpen === true ?
            <section className="shoppingCart">
                <MyOrderContainer totalPrice={totalPrice} selectedItems={itemsInBag} handleClose={handleShoppingCartClose} handleDelete={removeItemsFromBag}></MyOrderContainer>
            </section> : <a className="clickableIcons" onClick={() => setIsShoppingCartOpen(true)}>
                    {itemsInBag.length > 0?<BsFillCartCheckFill size={70} color="green"></BsFillCartCheckFill> : <BsFillCartXFill size={70} color="black"></BsFillCartXFill>}
                
                </a>}
        <div className="body">
            <section className="row grid-body" >
                <div className="preview-container col-sm" style={{ height: "100%", width: "25%" }}>
                    <Carousel >
                        {
                            previewProduct.imageURLs.map((imgLink,index) =>  <Carousel.Item key={index + "ss"}><center><img  className="previewImage" src={imgLink} ></img></center></Carousel.Item>)
                        }
                    </Carousel>
                    <div className="preview-description">
                        <p>Material: {previewProduct.material}</p>
                        <p>Stock Quantity: {previewProduct.stockQty}</p>
                        <p>Description: {previewProduct.fulhausDescription}</p>
                    </div>
                </div>
                <Grid className="col" container spacing={2} columns={20}>
                    {
                        products.map((product, index) => <ItemGridTile handlePreview={changePreview} key={index} product={product} handleClick={addItemsToBag} ></ItemGridTile>)
                    }
                </Grid>
            </section>
        </div>
    </div>);

}