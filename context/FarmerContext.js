import { createContext, useState, useCallback } from "react"

export const FarmerContext = createContext()

export const FarmerProvider = ({ children }) => {
  const [farmer, setFarmer] = useState({
    id: "farmer_001",
    name: "Ahmed Ben Ali",
    email: "ahmed@ecocycle.tn",
    phone: "+216 98 765 432",
    location: "Sousse, Tunisia",
    profileImage: null,
    totalEarnings: 1250,
    weekSales: 4250,
  })

  const [products, setProducts] = useState([
    {
      id: "prod_001",
      name: "Fresh Tomatoes",
      category: "vegetables",
      price: 1.5,
      quantity: 50,
      image: null,
      description: "Fresh organic tomatoes from local farm",
      dateAdded: new Date(),
      sold: 20,
    },
    {
      id: "prod_002",
      name: "Oranges",
      category: "fruits",
      price: 2.0,
      quantity: 30,
      image: null,
      description: "Sweet juicy oranges",
      dateAdded: new Date(),
      sold: 15,
    },
  ])

  const [orders, setOrders] = useState([
    {
      id: "order_001",
      productName: "Fresh Tomatoes",
      quantity: 20,
      totalPrice: 30,
      buyerName: "Hotel Paradise",
      status: "pending",
      dateOrdered: new Date(),
    },
  ])

  const [compostOrders, setCompostOrders] = useState([
    {
      id: "compost_001",
      centerName: "EcoCompost Center",
      type: "Premium Compost",
      quantity: 50,
      price: 250,
      status: "pending_delivery",
      dateOrdered: new Date(),
    },
  ])

  const addProduct = useCallback(
    (newProduct) => {
      const product = {
        id: `prod_${Date.now()}`,
        ...newProduct,
        dateAdded: new Date(),
        sold: 0,
      }
      setProducts([...products, product])
      return product
    },
    [products],
  )

  const updateProduct = useCallback(
    (productId, updates) => {
      setProducts(products.map((p) => (p.id === productId ? { ...p, ...updates } : p)))
    },
    [products],
  )

  const deleteProduct = useCallback(
    (productId) => {
      setProducts(products.filter((p) => p.id !== productId))
    },
    [products],
  )

  const placeCompostOrder = useCallback(
    (order) => {
      const newOrder = {
        id: `compost_${Date.now()}`,
        ...order,
        dateOrdered: new Date(),
        status: "pending_delivery",
      }
      setCompostOrders([...compostOrders, newOrder])
      return newOrder
    },
    [compostOrders],
  )

  const value = {
    farmer,
    setFarmer,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    compostOrders,
    placeCompostOrder,
  }

  return <FarmerContext.Provider value={value}>{children}</FarmerContext.Provider>
}
