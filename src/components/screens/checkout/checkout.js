import { Price } from "../../price/price";
import { CarouselDiv } from "../../carousel/carousel";
import { PayForm } from "../../payform/payform";
import { DivBack } from "../../background/div";
import { CloseButton } from "../../buttons/closeButton/closeButton";
import { useSelector } from "react-redux";
import "./checkout.css";

export const Checkout = () => {
  const { productSelected } = useSelector((state) => state.product.value);

  return (
    <div className="container">
      {productSelected.id ? (
        <>
          <CloseButton />
          <DivBack />
          <CarouselDiv name={productSelected.name} img={productSelected.img} />
          <Price
            itemName={productSelected.name}
            itemDescription={productSelected.description}
            total={productSelected.price}
          />
          <PayForm />
        </>
      ) : (
        <>
          <CloseButton />
          <DivBack />
          <div className="warning">
            <p>There's not product added</p>
          </div>
        </>
      )}
    </div>
  );
};
