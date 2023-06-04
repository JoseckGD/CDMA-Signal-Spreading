import React from "react";

export const TdDatos = ({ data, division }) => {
  let cont = 0,
    num = 1;
  return (
    <>
      {data &&
        data.split("").map((el, i) => {
          if (cont < division) {
            cont++;
          } else {
            cont = 1;
            num++;
          }
          return (
            <td
              key={i}
              style={{
                backgroundColor:
                  num % 2 === 0 ? "#1a1a1a" : "rgba(255, 255, 255, 0.1)",
              }}
            >
              {el}
            </td>
          );
        })}
    </>
  );
};
