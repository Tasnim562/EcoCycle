import { createContext, useState, useCallback } from "react"

export const SupplierContext = createContext()

export const SupplierProvider = ({ children }) => {
  const [wasteDeclarations, setWasteDeclarations] = useState([
    {
      id: "1",
      type: "organic_food",
      items: ["Vegetable scraps", "Leftover rice"],
      weight: 12.5,
      photo: null,
      declaredAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 36 * 60 * 60 * 1000),
      status: "pending",
      location: "Kitchen Area 1",
    },
    {
      id: "2",
      type: "carbon_rich",
      items: ["Cardboard boxes", "Paper packaging"],
      weight: 8.3,
      photo: null,
      declaredAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      expiresAt: null,
      status: "pending",
      location: "Storage Area",
    },
  ])

  const [points, setPoints] = useState(850)
  const [sales, setSales] = useState([
    { date: "Mon", amount: 45 },
    { date: "Tue", amount: 52 },
    { date: "Wed", amount: 38 },
    { date: "Thu", amount: 65 },
    { date: "Fri", amount: 72 },
    { date: "Sat", amount: 58 },
    { date: "Sun", amount: 48 },
  ])

  const [wasteData, setWasteData] = useState([
    {
      name: "Organic Food",
      value: 45.8,
      color: "#ADC178",
      type: "organic_food",
    },
    {
      name: "Carbon-Rich",
      value: 28.5,
      color: "#DDE5B6",
      type: "carbon_rich",
    },
  ])

  const [marketplaceProducts, setMarketplaceProducts] = useState([
    {
      id: "1",
      name: "Fresh Tomatoes",
      farmer: "Ahmed Farm",
      price: 15,
      originalPrice: 20,
      quantity: "5kg",
      image: "🍅",
      discount: 0,
    },
    {
      id: "2",
      name: "Organic Lettuce",
      farmer: "Green Valley",
      price: 8,
      originalPrice: 10,
      quantity: "1kg",
      image: "🥬",
      discount: 0,
    },
    {
      id: "3",
      name: "Fresh Carrots",
      farmer: "Natural Harvest",
      price: 12,
      originalPrice: 16,
      quantity: "3kg",
      image: "🥕",
      discount: 0,
    },
    {
      id: "4",
      name: "Organic Potatoes",
      farmer: "Eco Farm",
      price: 10,
      originalPrice: 12,
      quantity: "5kg",
      image: "🥔",
      discount: 0,
    },
  ])

  const [supplierData, setSupplierData] = useState({
    name: "Restaurant Al Zahra",
    email: "contact@alzahra.tn",
    phone: "+216 25 123 456",
    location: "Sfax, Tunisia",
    establishedDate: "2020-01-15",
    totalSalesValue: 12450,
    totalWasteDeclared: 156.3,
  })

  const addWasteDeclaration = useCallback((declaration) => {
    const newDeclaration = {
      id: String(Date.now()),
      ...declaration,
      declaredAt: new Date(),
      expiresAt: declaration.type === "organic_food" ? new Date(Date.now() + 48 * 60 * 60 * 1000) : null,
      status: "pending",
    }
    setWasteDeclarations((prev) => [newDeclaration, ...prev])

    // Add points for waste declaration
    setPoints((prev) => prev + 10)

    return newDeclaration
  }, [])

  const updateWasteStatus = useCallback((wasteId, newStatus) => {
    setWasteDeclarations((prev) => prev.map((w) => (w.id === wasteId ? { ...w, status: newStatus } : w)))

    // Award points on collection
    if (newStatus === "collected") {
      setPoints((prev) => prev + 50)
    }
  }, [])

  const usePoints = useCallback(
    (pointsToUse) => {
      if (points >= pointsToUse) {
        setPoints((prev) => prev - pointsToUse)
        return true
      }
      return false
    },
    [points],
  )

  const purchaseMarketplaceItem = useCallback(
    (productId, pointsUsed = 0) => {
      if (pointsUsed > 0 && points >= pointsUsed) {
        setPoints((prev) => prev - pointsUsed)
      }
      setMarketplaceProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, discount: pointsUsed / 10 } : p)))
    },
    [points],
  )

  const value = {
    wasteDeclarations,
    setWasteDeclarations,
    points,
    setPoints,
    sales,
    setSales,
    wasteData,
    setWasteData,
    marketplaceProducts,
    setMarketplaceProducts,
    supplierData,
    setSupplierData,
    addWasteDeclaration,
    updateWasteStatus,
    usePoints,
    purchaseMarketplaceItem,
  }

  return <SupplierContext.Provider value={value}>{children}</SupplierContext.Provider>
}
