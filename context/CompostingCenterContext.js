import { createContext, useState } from "react"

export const CompostingCenterContext = createContext()

export function CompostingCenterProvider({ children }) {
  const [kpis, setKpis] = useState({
    organicWasteCollected: 12500,
    carbonRichMaterialCollected: 8300,
    compostProduced: 15200,
    compostSoldToFarmers: 9800,
    co2EmissionAvoided: 4520,
  })

  const [compostBatches, setCompostBatches] = useState([
    {
      id: 1,
      type: "Premium Compost",
      description: "High-quality organic compost from food waste",
      npk: { nitrogen: 2.5, phosphorus: 1.2, potassium: 0.8 },
      quantity: 500,
      price: 15,
      image: "https://via.placeholder.com/200?text=Compost+Premium",
      certifications: ["Organic", "ISO 9001"],
    },
    {
      id: 2,
      type: "Standard Compost",
      description: "Standard quality compost blend",
      npk: { nitrogen: 1.8, phosphorus: 0.9, potassium: 0.6 },
      quantity: 800,
      price: 10,
      image: "https://via.placeholder.com/200?text=Compost+Standard",
      certifications: ["Organic"],
    },
  ])

  const [requests, setRequests] = useState([
    {
      id: 1,
      type: "expiring_waste",
      restaurantName: "Green Bistro",
      wasteType: "organic_food",
      quantity: 50,
      distance: 2.5,
      expirationTime: "18 hours",
      status: "pending",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 2,
      type: "center_initiated",
      wasteType: "carbon_rich",
      quantity: 100,
      status: "accepted",
      collectorName: "EcoCollect Team 1",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 3,
      type: "expiring_waste",
      restaurantName: "Urban Cafe",
      wasteType: "organic_food",
      quantity: 30,
      distance: 1.8,
      expirationTime: "8 hours",
      status: "accepted",
      collectorName: "EcoCollect Team 2",
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      deliveryDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
    },
  ])

  const [ecoScore, setEcoScore] = useState(87)

  const addCompostBatch = (batch) => {
    setCompostBatches([...compostBatches, { ...batch, id: Date.now() }])
  }

  const createWasteRequest = (requestData) => {
    const newRequest = {
      id: Date.now(),
      type: "center_initiated",
      status: "pending",
      timestamp: new Date(),
      ...requestData,
    }
    setRequests([newRequest, ...requests])
    return newRequest
  }

  const claimExpiringWaste = (wasteId, restaurantName, wasteType, quantity, distance, expirationTime) => {
    const newRequest = {
      id: wasteId,
      type: "expiring_waste",
      restaurantName,
      wasteType,
      quantity,
      distance,
      expirationTime,
      status: "accepted",
      timestamp: new Date(),
    }
    setRequests([newRequest, ...requests])
  }

  const updateRequestStatus = (requestId, newStatus) => {
    setRequests(requests.map((req) => (req.id === requestId ? { ...req, status: newStatus } : req)))
  }

  return (
    <CompostingCenterContext.Provider
      value={{
        kpis,
        compostBatches,
        requests,
        ecoScore,
        addCompostBatch,
        createWasteRequest,
        claimExpiringWaste,
        updateRequestStatus,
      }}
    >
      {children}
    </CompostingCenterContext.Provider>
  )
}
