"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { travelClasses } from "@/data";

interface FlightClassesProps {
    travelClass: string,
    setTravelClass: (type: string) => void;

}

const FlightClasses = ({ travelClass, setTravelClass }: FlightClassesProps) => {

    return (
        <div className="space-y-2 my-4">
            <div className="text-sm font-medium text-primary">Class</div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between px-3 py-5 text-gray-400">
                        {travelClass}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[var(--radix-dropdown-menu-trigger-width)]"
                    align="start"
                >
                    {travelClasses.map((className) => (
                        <DropdownMenuItem
                            key={className}
                            onClick={() => setTravelClass(className)}
                            className="cursor-pointer text-primary"
                        >
                            {className}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default FlightClasses