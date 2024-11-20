"use client";

import { EditTenantSheet } from "@/features/accounts/components/edit-tenant-sheet ";
import {  NewTenantSheet } from "@/features/accounts/components/new-tenant-sheet";
import { EditBuildingSheet } from "@/features/building/components/edit-building-sheet ";
import { NewBuildingSheet } from "@/features/building/components/new-building-sheet";
import { EditbuildingOwnerSheet } from "@/features/buildingOwner/components/edit-buildingOwner-sheet ";
import { NewBuildingOwnerSheet } from "@/features/buildingOwner/components/new-buildingOwner-sheet";
import { NewHouseSheet } from "@/features/houses/components/new-house-sheet";
import { NewunitSheet } from "@/features/units/components/new-unit-sheet";
import { useEffect, useState } from "react";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
    const isMounted =useMountedState();

    if(!isMounted) return null;
    return (
        <>
        <NewBuildingOwnerSheet/>
        {/* <EditBuildingOwnerSheet/> */}
        <NewHouseSheet/>
        {/* <EditHouseSheet/> */}
        <NewunitSheet/>
        <EditbuildingOwnerSheet/>
        <NewTenantSheet/>
        <EditTenantSheet/>
        <NewBuildingSheet/>
        <EditBuildingSheet/>
        </>
    )
}