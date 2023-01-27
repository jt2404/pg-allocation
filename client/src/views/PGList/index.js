import React from "react";
import HeaderBar from "../../components/Header";
import PGCard from "../../components/PGCard";

function PGList({ pgs }) {
  return <PGCard pgs={pgs} />;
}

export default PGList;
