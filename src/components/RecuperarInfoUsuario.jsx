import React, { useState } from "react";
import { useEffect } from "react";
import { Grafica } from "./Grafica";

const volt = [1, -1];

export const RecuperarInfoUsuario = ({
  dataInfo,
  spreadingCode,
  XoR,
  resultado,
}) => {
  let cont = 0,
    num = 1;

  const [res, setRes] = useState([]);

  const [XoR_x_resultado, setXoR_x_resultado] = useState([]);

  useEffect(() => {
    let XoRArray = XoR.split("").map(Number);
    let contador = 0;
    let suma = 0;
    let resultadoSuma = [];
    let XoR_x_resultado_ = [];
    let spreadingCodeX2 = "";

    for (let i = 0; i < dataInfo.length; i++) {
      spreadingCodeX2 += spreadingCode;
    }

    for (let i = 0; i < resultado.length; i++) {
      XoR_x_resultado_.push(resultado[i] * volt[spreadingCodeX2[i]]);
      contador++;
      suma += XoR_x_resultado_[i];

      if (contador === spreadingCode.length) {
        resultadoSuma.push(suma);
        suma = 0;
        contador = 0;
      }
    }

    setXoR_x_resultado(XoR_x_resultado_);
    setRes(resultadoSuma);
  }, []);

  return (
    <div className="usuario sections">
      {XoR_x_resultado && <Grafica code={XoR_x_resultado} />}

      {XoR_x_resultado && (
        <table>
          <tbody>
            <tr>
              {resultado.map((el, i) => {
                if (cont < spreadingCode.length) {
                  cont++;
                } else {
                  num++;
                  cont = 1;
                }
                return (
                  <td
                    key={i}
                    style={{
                      backgroundColor:
                        num % 2 === 0 ? "#1a1a1a" : "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {XoR_x_resultado[i]}
                  </td>
                );
              })}
            </tr>

            <tr>
              {Array.from(
                { length: XoR.length / spreadingCode.length },
                (_, i) => {
                  return (
                    <td key={i} colSpan={spreadingCode.length}>
                      {res[i]} / {spreadingCode.length}
                      {" = "}
                      {(res[i] / spreadingCode.length).toFixed(2)} V
                    </td>
                  );
                }
              )}
            </tr>

            <tr>
              {Array.from(
                { length: XoR.length / spreadingCode.length },
                (_, i) => {
                  return (
                    <td key={i} colSpan={spreadingCode.length}>
                      {/* {volt.indexOf(res[i] / spreadingCode.length)} */}
                      {res[i] / spreadingCode.length > 0 ? "0" : "1"}
                    </td>
                  );
                }
              )}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
