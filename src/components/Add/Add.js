import React, { useRef ,useState} from "react";
import { db } from ".././config/Firebase";
import { doc, setDoc, addDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "@firebase/firestore";
import CmsCenter from "./CmsCenter";
import { contains } from "@firebase/util";
import './Add.css'
import { FaBaby } from "react-icons/fa";


function Add({ path }) {
  const query = collection(db, `product`);
  const prodType = useRef();
  const brandCategory = useRef();
  const prodName = useRef();
  const prodDescription = useRef();
  const prodColor = useRef();
  const prodSizes = useRef();
  const prodPrice = useRef();
  const prodQty = useRef();
  const [isEdit, setIsEdit] = useState(false);
  
  const [show,setShow]=useState(false);
  const [docs, loading] = useCollectionData(query);
  console.log(docs);

const [image, setImage] = useState();
console.log(image)
const convert2base64 = e =>{
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () =>{
    setImage(reader.result.toString())
  }
  reader.readAsDataURL(file);
};

  let refId = null;

  async function handleSubmit(e) {
    e.preventDefault();
    // Add a new document with a generated id.


    await addDoc(collection(db,`product` ), {
      prodType: prodType.current.value,
      prodName: prodName.current.value,
      brandCategory: brandCategory.current.value,
      prodDescription: prodDescription.current.value,
     
      productCode: new Date().getTime(),
    }).then(async (docRefRes) => {
      console.log("Document written with ID: ", docRefRes.id);
      refId = docRefRes.id;
    });

   
  }
  async function colorSubmit(e) {
    e.preventDefault();
    await setDoc(
      doc(
        db,
        `product`,
        refId,
        "colours",
        prodColor.current.value + "_" + prodSizes.current.value
      ),
      {
        price: prodPrice.current.value,
        qty: prodQty.current.value,
        size: prodSizes.current.value,
        colour: prodColor.current.value,
      }
    ).then((docRef) => {
      console.log("added: ", docRef);
    });
    
  }

  return (
    (<CmsCenter />),
    (
      <div className="rightSideProductsInfo" >
      
        {loading && "Loading..."}
        <form className="formProduct" onSubmit={handleSubmit}>
           <div className="Addprod">
              <div className="prod">
                 <h2>Add Product</h2>
                   <select ref={prodType}>
                      <option value="1">Select Type</option>
                      <option value="T-shirt">T-shirt</option>
                      <option value="Shorts">Shorts</option>
                      <option value="Shirt">Shirt</option>
                      <option value="Denim">Denim</option>
                   </select>
                </div>
              <div>
                   <select name="" id="" ref={brandCategory}>
                      <option value="Category">Select Category</option>
                      <option value="Category 2">Summer</option>
                      <option value="Category 3">Winter</option>
                      <option value="Category 4">Accessories</option>
                      <option value="Category 5">Sale</option>
                   </select>
              </div>

              <div>
                   <input type="text" placeholder="Product Name" ref={prodName} />
              </div>

            <div>
                  <textarea
                  type="text"
                  placeholder="About the product"
                  ref={prodDescription}
                />
            </div>
            <div>
                <input type="alphanumeric" placeholder="Code"></input>
            </div>
            <div> <input type='file' useRef={image} onChange={e => convert2base64(e)} />
               <img src={image}  />
            </div>
            <div>
              <button type="submit" onClick={()=>setShow (!show )}>ADD PRODUCT</button>
             
            </div>

           
           
           
          </div>
        </form>
        {show &&
        <form className="Addsizes" onSubmit={colorSubmit}>
            <div className="sizes">
               <div>
                   <h2>Product features</h2>
                  <label>Available colors</label>
                  <select ref={prodColor}>
                    <option value="default">Select Type</option>
                    <option value="black">black</option>
                    <option value="red">red</option>
                    <option value="blue">blue</option>
                    <option value="white">white</option>
                    <option value="yellow">yellow</option>
                    <option value="olive green">olive green</option>
                    <option value="maroon">maroon</option>
                 </select>
                </div>
                <div >
                   <label>Available sizes</label>
                    <select ref={prodSizes}>
                    <option value="XS">Select Type</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                     <option value="XXXL">XXXL</option>
                   </select>
                </div>
                <div>
                <label>Price</label>
                  <input
                   type="number"
                   step="0.50"
                  placeholder="Price"
                   ref={prodPrice}
                  ></input>
                </div>
                <div>
                  <label>Quantity</label>
                  <input type="number" placeholder="Quantity" ref={prodQty}></input>
                </div>
                <div>
                 <button type="submit">Add</button>
                </div>

                </div> 
             </form>
}
      </div>
    )
  );
}

export default Add;

