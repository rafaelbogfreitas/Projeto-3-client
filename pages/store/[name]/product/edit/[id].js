import { useState } from 'react'

import Loading from  '../../../../../components/Loading/Loading'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { getProduct, editProduct, deleteProduct } from '../../../../../services/productService'
import { getStore } from '../../../../../services/storeService';
import { handleInputChange, handleFileChange, processFormData } from '../../../../../services/helpers'

const edit = ({product, storeName}) => {
  let router = useRouter()

  let [ name, setName ] = useState(product.name);
  let [ description, setDescription ] = useState(product.description);
  let [ price, setPrice ] = useState(product.price);
  let [ quantity, setQuantity ] = useState(product.quantity);
  let [ image, setImage ] = useState();
  
  let [ loading, setLoading ] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const data = { name, description, price, quantity, image};

    editProduct(product._id, processFormData(data))
      .then((response) => router.push(`/store/${storeName}/dashboard`))
      .catch((error) => {
        setLoading(false);
        console.log(error)
      });
  };

  const handleDelete = async () => {
    // async/await
    try {
      const [store] = await getStore(storeName);
      const response = await deleteProduct(store._id, product._id);
      console.log(response);
      router.push(`/store/${storeName}/dashboard`);
    } catch (error) {
      console.log(error.response);
    }
    
    // // then/catch
    // getStore(storeName)
    // .then(([store]) => {
    //   deleteProduct(store._id, product._id)
    //   .then((response) => {
    //     console.log(response);
    //     router.push(`/store/${storeName}/dashboard`);
    //   })
    //       .catch((error) => console.log(error.response));
    //     })
    //   .catch((error) => console.log(error.response));
  };

  return (
    loading ?
    <>
    <Head>
        <title>Loading</title>
    </Head>
    <Loading/> 
    </> :
    <div>
      <Head>
        <title>Edit Product</title>
      </Head>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>

        <input  placeholder="name" onChange={(event) => handleInputChange(event, setName)} type="text" name="name" value={name}/>
        <input  placeholder="description" onChange={(event) => handleInputChange(event, setDescription)} type="text" name="description" value={description}/>
        <input  placeholder="quantity" onChange={(event) => handleInputChange(event, setQuantity)} type="text" name="quantity" value={quantity}/>
        <input  placeholder="price" onChange={(event) => handleInputChange(event, setPrice)} type="text" name="price" value={price}/>
        <input  placeholder="image" onChange={(event) => handleFileChange(event, setImage)} type="file" name="image"/>

        <button className="saveButton">SAVE</button>

      </form>
      
      <button onClick={handleDelete} className="deleteButton">Delete</button>
    </div>
  )
}

edit.getInitialProps = async ctx => {
  // console.log(ctx.query)
  let { id } = ctx.query;
  let { name } = ctx.query;
  let {product} = await getProduct(id);

  return {
    product,
    storeName: name
  }
}

export default edit
