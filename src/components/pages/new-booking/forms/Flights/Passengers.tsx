"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Plus, Minus } from "lucide-react"

export function PassengerSelector() {
    const [passengers, setPassengers] = useState({
        adults: 1,
        children: 0,
        infants: 0
    })

    const totalPassengers = passengers.adults + passengers.children + passengers.infants

    const updatePassengerCount = (type: "adults" | "children" | "infants", delta: number) => {
        setPassengers(prev => ({
            ...prev,
            [type]: Math.max(0, prev[type] + delta)
        }))
    }


    {/* Passenger Count Summary */ }
    return (

        <div className="space-y-2">
            <div className="text-sm font-medium text-primary" >Travelers</div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between text-gray-400" >
                        <span>{totalPassengers} Passenger{totalPassengers !== 1 ? 's' : ''}</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" p-4 w-[var(--radix-dropdown-menu-trigger-width)]">
                    {/* Adults */}
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <div className="font-medium">Adults (12+ Yrs)</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updatePassengerCount("adults", -1)}
                                disabled={passengers.adults <= 0}
                            >
                                <Minus className="h-3 w-3" />
                            </Button>
                            <Badge variant="secondary" className="min-w-8 justify-center">
                                {passengers.adults}
                            </Badge>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updatePassengerCount("adults", 1)}
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Children */}
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <div className="font-medium">Children (2-12 Yrs)</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updatePassengerCount("children", -1)}
                                disabled={passengers.children <= 0}
                            >
                                <Minus className="h-3 w-3" />
                            </Button>
                            <Badge variant="secondary" className="min-w-8 justify-center">
                                {passengers.children}
                            </Badge>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updatePassengerCount("children", 1)}
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Infants */}
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <div className="font-medium">Infants (under 2Yrs)</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updatePassengerCount("infants", -1)}
                                disabled={passengers.infants <= 0}
                            >
                                <Minus className="h-3 w-3" />
                            </Button>
                            <Badge variant="secondary" className="min-w-8 justify-center">
                                {passengers.infants}
                            </Badge>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updatePassengerCount("infants", 1)}
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    )
}












//   await mfCardView
//           .pay(request, MFLanguage.ENGLISH, (mfInvoiceId) {
//             debugPrint("✅ Payment initiated with MyFatoorah invoice ID: $mfInvoiceId");
//           })
//           .then((MFGetPaymentStatusResponse value) {
//             debugPrint("🎉 Payment completed with status: ${value.invoiceStatus}");
//             debugPrint("📋 Invoice ID: ${value.invoiceId}");

//             if ([
//               "Pending",
//               "Authorized", 
//               "Paid",
//               "Success"
//             ].contains(value.invoiceStatus)) {
//               emit(PaymentAuthorized(args, value.invoiceId.toString(), value));
//             } else {
//               emit(PaymentFailed(args, value.invoiceStatus ?? "Payment failed"));
//             }
//           })
//           .catchError((error) {
//             debugPrint("❌ Payment error: ${error.toString()}");
//             debugPrint("❌ Error type: ${error.runtimeType}");
