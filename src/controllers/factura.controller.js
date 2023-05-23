import { getConnection, querys, sql } from "../database";
//mostrar campos
export const getFactura = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllFactura);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//crear campo
export const createNewFactur = async (req, res) => {
  const { Nombre, Email, Contraseña } = req.body;
  let {  } = req.body;

  // validating
  if (Nombre == null || Email == null || Contraseña == null) {
    return res.status(400).json({ msg: "Campos Incompletos!" });
  }
  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("Contraseña", sql.VarChar, Contraseña)
      .input("Email", sql.VarChar, Email)
      .input("Nombre", sql.VarChar, Nombre)
      .query(querys.addNewFactur, );

    res.json({ Nombre, Email, Contraseña  });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//consultar campo por ID
export const getFacturById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(querys.getFacturaById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//Eliminar campo por ID
export const deleteFacturById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(querys.deleteFactur);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//Mostrar el total de campo
export const getTotalFactura = async (req, res) => {
  const pool = await getConnection();

  const result = await pool.request().query(querys.getTotalFacturas);
  console.log(result);
  res.json(result.recordset[0][""]);
};

//Actualizar el campo
export const updateFacturById = async (req, res) => {
  const { Nombre, Email, Contraseña  } = req.body;

  // validating
  if (Nombre == null || Email == null || Contraseña == null) 
  {
    return res.status(400).json({ msg: "Campos Incompletos" });
  }
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("Contraseña", sql.VarChar, Contraseña)
      .input("Email", sql.VarChar, Email)
      .input("Nombre", sql.VarChar, Nombre)
      .input("id", req.params.id)
      .query(querys.updateFacturById);
    res.json({ Nombre, Email, Contraseña  });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};