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
import { purposOfTravel } from "@/data";

interface PurposeofTravelProps {
    purposeofTravelProps: string,
    setPurposeofTravelProps: (type: string) => void;

}

const PurposeofTravel = ({ purposeofTravelProps, setPurposeofTravelProps }: PurposeofTravelProps) => {

    return (
        <div className="space-y-2 my-4">
            <div className="text-sm font-medium text-primary">Purpose of Travel</div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between px-3 py-5 text-gray-400">
                        {purposeofTravelProps}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[var(--radix-dropdown-menu-trigger-width)]"
                    align="start"
                >
                    {purposOfTravel.map((className) => (
                        <DropdownMenuItem
                            key={className}
                            onClick={() => setPurposeofTravelProps(className)}
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

export default PurposeofTravel