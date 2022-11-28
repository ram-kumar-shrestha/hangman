import Card from "./Card";
import "./cards.css";

const Cards = ({ data }) => {
  const mappedCards = Object.keys(data).map((item, index) => {
    let refinedItem;

    switch (item) {
      case "pendingOrder":
        refinedItem = "Pending Order";
        break;

      case "pendingOrders":
        refinedItem = "Pending Order";
        break;

      case "incompleteOrder":
        refinedItem = "Incomplete Order";
        break;

      case "totalOrderToday":
        refinedItem = " Today Total Order";
        break;

      case "users":
        refinedItem = "Total Users";
        break;

      case "totalUser":
        refinedItem = "Total Users";
        break;

      case "totalOutlet":
        refinedItem = "Total Outlets";
        break;

      case "totalOrder":
        refinedItem = "Today Total Orders";
        break;

      case "totalSales":
        refinedItem = "Total Sales";
        break;

      default:
        refinedItem = item;
        break;
    }
    return <Card name={refinedItem} qty={data[item]} key={index} />;
  });

  return <div className="cards-container">{mappedCards}</div>;
};

export default Cards;
