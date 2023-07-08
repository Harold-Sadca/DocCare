"use client";
import React from "react";
import Login from "@/app/(components)/login";
import Navbar from "./navbar";

export default function JuniorDoctorLogin() {
  return (
    <>
      <Navbar />
      <Login user={"junior-doctor"} />
    </>
  );
}
