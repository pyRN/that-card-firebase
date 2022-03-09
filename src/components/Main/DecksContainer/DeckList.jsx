import React from "react";

//Components
import Table from "./Table";

export default function DeckList() {
  return (
    <div className="static-card">
      <div className="card-items" align="center">
        <Table sHeader="Creatures" />
        <Table sHeader="Spells" />
        <Table sHeader="Artifacts" />
        <Table sHeader="Planeswalkers" />
        <Table sHeader="Lands" />
        <Table sHeader="Sideboard" />
        <Table sHeader="MaybeBoard" />
      </div>
    </div>
  );
}
