"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Search, Filter } from "lucide-react";
import { employees } from "@/data"

export function EmploysTable() {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const itemsPerPage = 8

    // Filter employees based on search and filter
    const filteredEmployees = useMemo(() => {
        return employees.filter(employee => {
            // Search filter
            const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                employee.company.toLowerCase().includes(searchQuery.toLowerCase())
            
            // Status filter
            const matchesStatus = statusFilter === "all" || 
                                employee.status?.toLowerCase() === statusFilter.toLowerCase()
            
            return matchesSearch && matchesStatus
        })
    }, [searchQuery, statusFilter])

    // Paginate results
    const paginatedEmployees = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredEmployees.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredEmployees, currentPage])

    // Calculate total pages
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    return (
        <div className="space-y-6">
            {/* Employees Section */}
            <Card className="shadow-none border-none">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Employees</span>
                        <Badge variant="secondary">Guests</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Search and Filter Bar */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search employee here"
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setCurrentPage(1) // Reset to first page when searching
                                }}
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <Filter className="h-4 w-4" />
                                    Filter
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                                    All Employees
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                                    Active
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                                    Inactive
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Results count */}
                    <div className="text-sm text-muted-foreground mb-4">
                        Showing {paginatedEmployees.length} of {filteredEmployees.length} employees
                        {statusFilter !== "all" && ` (Filtered by: ${statusFilter})`}
                    </div>

                    {/* Table */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedEmployees.length > 0 ? (
                                paginatedEmployees.map((employee, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{employee.name}</TableCell>
                                        <TableCell>{employee.company}</TableCell>
                                        <TableCell>
                                            <Badge variant={employee.status === "active" ? "default" : "secondary"}>
                                                {employee.status || "active"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        No employees found matching your criteria
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6">
                        <div className="text-sm w-28 text-muted-foreground ">
                            Page {currentPage} of {totalPages || 1}
                        </div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            if (currentPage > 1) {
                                                handlePageChange(currentPage - 1)
                                            }
                                        }}
                                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            if (currentPage < totalPages) {
                                                handlePageChange(currentPage + 1)
                                            }
                                        }}
                                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}