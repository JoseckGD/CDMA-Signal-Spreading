import { useState } from "react";
import "./App.css";
import { Usuario } from "./components/Usuario";
import { RecuperarInfoUsuario } from "./components/RecuperarInfoUsuario";
import { Grafica } from "./components/Grafica";

const initialUsuarios = [
  {
    user: "Usuario #1",
    dataInfo: "11",
    spreadingCode: "1010",
    code: "",
    data: "",
    XoR: "",
  },
  {
    user: "Usuario #2",
    dataInfo: "01",
    spreadingCode: "1100",
    code: "",
    data: "",
    XoR: "",
  },
  {
    user: "Usuario #3",
    dataInfo: "00",
    spreadingCode: "1111",
    code: "",
    data: "",
    XoR: "",
  },
];

const initialUsuariosSinDatos = [
  {
    user: "Usuario #1",
    dataInfo: "",
    spreadingCode: "",
    code: "",
    data: "",
    XoR: "",
  },
  {
    user: "Usuario #2",
    dataInfo: "",
    spreadingCode: "",
    code: "",
    data: "",
    XoR: "",
  },
  {
    user: "Usuario #3",
    dataInfo: "",
    spreadingCode: "",
    code: "",
    data: "",
    XoR: "",
  },
];

function App() {
  const [usuarios, setUsuarios] = useState(initialUsuarios);
  const [resultado, setResultado] = useState(null);
  const [recuperarInfo, setRecuperarInfo] = useState(false);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    // console.log(value, name);

    const dataInput = name.split("-");

    if (
      /^[01]*$/.test(value) &&
      value.length <= 3 &&
      dataInput[0] === "dataInfo"
    ) {
      handleInputReiniciar();
      const updatedUsuarios = usuarios.map((usuario) => {
        if (usuario.user === dataInput[1]) {
          return {
            ...usuario,
            dataInfo: value,
            spreadingCode: usuario.spreadingCode,
            code: getCode(value, usuario.spreadingCode),
            data: getData(value, usuario.spreadingCode),
            XoR: getXoR(
              getCode(value, usuario.spreadingCode),
              getData(value, usuario.spreadingCode)
            ),
          };
        }
        return usuario;
      });

      setUsuarios(updatedUsuarios);
    }

    if (
      /^[01]*$/.test(value) &&
      value.length <= 6 &&
      dataInput[0] === "spreadingCode"
    ) {
      handleInputReiniciar();

      const updatedUsuarios = usuarios.map((usuario) => {
        if (usuario.user === dataInput[1]) {
          return {
            ...usuario,
            dataInfo: usuario.dataInfo,
            spreadingCode: value,
            code: getCode(usuario.dataInfo, value),
            data: getData(usuario.dataInfo, value),
            XoR: getXoR(
              getCode(usuario.dataInfo, value),
              getData(usuario.dataInfo, value)
            ),
          };
        }
        return usuario;
      });

      setUsuarios(updatedUsuarios);
    }
  };

  const getCode = (data, spreadingCode) => {
    let code = "";

    for (let i = 0; i < data.length; i++) {
      code = code + spreadingCode;
    }

    return code;
  };

  const getData = (data, spreadingCode) => {
    let _data = "";

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < spreadingCode.length; j++) {
        _data += data[i];
      }
    }

    return _data;
  };

  const getXoR = (code, data) => {
    let XoR = "";

    for (let i = 0; i < code.length; i++) {
      code[i] === data[i] ? (XoR += "0") : (XoR += "1");
    }

    return XoR;
  };

  const getTramas = () => {
    const updatedUsuarios = usuarios.map((usuario) => {
      return {
        ...usuario,
        dataInfo: usuario.dataInfo,
        spreadingCode: usuario.spreadingCode,
        code: getCode(usuario.dataInfo, usuario.spreadingCode),
        data: getData(usuario.dataInfo, usuario.spreadingCode),
        XoR: getXoR(
          getCode(usuario.dataInfo, usuario.spreadingCode),
          getData(usuario.dataInfo, usuario.spreadingCode)
        ),
      };
    });

    setUsuarios(updatedUsuarios);

    getSuma(updatedUsuarios);

    setRecuperarInfo(false);
  };

  const handleInputReiniciar = () => {
    setUsuarios(initialUsuariosSinDatos);
    setResultado(null);
    setRecuperarInfo(false);
  };

  const getSuma = (usuarios) => {
    const volt = [1, -1];

    let voltageResult = [];

    for (let i = 0; i < usuarios[0].XoR.length; i++) {
      voltageResult.push(
        volt[usuarios[0].XoR[i]] +
          volt[usuarios[1].XoR[i]] +
          volt[usuarios[2].XoR[i]]
      );
    }

    setResultado(voltageResult);
  };

  return (
    <>
      <nav>
        <h1>CDMA Signal Spreading</h1>
      </nav>
      <main>
        <div className="container-usuario">
          {usuarios &&
            usuarios.map((el) => (
              <Usuario
                key={el.user}
                usuario={el.user}
                dataInfo={el.dataInfo}
                code={el.code}
                data={el.data}
                XoR={el.XoR}
                spreadingCode={el.spreadingCode}
                resultado={resultado}
                handleInputChange={handleInputChange}
              />
            ))}
        </div>

        {resultado && (
          <div className="container-grafica sections">
            <h2>Resultado</h2>
            {resultado && <Grafica code={resultado} />}
          </div>
        )}

        {resultado && recuperarInfo && (
          <div className="container-grafica sections">
            <h2>Recuperar informacion</h2>
            <h3>0 = +1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 = -1</h3>
          </div>
        )}

        {resultado && recuperarInfo && (
          <div className="container-usuario">
            {resultado &&
              recuperarInfo &&
              usuarios.map((el) => (
                <RecuperarInfoUsuario
                  key={el.user}
                  dataInfo={el.dataInfo}
                  XoR={el.XoR}
                  spreadingCode={el.spreadingCode}
                  resultado={resultado}
                />
              ))}
          </div>
        )}

        <div className="container-btns sections">
          <button type="button" onClick={() => getTramas()}>
            Obtener Codigo
          </button>

          <button
            type="button"
            className="btn-reiniciar"
            onClick={() => handleInputReiniciar()}
          >
            Reiniciar
          </button>

          <button
            type="button"
            className="btn-recuperar"
            onClick={() => setRecuperarInfo(!recuperarInfo)}
          >
            Recuperar información
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
