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
  const {IdCliente, IdEmpleado, LecturaActual, LecturaAntigua, FechaEmision, IdObservacion} = req.body;
  let {  } = req.body;

  // validating
  if (IdCliente == null || IdEmpleado == null || LecturaActual == null ||
    LecturaAntigua == null || FechaEmision == null || IdObservacion == null
    ) {
    return res.status(400).json({ msg: "Campos Incompletos!" });
  }
  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("IdObservacion", sql.INT, IdObservacion)
      .input("FechaEmision", sql.Date, FechaEmision)
      .input("LecturaAntigua", sql.INT, LecturaAntigua)
      .input("LecturaActual", sql.INT, LecturaActual)
      .input("IdEmpleado", sql.INT, IdEmpleado)
      .input("IdCliente", sql.INT, IdCliente)
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
      .input("IdFactura", req.params.IdFactura)
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
      .input("IdFactura", req.params.IdFactura)
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
  const {IdCliente, IdEmpleado, LecturaActual, LecturaAntigua, FechaEmision, IdObservacion} = req.body;

  // validating
  if (IdCliente == null || IdEmpleado == null || LecturaActual == null ||
      LecturaAntigua == null || FechaEmision == null || IdObservacion == null
    ) 
  {
    return res.status(400).json({ msg: "Campos Incompletos" });
  }
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("IdObservacion", sql.INT, IdObservacion)
      .input("FechaEmision", sql.Date, FechaEmision)
      .input("LecturaAntigua", sql.INT, LecturaAntigua)
      .input("LecturaActual", sql.INT, LecturaActual)
      .input("IdEmpleado", sql.INT, IdEmpleado)
      .input("IdCliente", sql.INT, IdCliente) 
      .input("IdFactura", req.params.IdFactura)
      .query(querys.updateFacturById);
    res.json({ Nombre, Email, Contraseña  });
  } catch (error) {
    res.status(500);
    res.send(error.message);  
  }
};