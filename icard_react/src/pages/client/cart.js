import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { size } from "lodash";
import { useProduct } from "../../hooks";
import { getProductsCart } from "../../api/cart";
import { ListProductsCart } from "../../components/client/listProductsCart/listProductsCart";

export function Cart() {
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const { getProductById } = useProduct();
  const { tableNumber } = useParams();

  useEffect(() => {
    (async () => {
      const idProductsCart = getProductsCart();

      const productsArray = [];
      for await (const idProduct of idProductsCart) {
        const response = await getProductById(idProduct);
        productsArray.push(response);
      }
      setProducts(productsArray);
    })();
  }, [reloadCart]);

  const onReloadCart = () => setReloadCart((prev) => !prev);

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {!products ? (
        <p>Cargando...</p>
      ) : size(products) === 0 ? (
        <div style={{ textAlign: "center" }}>
          <p>Carrito Vacio</p>
          <Link to={`/client/${tableNumber}/orders`}>
            <Button primary>Ver Pedidos</Button>
          </Link>
        </div>
      ) : (
        <ListProductsCart products={products} onReloadCart={onReloadCart} />
      )}
    </div>
  );
}
