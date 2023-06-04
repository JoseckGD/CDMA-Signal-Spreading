import React, { useEffect, useState } from "react";
import { Grafica } from "./Grafica";
import { TdDatos } from "./TdDatos";

export const Usuario = ({
  usuario,
  dataInfo,
  spreadingCode,
  code,
  data,
  XoR,
  handleInputChange,
  resultado,
}) => {
  return (
    <div className="usuario sections">
      <h2>{usuario}</h2>

      <div className="input">
        <label htmlFor={`dataInfo-${usuario}`}>Data:</label>
        <input
          style={{ cursor: "text" }}
          type="text"
          value={dataInfo}
          id={`dataInfo-${usuario}`}
          name={`dataInfo-${usuario}`}
          placeholder="Data / Info"
          onChange={handleInputChange}
        />
      </div>

      <div className="input">
        <label htmlFor={`spreadingCode-${usuario}`}>Spreading Code:</label>
        <input
          style={{ cursor: "text" }}
          type="text"
          value={spreadingCode}
          id={`spreadingCode-${usuario}`}
          name={`spreadingCode-${usuario}`}
          placeholder="Spreading Code"
          onChange={handleInputChange}
        />
      </div>

      {code && data && XoR && (
        <table cellPadding={0} cellSpacing={0}>
          <tbody>
            {code && (
              <tr>
                <td className="titulo">Code:</td>
                <TdDatos data={code} division={spreadingCode.length} />
              </tr>
            )}

            {data && (
              <tr>
                <td className="titulo">Data:</td>
                <TdDatos data={data} division={spreadingCode.length} />
              </tr>
            )}

            {XoR && (
              <tr>
                <td className="titulo">XOR:</td>
                <TdDatos data={XoR} division={spreadingCode.length} />
              </tr>
            )}
          </tbody>
        </table>
      )}

      {XoR && <Grafica code={XoR} />}
    </div>
  );
};
