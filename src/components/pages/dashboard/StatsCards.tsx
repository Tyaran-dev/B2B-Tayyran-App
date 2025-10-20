import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { statsData } from "@/data";
import Image from "next/image";
export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((item, index) => (
        <Card key={index} className="flex justify-between p-4 items-center">
          <div className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <Badge variant="default" className={`mt-2 ${item.badgeClass}`}>
                {item.change}
              </Badge>
            </CardContent>
          </div>
          <div>
            {" "}
            {item.icon} {/* ✅ renders inline SVG */}
          </div>
        </Card>
      ))}
    </div>
  );
}
