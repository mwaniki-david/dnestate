"use client"

import { Button } from "@/components/ui/button";
import { UseNewBuilding } from "@/features/building/hooks/use-new-building";

export default function Home() {
  const { onOpen } = UseNewBuilding();

  return (
    <div>
      <Button onClick={onOpen}>
        Add an account
      </Button>
    </div>
  )
}