"use client"

import { useEffect, useState } from "react"
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
import { Passengers } from "./FlightsSearchForm";

interface PassengerSelectorProps {
    onPassengerChange: (passengers: Passengers) => void;
    initialPassengers?: Passengers;
}

export const PassengerSelector: React.FC<PassengerSelectorProps> = ({
    onPassengerChange,
    initialPassengers = { adults: 1, children: 0, infants: 0 }
}) => {
    const [passengers, setPassengers] = useState<Passengers>(initialPassengers);

    // Notify parent when passengers change
    useEffect(() => {
        onPassengerChange(passengers);
    }, [passengers]);

    const totalPassengers = passengers.adults + passengers.children + passengers.infants;

    const updatePassengerCount = (type: "adults" | "children" | "infants", delta: number) => {
        setPassengers(prev => {
            const newCount = Math.max(0, prev[type] + delta);

            // Validation rules
            if (type === "adults") {
                // Ensure at least 1 adult
                if (newCount < 1) return prev;
                // Infants cannot exceed adults
                if (type === "adults" && prev.infants > newCount) {
                    return {
                        ...prev,
                        [type]: newCount,
                        infants: newCount // Adjust infants to not exceed adults
                    };
                }
            }

            if (type === "infants") {
                // Infants cannot exceed adults
                if (newCount > prev.adults) return prev;
            }

            return {
                ...prev,
                [type]: newCount
            };
        });
    };

    // Generate passenger summary text
    const getPassengerSummary = () => {
        const parts = [];
        if (passengers.adults > 0) {
            parts.push(`${passengers.adults} Adult${passengers.adults !== 1 ? 's' : ''}`);
        }
        if (passengers.children > 0) {
            parts.push(`${passengers.children} Child${passengers.children !== 1 ? 'ren' : ''}`);
        }
        if (passengers.infants > 0) {
            parts.push(`${passengers.infants} Infant${passengers.infants !== 1 ? 's' : ''}`);
        }
        return parts.join(", ") || "Select Passengers";
    };

    return (
        <div className="space-y-2">
            <div className="text-sm font-medium text-primary">Travelers</div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between text-gray-400">
                        <span className="text-left flex-1 truncate">
                            {getPassengerSummary()}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50 ml-2 flex-shrink-0" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-4 w-[var(--radix-dropdown-menu-trigger-width)] max-w-sm">
                    {/* Adults */}
                    <div className="flex items-center justify-between py-2">
                        <div className="flex-1">
                            <div className="font-medium">Adults (12+ Yrs)</div>
                            <div className="text-xs text-gray-500">Age 12 years and above</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updatePassengerCount("adults", -1)}
                                disabled={passengers.adults <= 1}
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
                                disabled={totalPassengers >= 9} // Maximum total passengers
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Children */}
                    <div className="flex items-center justify-between py-2">
                        <div className="flex-1">
                            <div className="font-medium">Children (2-12 Yrs)</div>
                            <div className="text-xs text-gray-500">Age 2 to 12 years</div>
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
                                disabled={totalPassengers >= 9} // Maximum total passengers
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Infants */}
                    <div className="flex items-center justify-between py-2">
                        <div className="flex-1">
                            <div className="font-medium">Infants (under 2Yrs)</div>
                            <div className="text-xs text-gray-500">Under 2 years</div>
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
                                disabled={passengers.infants >= passengers.adults || totalPassengers >= 9}
                                title={passengers.infants >= passengers.adults ?
                                    "Infants cannot exceed number of adults" :
                                    "Maximum passengers reached"}
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>

                    {/* Total Passengers Info */}
                    <div className="mt-3 pt-2 border-t">
                        <div className="text-xs text-gray-500 text-center">
                            Total: {totalPassengers} passenger{totalPassengers !== 1 ? 's' : ''}
                            {totalPassengers >= 9 && (
                                <div className="text-orange-600 font-medium mt-1">
                                    Maximum 9 passengers allowed
                                </div>
                            )}
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};









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
