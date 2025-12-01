"use client"

import { createContext, useState, useCallback } from "react"

export const NGOContext = createContext()

export const NGOContextProvider = ({ children }) => {

  const [collectorData, setCollectorData] = useState({
    name: "Ahmed Ben Ali",
    phone: "+216 92 123 456",
    rating: 4.8,
    successfulDeliveries: 47,
    totalKilometers: 1240,
    pendingPickups: 3,
    ecoPerformance: "Excellent",
    reliabilityScore: 96,
    punctualityScore: 94,
  })

const [compostingCenters , setcompostingCenters ] = useState([
  {
    name: "EcoCompost Center A",
    location: { lat: 36.8401, lng: 10.2005 },
    contactNumber: "+216 20 101 001",
    type: "compost_center"
  },
  {
    name: "GreenCycle Hub B",
    location: { lat: 36.8254, lng: 10.1502 },
    contactNumber: "+216 20 101 002",
    type: "compost_center"
  },
  {
    name: "BioRegen Compost C",
    location: { lat: 36.8103, lng: 10.2458 },
    contactNumber: "+216 20 101 003",
    type: "compost_center"
  },
  {
    name: "EarthRenew Center D",
    location: { lat: 36.8607, lng: 10.1801 },
    contactNumber: "+216 20 101 004",
    type: "compost_center"
  },
  {
    name: "NatureLoop Facility E",
    location: { lat: 36.7806, lng: 10.2104 },
    contactNumber: "+216 20 101 005",
    type: "compost_center"
  },
  {
    name: "CompoLife Station F",
    location: { lat: 36.7958, lng: 10.2503 },
    contactNumber: "+216 20 101 006",
    type: "compost_center"
  },
  {
    name: "EcoRoots Center G",
    location: { lat: 36.8509, lng: 10.2307 },
    contactNumber: "+216 20 101 007",
    type: "compost_center"
  },
  {
    name: "TerraCycle Plant H",
    location: { lat: 36.7702, lng: 10.1655 },
    contactNumber: "+216 20 101 008",
    type: "compost_center"
  },
  {
    name: "BioEarth Processing I",
    location: { lat: 36.8301, lng: 10.2659 },
    contactNumber: "+216 20 101 009",
    type: "compost_center"
  },
  {
    name: "GreenSoil Center J",
    location: { lat: 36.8054, lng: 10.1408 },
    contactNumber: "+216 20 101 010",
    type: "compost_center"
  }
])

const [suppliers  , setsuppliers  ] = useState([
  {
    name: "Restaurant Le Gourmet",
    location: { lat: 36.8124, lng: 10.2801 },
    contactNumber: "+216 50 202 001",
    type: "supplier"
  },
  {
    name: "Hotel Medina Palace",
    location: { lat: 36.8407, lng: 10.1553 },
    contactNumber: "+216 50 202 002",
    type: "supplier"
  },
  {
    name: "Café Horizon",
    location: { lat: 36.7892, lng: 10.2352 },
    contactNumber: "+216 50 202 003",
    type: "supplier"
  },
  {
    name: "Bistro La Terrasse",
    location: { lat: 36.8558, lng: 10.2051 },
    contactNumber: "+216 50 202 004",
    type: "supplier"
  },
  {
    name: "Hotel Carthage View",
    location: { lat: 36.7704, lng: 10.2605 },
    contactNumber: "+216 50 202 005",
    type: "supplier"
  },
  {
    name: "Restaurant Chez Sami",
    location: { lat: 36.8209, lng: 10.1208 },
    contactNumber: "+216 50 202 006",
    type: "supplier"
  },
  {
    name: "Cafe du Centre",
    location: { lat: 36.8471, lng: 10.2457 },
    contactNumber: "+216 50 202 007",
    type: "supplier"
  },
  {
    name: "Hotel El Oliva",
    location: { lat: 36.7826, lng: 10.1756 },
    contactNumber: "+216 50 202 008",
    type: "supplier"
  },
  {
    name: "Restaurant Le Délice",
    location: { lat: 36.8603, lng: 10.2602 },
    contactNumber: "+216 50 202 009",
    type: "supplier"
  },
  {
    name: "Hotel Panorama",
    location: { lat: 36.7951, lng: 10.1509 },
    contactNumber: "+216 50 202 010",
    type: "supplier"
  }
])



  const [assignedDeliveries, setAssignedDeliveries] = useState([
    {
      id: 1,
      type: "organic_food",
      quantity: 25,
      unit: "kg",
      supplier: "Restaurant Le Jardin",
      location: { lat: 36.8065, lng: 10.1967 },
      distance: 2.3,
      expiresIn: "20 hours",
      timestamp: "2024-01-15T10:30:00",
      status: "assigned",
      contactPhone: "+216 71 123 456",
    },
    {
      id: 2,
      type: "carbon_rich",
      quantity: 40,
      unit: "kg",
      supplier: "Hotel Djerba Menzel",
      location: { lat: 36.8125, lng: 10.2025 },
      distance: 3.8,
      expiresIn: "No expiry",
      timestamp: "2024-01-15T11:15:00",
      status: "assigned",
      contactPhone: "+216 75 456 789",
    },
    {
      id: 3,
      type: "organic_food",
      quantity: 15,
      unit: "kg",
      supplier: "Cafe Al Medina",
      location: { lat: 36.7995, lng: 10.185 },
      distance: 1.5,
      expiresIn: "18 hours",
      timestamp: "2024-01-15T12:00:00",
      status: "assigned",
      contactPhone: "+216 72 789 012",
    },
  ])

  const [compostingRequests, setCompostingRequests] = useState([
    {
      id: 101,
      composting_center: "Eco Compost Centre Tunis",
      waste_type: "organic_food",
      requested_quantity: 50,
      unit: "kg",
      location: { lat: 36.8055, lng: 10.1875 },
      distance: 2.1,
      priority: "high",
      deadline: "2024-01-16T14:00:00",
      status: "open",
      contactPhone: "+216 71 987 654",
    },
    {
      id: 102,
      composting_center: "Green Cycle Sfax",
      waste_type: "carbon_rich",
      requested_quantity: 100,
      unit: "kg",
      location: { lat: 34.7405, lng: 10.7607 },
      distance: 85,
      priority: "medium",
      deadline: "2024-01-17T10:00:00",
      status: "open",
      contactPhone: "+216 74 456 123",
    },
  ])

  const [deliveryHistory, setDeliveryHistory] = useState([
    {
      id: 201,
      type: "organic_food",
      quantity: 30,
      unit: "kg",
      supplier: "Restaurant Carthage",
      composting_center: "Eco Compost Centre Tunis",
      completedAt: "2024-01-14T16:45:00",
      status: "delivered",
    },
    {
      id: 202,
      type: "carbon_rich",
      quantity: 55,
      unit: "kg",
      supplier: "Hotel Sidi Bou Said",
      composting_center: "Green Cycle Sfax",
      completedAt: "2024-01-14T13:20:00",
      status: "delivered",
    },
    {
      id: 203,
      type: "organic_food",
      quantity: 22,
      unit: "kg",
      supplier: "Cafe Tunis Palace",
      composting_center: "Eco Compost Centre Tunis",
      completedAt: "2024-01-13T15:10:00",
      status: "delivered",
    },
  ])

  const [chatMessages, setChatMessages] = useState({})

  const acceptRequest = useCallback(
    (requestId) => {
      const request = compostingRequests.find((r) => r.id === requestId)
      if (request) {
        setAssignedDeliveries([
          ...assignedDeliveries,
          {
            id: requestId,
            type: request.waste_type,
            quantity: request.requested_quantity,
            unit: request.unit,
            supplier: request.composting_center,
            location: request.location,
            distance: request.distance,
            expiresIn: "No expiry",
            timestamp: new Date().toISOString(),
            status: "assigned",
            contactPhone: request.contactPhone,
          },
        ])
        setCompostingRequests(compostingRequests.filter((r) => r.id !== requestId))
      }
    },
    [assignedDeliveries, compostingRequests],
  )

  const completeDelivery = useCallback(
    (deliveryId) => {
      const delivery = assignedDeliveries.find((d) => d.id === deliveryId)
      if (delivery) {
        setDeliveryHistory([
          ...deliveryHistory,
          {
            ...delivery,
            completedAt: new Date().toISOString(),
            status: "delivered",
          },
        ])
        setAssignedDeliveries(assignedDeliveries.filter((d) => d.id !== deliveryId))
      }
    },
    [assignedDeliveries, deliveryHistory],
  )

  const sendMessage = useCallback(
    (partnerId, message) => {
      setChatMessages({
        ...chatMessages,
        [partnerId]: [
          ...(chatMessages[partnerId] || []),
          {
            id: Date.now(),
            text: message,
            sender: "collector",
            timestamp: new Date().toISOString(),
          },
        ],
      })
    },
    [chatMessages],
  )

  const value = {
    collectorData,
    assignedDeliveries,
    compostingRequests,
    deliveryHistory,
    chatMessages,
    compostingCenters, suppliers,
    acceptRequest,
    completeDelivery,
    sendMessage,
  }

  return <NGOContext.Provider value={value}>{children}</NGOContext.Provider>
}
