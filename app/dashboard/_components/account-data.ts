export const customerOrders = [
  {
    code: "AU-1048",
    placed: "24 June 2026",
    status: "In transit",
    total: 398,
    paymentMethod: "Mastercard •••• 4821",
    paymentStatus: "Paid",
    transactionId: "TXN-840193",
    eta: "2 July, 10:00–16:00",
    courier: "Aurela Local Delivery",
    driver: { name: "Chinedu A.", phone: "+234 803 555 0148" },
    items: [
      {
        id: "formal",
        name: "Italian Leather Oxford",
        image: "/products/footwear.jpeg",
        price: 184,
        quantity: 1,
      },
      {
        id: "jacket",
        name: "Linen Tailored Jacket",
        image: "/products/formalwear.jpeg",
        price: 214,
        quantity: 1,
      },
    ],
    events: [
      {
        title: "Order placed",
        detail: "Payment confirmed and order sent to the sellers.",
        date: "24 Jun, 09:14",
        complete: true,
      },
      {
        title: "Items prepared",
        detail: "Both pieces passed their dispatch checks.",
        date: "25 Jun, 16:40",
        complete: true,
      },
      {
        title: "Given to delivery driver",
        detail: "Chinedu A. has your parcel. Contact: +234 803 555 0148.",
        date: "1 Jul, 11:05",
        complete: true,
      },
      {
        title: "Out for delivery",
        detail: "We will notify you when the driver begins the final delivery.",
        date: "Expected 2 Jul",
        complete: false,
      },
    ],
  },
  {
    code: "AU-1021",
    placed: "11 June 2026",
    status: "Delivered",
    total: 220,
    paymentMethod: "Bank transfer",
    paymentStatus: "Paid",
    transactionId: "TXN-817204",
    eta: "Delivered 15 June",
    courier: "DHL Express",
    driver: { name: "Delivery completed", phone: "Not available" },
    items: [
      {
        id: "dress",
        name: "Structured Evening Dress",
        image: "/products/weddingredDress.jpeg",
        price: 220,
        quantity: 1,
      },
    ],
    events: [
      {
        title: "Order placed",
        detail: "Payment confirmed.",
        date: "11 Jun, 13:22",
        complete: true,
      },
      {
        title: "Dispatched",
        detail: "The seller handed your parcel to the delivery partner.",
        date: "12 Jun, 10:08",
        complete: true,
      },
      {
        title: "Delivered",
        detail: "Parcel delivered to the provided address.",
        date: "15 Jun, 15:46",
        complete: true,
      },
    ],
  },
  {
    code: "AU-0984",
    placed: "28 May 2026",
    status: "Delivered",
    total: 186,
    paymentMethod: "USDC cryptocurrency",
    paymentStatus: "Paid",
    transactionId: "TXN-792611",
    eta: "Delivered 2 June",
    courier: "GIG Logistics",
    driver: { name: "Delivery completed", phone: "Not available" },
    items: [
      {
        id: "bag",
        name: "Structured Mini Bag",
        image: "/products/accessories.jpeg",
        price: 96,
        quantity: 1,
      },
      {
        id: "watch",
        name: "Minimal Dress Watch",
        image: "/categories/watch.jpeg",
        price: 90,
        quantity: 1,
      },
    ],
    events: [
      {
        title: "Order placed",
        detail: "Payment confirmed.",
        date: "28 May, 08:31",
        complete: true,
      },
      {
        title: "Dispatched",
        detail: "Items consolidated for delivery.",
        date: "29 May, 17:12",
        complete: true,
      },
      {
        title: "Delivered",
        detail: "Parcel delivered to the provided address.",
        date: "2 Jun, 12:18",
        complete: true,
      },
    ],
  },
];

export type CustomerOrder = (typeof customerOrders)[number];

export const accountNotifications = [
  {
    title: "Your order is on its way",
    detail: "AU-1048 was handed to the delivery partner.",
    time: "18 min ago",
  },
  {
    title: "A saved piece is nearly gone",
    detail: "Limited stock remains for an item in your wishlist.",
    time: "Yesterday",
  },
  {
    title: "Return received",
    detail: "Your return for AU-1012 is being inspected.",
    time: "2 days ago",
  },
  {
    title: "New sign-in",
    detail: "Aurela was accessed from Chrome on Windows.",
    time: "3 days ago",
  },
  {
    title: "Price reduced",
    detail: "A piece in your wishlist is now on sale.",
    time: "4 days ago",
  },
  {
    title: "Email verified",
    detail: "Your primary email address is verified.",
    time: "Last week",
  },
];
